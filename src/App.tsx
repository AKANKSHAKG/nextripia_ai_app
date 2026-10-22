/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Share2,
  ExternalLink,
  Code2,
  Smartphone,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  Plane,
  Heart,
  Hotel,
  Bed,
  Sun,
  Navigation,
  Coffee,
  Mountain,
  Camera,
  Utensils,
  Plus,
  Search,
  Sliders,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Bell,
  Play,
  Pause,
  Clock,
  Star,
  AlertTriangle,
  HelpCircle,
  LogIn,
  LogOut,
  Send,
  X,
  Layers,
  ChevronRight,
  Shield,
  Zap,
  CheckSquare
} from 'lucide-react';

// ==========================================
// BRAND NEW LOGO: NexTripia AI Emblem
// Sunset Mountain Peak, Winding Azure River & Soaring Airplane Orbit
// Matches official NexTripia AI brand artwork
// ==========================================
export function NexTripiaLogo({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="nxtSkySunset" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFA726" />
            <stop offset="60%" stopColor="#FFCC80" />
            <stop offset="100%" stopColor="#FFF8E1" />
          </linearGradient>
          <linearGradient id="nxtMtnLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="60%" stopColor="#059669" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>
          <linearGradient id="nxtMtnRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>
          <linearGradient id="nxtRiverGlow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="60%" stopColor="#00C6FF" />
            <stop offset="100%" stopColor="#0097A7" />
          </linearGradient>
          <radialGradient id="nxtSunsetAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFA726" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#00E5FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00BFA5" stopOpacity="0" />
          </radialGradient>
          <clipPath id="nxtCircleMask">
            <circle cx="50" cy="50" r="44" />
          </clipPath>
        </defs>

        {/* Ambient Back Glow */}
        <circle cx="50" cy="50" r="48" fill="url(#nxtSunsetAura)" />

        {/* Circular Emblem Container */}
        <circle cx="50" cy="50" r="44" fill="url(#nxtSkySunset)" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.9" />

        {/* Masked Mountains & River */}
        <g clipPath="url(#nxtCircleMask)">
          {/* Secondary Left Mountain Peak */}
          <polygon points="10,80 34,40 56,70" fill="url(#nxtMtnLeft)" />

          {/* Main Central Mountain Peak */}
          <polygon points="26,80 50,30 78,78" fill="url(#nxtMtnLeft)" />
          {/* Mountain Shading */}
          <polygon points="50,30 64,52 78,78" fill="url(#nxtMtnRight)" />

          {/* White Snowcaps */}
          <polygon points="50,30 45,41 50,39 55,41" fill="#FFFFFF" />
          <polygon points="34,40 30,47 34,45 38,47" fill="#FFFFFF" opacity="0.95" />

          {/* Mountain Base */}
          <path d="M6 72 Q30 64 52 70 Q74 76 94 70 L94 96 L6 96 Z" fill="#0369A1" opacity="0.95" />

          {/* Winding Blue River flowing down to the viewer */}
          <path
            d="M50 54 C46 62, 54 68, 46 76 C40 84, 54 92, 48 98 L38 98 C46 90, 32 84, 40 74 C46 66, 38 60, 46 54 Z"
            fill="url(#nxtRiverGlow)"
          />

          {/* White Orbiting Flight Contrail */}
          <path
            d="M10 68 C16 50, 44 38, 78 32"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M14 71 C22 56, 50 44, 80 34"
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeOpacity="0.85"
            fill="none"
          />

          {/* White Jet Airliner soaring to upper right */}
          <g transform="translate(80, 32) rotate(44) scale(0.95)">
            <path
              d="M0 -13 C1.5 -13, 2.5 -9, 2.5 -2 L12 4 L12 7 L2.5 4 L2.5 10 L6 13 L6 15 L0 13.5 L-6 15 L-6 13 L-2.5 10 L-2.5 4 L-12 7 L-12 4 L-2.5 -2 C-2.5 -9, -1.5 -13, 0 -13 Z"
              fill="#FFFFFF"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// UNIFIED SAGE IMAGE COMPONENT
// Shimmer loading in Soft Sage (#E8F1E8) with clean nature graphic fallback
// ==========================================
export function SageImage({
  src,
  alt = 'NexTripia Nature View',
  className = '',
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (isError || !src) {
    return (
      <div
        className={`bg-[#E0F7F6] flex flex-col items-center justify-center p-3 text-center rounded-2xl ${className}`}
      >
        <Mountain className="w-5 h-5 text-[#00BFA5]/70 mb-1" />
        <span className="text-[10px] font-bold text-[#5A726D] line-clamp-1">
          {alt || 'Scenic Highlands'}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#E0F7F6] animate-pulse flex items-center justify-center">
          <Mountain className="w-4 h-4 text-[#00BFA5]/40" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
      />
    </div>
  );
}

// Clean App Screens
export type AppScreen =
  | 'first_page'     // Page 1: Interactive Hero with Interactive Images & Brand New Logo
  | 'second_page'    // Page 2: About the App, Why NexTripia, 3 Pillars, How It Works
  | 'login'
  | 'video_tour'
  | 'home'
  | 'explore_search'
  | 'create_trip'
  | 'join_trip'
  | 'dream_preferences'
  | 'group_workspace'
  | 'group_voting'
  | 'ai_planning'
  | 'main_itinerary'
  | 'stays'
  | 'place_details'
  | 'live_map'
  | 'trip_progress'
  | 'ai_assistant'
  | 'notifications'
  | 'profile_settings';

interface PlaceItem {
  id: string;
  name: string;
  region: string;
  category: string;
  rating: number;
  reviews: number;
  cost: string;
  distance: string;
  image: string;
  description: string;
  openingHours: string;
  entryFee: string;
  tags: string[];
  gradient: string;
}

interface StayItem {
  id: string;
  name: string;
  type: string;
  rating: number;
  pricePerNight: string;
  distanceToAttraction: string;
  amenities: string[];
  image: string;
  externalLink: string;
}

export default function App() {
  // Navigation State (Starts on fresh Page 1 with interactive images & new logo)
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('first_page');
  const [deviceFrame, setDeviceFrame] = useState<'phone' | 'fullscreen'>('phone');
  const [showArchModal, setShowArchModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ==========================================
  // PAGE 1: INTERACTIVE IMAGES DATA & STATE
  // ==========================================
  const interactiveHeroDestinations = [
    {
      id: 'rainforest',
      title: 'Agumbe Cloud Rainforest',
      subtitle: 'Misty Waterfalls & Evergreen Canopies',
      region: 'Western Ghats, India',
      vibe: 'Nature & Misty Trails',
      weather: '⛅ 22°C Light Mist',
      harmonyScore: 98,
      friendsSynced: 4,
      image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
      gradient: 'from-emerald-950/85 via-emerald-900/60 to-black/80',
      accentColor: '#10B981',
      hotspots: [
        { id: 'h1', x: '26%', y: '42%', icon: '💦', title: 'Onake Abbi Waterfall', desc: '500ft cascade • Top pick of Aria & Sneha' },
        { id: 'h2', x: '72%', y: '32%', icon: '🌿', title: 'Canopy Tea Pavilion', desc: 'Rain-sheltered tasting & viewpoints' },
        { id: 'h3', x: '50%', y: '74%', icon: '👥', title: '4 Travellers Aligned', desc: '$550 avg budget • 0 schedule clashes' },
      ],
    },
    {
      id: 'coffee',
      title: 'Chikmagalur Peaks & Coffee',
      subtitle: 'Plantation Homestays & Summit Ridges',
      region: 'Karnataka, India',
      vibe: 'Coffee & Highlands',
      weather: '☕ 20°C Mountain Crisp',
      harmonyScore: 96,
      friendsSynced: 4,
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
      gradient: 'from-amber-950/85 via-orange-950/60 to-black/80',
      accentColor: '#F59E0B',
      hotspots: [
        { id: 'h4', x: '35%', y: '30%', icon: '⛰️', title: 'Mullayanagiri Peak Walk', desc: '1,930m summit • Rohan’s highlight request' },
        { id: 'h5', x: '68%', y: '65%', icon: '☕', title: 'Arabica Coffee Bungalow', desc: '$65/night • Freshly roasted filter coffee' },
        { id: 'h6', x: '24%', y: '75%', icon: '🌅', title: 'Kundadri Monolith Sunset', desc: 'Clouds sea golden hour viewpoint' },
      ],
    },
    {
      id: 'coast',
      title: 'Gokarna Secluded Coasts',
      subtitle: 'Secret Cliff Trails & Ocean Sunsets',
      region: 'Arabian Sea Shore',
      vibe: 'Sun, Sea & Culture',
      weather: '🌅 27°C Warm Breeze',
      harmonyScore: 99,
      friendsSynced: 4,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      gradient: 'from-rose-950/85 via-pink-950/60 to-black/80',
      accentColor: '#F43F5E',
      hotspots: [
        { id: 'h7', x: '45%', y: '48%', icon: '🏖️', title: 'Half Moon Beach Cove', desc: 'Trek-only secret beach • Serene waters' },
        { id: 'h8', x: '78%', y: '36%', icon: '🦀', title: 'Coastal Seafood & Veg Cafes', desc: 'Authentic local cuisine within budget' },
      ],
    },
    {
      id: 'ridge',
      title: 'Kudremukh Alpine Ridge',
      subtitle: 'Horse-Face Peaks & Cloud Seas',
      region: 'National Park',
      vibe: 'Expedition & Wilderness',
      weather: '⛰️ 18°C Cloud Ridge',
      harmonyScore: 95,
      friendsSynced: 4,
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      gradient: 'from-[#0A1F1C]/90 via-[#00BFA5]/60 to-[#1A3A34]/90',
      accentColor: '#00BFA5',
      hotspots: [
        { id: 'h9', x: '40%', y: '40%', icon: '🥾', title: 'Grassland Ridge Trail', desc: 'Streams & misty horse-face crest' },
        { id: 'h10', x: '70%', y: '68%', icon: '🏡', title: 'Eco Valley Tent Stay', desc: 'Starry skies & group campfire' },
      ],
    },
    {
      id: 'wayanad',
      title: 'Wayanad Canopy & Treehouses',
      subtitle: 'Bamboo Forests, Wildlife & Spice Hills',
      region: 'Kerala Border, Western Ghats',
      vibe: 'Eco-Stay & Wildlife',
      weather: '🌿 21°C Tropical Breeze',
      harmonyScore: 97,
      friendsSynced: 4,
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      gradient: 'from-emerald-950/85 via-teal-950/60 to-black/80',
      accentColor: '#10B981',
      hotspots: [
        { id: 'h11', x: '32%', y: '36%', icon: '🌲', title: 'Canopy Wooden Treehouse', desc: 'Eco-retreat suspended 40ft in tree canopy' },
        { id: 'h12', x: '65%', y: '55%', icon: '🎋', title: 'Bamboo Rafting River', desc: 'Gentle river floats through rainforest' },
      ],
    },
  ];

  // ==========================================
  // PAGE 1: INTERACTIVE IMAGE CONTROLS STATE
  // ==========================================
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<any | null>(null);
  const [photoFilterMode, setPhotoFilterMode] = useState<'natural' | 'golden' | 'emerald' | 'azure' | 'monochrome'>('natural');
  const [savedWishlist, setSavedWishlist] = useState<string[]>(['rainforest']);
  const [activeMemberLens, setActiveMemberLens] = useState<'all' | 'aria' | 'rohan' | 'sneha' | 'dev'>('all');

  // ==========================================
  // PAGE 2: ABOUT THE APP INTERACTIVE STATE
  // ==========================================
  const [aboutComparisonTab, setAboutComparisonTab] = useState<'with_ai' | 'without_ai'>('with_ai');
  const [aboutFeatureTab, setAboutFeatureTab] = useState<'pillars' | 'fairness_engine' | 'real_places' | 'adaptive_copilot'>('pillars');
  const [harmonySimLevel, setHarmonySimLevel] = useState(4);
  const [expandedHeadache, setExpandedHeadache] = useState<string | null>('chat_chaos');

  // User State
  const [currentUser, setCurrentUser] = useState({
    name: 'Aria Sharma',
    email: 'aria.sharma@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'host',
  });

  // Auth form states
  const [authIsLogin, setAuthIsLogin] = useState(true);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Video Tour State
  const [tourPlaying, setTourPlaying] = useState(true);
  const [tourSceneIndex, setTourSceneIndex] = useState(0);

  // Active Trip State
  const [activeTrip, setActiveTrip] = useState({
    id: 'trip_rainforest_101',
    title: 'Western Ghats Rainforest & Coffee Trail',
    invitationCode: 'NEXT-8W3K7P',
    startingCity: 'Bangalore',
    startDate: '2026-11-12',
    endDate: '2026-11-18',
    durationDays: 7,
    groupSize: 4,
    estimatedBudgetPerPerson: '$550',
    coverImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    creator: 'Aria Sharma',
    members: [
      {
        id: 'm1',
        name: 'Aria Sharma',
        role: 'Host',
        status: 'Submitted',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        topPick: 'Onake Abbi Waterfall',
      },
      {
        id: 'm2',
        name: 'Rohan Verma',
        role: 'Member',
        status: 'Submitted',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        topPick: 'Mullayanagiri Peak Walk',
      },
      {
        id: 'm3',
        name: 'Sneha Patel',
        role: 'Member',
        status: 'Submitted',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        topPick: 'Kundadri Sunset Point',
      },
      {
        id: 'm4',
        name: 'Dev Kapoor',
        role: 'Member',
        status: 'Pending',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        topPick: 'Pending Preferences',
      },
    ],
  });

  // Create Trip Inputs
  const [createTitle, setCreateTitle] = useState('Monsoon Wayanad & Coorg Retreat');
  const [createCity, setCreateCity] = useState('Bangalore, India');
  const [createStartDate, setCreateStartDate] = useState('2026-12-05');
  const [createEndDate, setCreateEndDate] = useState('2026-12-10');
  const [createGroupSize, setCreateGroupSize] = useState(4);
  const [createBudget, setCreateBudget] = useState('$450 - $650');

  // Join Trip Inputs
  const [joinCodeInput, setJoinCodeInput] = useState('NEXT-8W3K7P');
  const [joinStatus, setJoinStatus] = useState<'idle' | 'verifying' | 'found' | 'approved' | 'waiting'>('idle');

  // Places database
  const initialPlaces: PlaceItem[] = [
    {
      id: 'pl_1',
      name: 'Onake Abbi Falls',
      region: 'Agumbe, Western Ghats',
      category: 'Nature & Waterfalls',
      rating: 4.9,
      reviews: 320,
      cost: '$$ (Free entry, guide $5)',
      distance: '18 km from town center',
      image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
      description: 'A 500-foot cascading waterfall immersed in dense tropical canopy. The hike passes through bamboo groves and perennial fresh streams.',
      openingHours: '07:00 AM – 05:00 PM',
      entryFee: '₹50 ($0.60)',
      tags: ['Trek', 'Waterfalls', 'Evergreen'],
      gradient: 'from-emerald-600 to-teal-800',
    },
    {
      id: 'pl_2',
      name: 'Kundadri Sunset Monolith',
      region: 'Shimoga Border',
      category: 'Viewpoints & Ridges',
      rating: 4.85,
      reviews: 410,
      cost: '$ (Free)',
      distance: '24 km from Agumbe',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
      description: 'An ancient 17th-century rock summit surrounded by floating clouds. Known for panoramic 360-degree sunset views over the Western Ghats.',
      openingHours: '06:00 AM – 06:30 PM',
      entryFee: 'Free',
      tags: ['Golden Hour', 'Clouds', 'Heritage'],
      gradient: 'from-amber-600 to-orange-800',
    },
    {
      id: 'pl_3',
      name: 'Mullayanagiri Peak Trail',
      region: 'Chikmagalur Peaks',
      category: 'Adventure & Trekking',
      rating: 4.92,
      reviews: 820,
      cost: '$ (Free)',
      distance: '32 km from valley',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      description: 'The highest summit in Karnataka (1,930 m). Stone stairs wind along wind-swept ridges into cloud cover.',
      openingHours: '06:00 AM – 05:30 PM',
      entryFee: 'Free',
      tags: ['Summit', 'High Altitude', 'Trek'],
      gradient: 'from-sky-600 to-indigo-800',
    },
    {
      id: 'pl_4',
      name: 'Heritage Arabica Coffee Estate',
      region: 'Chikmagalur Plantation Belt',
      category: 'Plantation & Tastings',
      rating: 4.8,
      reviews: 290,
      cost: '$$$ ($15 tour + tasting)',
      distance: '8 km from cottage',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      description: 'A 120-year-old shade-grown coffee plantation. Includes berry picking, roasting demonstrations, and freshly ground filter coffee.',
      openingHours: '09:00 AM – 04:00 PM',
      entryFee: '₹400 ($5)',
      tags: ['Coffee', 'Tasting', 'Homestyle'],
      gradient: 'from-amber-700 to-yellow-900',
    },
    {
      id: 'pl_5',
      name: 'Bhadra River Bamboo Sanctuary',
      region: 'Wayanad / Bhadra',
      category: 'Eco Nature & Boating',
      rating: 4.75,
      reviews: 195,
      cost: '$$ ($10 safari)',
      distance: '45 km from ridge',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      description: 'Silent bamboo boat rides gliding between elephant corridors and birdwatching sanctuaries at dawn.',
      openingHours: '06:30 AM – 06:00 PM',
      entryFee: '₹250 ($3)',
      tags: ['Wilds', 'Boating', 'Serene'],
      gradient: 'from-teal-600 to-emerald-900',
    },
  ];

  const [placesList] = useState<PlaceItem[]>(initialPlaces);
  const [selectedPlaceIds, setSelectedPlaceIds] = useState<string[]>(['pl_1', 'pl_2', 'pl_3']);
  const [selectedPlaceDetail, setSelectedPlaceDetail] = useState<PlaceItem>(initialPlaces[0]);
  const [exploreSortMode, setExploreSortMode] = useState<'selection' | 'rating' | 'budget'>('selection');
  const [exploreSearchQuery, setExploreSearchQuery] = useState('');

  // Stays database
  const sampleStays: StayItem[] = [
    {
      id: 'stay_1',
      name: 'Misty Cloud Plantation Homestay',
      type: 'Eco Heritage Bungalow',
      rating: 4.9,
      pricePerNight: '$65 / night',
      distanceToAttraction: '4.2 km from Onake Abbi Falls',
      amenities: ['Wi-Fi', 'Farm Breakfast', 'Fireplace', 'Coffee Walk'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      externalLink: 'https://www.booking.com',
    },
    {
      id: 'stay_2',
      name: 'Highland Ridge Wooden Chalet',
      type: 'Mountain Chalet',
      rating: 4.82,
      pricePerNight: '$95 / night',
      distanceToAttraction: '8.5 km from Mullayanagiri Peak',
      amenities: ['Infinity Valley Deck', 'Stargazing Telescope', 'Organic Meals'],
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      externalLink: 'https://www.booking.com',
    },
    {
      id: 'stay_3',
      name: 'Rivermist Bamboo Eco Retreat',
      type: 'Riverside Cottage',
      rating: 4.78,
      pricePerNight: '$50 / night',
      distanceToAttraction: '12 km from Sunset Point',
      amenities: ['Creek Access', 'Veg Buffets', 'Hammocks', 'Campfire'],
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
      externalLink: 'https://www.booking.com',
    },
  ];

  // Voting State
  const [votingItems, setVotingItems] = useState([
    {
      id: 'v1',
      name: 'Mullayanagiri Early Morning Summit Trek',
      votesYes: 3,
      votesNo: 0,
      userVote: 'yes' as 'yes' | 'no' | 'change' | null,
      concernText: '',
      hasConcerns: false,
      agreementPercent: 100,
    },
    {
      id: 'v2',
      name: 'Late Night Campfire BBQ & Malnad Feast',
      votesYes: 2,
      votesNo: 1,
      userVote: 'change' as 'yes' | 'no' | 'change' | null,
      concernText: 'Prefer an earlier dinner so we can wake up at 5:30 AM for sunrise trek.',
      hasConcerns: true,
      agreementPercent: 75,
    },
    {
      id: 'v3',
      name: 'Agumbe Bamboo Rafting & Canyon Walk',
      votesYes: 3,
      votesNo: 0,
      userVote: 'yes' as 'yes' | 'no' | 'change' | null,
      concernText: '',
      hasConcerns: false,
      agreementPercent: 100,
    },
  ]);

  // Trip Progress State
  const [itineraryStops, setItineraryStops] = useState([
    { id: 's1', time: '07:00 AM', name: 'Mullayanagiri Dawn Hike', visited: true, day: 1, duration: '2.5 hrs' },
    { id: 's2', time: '10:30 AM', name: 'Artisanal Malnad Breakfast at Coffee Barn', visited: true, day: 1, duration: '1 hr' },
    { id: 's3', time: '01:00 PM', name: 'Onake Abbi Waterfall Trek & Forest Trail', visited: false, day: 1, duration: '3 hrs' },
    { id: 's4', time: '05:00 PM', name: 'Kundadri Monolith Cloud Sunset', visited: false, day: 1, duration: '1.5 hrs' },
    { id: 's5', time: '07:30 PM', name: 'Fireside Dinner & Stargazing', visited: false, day: 1, duration: '2 hrs' },
  ]);

  // Live Location Sharing permission
  const [liveLocationEnabled, setLiveLocationEnabled] = useState(false);

  // AI Assistant Chat Messages
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: 'Hey Aria! I am your on-the-road travel copilot. If rain rolls in, you run late, or need a quick dinner switch, just ask! 🌧️⏱️',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiAnswering, setIsAiAnswering] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'Dev Kapoor joined the trip!',
      desc: 'Joined via invite code NEXT-8W3K7P. Remind Dev to add preferences.',
      time: '12m ago',
      unread: true,
    },
    {
      id: 'n2',
      title: 'Sneha voted on Day 1 Itinerary',
      desc: 'Agreed to Onake Abbi Falls & Kundadri Sunset.',
      time: '1h ago',
      unread: true,
    },
    {
      id: 'n3',
      title: 'Fairness Engine updated itinerary',
      desc: '98% group harmony achieved. Zero schedule clashes found.',
      time: '3h ago',
      unread: false,
    },
    {
      id: 'n4',
      title: 'Rain Forecast Alert for Agumbe',
      desc: 'Light rain expected between 2:00 PM – 4:00 PM tomorrow.',
      time: '5h ago',
      unread: false,
    },
  ]);

  // Video tour timer
  useEffect(() => {
    if (currentScreen === 'video_tour' && tourPlaying) {
      const interval = setInterval(() => {
        setTourSceneIndex((prev) => (prev + 1) % 3);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [currentScreen, tourPlaying]);

  // Handle AI Travel Assistant Query
  const handleSendAssistant = async (queryText?: string) => {
    const q = queryText || chatInput;
    if (!q.trim()) return;

    setChatMessages((prev) => [...prev, { sender: 'user', text: q }]);
    setChatInput('');
    setIsAiAnswering(true);

    try {
      const res = await fetch('/api/gemini/travel-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          currentStop: 'Onake Abbi Waterfall, Agumbe',
          location: 'Western Ghats Rainforest, Karnataka',
          weather: 'Misty drizzle (22°C)',
        }),
      });

      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: data.answer || 'I recommend shifting to the indoor canopy tea pavilion. Everyone stays dry!',
        },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: `Here is the ideal adaptive adjustment: Since there is rain near the valley trail, shift the hike by 45 minutes and stop at **Agumbe Rainforest Research Gallery** first for hot spiced coffee and canopy photography. No one misses their must-see spot!`,
        },
      ]);
    } finally {
      setIsAiAnswering(false);
    }
  };

  // Toggle place selection in Explore
  const togglePlaceSelect = (id: string) => {
    if (selectedPlaceIds.includes(id)) {
      setSelectedPlaceIds(selectedPlaceIds.filter((p) => p !== id));
      showToast('Place removed from selection');
    } else {
      setSelectedPlaceIds([...selectedPlaceIds, id]);
      showToast('Place added to selected list!');
    }
  };

  // Sort places list based on chosen mode
  const getSortedPlaces = () => {
    let list = [...placesList];

    if (exploreSearchQuery.trim()) {
      const q = exploreSearchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (exploreSortMode === 'selection') {
      list.sort((a, b) => {
        const aIndex = selectedPlaceIds.indexOf(a.id);
        const bIndex = selectedPlaceIds.indexOf(b.id);
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return 0;
      });
    } else if (exploreSortMode === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (exploreSortMode === 'budget') {
      list.sort((a, b) => a.cost.localeCompare(b.cost));
    }

    return list;
  };

  const currentHero = interactiveHeroDestinations[activeHeroIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071F14] via-[#0F3524] to-[#05140D] text-[#1E2922] flex flex-col font-sans">
      {/* ========================================================
          CLEAN, PRODUCT-READY TOP APP BAR
          Features the NEW NexTripia AI Logo & No developer page badges
      ======================================================== */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#D6E5D6] sticky top-0 z-50 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div
            onClick={() => setCurrentScreen('first_page')}
            className="cursor-pointer hover:scale-105 transition-transform"
            title="NexTripia AI Home"
          >
            <NexTripiaLogo className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                onClick={() => setCurrentScreen('first_page')}
                className="font-heading text-lg font-black tracking-tight text-[#1A3A34] cursor-pointer"
              >
                NexTripia <span className="text-[#00BFA5]">AI</span>
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E0F7F6] text-[#00897B] border border-[#00BFA5]/35">
                Dream Together. Travel Smarter.
              </span>
            </div>
            <p className="text-[11px] text-[#5A726D] hidden sm:block">
              “Plan your perfect group trip with AI — because better journeys are shared.”
            </p>
          </div>
        </div>

        {/* Clean Controls: Expand/Phone view toggle and Specs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeviceFrame(deviceFrame === 'phone' ? 'fullscreen' : 'phone')}
            className="px-3 py-1.5 rounded-xl border border-[#E2EBE8] bg-white hover:bg-[#E0F7F6] text-xs font-bold text-[#1A3A34] transition-all flex items-center gap-1.5 shadow-2xs"
            title="Toggle View Mode"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#00BFA5]" />
            <span className="hidden sm:inline">{deviceFrame === 'phone' ? 'Expand View' : 'Phone Frame'}</span>
          </button>

          <button
            onClick={() => setShowArchModal(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#00C6FF] to-[#00BFA5] hover:opacity-90 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Code2 className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">VS Code / Flutter API</span>
          </button>
        </div>
      </header>

      {/* ========================================================
          MAIN APP CANVAS (Android Mobile Simulator)
      ======================================================== */}
      <main className="flex-1 p-2 sm:p-4 md:p-6 flex items-center justify-center">
        <div className="w-full max-w-5xl flex flex-col items-center">
          <div
            className={`transition-all duration-300 ${
              deviceFrame === 'phone'
                ? 'w-full max-w-[430px] rounded-[48px] p-3 bg-[#0A1F1C] shadow-2xl border-4 border-[#00BFA5]'
                : 'w-full max-w-4xl rounded-3xl p-1.5 bg-[#0A1F1C] shadow-2xl border-2 border-[#00BFA5]/60'
            }`}
          >
            {/* Top Phone Bezel / Status Bar - Rendered for in-app screens (first_page includes its own native status bar) */}
            {currentScreen !== 'first_page' && (
              <div className="bg-[#0A1F1C] text-white rounded-t-[36px] px-6 pt-3 pb-2 flex items-center justify-between text-[11px] font-semibold tracking-tight">
                <span className="text-[#00E5FF] font-bold">9:41</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold tracking-wider bg-[#00BFA5]/25 text-[#00E5FF] px-1.5 py-0.5 rounded-sm">
                    5G
                  </span>
                  <div className="w-5 h-2.5 rounded-xs border border-[#00E5FF] p-0.5 flex items-center">
                    <div className="h-full w-full bg-[#00E5FF] rounded-2xs"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Viewport Screen */}
            <div
              className={`bg-[#F7F9FB] ${
                currentScreen === 'first_page' ? 'rounded-[36px]' : 'rounded-b-[36px]'
              } overflow-hidden ${
                currentScreen === 'first_page' ? '' : 'min-h-[660px] max-h-[790px]'
              } flex flex-col relative select-none shadow-inner`}
            >
              <div className="flex-1 overflow-y-auto flex flex-col justify-between">
                {/* =========================================================================
                    PAGE 1: EXACT MATCH TO USER'S WELCOME SCREEN DESIGN
                    Artwork: /assets/aistudio/image_16c9f67b.png (850x1850 Native Resolution)
                    Primary Action: "Tour of the App →"
                    Secondary Action: "Log In"
                ========================================================================= */}
                {currentScreen === 'first_page' && (
                  <div className="relative w-full aspect-[850/1850] max-w-[430px] mx-auto overflow-hidden select-none bg-[#02101E] group/welcome">
                    {/* Native Full Welcome Screen Graphic */}
                    <img
                      src="/assets/aistudio/image_16c9f67b.png"
                      alt="NexTripia AI - Dream Together. Travel Smarter."
                      className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
                    />

                    {/* TOP BAR INTERACTIVE HOTSPOTS */}
                    {/* 1. NexTripia AI Logo & Text (Top-Left) -> About NexTripia */}
                    <button
                      onClick={() => setCurrentScreen('second_page')}
                      className="absolute top-[4.2%] left-[3.5%] w-[38%] h-[5.2%] rounded-2xl cursor-pointer hover:bg-white/10 active:scale-95 transition-all"
                      title="About NexTripia AI"
                      aria-label="About NexTripia AI"
                    />

                    {/* 2. 'Dream Together. Travel Smarter.' Badge (Top-Center) -> About Screen */}
                    <button
                      onClick={() => setCurrentScreen('second_page')}
                      className="absolute top-[4.9%] left-[46.5%] w-[27.5%] h-[3.8%] rounded-full cursor-pointer hover:bg-white/20 active:scale-95 transition-all"
                      title="NexTripia Philosophy"
                      aria-label="NexTripia Philosophy"
                    />

                    {/* 3. Phone Toggle Button (Top-Right) */}
                    <button
                      onClick={() => setDeviceFrame(deviceFrame === 'phone' ? 'fullscreen' : 'phone')}
                      className="absolute top-[4.9%] right-[15.5%] w-[9%] h-[3.8%] rounded-full cursor-pointer hover:bg-white/25 active:scale-95 transition-all"
                      title="Toggle Device Simulator Frame"
                      aria-label="Toggle Device Simulator Frame"
                    />

                    {/* 4. VS Code Architecture / API Connectors Button (Top-Right) */}
                    <button
                      onClick={() => setShowArchModal(true)}
                      className="absolute top-[4.9%] right-[3.8%] w-[10.5%] h-[3.8%] rounded-full cursor-pointer hover:bg-white/25 active:scale-95 transition-all"
                      title="VS Code Architecture & API Connectors"
                      aria-label="VS Code Architecture & API Connectors"
                    />

                    {/* MIDDLE JOURNEY WAYPOINT HOTSPOTS */}
                    {/* 1. Explore Card Hotspot */}
                    <button
                      onClick={() => {
                        showToast('Opening Explore Destinations');
                        setCurrentScreen('explore_search');
                      }}
                      className="absolute top-[44.8%] left-[2.8%] w-[18.5%] h-[7.8%] rounded-2xl cursor-pointer hover:ring-2 hover:ring-[#00BFA5]/80 hover:bg-[#00BFA5]/15 active:scale-95 transition-all"
                      title="Explore: Search destinations"
                      aria-label="Explore destinations"
                    />

                    {/* 2. Stay Card Hotspot */}
                    <button
                      onClick={() => {
                        showToast('Opening Stays & Accommodations');
                        setCurrentScreen('stays');
                      }}
                      className="absolute top-[44.8%] left-[25.2%] w-[17.5%] h-[7.8%] rounded-2xl cursor-pointer hover:ring-2 hover:ring-[#00C6FF]/80 hover:bg-[#00C6FF]/15 active:scale-95 transition-all"
                      title="Stay: Booking verified stays"
                      aria-label="Stay accommodations"
                    />

                    {/* 3. Plan Together Card Hotspot */}
                    <button
                      onClick={() => {
                        showToast('Opening Group Workspace');
                        setCurrentScreen('group_workspace');
                      }}
                      className="absolute top-[41.8%] left-[50.5%] w-[22.5%] h-[7.8%] rounded-2xl cursor-pointer hover:ring-2 hover:ring-[#00BFA5]/80 hover:bg-[#00BFA5]/15 active:scale-95 transition-all"
                      title="Plan Together: Group circle workspace"
                      aria-label="Plan together circle"
                    />

                    {/* 4. Travel Card Hotspot */}
                    <button
                      onClick={() => {
                        showToast('Opening Live GPS Itinerary Map');
                        setCurrentScreen('live_map');
                      }}
                      className="absolute top-[47.2%] right-[2.8%] w-[18%] h-[7.8%] rounded-2xl cursor-pointer hover:ring-2 hover:ring-[#FFA726]/80 hover:bg-[#FFA726]/15 active:scale-95 transition-all"
                      title="Travel: Real-time road map"
                      aria-label="Travel live map"
                    />

                    {/* BOTTOM ACTION BUTTONS HOTSPOTS */}
                    {/* PRIMARY ACTION: "Tour of the App →" (Cyan-to-Teal Pill Button) */}
                    <button
                      onClick={() => {
                        showToast('Starting the NexTripia AI Tour...');
                        setCurrentScreen('video_tour');
                      }}
                      className="absolute bottom-[12.4%] left-[10.5%] right-[10.5%] h-[6.8%] rounded-full cursor-pointer hover:ring-4 hover:ring-[#00E5FF]/70 hover:bg-white/10 active:scale-[0.98] transition-all flex items-center justify-center group focus:outline-none"
                      title="Tour of the App"
                      aria-label="Tour of the App"
                    >
                      <span className="sr-only">Tour of the App</span>
                    </button>

                    {/* SECONDARY ACTION: "Log In" (Frosted Glass Pill Button) */}
                    <button
                      onClick={() => {
                        setAuthIsLogin(true);
                        setCurrentScreen('login');
                      }}
                      className="absolute bottom-[5.8%] left-[10.5%] right-[10.5%] h-[6%] rounded-full cursor-pointer hover:ring-4 hover:ring-white/80 hover:bg-white/15 active:scale-[0.98] transition-all flex items-center justify-center group focus:outline-none"
                      title="Log In"
                      aria-label="Log In"
                    >
                      <span className="sr-only">Log In</span>
                    </button>

                    {/* PAGINATION DOTS HOTSPOTS */}
                    <div className="absolute bottom-[2.2%] left-[42%] right-[42%] h-[2.5%] flex items-center justify-center gap-2">
                      <button
                        onClick={() => setCurrentScreen('first_page')}
                        className="w-5 h-2.5 rounded-full hover:bg-white/30 cursor-pointer transition-all"
                        title="Welcome Screen (Current)"
                        aria-label="Welcome Screen"
                      />
                      <button
                        onClick={() => setCurrentScreen('second_page')}
                        className="w-3 h-2.5 rounded-full hover:bg-white/50 cursor-pointer transition-all"
                        title="About NexTripia AI"
                        aria-label="About NexTripia AI"
                      />
                      <button
                        onClick={() => setCurrentScreen('video_tour')}
                        className="w-3 h-2.5 rounded-full hover:bg-white/50 cursor-pointer transition-all"
                        title="Tour of the App"
                        aria-label="Tour of the App"
                      />
                    </div>
                  </div>
                )}

                {/* =========================================================================
                    PAGE 2: ABOUT NEXTRIPIA AI (In-Depth Explanation of How the App Works)
                ========================================================================= */}
                {currentScreen === 'second_page' && (
                  <div className="flex-1 p-3.5 sm:p-4 space-y-4 bg-gradient-to-b from-[#FAF9F5] via-[#F0F7F2] to-[#FAF9F5] overflow-y-auto">
                    {/* Header with Back button, Brand Logo, and Skip */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentScreen('first_page')}
                        className="px-2.5 py-1.5 rounded-xl bg-white border border-[#CBD5E1] flex items-center gap-1.5 text-xs font-bold text-[#1E2922] shadow-2xs hover:bg-emerald-50"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Photos</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <NexTripiaLogo className="w-6 h-6" />
                        <span className="font-heading text-xs font-black text-[#0F291E]">About NexTripia AI</span>
                      </div>

                      <button
                        onClick={() => {
                          setAuthIsLogin(true);
                          setCurrentScreen('login');
                        }}
                        className="text-xs font-bold text-[#00897B] hover:text-[#00BFA5] flex items-center gap-1 cursor-pointer"
                      >
                        <span>Log In →</span>
                      </button>
                    </div>

                    {/* Headline Story Banner */}
                    <div className="bg-gradient-to-tr from-[#064E3B] via-[#047857] to-[#10B981] p-4 rounded-3xl text-white shadow-lg relative overflow-hidden">
                      <div className="relative z-10">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-wider backdrop-blur-md">
                          The Travel Revolution
                        </span>
                        <h2 className="font-heading text-base font-black mt-1.5 leading-snug">
                          “Dream individually. Plan collectively. Travel dynamically.”
                        </h2>
                        <p className="text-xs text-emerald-100 mt-1.5 leading-relaxed">
                          Planning a group trip shouldn't cost you your friendships. NexTripia AI was created to replace chaotic group chats, budget arguments, and rigid spreadsheets with automated mathematical fairness and live on-the-road adaptability.
                        </p>
                      </div>
                      <div className="absolute right-[-20px] bottom-[-20px] w-36 h-36 rounded-full bg-emerald-300/20 blur-2xl" />
                    </div>

                    {/* Interactive 4 Group Travel Headaches (Tap to inspect how NexTripia fixes them) */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between px-1">
                        <h3 className="font-heading text-xs font-black text-[#1E2922] uppercase tracking-wide">
                          The 4 Group Planning Headaches We Solve
                        </h3>
                        <span className="text-[10px] font-bold text-emerald-700">Tap cards</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {[
                          {
                            id: 'chat_chaos',
                            icon: '💬',
                            title: 'The WhatsApp Abyss',
                            short: '400 unread messages, lost reels & zero decisions made.',
                            solution: 'NexTripia gives every trip a single smart room with live voting and zero noise.',
                          },
                          {
                            id: 'sidelined_friend',
                            icon: '😤',
                            title: 'The Sidelined Voice',
                            short: 'One person plans everything; quieter friends suffer silently.',
                            solution: 'Private wishlists ensure everyone’s top highlight is guaranteed in the final plan.',
                          },
                          {
                            id: 'budget_divide',
                            icon: '💸',
                            title: 'The Budget Chasm',
                            short: 'Half wants $300 luxury villas, half has a backpacker wallet.',
                            solution: 'Gemini AI calculates optimal compromise stays that respect everyone’s maximum cap.',
                          },
                          {
                            id: 'rigid_plan',
                            icon: '🌧️',
                            title: 'The Brittle Schedule',
                            short: 'Rain hits or someone oversleeps, and the static PDF plan breaks.',
                            solution: 'Real-time adaptive AI copilot recalculates indoor swaps with live weather.',
                          },
                        ].map((h) => {
                          const isExpanded = expandedHeadache === h.id;
                          return (
                            <div
                              key={h.id}
                              onClick={() => setExpandedHeadache(isExpanded ? null : h.id)}
                              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                                isExpanded
                                  ? 'bg-emerald-50/90 border-emerald-400 shadow-sm'
                                  : 'bg-white border-[#CBD5E1] shadow-2xs hover:border-emerald-300'
                              }`}
                            >
                              <div className="flex items-center gap-1.5">
                                <span className="text-base">{h.icon}</span>
                                <h4 className="font-heading text-xs font-black text-[#1E2922] leading-tight">
                                  {h.title}
                                </h4>
                              </div>
                              <p className="text-[10px] text-[#475569] mt-1 line-clamp-2 leading-relaxed">
                                {h.short}
                              </p>
                              {isExpanded && (
                                <div className="mt-2 pt-2 border-t border-emerald-200 text-[10px] font-semibold text-emerald-900 bg-emerald-100/60 p-2 rounded-xl">
                                  <span className="font-black text-emerald-950">NexTripia Fix: </span>
                                  {h.solution}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* The 3 Core Pillars in Full Detail */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between px-1">
                        <h3 className="font-heading text-xs font-black text-[#1E2922] uppercase tracking-wide">
                          The 3 Pillars of NexTripia AI
                        </h3>
                        <span className="text-[10px] font-bold text-emerald-700">Fairness First</span>
                      </div>

                      {/* Pillar 1 */}
                      <div className="p-3.5 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs space-y-1.5 hover:border-emerald-300 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs shrink-0">
                            1
                          </div>
                          <div>
                            <h4 className="font-heading text-xs font-black text-[#1E2922]">
                              Dream Individually (Private Wishlists)
                            </h4>
                            <span className="text-[10px] font-bold text-emerald-700">Zero Peer Pressure</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-[#475569] leading-relaxed pl-9">
                          Every traveler submits their bucket-list destinations, budget range, morning wake-up preference, and dietary needs in complete privacy. Nobody judges you for wanting a slow brunch instead of a 6:00 AM trek!
                        </p>
                      </div>

                      {/* Pillar 2 */}
                      <div className="p-3.5 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs space-y-1.5 hover:border-amber-300 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xs shrink-0">
                            2
                          </div>
                          <div>
                            <h4 className="font-heading text-xs font-black text-[#1E2922]">
                              Plan Collectively with Gemini AI
                            </h4>
                            <span className="text-[10px] font-bold text-amber-700">Guaranteed Fairness Engine</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-[#475569] leading-relaxed pl-9">
                          Gemini AI evaluates the group matrix, resolves schedule clashes, and produces an itinerary where <strong>every single member gets their #1 must-see highlight</strong> while staying within group budget and travel times.
                        </p>
                      </div>

                      {/* Pillar 3 */}
                      <div className="p-3.5 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs space-y-1.5 hover:border-teal-300 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-black text-xs shrink-0">
                            3
                          </div>
                          <div>
                            <h4 className="font-heading text-xs font-black text-[#1E2922]">
                              Travel Dynamically on the Road
                            </h4>
                            <span className="text-[10px] font-bold text-teal-700">Adaptive AI Copilot</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-[#475569] leading-relaxed pl-9">
                          Your trip is alive. If sudden mountain rain rolls into Agumbe or traffic delays your arrival by an hour, the AI copilot re-sequences stops, suggests sheltered canopy cafes, and shares live route updates with everyone.
                        </p>
                      </div>
                    </div>

                    {/* Interactive Group Harmony Simulator Widget */}
                    <div className="bg-white p-3.5 rounded-3xl border border-[#CBD5E1] shadow-sm space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-xs font-black text-[#1E2922] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Interactive AI Harmony Simulator:</span>
                        </span>
                        <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          {90 + harmonySimLevel}% Match
                        </span>
                      </div>
                      <p className="text-[11px] text-[#475569]">
                        Drag the slider to balance outdoor adventures with relaxed downtime and see how the AI fairness engine recalibrates group satisfaction:
                      </p>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-[#64748B]">
                          <span>☕ Pure Chill & Cafes</span>
                          <span>⛰️ Intense Treks</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="9"
                          value={harmonySimLevel}
                          onChange={(e) => setHarmonySimLevel(parseInt(e.target.value))}
                          className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Member Satisfaction Mini-Meters */}
                      <div className="grid grid-cols-4 gap-1.5 pt-1">
                        {[
                          { name: 'Aria (Trek)', score: Math.min(100, 85 + harmonySimLevel * 2) },
                          { name: 'Rohan (Photo)', score: 98 },
                          { name: 'Sneha (Chill)', score: Math.min(100, 105 - harmonySimLevel * 2) },
                          { name: 'Dev (Budget)', score: 97 },
                        ].map((m) => (
                          <div key={m.name} className="bg-slate-50 p-2 rounded-xl border border-slate-200 text-center">
                            <span className="text-[9px] font-bold text-[#475569] block truncate">{m.name}</span>
                            <span className="text-xs font-black text-emerald-700">{m.score}%</span>
                            <div className="w-full h-1 bg-slate-200 rounded-full mt-1 overflow-hidden">
                              <div
                                style={{ width: `${m.score}%` }}
                                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Comparison: With NexTripia AI vs. Old Way */}
                    <div className="bg-white p-3.5 rounded-3xl border border-[#CBD5E1] shadow-sm space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-xs font-black text-[#1E2922]">
                          Side-by-Side Comparison:
                        </span>
                        <div className="flex p-0.5 bg-[#F1F5F9] rounded-xl border border-[#CBD5E1] text-[10px] font-bold">
                          <button
                            onClick={() => setAboutComparisonTab('with_ai')}
                            className={`px-2 py-1 rounded-lg transition-all ${
                              aboutComparisonTab === 'with_ai' ? 'bg-[#059669] text-white' : 'text-[#64748B]'
                            }`}
                          >
                            With NexTripia AI
                          </button>
                          <button
                            onClick={() => setAboutComparisonTab('without_ai')}
                            className={`px-2 py-1 rounded-lg transition-all ${
                              aboutComparisonTab === 'without_ai' ? 'bg-rose-600 text-white' : 'text-[#64748B]'
                            }`}
                          >
                            The Old Way
                          </button>
                        </div>
                      </div>

                      {aboutComparisonTab === 'with_ai' ? (
                        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 space-y-1.5 animate-in fade-in duration-200">
                          <div className="flex items-center gap-1.5 font-black text-emerald-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Pure Group Harmony & Zero Resentment</span>
                          </div>
                          <ul className="space-y-1 text-[11px] list-disc list-inside text-emerald-900 leading-relaxed">
                            <li>1 WhatsApp invite code or QR code for everyone</li>
                            <li>Guaranteed that everyone gets their top highlight</li>
                            <li>Real Google Places routes, hours, and Booking.com stays</li>
                            <li>Live on-the-road copilot for rain, delays, and swaps</li>
                          </ul>
                        </div>
                      ) : (
                        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-300 text-xs text-rose-950 space-y-1.5 animate-in fade-in duration-200">
                          <div className="flex items-center gap-1.5 font-black text-rose-800">
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            <span>The Traditional Group Travel Chaos</span>
                          </div>
                          <ul className="space-y-1 text-[11px] list-disc list-inside text-rose-900 leading-relaxed">
                            <li>Hundreds of unread messages and lost Instagram links</li>
                            <li>The organizer is exhausted; quiet friends feel ignored</li>
                            <li>A rigid spreadsheet breaks on the first train delay</li>
                            <li>Awkward money arguments when bills don't match expectations</li>
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Real Integrations Ecosystem Badges */}
                    <div className="bg-white p-3.5 rounded-2xl border border-[#CBD5E1] shadow-2xs space-y-2">
                      <span className="font-heading text-[11px] font-black text-[#1E2922] uppercase tracking-wide block">
                        Powered By Real Travel Integrations
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-[#475569]">
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-1.5">
                          <span>🗺️</span>
                          <span>Google Maps & Routes</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-1.5">
                          <span>🏨</span>
                          <span>Booking.com Partner Stays</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-1.5">
                          <span>⛅</span>
                          <span>OpenWeather Live Forecasts</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-1.5">
                          <span>🤖</span>
                          <span>Gemini AI Engine</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons to Enter App */}
                    <div className="space-y-2 pt-1 pb-3">
                      <button
                        onClick={() => {
                          setAuthIsLogin(false);
                          setCurrentScreen('login');
                        }}
                        className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#00C6FF] via-[#00E5FF] to-[#00BFA5] hover:opacity-95 text-white text-xs font-black shadow-lg shadow-[#00C6FF]/35 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Start Planning (Create Group Trip)</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setCurrentScreen('video_tour')}
                          className="py-2.5 rounded-full border border-[#00BFA5]/40 bg-white text-xs font-bold text-[#00897B] hover:bg-[#E0F7F6] flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 text-[#00BFA5]" />
                          <span>Watch Video Tour</span>
                        </button>

                        <button
                          onClick={() => {
                            setAuthIsLogin(true);
                            setCurrentScreen('login');
                          }}
                          className="py-2.5 rounded-full border border-[#E2EBE8] bg-white text-xs font-bold text-[#1A3A34] hover:bg-[#F2EFE9] shadow-2xs flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <LogIn className="w-3.5 h-3.5 text-[#00BFA5]" />
                          <span>Log In</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* LOGIN / SIGN UP - Forest Green & Warm Cream Design System */}
                {/* LOGIN / SIGN UP - Welcome Screen Cinematic Nature & Glassmorphism */}
                {currentScreen === 'login' && (
                  <div className="flex-1 relative flex flex-col justify-between overflow-y-auto bg-[#F7F9FB] pb-8 min-h-[660px]">
                    {/* Background scenic mountain/water photo with subtle blur */}
                    <img
                      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
                      alt="NexTripia Nature Backdrop"
                      className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-40 blur-[2px]"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#F7F9FB]/90 via-[#F7F9FB]/95 to-[#1A3A34]/50 pointer-events-none" />

                    <div className="relative z-10 p-5 flex flex-col justify-between flex-1">
                      <div>
                        {/* Top Bar with Brand Badge & Tour the App Link */}
                        <div className="flex items-center justify-between mb-3">
                          <button
                            onClick={() => setCurrentScreen('first_page')}
                            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-white flex items-center justify-center text-[#1A3A34] hover:bg-white shadow-xs cursor-pointer"
                            title="Back to Welcome Screen"
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setCurrentScreen('video_tour')}
                            className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white text-xs font-bold text-[#00897B] hover:bg-white shadow-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <Compass className="w-3.5 h-3.5 text-[#00BFA5]" />
                            <span>Tour the App</span>
                          </button>
                        </div>

                        {/* Title Header */}
                        <div className="my-2">
                          <div className="flex items-center gap-1.5 mb-1">
                            <NexTripiaLogo className="w-6 h-6" />
                            <span className="font-heading text-xs font-black text-[#1A3A34]">
                              NexTripia <span className="text-[#00BFA5]">AI</span>
                            </span>
                          </div>
                          <h2 className="font-heading text-2xl font-black text-[#1A3A34] tracking-tight">
                            {authIsLogin ? 'Welcome Back!' : 'Create Your Account'}
                          </h2>
                          <p className="text-xs text-[#5A726D]">
                            {authIsLogin ? 'Sign in to access your shared trip rooms.' : 'Join your friends on NexTripia AI.'}
                          </p>
                        </div>

                        {/* Glassmorphic Auth Container Card */}
                        <div className="mt-3 p-4 rounded-3xl bg-white/90 backdrop-blur-md border border-white shadow-lg space-y-3">
                          {/* Toggle Pills: Log In vs Sign Up */}
                          <div className="flex p-1 rounded-full bg-[#F2EFE9] border border-white">
                            <button
                              onClick={() => setAuthIsLogin(true)}
                              className={`flex-1 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                                authIsLogin
                                  ? 'bg-white text-[#1A3A34] shadow-xs'
                                  : 'text-[#5A726D] hover:text-[#1A3A34]'
                              }`}
                            >
                              Log In
                            </button>
                            <button
                              onClick={() => setAuthIsLogin(false)}
                              className={`flex-1 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                                !authIsLogin
                                  ? 'bg-white text-[#1A3A34] shadow-xs'
                                  : 'text-[#5A726D] hover:text-[#1A3A34]'
                              }`}
                            >
                              Sign Up
                            </button>
                          </div>

                          {/* Google Sign In */}
                          <button
                            onClick={() => {
                              showToast('Signed in with Google as Aria Sharma');
                              setCurrentScreen('home');
                            }}
                            className="w-full py-2.5 px-4 rounded-full border border-[#E2EBE8] bg-white hover:bg-[#F7F9FB] text-xs font-bold text-[#1A3A34] transition-all flex items-center justify-center gap-2.5 shadow-2xs cursor-pointer"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                            </svg>
                            <span>Continue with Google</span>
                          </button>

                          <div className="flex items-center gap-2 my-1">
                            <div className="flex-1 h-px bg-[#E2EBE8]" />
                            <span className="text-[10px] text-[#718078] font-bold uppercase">or email & password</span>
                            <div className="flex-1 h-px bg-[#E2EBE8]" />
                          </div>

                          {/* Fields */}
                          <div className="space-y-2.5">
                            {!authIsLogin && (
                              <div>
                                <label className="block text-xs font-bold text-[#1A3A34] mb-1">Full Name</label>
                                <input
                                  type="text"
                                  value={authName}
                                  onChange={(e) => setAuthName(e.target.value)}
                                  placeholder="Aria Sharma"
                                  className="w-full px-3.5 py-2.5 rounded-2xl border border-[#E2EBE8] text-xs font-medium bg-white focus:outline-none focus:border-[#00BFA5]"
                                />
                              </div>
                            )}

                            <div>
                              <label className="block text-xs font-bold text-[#1A3A34] mb-1">Email</label>
                              <input
                                type="email"
                                value={authEmail}
                                onChange={(e) => setAuthEmail(e.target.value)}
                                placeholder="aria@example.com"
                                className="w-full px-3.5 py-2.5 rounded-2xl border border-[#E2EBE8] text-xs font-medium bg-white focus:outline-none focus:border-[#00BFA5]"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-[#1A3A34] mb-1">Password</label>
                              <div className="relative">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  value={authPassword}
                                  onChange={(e) => setAuthPassword(e.target.value)}
                                  placeholder="••••••••"
                                  className="w-full px-3.5 py-2.5 pr-10 rounded-2xl border border-[#E2EBE8] text-xs font-medium bg-white focus:outline-none focus:border-[#00BFA5]"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-2.5 text-[#718078]"
                                >
                                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>

                            {authIsLogin && (
                              <div className="flex justify-end">
                                <button
                                  onClick={() => showToast('Password reset link dispatched!')}
                                  className="text-xs font-bold text-[#00897B] hover:underline"
                                >
                                  Forgot password?
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2.5 pt-4">
                        {/* Primary Sky Cyan to Vibrant Teal Gradient Pill Action Button */}
                        <button
                          onClick={() => {
                            showToast(authIsLogin ? 'Logged in successfully!' : 'Account created!');
                            setCurrentScreen('home');
                          }}
                          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#00C6FF] via-[#00E5FF] to-[#00BFA5] hover:opacity-95 text-white text-xs font-extrabold shadow-lg shadow-[#00C6FF]/35 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                        >
                          <LogIn className="w-4 h-4" />
                          <span>{authIsLogin ? 'Log In to NexTripia' : 'Create My Account'}</span>
                        </button>

                        <p className="text-center text-xs text-[#5A726D]">
                          {authIsLogin ? "Don't have an account? " : 'Already registered? '}
                          <button
                            onClick={() => setAuthIsLogin(!authIsLogin)}
                            className="font-bold text-[#00897B] hover:underline cursor-pointer"
                          >
                            {authIsLogin ? 'Sign up' : 'Log in'}
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI VIDEO TOUR */}
                {currentScreen === 'video_tour' && (
                  <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto bg-[#F7F9FB] pb-8">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <NexTripiaLogo className="w-5 h-5" />
                          <h3 className="font-heading text-xs font-black text-[#1A3A34]">Tour of the App</h3>
                        </div>
                        <button
                          onClick={() => {
                            setAuthIsLogin(true);
                            setCurrentScreen('login');
                          }}
                          className="text-xs font-bold text-[#00897B] hover:text-[#00BFA5] flex items-center gap-1 cursor-pointer"
                        >
                          <span>Log In →</span>
                        </button>
                      </div>

                      <h2 className="font-heading text-lg font-black text-[#1A3A34]">
                        Watch How NexTripia AI Works
                      </h2>
                      <p className="text-xs text-[#5A726D] mb-3">
                        A seamless loop from personal wish lists to unified on-the-road harmony.
                      </p>

                      <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E2EBE8] bg-black aspect-video flex flex-col justify-between p-4">
                        <img
                          src={
                            tourSceneIndex === 0
                              ? 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80'
                              : tourSceneIndex === 1
                              ? 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80'
                              : 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
                          }
                          alt="Video scene"
                          className="absolute inset-0 w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />

                        <div className="relative z-10 flex items-center justify-between text-white">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#00BFA5]">
                            Scene {tourSceneIndex + 1} of 3
                          </span>
                          <span className="text-[10px] bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-xs">HD 1080p</span>
                        </div>

                        <div className="relative z-10 flex justify-center">
                          <button
                            onClick={() => setTourPlaying(!tourPlaying)}
                            className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/60 hover:scale-110 transition-transform shadow-lg cursor-pointer"
                          >
                            {tourPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                          </button>
                        </div>

                        <div className="relative z-10 text-white">
                          <h4 className="font-heading text-xs font-black">
                            {tourSceneIndex === 0 && '1. Members share their dream spots individually'}
                            {tourSceneIndex === 1 && '2. Gemini optimizes a fair itinerary without clashes'}
                            {tourSceneIndex === 2 && '3. The group explores together with live GPS'}
                          </h4>
                          <div className="flex gap-1 mt-2">
                            {[0, 1, 2].map((idx) => (
                              <div
                                key={idx}
                                onClick={() => setTourSceneIndex(idx)}
                                className={`flex-1 h-1.5 rounded-full cursor-pointer transition-all ${
                                  tourSceneIndex === idx ? 'bg-[#00E5FF] shadow-xs shadow-cyan-300' : 'bg-white/30'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-3">
                      {/* Primary Action: Log In (Pill button with Sky Cyan to Vibrant Teal Gradient) */}
                      <button
                        onClick={() => {
                          setAuthIsLogin(true);
                          setCurrentScreen('login');
                        }}
                        className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#00C6FF] via-[#00E5FF] to-[#00BFA5] hover:opacity-95 text-white text-xs font-extrabold shadow-lg shadow-[#00C6FF]/35 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Log In to NexTripia AI</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setAuthIsLogin(false);
                            setCurrentScreen('login');
                          }}
                          className="py-2.5 rounded-full border border-white/80 bg-white/90 backdrop-blur-md text-xs font-bold text-[#1A3A34] hover:bg-white transition-all shadow-2xs flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Create Account</span>
                        </button>
                        <button
                          onClick={() => setCurrentScreen('first_page')}
                          className="py-2.5 rounded-full border border-[#E2EBE8] bg-[#F2EFE9] text-xs font-bold text-[#5A726D] hover:text-[#1A3A34] hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>First Page</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* HOME DASHBOARD - Welcome Screen Nature & Waypoints Styling */}
                {currentScreen === 'home' && (
                  <div className="flex-1 p-4 space-y-4 bg-[#F7F9FB] overflow-y-auto pb-6">
                    {/* Top User Greeting & Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={currentUser.avatar}
                          alt="User Avatar"
                          onClick={() => setCurrentScreen('profile_settings')}
                          className="w-10 h-10 rounded-full border-2 border-[#00BFA5] object-cover cursor-pointer hover:scale-105 transition-transform shadow-xs"
                        />
                        <div>
                          <h3 className="font-heading text-sm font-black text-[#1A3A34]">
                            Good morning, {currentUser.name}! 🌿
                          </h3>
                          <p className="text-[11px] text-[#5A726D]">Ready to explore Western Ghats?</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setCurrentScreen('notifications')}
                        className="relative w-9 h-9 rounded-full bg-white border border-white flex items-center justify-center text-[#1A3A34] hover:bg-[#F2EFE9] shadow-xs cursor-pointer"
                      >
                        <Bell className="w-4 h-4 text-[#00BFA5]" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF5722] text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-xs">
                          {notifications.filter((n) => n.unread).length}
                        </span>
                      </button>
                    </div>

                    {/* Search Bar */}
                    <div
                      onClick={() => setCurrentScreen('explore_search')}
                      className="p-3.5 rounded-full bg-white border border-white shadow-xs flex items-center gap-2 cursor-pointer hover:border-[#00BFA5] transition-all"
                    >
                      <Search className="w-4 h-4 text-[#00BFA5]" />
                      <span className="text-xs text-[#5A726D]">Search destinations, coffee estates, waterfalls...</span>
                    </div>

                    {/* 4 Floating Waypoint Category Badges (from the Welcome Screen!) */}
                    <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      <button
                        onClick={() => setCurrentScreen('explore_search')}
                        className="px-3 py-1.5 rounded-full bg-[#00BFA5] text-white text-[11px] font-extrabold flex items-center gap-1.5 shadow-md shadow-[#00BFA5]/30 cursor-pointer shrink-0"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Explore</span>
                      </button>

                      <button
                        onClick={() => setCurrentScreen('stays')}
                        className="px-3 py-1.5 rounded-full bg-[#00C6FF] text-white text-[11px] font-extrabold flex items-center gap-1.5 shadow-md shadow-[#00C6FF]/30 cursor-pointer shrink-0"
                      >
                        <Bed className="w-3.5 h-3.5" />
                        <span>Stay</span>
                      </button>

                      <button
                        onClick={() => setCurrentScreen('group_workspace')}
                        className="px-3 py-1.5 rounded-full bg-[#00BFA5] text-white text-[11px] font-extrabold flex items-center gap-1.5 shadow-md shadow-[#00BFA5]/30 cursor-pointer shrink-0"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Plan Together</span>
                      </button>

                      <button
                        onClick={() => setCurrentScreen('live_map')}
                        className="px-3 py-1.5 rounded-full bg-[#FFA726] text-white text-[11px] font-extrabold flex items-center gap-1.5 shadow-md shadow-[#FFA726]/30 cursor-pointer shrink-0"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Travel</span>
                      </button>
                    </div>

                    {/* Quick Trip Actions */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div
                        onClick={() => setCurrentScreen('create_trip')}
                        className="p-4 rounded-3xl bg-gradient-to-r from-[#00C6FF] via-[#00E5FF] to-[#00BFA5] text-white cursor-pointer shadow-md hover:scale-[1.02] transition-all"
                      >
                        <Plus className="w-5 h-5 mb-1" />
                        <h4 className="font-heading text-xs font-black">Create a Trip</h4>
                        <p className="text-[10px] text-white/90">Start new circle & code</p>
                      </div>

                      <div
                        onClick={() => setCurrentScreen('join_trip')}
                        className="p-4 rounded-3xl bg-white border border-white text-[#1A3A34] cursor-pointer shadow-xs hover:scale-[1.02] transition-all"
                      >
                        <KeyRound className="w-5 h-5 text-[#00BFA5] mb-1" />
                        <h4 className="font-heading text-xs font-black">Join a Trip</h4>
                        <p className="text-[10px] text-[#5A726D]">Enter friend's invite</p>
                      </div>
                    </div>

                    {/* Active Trip Room Card */}
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-white">
                      <div className="relative h-28 w-full overflow-hidden">
                        <SageImage
                          src={activeTrip.coverImage}
                          alt="Cover"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-3 text-white">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FFA726] to-[#FF5722] shadow-xs">
                              Active Trip Room
                            </span>
                            <h4 className="font-heading text-sm font-black mt-1">{activeTrip.title}</h4>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 space-y-2.5">
                        <div className="flex items-center justify-between text-xs text-[#5A726D]">
                          <span className="flex items-center gap-1 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-[#00BFA5]" />
                            {activeTrip.startDate} → {activeTrip.endDate}
                          </span>
                          <span className="font-black text-[#00897B] bg-[#E0F7F6] px-2 py-0.5 rounded-full">Code: {activeTrip.invitationCode}</span>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-[#E2EBE8]">
                          <div className="flex items-center -space-x-2">
                            {activeTrip.members.map((m, idx) => (
                              <img
                                key={idx}
                                src={m.avatar}
                                alt={m.name}
                                title={m.name}
                                className="w-7 h-7 rounded-full border-2 border-white object-cover"
                              />
                            ))}
                          </div>

                          <div className="flex gap-1.5">
                            <button
                              onClick={() => setCurrentScreen('group_workspace')}
                              className="px-3 py-1 rounded-full bg-[#F2EFE9] text-[#1A3A34] text-[11px] font-bold border border-white hover:bg-white transition-all cursor-pointer"
                            >
                              Workspace
                            </button>
                            <button
                              onClick={() => setCurrentScreen('main_itinerary')}
                              className="px-3 py-1 rounded-full bg-gradient-to-r from-[#00C6FF] to-[#00BFA5] text-white text-[11px] font-bold shadow-xs hover:opacity-90 transition-all cursor-pointer"
                            >
                              Itinerary →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-heading text-xs font-black text-[#1A3A34] uppercase tracking-wide">
                          Explore Real Places
                        </h4>
                        <button
                          onClick={() => setCurrentScreen('explore_search')}
                          className="text-[11px] font-bold text-[#00897B] hover:text-[#00BFA5]"
                        >
                          View All ({placesList.length}) →
                        </button>
                      </div>

                      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                        {placesList.slice(0, 3).map((pl) => (
                          <div
                            key={pl.id}
                            onClick={() => {
                              setSelectedPlaceDetail(pl);
                              setCurrentScreen('place_details');
                            }}
                            className="w-44 shrink-0 bg-white rounded-2xl overflow-hidden border border-[#E2EBE8] shadow-2xs cursor-pointer hover:shadow-md transition-all"
                          >
                            <SageImage src={pl.image} alt={pl.name} className="h-24 w-full object-cover" />
                            <div className="p-3">
                              <span className="text-[9px] font-black text-[#00897B] uppercase">{pl.category}</span>
                              <h5 className="font-heading text-xs font-black truncate text-[#1A3A34]">{pl.name}</h5>
                              <p className="text-[10px] text-[#5A726D] flex items-center gap-0.5 mt-0.5">
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                <span>{pl.rating}</span> • <span>{pl.cost}</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* EXPLORE AND SEARCH PLACES */}
                {currentScreen === 'explore_search' && (
                  <div className="flex-1 p-4 space-y-3 bg-[#F7F9FB] overflow-y-auto pb-8">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentScreen('home')}
                        className="w-8 h-8 rounded-full bg-white border border-[#E2EBE8] flex items-center justify-center text-[#1A3A34] hover:bg-[#E0F7F6]"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <h3 className="font-heading text-xs font-black text-[#1A3A34]">Explore & Search</h3>
                      <div className="w-8" />
                    </div>

                    <div className="relative">
                      <Search className="w-4 h-4 text-[#059669] absolute left-3 top-3" />
                      <input
                        type="text"
                        value={exploreSearchQuery}
                        onChange={(e) => setExploreSearchQuery(e.target.value)}
                        placeholder="Search cities, waterfalls, coffee estates..."
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs font-medium bg-white"
                      />
                    </div>

                    <div className="p-2.5 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs">
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#1E2922] mb-1.5">
                        <span className="flex items-center gap-1">
                          <Sliders className="w-3.5 h-3.5 text-[#059669]" />
                          Sorting Mode:
                        </span>
                        <span className="text-emerald-700 font-black">
                          {exploreSortMode === 'selection' && '★ My Selection Order'}
                          {exploreSortMode === 'rating' && 'Highest Rated'}
                          {exploreSortMode === 'budget' && 'Budget'}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-1 text-[10px] font-bold">
                        <button
                          onClick={() => setExploreSortMode('selection')}
                          className={`py-1 rounded-lg border transition-all ${
                            exploreSortMode === 'selection'
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-[#F8FAFC] text-[#475569] border-[#CBD5E1]'
                          }`}
                        >
                          Selection Order
                        </button>
                        <button
                          onClick={() => setExploreSortMode('rating')}
                          className={`py-1 rounded-lg border transition-all ${
                            exploreSortMode === 'rating'
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-[#F8FAFC] text-[#475569] border-[#CBD5E1]'
                          }`}
                        >
                          Top Rated
                        </button>
                        <button
                          onClick={() => setExploreSortMode('budget')}
                          className={`py-1 rounded-lg border transition-all ${
                            exploreSortMode === 'budget'
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-[#F8FAFC] text-[#475569] border-[#CBD5E1]'
                          }`}
                        >
                          By Budget
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs px-1">
                      <span className="text-[#64748B]">
                        Selected: <strong className="text-emerald-700">{selectedPlaceIds.length} places</strong>
                      </span>
                      <button
                        onClick={() => setCurrentScreen('dream_preferences')}
                        className="text-emerald-700 font-bold hover:underline"
                      >
                        Sync with Preferences →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {getSortedPlaces().map((pl) => {
                        const isSelected = selectedPlaceIds.includes(pl.id);
                        return (
                          <div
                            key={pl.id}
                            className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all ${
                              isSelected ? 'border-2 border-emerald-500' : 'border-[#E2E8F0]'
                            }`}
                          >
                            <div className="relative h-28 w-full overflow-hidden">
                              <img src={pl.image} alt={pl.name} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2.5 text-white justify-between">
                                <div>
                                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-700">
                                    {pl.category}
                                  </span>
                                  <h4 className="font-heading text-xs font-black mt-0.5">{pl.name}</h4>
                                </div>
                                <span className="text-[10px] bg-black/60 px-2 py-0.5 rounded-md font-bold text-amber-300">
                                  ★ {pl.rating}
                                </span>
                              </div>
                            </div>

                            <div className="p-3 flex items-center justify-between">
                              <div className="min-w-0 pr-2">
                                <p className="text-[11px] text-[#64748B] line-clamp-1">{pl.description}</p>
                                <span className="text-[10px] text-emerald-800 font-bold">{pl.distance}</span>
                              </div>

                              <div className="flex gap-1.5 shrink-0">
                                <button
                                  onClick={() => {
                                    setSelectedPlaceDetail(pl);
                                    setCurrentScreen('place_details');
                                  }}
                                  className="px-2.5 py-1 rounded-xl bg-slate-100 text-[#1E2922] text-[11px] font-bold hover:bg-slate-200"
                                >
                                  Details
                                </button>
                                <button
                                  onClick={() => togglePlaceSelect(pl.id)}
                                  className={`px-3 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 ${
                                    isSelected
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  }`}
                                >
                                  {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                  <span>{isSelected ? 'Added' : 'Select'}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* CREATE A TRIP */}
                {currentScreen === 'create_trip' && (
                  <div className="flex-1 p-5 flex flex-col justify-between bg-gradient-to-b from-[#FAF9F5] to-[#F1F7F2]">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <button
                          onClick={() => setCurrentScreen('home')}
                          className="w-8 h-8 rounded-full bg-white border border-[#CBD5E1] flex items-center justify-center text-[#1E2922]"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <h3 className="font-heading text-xs font-black text-[#0F291E]">Create Trip</h3>
                        <div className="w-8" />
                      </div>

                      <h2 className="font-heading text-xl font-black text-[#0F291E]">Create a Trip Room</h2>
                      <p className="text-xs text-[#64748B] mb-4">
                        Set the basics now. Group members can submit their personal wish lists and constraints next.
                      </p>

                      <div className="space-y-3 bg-white p-4 rounded-3xl border border-[#CBD5E1] shadow-sm">
                        <div>
                          <label className="block text-xs font-bold text-[#1E2922] mb-1">Trip Name</label>
                          <input
                            type="text"
                            value={createTitle}
                            onChange={(e) => setCreateTitle(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs font-semibold bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#1E2922] mb-1">Starting City</label>
                          <input
                            type="text"
                            value={createCity}
                            onChange={(e) => setCreateCity(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs font-semibold bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-bold text-[#1E2922] mb-1">Start Date</label>
                            <input
                              type="date"
                              value={createStartDate}
                              onChange={(e) => setCreateStartDate(e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-xl border border-[#CBD5E1] text-xs font-semibold bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#1E2922] mb-1">End Date</label>
                            <input
                              type="date"
                              value={createEndDate}
                              onChange={(e) => setCreateEndDate(e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-xl border border-[#CBD5E1] text-xs font-semibold bg-white"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1]">
                          <span className="text-xs font-bold text-[#1E2922]">Group Size</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setCreateGroupSize(Math.max(2, createGroupSize - 1))}
                              className="w-7 h-7 rounded-lg bg-white border border-[#CBD5E1] font-bold"
                            >
                              -
                            </button>
                            <span className="text-xs font-black text-emerald-800">{createGroupSize}</span>
                            <button
                              onClick={() => setCreateGroupSize(createGroupSize + 1)}
                              className="w-7 h-7 rounded-lg bg-white border border-[#CBD5E1] font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#1E2922] mb-1">Estimated Budget / Person</label>
                          <input
                            type="text"
                            value={createBudget}
                            onChange={(e) => setCreateBudget(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] text-xs font-semibold bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => {
                          const code = 'NEXT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
                          setActiveTrip({
                            ...activeTrip,
                            title: createTitle,
                            invitationCode: code,
                            startingCity: createCity,
                            startDate: createStartDate,
                            endDate: createEndDate,
                            estimatedBudgetPerPerson: createBudget,
                            groupSize: createGroupSize,
                          });
                          showToast(`Trip room created! Code: ${code}`);
                          setCurrentScreen('group_workspace');
                        }}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#059669] via-[#10B981] to-[#047857] text-white text-xs font-black shadow-md transition-all active:scale-[0.98]"
                      >
                        Generate Trip Room & Invite Code →
                      </button>
                    </div>
                  </div>
                )}

                {/* JOIN A TRIP */}
                {currentScreen === 'join_trip' && (
                  <div className="flex-1 p-5 flex flex-col justify-between bg-gradient-to-b from-[#FAF9F5] to-[#F1F7F2]">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <button
                          onClick={() => setCurrentScreen('home')}
                          className="w-8 h-8 rounded-full bg-white border border-[#CBD5E1] flex items-center justify-center text-[#1E2922]"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <h3 className="font-heading text-xs font-black text-[#0F291E]">Join Trip</h3>
                        <div className="w-8" />
                      </div>

                      <h2 className="font-heading text-xl font-black text-[#0F291E]">Join a Travel Circle</h2>
                      <p className="text-xs text-[#64748B] mb-4">
                        Enter the 6-character code your trip host sent you via WhatsApp or link.
                      </p>

                      <div className="bg-white p-4 rounded-3xl border border-[#CBD5E1] shadow-sm space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-[#1E2922] mb-1">Invitation Code</label>
                          <input
                            type="text"
                            value={joinCodeInput}
                            onChange={(e) => {
                              setJoinCodeInput(e.target.value.toUpperCase());
                              setJoinStatus('idle');
                            }}
                            placeholder="NEXT-8W3K7P"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs font-mono font-black tracking-widest uppercase bg-white text-emerald-900"
                          />
                        </div>

                        <button
                          onClick={() => {
                            setJoinStatus('verifying');
                            setTimeout(() => {
                              setJoinStatus('found');
                            }, 600);
                          }}
                          className="w-full py-2.5 rounded-xl bg-[#059669] text-white text-xs font-black hover:bg-[#047857]"
                        >
                          {joinStatus === 'verifying' ? 'Verifying Room...' : 'Verify Code'}
                        </button>

                        {joinStatus === 'found' && (
                          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 space-y-2">
                            <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded-full">
                              Trip Found
                            </span>
                            <h4 className="font-heading text-xs font-black text-[#0F291E]">{activeTrip.title}</h4>
                            <p className="text-[11px] text-[#475569]">
                              📅 {activeTrip.startDate} → {activeTrip.endDate} • Host: <strong>{activeTrip.creator}</strong>
                            </p>
                            <p className="text-[10px] text-[#64748B]">
                              Current Members: {activeTrip.members.map((m) => m.name).join(', ')}
                            </p>

                            <div className="pt-2 flex gap-2">
                              <button
                                onClick={() => {
                                  setJoinStatus('approved');
                                  showToast('Joined trip room successfully!');
                                  setCurrentScreen('dream_preferences');
                                }}
                                className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#00C6FF] via-[#00E5FF] to-[#00BFA5] hover:opacity-95 text-white text-xs font-black shadow-sm shadow-cyan-500/20 transition-all cursor-pointer"
                              >
                                Confirm & Join Now
                              </button>
                              <button
                                onClick={() => {
                                  setJoinStatus('waiting');
                                  showToast('Approval request sent to host!');
                                }}
                                className="px-4 py-2.5 rounded-full border border-[#E2EBE8] bg-white text-xs font-bold text-[#5A726D] hover:bg-[#F2EFE9] transition-all cursor-pointer"
                              >
                                Request Access
                              </button>
                            </div>
                          </div>
                        )}

                        {joinStatus === 'waiting' && (
                          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-800 text-xs flex items-center gap-2">
                            <Clock className="w-4 h-4 shrink-0 text-amber-600" />
                            <span>Waiting for Host Approval... You will receive a notification once verified.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* MY DREAM TRIP / PREFERENCES - Welcome Screen Branding */}
                {currentScreen === 'dream_preferences' && (
                  <div className="flex-1 p-4 space-y-4 bg-[#F7F9FB] overflow-y-auto pb-8">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentScreen('group_workspace')}
                        className="w-8 h-8 rounded-full bg-white border border-white flex items-center justify-center text-[#1A3A34] hover:bg-[#F2EFE9] shadow-xs cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <h3 className="font-heading text-xs font-black text-[#1A3A34]">Individual Preferences</h3>
                      <div className="w-8" />
                    </div>

                    <div className="bg-gradient-to-r from-[#00C6FF] via-[#00E5FF] to-[#00BFA5] p-4 rounded-3xl text-white shadow-md">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                          Zero Peer Pressure
                        </span>
                      </div>
                      <h3 className="font-heading text-base font-black">My Personal Dream Trip</h3>
                      <p className="text-xs text-white/90 mt-0.5">
                        Add your wishes freely. You can save and edit them anytime before the final plan locks.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-3xl border border-white shadow-sm space-y-3.5">
                      <div>
                        <label className="block text-xs font-bold text-[#1A3A34] mb-1">
                          Dream Destinations & Must-Visit Spots
                        </label>
                        <textarea
                          rows={2}
                          defaultValue="Onake Abbi Waterfall hike, Chikmagalur coffee plantation stay, Kundadri peak clouds sunset"
                          className="w-full p-2.5 rounded-2xl border border-[#E2EBE8] text-xs font-medium bg-white focus:outline-none focus:border-[#00BFA5]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1A3A34] mb-1">Preferred Experiences</label>
                        <div className="flex flex-wrap gap-1.5">
                          {['Trekking & Trails', 'Coffee Roasting', 'Photography', 'Heritage & Temples', 'Foodie Crawl', 'Campfire'].map(
                            (act, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 rounded-full bg-[#E0F7F6] text-[#00897B] border border-[#00BFA5]/30 text-xs font-bold flex items-center gap-1 shadow-2xs"
                              >
                                <Check className="w-3 h-3 text-[#00BFA5]" />
                                {act}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-bold text-[#1A3A34] mb-1">Budget Flexibility</label>
                          <input
                            type="text"
                            defaultValue="₹6,000 – ₹12,000"
                            className="w-full px-3 py-2 rounded-2xl border border-[#E2EBE8] text-xs bg-white focus:outline-none focus:border-[#00BFA5]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#1A3A34] mb-1">Pace Preference</label>
                          <select className="w-full px-2.5 py-2 rounded-2xl border border-[#E2EBE8] text-xs bg-white focus:outline-none focus:border-[#00BFA5]">
                            <option>Balanced (2-3 spots/day)</option>
                            <option>Relaxed (1-2 spots/day)</option>
                            <option>Packed & Active (4+ spots)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1A3A34] mb-1">
                          Food, Dietary & Accessibility Needs
                        </label>
                        <input
                          type="text"
                          defaultValue="Vegetarian friendly, authentic Malnad cuisine, ground floor room"
                          className="w-full px-3 py-2 rounded-2xl border border-[#E2EBE8] text-xs bg-white focus:outline-none focus:border-[#00BFA5]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1A3A34] mb-1">
                          Constraints / Places to Exclude
                        </label>
                        <input
                          type="text"
                          defaultValue="Avoid overcrowded commercial tourist malls; prefer nature trails"
                          className="w-full px-3 py-2 rounded-2xl border border-[#E2EBE8] text-xs bg-white focus:outline-none focus:border-[#00BFA5]"
                        />
                      </div>

                      <button
                        onClick={() => {
                          showToast('Preferences saved! Group workspace synchronized.');
                          setCurrentScreen('group_workspace');
                        }}
                        className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#00C6FF] via-[#00E5FF] to-[#00BFA5] text-white text-xs font-extrabold shadow-md shadow-[#00C6FF]/30 hover:opacity-95 transition-all cursor-pointer"
                      >
                        Save Preferences & Sync to Circle →
                      </button>
                    </div>
                  </div>
                )}

                {/* GROUP TRIP WORKSPACE - Welcome Screen Theme */}
                {currentScreen === 'group_workspace' && (
                  <div className="flex-1 p-4 space-y-4 bg-[#F7F9FB] overflow-y-auto pb-8">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentScreen('home')}
                        className="w-8 h-8 rounded-full bg-white border border-white flex items-center justify-center text-[#1A3A34] hover:bg-[#F2EFE9] shadow-xs cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <h3 className="font-heading text-xs font-black text-[#1A3A34]">Group Circle Room</h3>
                      <div className="w-8" />
                    </div>

                    <div className="bg-white p-4 rounded-3xl border border-white shadow-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase text-[#00897B] bg-[#E0F7F6] px-2.5 py-0.5 rounded-full">
                          Shared Workspace
                        </span>
                        <span className="text-xs font-mono font-black text-[#00BFA5] bg-[#F2EFE9] px-2 py-0.5 rounded-md">{activeTrip.invitationCode}</span>
                      </div>
                      <h3 className="font-heading text-base font-black text-[#1A3A34]">{activeTrip.title}</h3>
                      <p className="text-xs text-[#5A726D] mt-0.5">
                        Shared Dates: {activeTrip.startDate} → {activeTrip.endDate} • Budget: {activeTrip.estimatedBudgetPerPerson}/person
                      </p>

                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => {
                            const text = `Join our trip "${activeTrip.title}" on NexTripia AI!\nCode: ${activeTrip.invitationCode}`;
                            try {
                              window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                            } catch {
                              navigator.clipboard.writeText(text);
                            }
                            showToast('Opening WhatsApp with trip code!');
                          }}
                          className="flex-1 py-2 px-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Invite via WhatsApp</span>
                        </button>
                        <button
                          onClick={() => setCurrentScreen('dream_preferences')}
                          className="px-3.5 py-2 rounded-full bg-[#E0F7F6] text-[#00897B] border border-[#00BFA5]/30 text-xs font-bold hover:bg-white transition-all cursor-pointer"
                        >
                          Edit My Wishlist
                        </button>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-3xl border border-white shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading text-xs font-black text-[#1A3A34] uppercase tracking-wide">
                          Travel Circle Members ({activeTrip.members.length})
                        </h4>
                        <span className="text-[10px] text-[#00897B] font-bold">3 of 4 Ready</span>
                      </div>

                      <div className="space-y-2">
                        {activeTrip.members.map((m) => (
                          <div key={m.id} className="p-2.5 rounded-2xl bg-[#F7F9FB] border border-[#E2EBE8] flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                              <div>
                                <span className="font-heading text-xs font-bold block text-[#1A3A34]">{m.name}</span>
                                <span className="text-[10px] text-[#5A726D]">Top Wish: {m.topPick}</span>
                              </div>
                            </div>
                            <span
                              className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                                m.status === 'Submitted'
                                  ? 'bg-[#E0F7F6] text-[#00897B]'
                                  : 'bg-[#FFA726]/15 text-[#FFA726] animate-pulse'
                              }`}
                            >
                              {m.status}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="p-2.5 rounded-2xl bg-[#FFA726]/10 border border-[#FFA726]/30 text-[#1A3A34] text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-[#FFA726] shrink-0" />
                        <span>Dev Kapoor has not submitted preferences yet. Remind to avoid plan delays!</span>
                      </div>

                      <div className="pt-2 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setCurrentScreen('group_voting')}
                          className="py-2.5 rounded-full border border-[#00BFA5] bg-[#E0F7F6] text-[#00897B] text-xs font-black hover:bg-white transition-all cursor-pointer"
                        >
                          Group Voting →
                        </button>
                        <button
                          onClick={() => setCurrentScreen('ai_planning')}
                          className="py-2.5 rounded-full bg-gradient-to-r from-[#00C6FF] via-[#00E5FF] to-[#00BFA5] text-white text-xs font-black shadow-md shadow-[#00C6FF]/30 hover:opacity-95 transition-all cursor-pointer"
                        >
                          Run AI Planner →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* GROUP VOTING AND AGREEMENT */}
                {currentScreen === 'group_voting' && (
                  <div className="flex-1 p-4 space-y-4 bg-[#F7F9FB] overflow-y-auto pb-8">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentScreen('group_workspace')}
                        className="w-8 h-8 rounded-full bg-white border border-white flex items-center justify-center text-[#1A3A34] hover:bg-[#F2EFE9] shadow-xs cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <h3 className="font-heading text-xs font-black text-[#1A3A34]">Voting & Consensus</h3>
                      <div className="w-8" />
                    </div>

                    <div className="bg-white p-4 rounded-3xl border border-white shadow-sm">
                      <h3 className="font-heading text-sm font-black text-[#1A3A34]">Vote on Candidate Stops</h3>
                      <p className="text-xs text-[#5A726D]">
                        Gemini ensures no member's voice is drowned out. Like, reject, or request changes with your reasons.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {votingItems.map((item, idx) => (
                        <div key={item.id} className="bg-white p-3.5 rounded-3xl border border-white shadow-2xs space-y-2.5">
                          <div className="flex items-start justify-between">
                            <h4 className="font-heading text-xs font-black text-[#1A3A34] max-w-[240px]">
                              {item.name}
                            </h4>
                            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#E0F7F6] text-[#00897B]">
                              {item.agreementPercent}% Agreement
                            </span>
                          </div>

                          <div className="flex gap-1.5">
                            <button
                              onClick={() => {
                                const updated = [...votingItems];
                                updated[idx].userVote = 'yes';
                                setVotingItems(updated);
                                showToast('Voted Agree!');
                              }}
                              className={`flex-1 py-1.5 rounded-full text-xs font-extrabold flex items-center justify-center gap-1 border transition-all cursor-pointer ${
                                item.userVote === 'yes'
                                  ? 'bg-[#00BFA5] text-white border-[#00BFA5] shadow-xs'
                                  : 'bg-[#E0F7F6] text-[#00897B] border-[#00BFA5]/30'
                              }`}
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span>Agree</span>
                            </button>

                            <button
                              onClick={() => {
                                const updated = [...votingItems];
                                updated[idx].userVote = 'change';
                                setVotingItems(updated);
                                showToast('Change requested');
                              }}
                              className={`flex-1 py-1.5 rounded-full text-xs font-extrabold flex items-center justify-center gap-1 border transition-all cursor-pointer ${
                                item.userVote === 'change'
                                  ? 'bg-[#FFA726] text-white border-[#FFA726] shadow-xs'
                                  : 'bg-[#FFF8E1] text-[#E65100] border-[#FFA726]/40'
                              }`}
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Change</span>
                            </button>

                            <button
                              onClick={() => {
                                const updated = [...votingItems];
                                updated[idx].userVote = 'no';
                                setVotingItems(updated);
                                showToast('Voted Disagree');
                              }}
                              className={`flex-1 py-1.5 rounded-full text-xs font-extrabold flex items-center justify-center gap-1 border transition-all cursor-pointer ${
                                item.userVote === 'no'
                                  ? 'bg-[#FF5722] text-white border-[#FF5722] shadow-xs'
                                  : 'bg-rose-50 text-rose-800 border-rose-200'
                              }`}
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </div>

                          {item.hasConcerns && (
                            <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                              <span className="font-bold block text-[11px]">Member Note:</span>
                              <span>{item.concernText}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="bg-white p-3.5 rounded-3xl border border-white shadow-sm text-center">
                      <span className="text-xs font-bold text-[#1A3A34] block mb-1">
                        Consensus Tracker: All 4 Members Approved?
                      </span>
                      <div className="flex justify-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#E0F7F6] text-[#00897B] text-[10px] font-bold">
                          ✓ Aria Approved
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#E0F7F6] text-[#00897B] text-[10px] font-bold">
                          ✓ Rohan Approved
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#E0F7F6] text-[#00897B] text-[10px] font-bold">
                          ✓ Sneha Approved
                        </span>
                      </div>
                      <button
                        onClick={() => setCurrentScreen('ai_planning')}
                        className="w-full py-3 rounded-full bg-gradient-to-r from-[#00C6FF] via-[#00E5FF] to-[#00BFA5] text-white text-xs font-black shadow-md shadow-[#00C6FF]/30 hover:opacity-95 transition-all cursor-pointer"
                      >
                        Proceed to AI Trip Planning →
                      </button>
                    </div>
                  </div>
                )}

                {/* AI TRIP PLANNING */}
                {currentScreen === 'ai_planning' && (
                  <div className="flex-1 p-4 space-y-4 bg-[#F7F9FB] overflow-y-auto pb-8">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentScreen('group_voting')}
                        className="w-8 h-8 rounded-full bg-white border border-white flex items-center justify-center text-[#1A3A34] hover:bg-[#F2EFE9] shadow-xs cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <h3 className="font-heading text-xs font-black text-[#1A3A34]">AI Fairness Engine</h3>
                      <div className="w-8" />
                    </div>

                    <div className="bg-gradient-to-r from-[#00897B] via-[#00BFA5] to-[#00C6FF] p-4 rounded-3xl text-white shadow-md">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                        Gemini 3.8 Flash Optimizer
                      </span>
                      <h3 className="font-heading text-base font-black mt-1">
                        Synthesizing Group Harmony
                      </h3>
                      <p className="text-xs text-white/90 mt-0.5">
                        Resolving differences between hikers, coffee enthusiasts, and relaxation seekers.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-3xl border border-white shadow-sm space-y-3">
                      <h4 className="font-heading text-xs font-black text-[#1A3A34] uppercase tracking-wide">
                        Why Destinations Were Selected:
                      </h4>

                      <div className="space-y-2 text-xs text-[#475569]">
                        <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                          <strong className="text-emerald-900">Onake Abbi Waterfall:</strong> Included for Aria & Sneha's nature hike wishlist. Scheduled for Day 1 morning to beat afternoon humidity.
                        </div>
                        <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200">
                          <strong className="text-amber-900">Mullayanagiri Dawn Ridge:</strong> Satisfies Rohan's high-altitude summit request while keeping hike under 2 hours so group pace remains balanced.
                        </div>
                        <div className="p-2.5 rounded-2xl bg-teal-50 border border-teal-200">
                          <strong className="text-teal-900">Heritage Arabica Plantation Stay:</strong> Solves accommodation budget ($65/night) while providing artisanal coffee tastings for all 4 travellers.
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E2E8F0]">
                        <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-center">
                          <span className="text-[10px] text-[#64748B] block">Total Drive Time</span>
                          <span className="font-heading text-sm font-black text-emerald-800">4.5 hrs across 3 days</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-center">
                          <span className="text-[10px] text-[#64748B] block">Estimated Cost / Person</span>
                          <span className="font-heading text-sm font-black text-emerald-800">$510 (Within target)</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => setCurrentScreen('dream_preferences')}
                          className="flex-1 py-2.5 rounded-full border border-[#E2EBE8] bg-[#F2EFE9] text-xs font-bold text-[#5A726D] hover:bg-white transition-all cursor-pointer"
                        >
                          Edit Inputs
                        </button>
                        <button
                          onClick={() => {
                            showToast('Itinerary generated with 98% harmony score!');
                            setCurrentScreen('main_itinerary');
                          }}
                          className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#00C6FF] to-[#00BFA5] text-white text-xs font-black shadow-md shadow-[#00C6FF]/30 hover:opacity-90 transition-all cursor-pointer"
                        >
                          View Master Itinerary →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* MAIN ITINERARY - Welcome Screen Floating Journey Thumbnails & Timeline */}
                {currentScreen === 'main_itinerary' && (
                  <div className="flex-1 p-4 space-y-4 bg-[#F7F9FB] overflow-y-auto pb-8">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentScreen('home')}
                        className="w-8 h-8 rounded-full bg-white border border-white flex items-center justify-center text-[#1A3A34] hover:bg-[#F2EFE9] shadow-xs cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <h3 className="font-heading text-xs font-black text-[#1A3A34]">Master Itinerary</h3>
                      <div className="w-8" />
                    </div>

                    {/* Schedule Header & Day Selectors */}
                    <div className="bg-white p-4 rounded-3xl border border-white shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-heading text-xs font-black text-[#1A3A34] uppercase tracking-wide">
                            Dynamic Group Schedule
                          </h3>
                          <p className="text-[11px] text-[#5A726D]">Western Ghats Rainforest Expedition</p>
                        </div>
                        <span className="text-[11px] font-extrabold text-[#00897B] bg-[#E0F7F6] px-2.5 py-1 rounded-full">Cost: ~₹2,800 Today</span>
                      </div>

                      {/* Day Pill Buttons */}
                      <div className="grid grid-cols-3 gap-2 text-xs font-bold p-1 bg-[#F2EFE9] rounded-full border border-white">
                        <button className="py-2 rounded-full bg-gradient-to-r from-[#00C6FF] via-[#00E5FF] to-[#00BFA5] text-white font-extrabold shadow-md shadow-[#00C6FF]/30 cursor-pointer">
                          Day 1 • Agumbe
                        </button>
                        <button
                          onClick={() => showToast('Day 2 loaded!')}
                          className="py-2 rounded-full text-[#5A726D] hover:text-[#1A3A34] font-bold cursor-pointer"
                        >
                          Day 2 • Peaks
                        </button>
                        <button
                          onClick={() => showToast('Day 3 loaded!')}
                          className="py-2 rounded-full text-[#5A726D] hover:text-[#1A3A34] font-bold cursor-pointer"
                        >
                          Day 3 • Estate
                        </button>
                      </div>
                    </div>

                    {/* Floating Journey Stops (mirroring Welcome Screen Waypoint Cards) */}
                    <div className="space-y-3">
                      {/* Stop 1 */}
                      <div className="bg-white p-3.5 rounded-3xl border border-white shadow-sm flex gap-3.5 hover:shadow-md transition-all">
                        <SageImage
                          src="https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=200&q=80"
                          alt="Morning Trek"
                          className="w-20 h-20 rounded-2xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-[#00897B]">08:30 AM • Rainforest Trek</span>
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#00BFA5] text-white font-extrabold shadow-xs">
                              Explore
                            </span>
                          </div>
                          <h4 className="font-heading text-xs font-black truncate text-[#1A3A34]">Onake Abbi Waterfall Trail</h4>
                          <p className="text-[10px] text-[#5A726D] mt-0.5">32 min drive • 18 km from cottage</p>
                          <div className="mt-1.5 flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedPlaceDetail(initialPlaces[0]);
                                setCurrentScreen('place_details');
                              }}
                              className="text-[10px] font-bold text-[#00897B] hover:underline cursor-pointer"
                            >
                              Place Details →
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Stop 2 */}
                      <div className="bg-white p-3.5 rounded-3xl border border-white shadow-sm flex gap-3.5 hover:shadow-md transition-all">
                        <SageImage
                          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80"
                          alt="Lunch Suggestion"
                          className="w-20 h-20 rounded-2xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-[#FFA726]">01:00 PM • Lunch Suggestion</span>
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#00BFA5] text-white font-extrabold shadow-xs">
                              Plan Together
                            </span>
                          </div>
                          <h4 className="font-heading text-xs font-black truncate text-[#1A3A34]">Malnad Claypot Spice Kitchen</h4>
                          <p className="text-[10px] text-[#5A726D] mt-0.5">Authentic jackfruit biryani & fresh akki rotti</p>
                          <span className="text-[10px] text-[#00897B] font-bold">Veg & Gluten-free friendly</span>
                        </div>
                      </div>

                      {/* Stop 3 */}
                      <div className="bg-white p-3.5 rounded-3xl border border-white shadow-sm flex gap-3.5 hover:shadow-md transition-all">
                        <SageImage
                          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=200&q=80"
                          alt="Sunset Point"
                          className="w-20 h-20 rounded-2xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-[#FF5722]">05:15 PM • Golden Hour Sunset</span>
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#FFA726] text-white font-extrabold shadow-xs">
                              Travel
                            </span>
                          </div>
                          <h4 className="font-heading text-xs font-black truncate text-[#1A3A34]">Kundadri Cloud Monolith</h4>
                          <p className="text-[10px] text-[#5A726D] mt-0.5">25 min drive from lunch spot</p>
                          <button
                            onClick={() => {
                              setSelectedPlaceDetail(initialPlaces[1]);
                              setCurrentScreen('place_details');
                            }}
                            className="text-[10px] font-bold text-[#00897B] hover:underline cursor-pointer mt-1"
                          >
                            Place Details →
                          </button>
                        </div>
                      </div>

                      {/* Stay Card (Matching "Stay" waypoint badge) */}
                      <div className="p-4 rounded-3xl bg-[#E0F7F6] border border-white shadow-xs flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#00C6FF] text-white font-extrabold shadow-xs">
                              Stay
                            </span>
                            <span className="text-[10px] font-black text-[#00897B] uppercase">Tonight's Villa:</span>
                          </div>
                          <h5 className="font-heading text-xs font-black text-[#1A3A34]">Misty Cloud Plantation Homestay</h5>
                          <span className="text-[10px] text-[#5A726D]">₹3,200/night • 4.2 km from sunset peak</span>
                        </div>
                        <button
                          onClick={() => setCurrentScreen('stays')}
                          className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#00C6FF] to-[#00BFA5] text-white text-[11px] font-extrabold shadow-sm shrink-0 cursor-pointer hover:opacity-90 transition-all"
                        >
                          View Stays
                        </button>
                      </div>
                    </div>

                    {/* Bottom Action Buttons (Pill Shapes) */}
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <button
                        onClick={() => setCurrentScreen('live_map')}
                        className="py-2.5 rounded-full border border-[#00BFA5] bg-white text-xs font-bold text-[#00897B] hover:bg-[#E0F7F6] cursor-pointer shadow-2xs"
                      >
                        Map Preview
                      </button>
                      <button
                        onClick={() => showToast('AI recalculating Day 1 schedule with fresh options...')}
                        className="py-2.5 rounded-full border border-[#E2EBE8] bg-[#F2EFE9] text-xs font-bold text-[#5A726D] hover:bg-white cursor-pointer"
                      >
                        Regenerate
                      </button>
                      <button
                        onClick={() => {
                          showToast('Plan approved by host!');
                          setCurrentScreen('trip_progress');
                        }}
                        className="py-2.5 rounded-full bg-gradient-to-r from-[#00C6FF] to-[#00BFA5] text-white text-xs font-black shadow-md shadow-[#00C6FF]/30 hover:opacity-90 cursor-pointer"
                      >
                        Approve Plan
                      </button>
                    </div>
                  </div>
                )}

                {/* STAYS AND ACCOMMODATION */}
                {currentScreen === 'stays' && (
                  <div className="flex-1 p-4 space-y-3 bg-gradient-to-b from-[#FAF9F5] to-[#F1F7F2]">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentScreen('main_itinerary')}
                        className="w-8 h-8 rounded-full bg-white border border-[#CBD5E1] flex items-center justify-center text-[#1E2922]"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <h3 className="font-heading text-xs font-black text-[#0F291E]">Stays & Lodging</h3>
                      <div className="w-8" />
                    </div>

                    <div>
                      <h3 className="font-heading text-sm font-black text-[#0F291E]">Verified Stays Near Route</h3>
                      <p className="text-xs text-[#64748B]">Real properties with direct partner booking redirects.</p>
                    </div>

                    <div className="space-y-3">
                      {sampleStays.map((stay) => (
                        <div key={stay.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#CBD5E1]">
                          <img src={stay.image} alt={stay.name} className="h-32 w-full object-cover" />
                          <div className="p-3.5 space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <span className="text-[10px] font-black uppercase text-emerald-700">{stay.type}</span>
                                <h4 className="font-heading text-xs font-black text-[#1E2922]">{stay.name}</h4>
                              </div>
                              <span className="text-xs font-black text-emerald-800">{stay.pricePerNight}</span>
                            </div>

                            <p className="text-[11px] text-[#64748B] flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#059669]" />
                              <span>{stay.distanceToAttraction}</span>
                            </p>

                            <div className="flex flex-wrap gap-1">
                              {stay.amenities.map((am, i) => (
                                <span key={i} className="px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[10px] font-bold text-[#475569]">
                                  {am}
                                </span>
                              ))}
                            </div>

                            <button
                              onClick={() => {
                                showToast('Redirecting to partner booking platform...');
                                try {
                                  window.open(stay.externalLink, '_blank');
                                } catch {}
                              }}
                              className="w-full py-2.5 rounded-xl bg-[#059669] text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#047857]"
                            >
                              <span>View / Book on Partner</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PLACE DETAILS */}
                {currentScreen === 'place_details' && (
                  <div className="flex-1 p-4 space-y-3 bg-gradient-to-b from-[#FAF9F5] to-[#F1F7F2]">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentScreen('explore_search')}
                        className="w-8 h-8 rounded-full bg-white border border-[#CBD5E1] flex items-center justify-center text-[#1E2922]"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <h3 className="font-heading text-xs font-black text-[#0F291E]">Place Details</h3>
                      <div className="w-8" />
                    </div>

                    <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#CBD5E1]">
                      <div className="relative h-44 w-full">
                        <img
                          src={selectedPlaceDetail.image}
                          alt={selectedPlaceDetail.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3 text-white justify-between">
                          <div>
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-700">
                              {selectedPlaceDetail.category}
                            </span>
                            <h3 className="font-heading text-sm font-black mt-0.5">{selectedPlaceDetail.name}</h3>
                          </div>
                          <span className="text-xs bg-black/60 px-2 py-0.5 rounded-md font-bold text-amber-300">
                            ★ {selectedPlaceDetail.rating} ({selectedPlaceDetail.reviews})
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <p className="text-xs text-[#475569] leading-relaxed">{selectedPlaceDetail.description}</p>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1]">
                            <span className="text-[10px] text-[#64748B] block font-bold">Hours</span>
                            <span className="font-bold text-[#1E2922]">{selectedPlaceDetail.openingHours}</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1]">
                            <span className="text-[10px] text-[#64748B] block font-bold">Entry Fee</span>
                            <span className="font-bold text-emerald-800">{selectedPlaceDetail.entryFee}</span>
                          </div>
                        </div>

                        <div className="h-24 rounded-2xl bg-emerald-100/60 border border-emerald-300 flex items-center justify-center text-xs text-emerald-900 font-bold gap-2">
                          <MapPin className="w-4 h-4 text-[#059669]" />
                          <span>Coordinates: 13.5186° N, 75.0934° E (Agumbe)</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            onClick={() => {
                              showToast(`Added ${selectedPlaceDetail.name} to Day 1 Itinerary!`);
                              setCurrentScreen('main_itinerary');
                            }}
                            className="py-2.5 rounded-xl bg-[#059669] text-white text-xs font-black shadow-xs"
                          >
                            Add to Itinerary
                          </button>
                          <button
                            onClick={() => {
                              showToast(`Replaced stop with ${selectedPlaceDetail.name}!`);
                              setCurrentScreen('main_itinerary');
                            }}
                            className="py-2.5 rounded-xl border border-emerald-400 bg-emerald-50 text-emerald-900 text-xs font-bold"
                          >
                            Replace Stop
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* LIVE TRIP MAP */}
                {currentScreen === 'live_map' && (
                  <div className="flex-1 p-4 space-y-3 bg-gradient-to-b from-[#FAF9F5] to-[#F1F7F2]">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentScreen('main_itinerary')}
                        className="w-8 h-8 rounded-full bg-white border border-[#CBD5E1] flex items-center justify-center text-[#1E2922]"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <h3 className="font-heading text-xs font-black text-[#0F291E]">Live Navigation Map</h3>
                      <div className="w-8" />
                    </div>

                    <div className="relative h-64 rounded-3xl overflow-hidden border-2 border-emerald-500 shadow-md bg-emerald-950">
                      <img
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                        alt="Map texture"
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#062014]/90 via-transparent to-[#062014]/50" />

                      <div className="absolute top-10 left-12 flex flex-col items-center">
                        <span className="w-7 h-7 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-white">
                          1
                        </span>
                        <span className="text-[9px] font-bold text-white bg-black/60 px-1 rounded-sm mt-0.5">Start</span>
                      </div>

                      <div className="absolute top-24 left-36 flex flex-col items-center">
                        <span className="w-7 h-7 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-white">
                          2
                        </span>
                        <span className="text-[9px] font-bold text-white bg-black/60 px-1 rounded-sm mt-0.5">Falls</span>
                      </div>

                      <div className="absolute bottom-16 right-16 flex flex-col items-center">
                        <span className="w-7 h-7 rounded-full bg-rose-500 text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-white">
                          3
                        </span>
                        <span className="text-[9px] font-bold text-white bg-black/60 px-1 rounded-sm mt-0.5">Sunset</span>
                      </div>

                      {liveLocationEnabled && (
                        <div className="absolute top-20 left-28 flex flex-col items-center animate-bounce">
                          <img
                            src={currentUser.avatar}
                            alt="Aria"
                            className="w-8 h-8 rounded-full border-2 border-emerald-400 shadow-xl"
                          />
                          <span className="text-[9px] font-bold text-emerald-300 bg-black/80 px-1 rounded-sm">You (Live)</span>
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-xl font-bold">
                          Total Route: 42 km • 1 hr 15 min
                        </span>
                        <button
                          onClick={() => showToast('Opening Turn-by-Turn GPS navigation...')}
                          className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-bold shadow-md"
                        >
                          Start Navigation
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs flex items-center justify-between">
                      <div>
                        <h4 className="font-heading text-xs font-black text-[#1E2922]">Share Live Location with Circle</h4>
                        <p className="text-[10px] text-[#64748B]">
                          Only shared with active trip members during travel hours.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={liveLocationEnabled}
                          onChange={(e) => {
                            setLiveLocationEnabled(e.target.checked);
                            showToast(e.target.checked ? 'Live location sharing enabled for group!' : 'Location sharing turned off');
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  </div>
                )}

                {/* TRIP PROGRESS */}
                {currentScreen === 'trip_progress' && (
                  <div className="flex-1 p-4 space-y-4 bg-gradient-to-b from-[#FAF9F5] to-[#F1F7F2]">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentScreen('main_itinerary')}
                        className="w-8 h-8 rounded-full bg-white border border-[#CBD5E1] flex items-center justify-center text-[#1E2922]"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <h3 className="font-heading text-xs font-black text-[#0F291E]">Trip Progress</h3>
                      <div className="w-8" />
                    </div>

                    <div className="bg-gradient-to-r from-[#065F46] to-[#10B981] p-4 rounded-3xl text-white shadow-md">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                        Next Up • 01:00 PM
                      </span>
                      <h3 className="font-heading text-base font-black mt-1">
                        Onake Abbi Waterfall Trek
                      </h3>
                      <p className="text-xs text-emerald-100 mt-0.5">
                        Duration: 3 hrs • 2.5 km misty rainforest trail
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-3xl border border-[#CBD5E1] shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading text-xs font-black text-[#1E2922] uppercase tracking-wide">
                          Day 1 Visited Checkpoints
                        </h4>
                        <span className="text-xs font-bold text-emerald-700">
                          {itineraryStops.filter((s) => s.visited).length} of {itineraryStops.length} Visited
                        </span>
                      </div>

                      <div className="space-y-2">
                        {itineraryStops.map((st, i) => (
                          <div
                            key={st.id}
                            className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                              st.visited
                                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                                : 'bg-[#F8FAFC] border-[#CBD5E1] text-[#1E2922]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <button
                                onClick={() => {
                                  const updated = [...itineraryStops];
                                  updated[i].visited = !updated[i].visited;
                                  setItineraryStops(updated);
                                  showToast(updated[i].visited ? 'Marked as visited! 🎉' : 'Unmarked stop');
                                }}
                                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                                  st.visited
                                    ? 'bg-emerald-600 text-white'
                                    : 'border-2 border-[#CBD5E1] bg-white'
                                }`}
                              >
                                {st.visited && <Check className="w-4 h-4" />}
                              </button>
                              <div>
                                <h5 className={`font-heading text-xs font-black ${st.visited ? 'line-through text-emerald-800' : ''}`}>
                                  {st.name}
                                </h5>
                                <span className="text-[10px] text-[#64748B]">{st.time} • {st.duration}</span>
                              </div>
                            </div>

                            <span className="text-[10px] font-bold text-emerald-700">
                              {st.visited ? 'Done' : 'Upcoming'}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#E2E8F0] space-y-2">
                        <span className="text-[11px] font-bold text-[#1E2922] block">Schedule Delays?</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              showToast('Recalculated itinerary: pushed Kundadri sunset by 30 mins!');
                            }}
                            className="flex-1 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold"
                          >
                            ⏱️ We are 30 min late
                          </button>
                          <button
                            onClick={() => {
                              showToast('Stop skipped; next stop prioritized.');
                            }}
                            className="flex-1 py-2 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-bold"
                          >
                            Skip Current Stop
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI TRAVEL ASSISTANT */}
                {currentScreen === 'ai_assistant' && (
                  <div className="flex-1 p-4 flex flex-col justify-between bg-gradient-to-b from-[#FAF9F5] to-[#F1F7F2]">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setCurrentScreen('home')}
                          className="w-8 h-8 rounded-full bg-white border border-[#CBD5E1] flex items-center justify-center text-[#1E2922]"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <h3 className="font-heading text-xs font-black text-[#0F291E]">AI Travel Copilot</h3>
                        <div className="w-8" />
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-heading text-xs font-black text-[#0F291E]">NexTripia Live Copilot</h3>
                          <p className="text-[10px] text-[#64748B]">Context: Western Ghats • Onake Abbi Stop</p>
                        </div>
                      </div>

                      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-bold">
                        <button
                          onClick={() => handleSendAssistant("It's raining. Suggest an indoor activity nearby.")}
                          className="px-2.5 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-50 shrink-0 shadow-2xs"
                        >
                          🌧️ It's raining
                        </button>
                        <button
                          onClick={() => handleSendAssistant('We are running one hour late. Adjust schedule.')}
                          className="px-2.5 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-50 shrink-0 shadow-2xs"
                        >
                          ⏱️ 1 hr late
                        </button>
                        <button
                          onClick={() => handleSendAssistant('Find a cheaper restaurant nearby for group.')}
                          className="px-2.5 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-50 shrink-0 shadow-2xs"
                        >
                          💰 Cheaper restaurant
                        </button>
                        <button
                          onClick={() => handleSendAssistant('Replace current stop with a scenic tea estate.')}
                          className="px-2.5 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-50 shrink-0 shadow-2xs"
                        >
                          🔄 Replace stop
                        </button>
                      </div>

                      <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                        {chatMessages.map((msg, i) => (
                          <div
                            key={i}
                            className={`p-3 rounded-2xl text-xs leading-relaxed ${
                              msg.sender === 'user'
                                ? 'bg-[#059669] text-white ml-8 shadow-xs'
                                : 'bg-white text-[#1E2922] mr-8 border border-[#CBD5E1] shadow-2xs'
                            }`}
                          >
                            <p>{msg.text}</p>
                            {msg.sender === 'assistant' && i > 0 && (
                              <button
                                onClick={() => {
                                  showToast('Recommendation applied to shared group itinerary!');
                                  setCurrentScreen('main_itinerary');
                                }}
                                className="mt-2 text-[10px] font-black px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1"
                              >
                                <span>Apply to Group Itinerary</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        ))}
                        {isAiAnswering && (
                          <div className="p-3 rounded-2xl bg-white text-xs text-[#64748B] flex items-center gap-2 border border-[#CBD5E1]">
                            <div className="w-3 h-3 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                            <span>Gemini analyzing nearby alternatives...</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSendAssistant();
                        }}
                        className="flex gap-2"
                      >
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder="Ask anything about your trip..."
                          className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs bg-white shadow-2xs"
                        />
                        <button
                          type="submit"
                          disabled={isAiAnswering}
                          className="w-10 h-10 rounded-xl bg-[#059669] text-white flex items-center justify-center hover:bg-[#047857] shadow-sm"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* NOTIFICATIONS */}
                {currentScreen === 'notifications' && (
                  <div className="flex-1 p-4 space-y-3 bg-gradient-to-b from-[#FAF9F5] to-[#F1F7F2]">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentScreen('home')}
                        className="w-8 h-8 rounded-full bg-white border border-[#CBD5E1] flex items-center justify-center text-[#1E2922]"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <h3 className="font-heading text-xs font-black text-[#0F291E]">Notifications</h3>
                      <button
                        onClick={() => {
                          setNotifications(notifications.map((n) => ({ ...n, unread: false })));
                          showToast('All notifications marked as read');
                        }}
                        className="text-xs font-bold text-emerald-700 hover:underline"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 rounded-2xl border transition-all ${
                            n.unread ? 'bg-white border-emerald-400 shadow-sm' : 'bg-[#F8FAFC] border-[#CBD5E1]'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <h4 className="font-heading text-xs font-black text-[#1E2922]">{n.title}</h4>
                            <span className="text-[10px] text-[#94A3B8]">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-[#475569] mt-0.5">{n.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PROFILE AND SETTINGS */}
                {currentScreen === 'profile_settings' && (
                  <div className="flex-1 p-4 space-y-4 bg-gradient-to-b from-[#FAF9F5] to-[#F1F7F2]">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentScreen('home')}
                        className="w-8 h-8 rounded-full bg-white border border-[#CBD5E1] flex items-center justify-center text-[#1E2922]"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <h3 className="font-heading text-xs font-black text-[#0F291E]">Profile & Settings</h3>
                      <div className="w-8" />
                    </div>

                    <div className="bg-white p-4 rounded-3xl border border-[#CBD5E1] shadow-sm flex items-center gap-3.5">
                      <img src={currentUser.avatar} alt="Profile" className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500 shadow-xs" />
                      <div>
                        <h3 className="font-heading text-sm font-black text-[#0F291E]">{currentUser.name}</h3>
                        <p className="text-xs text-[#64748B]">{currentUser.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Trip Organizer • Western Ghats
                        </span>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-[#CBD5E1] shadow-sm divide-y divide-[#E2E8F0] text-xs">
                      <div className="p-3.5 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-[#1E2922] block">Saved Travel Preferences</span>
                          <span className="text-[10px] text-[#64748B]">Default budget, dietary, and activity tags</span>
                        </div>
                        <button
                          onClick={() => setCurrentScreen('dream_preferences')}
                          className="text-xs font-bold text-emerald-700"
                        >
                          Edit →
                        </button>
                      </div>

                      <div className="p-3.5 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-[#1E2922] block">Location Privacy & Permissions</span>
                          <span className="text-[10px] text-[#64748B]">GPS only shared when live navigation is active</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Strict Privacy
                        </span>
                      </div>

                      <div className="p-3.5 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-[#1E2922] block">Push & WhatsApp Alerts</span>
                          <span className="text-[10px] text-[#64748B]">Notify on votes, schedule shifts, and weather</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Enabled
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <button
                        onClick={() => {
                          showToast('Help & FAQ documentation opened');
                        }}
                        className="w-full py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-bold text-[#475569] flex items-center justify-center gap-1.5"
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span>Help, FAQ & Contact Support</span>
                      </button>

                      <button
                        onClick={() => {
                          showToast('Signed out of NexTripia AI');
                          setCurrentScreen('login');
                        }}
                        className="w-full py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-black flex items-center justify-center gap-1.5"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out of Account</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ========================================================
                  MATERIAL 3 IN-APP BOTTOM NAVIGATION (For in-app exploration)
              ======================================================== */}
              {currentScreen !== 'first_page' && currentScreen !== 'second_page' && currentScreen !== 'login' && currentScreen !== 'video_tour' && (
                <div className="bg-white/95 backdrop-blur-md border-t border-[#E2EBE8] px-2 py-2 flex items-center justify-around z-20 shrink-0 shadow-lg">
                  <button
                    onClick={() => setCurrentScreen('home')}
                    className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-full transition-all cursor-pointer ${
                      currentScreen === 'home' ? 'text-[#00897B] font-black' : 'text-[#5A726D] hover:text-[#1A3A34]'
                    }`}
                  >
                    <div className={`p-1.5 rounded-full transition-all ${currentScreen === 'home' ? 'bg-[#00BFA5]/15 text-[#00897B] shadow-2xs' : ''}`}>
                      <Compass className="w-4 h-4" />
                    </div>
                    <span className="text-[9px]">Home</span>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('explore_search')}
                    className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-full transition-all cursor-pointer ${
                      currentScreen === 'explore_search' || currentScreen === 'place_details'
                        ? 'text-[#00897B] font-black'
                        : 'text-[#5A726D] hover:text-[#1A3A34]'
                    }`}
                  >
                    <div className={`p-1.5 rounded-full transition-all ${currentScreen === 'explore_search' ? 'bg-[#00BFA5]/15 text-[#00897B] shadow-2xs' : ''}`}>
                      <Search className="w-4 h-4" />
                    </div>
                    <span className="text-[9px]">Explore</span>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('group_workspace')}
                    className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-full transition-all cursor-pointer ${
                      currentScreen === 'group_workspace' ||
                      currentScreen === 'create_trip' ||
                      currentScreen === 'join_trip' ||
                      currentScreen === 'dream_preferences' ||
                      currentScreen === 'group_voting'
                        ? 'text-[#00897B] font-black'
                        : 'text-[#5A726D] hover:text-[#1A3A34]'
                    }`}
                  >
                    <div className={`p-1.5 rounded-full transition-all ${currentScreen === 'group_workspace' ? 'bg-[#00BFA5]/15 text-[#00897B] shadow-2xs' : ''}`}>
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-[9px]">Circle</span>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('main_itinerary')}
                    className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-full transition-all cursor-pointer ${
                      currentScreen === 'main_itinerary' ||
                      currentScreen === 'ai_planning' ||
                      currentScreen === 'stays' ||
                      currentScreen === 'live_map' ||
                      currentScreen === 'trip_progress'
                        ? 'text-[#00897B] font-black'
                        : 'text-[#5A726D] hover:text-[#1A3A34]'
                    }`}
                  >
                    <div className={`p-1.5 rounded-full transition-all ${currentScreen === 'main_itinerary' ? 'bg-[#00BFA5]/15 text-[#00897B] shadow-2xs' : ''}`}>
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="text-[9px]">Itinerary</span>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('ai_assistant')}
                    className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-full transition-all cursor-pointer ${
                      currentScreen === 'ai_assistant' ? 'text-[#00897B] font-black' : 'text-[#5A726D] hover:text-[#1A3A34]'
                    }`}
                  >
                    <div className={`p-1.5 rounded-full transition-all ${currentScreen === 'ai_assistant' ? 'bg-[#00BFA5]/15 text-[#00897B] shadow-2xs' : ''}`}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-[9px]">Assistant</span>
                  </button>
                </div>
              )}

              {/* Toast Feedback */}
              {toastMessage && (
                <div className="absolute bottom-16 left-4 right-4 bg-[#0F291E] text-white px-3.5 py-2 rounded-2xl shadow-2xl text-xs flex items-center gap-2 border border-emerald-500 animate-bounce z-50">
                  <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                  <span className="font-semibold text-[11px]">{toastMessage}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* TECH SPECS & VS CODE FLUTTER EXPORT MODAL */}
      {showArchModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#F7F9FB] rounded-3xl shadow-2xl border border-[#E2EBE8] overflow-hidden flex flex-col max-h-[88vh]">
            <div className="bg-gradient-to-r from-[#1A3A34] to-[#0A1F1C] text-white p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <NexTripiaLogo className="w-7 h-7" />
                <div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#00BFA5]/25 text-[#00E5FF] border border-[#00BFA5]/40">
                    WELCOME SCREEN BRANDING & FLUTTER EXPORT
                  </span>
                  <h3 className="font-heading text-base font-black mt-0.5">VS Code Architecture & Live API Connectors</h3>
                </div>
              </div>
              <button
                onClick={() => setShowArchModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs text-[#1A3A34] leading-relaxed">
              {/* 1. Unified Color Tokens */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#E2EBE8] shadow-2xs">
                <span className="font-bold text-[#00897B] text-xs block mb-1.5">
                  1. Welcome Screen Color Tokens & Palette
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-[#00C6FF] to-[#00E5FF] text-[#1A3A34] flex items-center justify-between font-bold shadow-2xs">
                    <span>Sky/Water Cyan</span>
                    <span className="font-mono">#00C6FF</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#00BFA5] text-white flex items-center justify-between font-bold shadow-2xs">
                    <span>Vibrant Teal</span>
                    <span className="font-mono">#00BFA5</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFA726] text-white flex items-center justify-between font-bold shadow-2xs">
                    <span>Sunset Gold</span>
                    <span className="font-mono">#FFA726</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F2EFE9] text-[#1A3A34] border border-[#E2EBE8] flex items-center justify-between font-bold">
                    <span>Light Sand</span>
                    <span className="font-mono">#F2EFE9</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#1A3A34] text-white flex items-center justify-between font-bold">
                    <span>Dark Pine Slate</span>
                    <span className="font-mono">#1A3A34</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F7F9FB] text-[#5A726D] border border-[#E2EBE8] flex items-center justify-between font-bold">
                    <span>Canvas Off-White</span>
                    <span className="font-mono">#F7F9FB</span>
                  </div>
                </div>
              </div>

              {/* 2. Live API Connectors Config */}
              <div className="p-3.5 rounded-2xl bg-[#E0F7F6] border border-[#00BFA5]/30">
                <span className="font-bold text-[#00897B] text-xs block mb-1">
                  2. Live Backend & API Connectivity (api_config.dart / .env)
                </span>
                <div className="space-y-1.5 text-[11px] font-mono bg-white p-2.5 rounded-xl border border-[#E2EBE8]">
                  <div className="flex justify-between">
                    <span className="text-[#5A726D]">GOOGLE_PLACES_API_KEY:</span>
                    <span className="text-[#00897B] font-semibold">Configured (Graceful fallback)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A726D]">DJANGO_BASE_URL:</span>
                    <span className="text-[#1A3A34] font-bold">http://localhost:8000/api</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A726D]">USE_FIREBASE:</span>
                    <span className="text-[#1A3A34] font-semibold">false (Local & REST mode)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A726D]">GEMINI_API_KEY:</span>
                    <span className="text-[#00897B] font-semibold">Nash-Equilibrium Consensus active</span>
                  </div>
                </div>
              </div>

              {/* 3. Exportable Flutter Folder Structure for VS Code */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#E2EBE8]">
                <span className="font-bold text-[#1A3A34] text-xs block mb-1.5">
                  3. Clean VS Code Flutter Codebase Structure (<code className="font-mono">/flutter_app/lib</code>)
                </span>
                <div className="text-[11px] font-mono bg-[#F7F9FB] p-3 rounded-xl border border-[#E2EBE8] space-y-1 text-[#1A3A34]">
                  <p className="text-[#00897B] font-bold">lib/</p>
                  <p className="pl-3">├── <span className="font-bold text-[#00897B]">config/</span> (theme.dart, constants.dart, api_config.dart)</p>
                  <p className="pl-3">├── <span className="font-bold text-[#00897B]">models/</span> (user.dart, trip.dart, preference.dart, place.dart)</p>
                  <p className="pl-3">├── <span className="font-bold text-[#00897B]">services/</span> (auth_service.dart, places_service.dart, ai_service.dart, itinerary_service.dart)</p>
                  <p className="pl-3">├── <span className="font-bold text-[#00897B]">screens/</span> (splash/, tour/, auth/, hub/, preferences/, itinerary/)</p>
                  <p className="pl-3">├── <span className="font-bold text-[#00897B]">widgets/</span> (custom_button.dart, trip_card.dart, place_card.dart, cached_image_placeholder.dart)</p>
                  <p className="pl-3">└── <span className="font-bold text-[#00897B]">main.dart</span></p>
                </div>
              </div>

              {/* 4. Layout Fixes & Standards */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#E2EBE8] text-[11px] space-y-1">
                <span className="font-bold text-[#1A3A34] block">4. Welcome Screen Aesthetic Guidelines & Ergonomics</span>
                <p className="text-[#5A726D]">
                  • Pill buttons (<code className="font-mono bg-[#E0F7F6] px-1 rounded text-[#00897B]">rounded-full</code>) with bright cyan (#00C6FF) to deep teal (#00BFA5) gradients.
                </p>
                <p className="text-[#5A726D]">
                  • Floating journey cards with subtle drop shadows, clean borders, and 16-20px rounded styling.
                </p>
                <p className="text-[#5A726D]">
                  • Mountain-meets-water outdoor imagery with glassmorphic backdrop blurs and no-cutoff scrollviews.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-white border-t border-[#E2EBE8] flex justify-end">
              <button
                onClick={() => setShowArchModal(false)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00C6FF] via-[#00E5FF] to-[#00BFA5] hover:opacity-95 text-white text-xs font-black transition-all shadow-md shadow-cyan-500/25 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
