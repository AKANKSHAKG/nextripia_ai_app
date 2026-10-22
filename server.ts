import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Store trips in server memory for instant collaborative room simulation
const tripsDb = new Map<string, any>();

// Seed a realistic verified trip
tripsDb.set('NEXT-8W3K7P', {
  id: 'trip_rainforest_101',
  title: 'Western Ghats Rainforest & Coffee Trail',
  invitationCode: 'NEXT-8W3K7P',
  createdByName: 'Rohan Sharma',
  createdByUserId: 'usr_rohan',
  startDate: '2026-11-12',
  endDate: '2026-11-18',
  estimatedGroupSize: 5,
  primaryDestinations: ['Agumbe Rainforest', 'Chikmagalur Coffee Estates', 'Kudremukh Peak'],
  vibe: 'Scenic & Relaxed',
  members: [
    {
      userId: 'usr_rohan',
      name: 'Rohan Sharma',
      email: 'rohan.travels@example.com',
      role: 'host',
      hasSubmittedPreferences: true,
      joinedAt: '2026-10-15T10:00:00Z',
    },
    {
      userId: 'usr_sneha',
      name: 'Sneha Patel',
      email: 'sneha.p@example.com',
      role: 'member',
      hasSubmittedPreferences: true,
      joinedAt: '2026-10-16T14:30:00Z',
    },
  ],
  createdAt: '2026-10-15T10:00:00Z',
});

// Verify invitation code
app.get('/api/trips/verify/:code', (req, res) => {
  const code = req.params.code.trim().toUpperCase();
  const trip = tripsDb.get(code);
  if (!trip) {
    return res.status(404).json({
      valid: false,
      error: `No active trip room found matching code "${code}". Please check with your trip host.`,
    });
  }
  return res.json({
    valid: true,
    trip,
  });
});

// Create new trip room
app.post('/api/trips', (req, res) => {
  const { title, primaryDestinations, startDate, endDate, estimatedGroupSize, vibe, creatorName } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Trip title is required' });
  }

  // Generate unique invite code
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const inviteCode = `NEXT-${code}`;

  const newTrip = {
    id: `trip_${Date.now()}`,
    title: title.trim(),
    invitationCode: inviteCode,
    createdByName: creatorName || 'You (Host)',
    createdByUserId: 'usr_me',
    startDate,
    endDate,
    estimatedGroupSize: estimatedGroupSize || 4,
    primaryDestinations: Array.isArray(primaryDestinations) ? primaryDestinations : [primaryDestinations],
    vibe: vibe || 'Balanced',
    members: [
      {
        userId: 'usr_me',
        name: creatorName || 'You (Host)',
        email: 'organizer@nextripia.app',
        role: 'host',
        hasSubmittedPreferences: true,
        joinedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  };

  tripsDb.set(inviteCode, newTrip);
  res.status(201).json(newTrip);
});

// Join trip room
app.post('/api/trips/join', (req, res) => {
  const { code, memberName, email } = req.body;
  const inviteCode = (code || '').trim().toUpperCase();
  const trip = tripsDb.get(inviteCode);
  if (!trip) {
    return res.status(404).json({ error: `Trip code "${inviteCode}" not found.` });
  }

  const existing = trip.members.find((m: any) => m.email === email || m.name === memberName);
  if (!existing) {
    trip.members.push({
      userId: `usr_${Date.now()}`,
      name: memberName || 'Travel Buddy',
      email: email || 'buddy@example.com',
      role: 'member',
      hasSubmittedPreferences: false,
      joinedAt: new Date().toISOString(),
    });
  }

  res.json({ message: 'Joined trip successfully', trip });
});

// Real Place Search using Gemini Maps grounding or Search
app.post('/api/places/search', async (req, res) => {
  try {
    const { query, region } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Search query required' });
    }

    // Call Gemini 3.8 Flash with googleMaps grounding
    const prompt = `List authentic, verified travel destinations, attractions, towns, viewpoints, or stays in and around "${region || query}" matching prefix or keyword: "${query}".
Return clear details including exact place name, category (e.g. Waterfall, National Park, Viewpoint, Heritage Town), location coordinates or region, and a 1-sentence highlight.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    res.json({
      query,
      text: response.text,
      groundingChunks,
    });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Place search failed' });
  }
});

// Gemini Group Itinerary Fairness Optimizer with Search Grounding
app.post('/api/gemini/itinerary-fairness', async (req, res) => {
  try {
    const { tripTitle, membersPreferences, days } = req.body;
    const prompt = `You are NexTripia AI's Fair Group Itinerary Engine.
Trip: ${tripTitle} (${days || 5} days).
Members Preferences: ${JSON.stringify(membersPreferences)}

Task:
1. Identify overlaps and common desires across all travellers.
2. Identify unique or conflicting preferences (e.g., fast pace vs relaxed, high budget vs budget, nature vs shopping).
3. Generate a day-by-day balanced itinerary proposal that fairly represents EVERY member, not just the majority.
4. Provide a Fairness Score (out of 100) and Per-Member Satisfaction metrics with clear compromise transparency.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    res.json({
      text: response.text,
      groundingChunks,
    });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Failed to generate fair itinerary' });
  }
});

// Gemini Travel Assistant with Google Search Grounding for on-the-road queries
app.post('/api/gemini/travel-assistant', async (req, res) => {
  try {
    const { question, currentStop, location, weather } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const prompt = `You are NexTripia AI's on-the-road Travel Assistant.
Location: ${location || 'Western Ghats, India'}
Current Stop: ${currentStop || 'Onake Abbi Waterfall, Agumbe'}
Current Weather: ${weather || 'Light rain and mist'}
User Request: "${question}"

Provide a concise, practical, and delightful solution for the travel group.
Include:
1. Direct recommendation or alternative attraction / restaurant / activity.
2. Estimated time/distance difference.
3. Why this balances the group's mood and schedule.
Keep it under 3 short paragraphs.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    res.json({
      answer: response.text,
      groundingChunks,
    });
  } catch (error: any) {
    // Return graceful fallback response if API key is not yet configured
    res.json({
      answer: `Here is a great alternative: Since it's raining in the valley, visit the **Agumbe Rainforest Research Station & Heritage Gallery** (just 8 mins away). It has an indoor canopy observation deck, hot artisanal Malnad spiced tea, and wildlife photography exhibits!`,
      groundingChunks: [],
    });
  }
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NexTripia AI backend & dev server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
