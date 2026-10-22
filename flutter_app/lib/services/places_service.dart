// Places service for NexTripia AI
// Conditionally fetches live Google Places API or Django backend endpoints,
// gracefully falling back to rich nature-inspired destination fixtures.

import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';
import '../models/place.dart';

class PlacesService {
  PlacesService._();
  static final PlacesService instance = PlacesService._();

  /// Search places by keyword and category
  Future<List<PlaceModel>> searchPlaces({
    String query = '',
    String? category,
    double? maxBudget,
  }) async {
    // 1. Try Live Google Places Text Search if API key is provided
    if (ApiConfig.hasPlacesApiKey) {
      try {
        final uri = Uri.parse(
          'https://maps.googleapis.com/maps/api/place/textsearch/json?query=${Uri.encodeComponent(query.isEmpty ? 'scenic travel attractions' : query)}&key=${ApiConfig.googlePlacesApiKey}',
        );
        final response = await http.get(uri).timeout(ApiConfig.connectTimeout);
        if (response.statusCode == 200) {
          final data = jsonDecode(response.body) as Map<String, dynamic>;
          final results = data['results'] as List<dynamic>?;
          if (results != null && results.isNotEmpty) {
            return results.map((item) {
              final m = item as Map<String, dynamic>;
              final photos = m['photos'] as List<dynamic>?;
              String photoUrl =
                  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80';
              if (photos != null && photos.isNotEmpty) {
                final ref = photos[0]['photo_reference'];
                photoUrl =
                    'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=$ref&key=${ApiConfig.googlePlacesApiKey}';
              }
              final location = (m['geometry'] as Map<String, dynamic>?)?['location'] as Map<String, dynamic>?;

              return PlaceModel(
                id: m['place_id'] as String? ?? 'gp-${DateTime.now().millisecondsSinceEpoch}',
                name: m['name'] as String? ?? 'Scenic Location',
                region: m['formatted_address'] as String? ?? 'India',
                category: category ?? 'Sightseeing',
                description: 'Popular attraction found via Google Places.',
                imageUrl: photoUrl,
                rating: (m['rating'] as num?)?.toDouble() ?? 4.7,
                reviewsCount: (m['user_ratings_total'] as num?)?.toInt() ?? 800,
                latitude: (location?['lat'] as num?)?.toDouble() ?? 13.5,
                longitude: (location?['lng'] as num?)?.toDouble() ?? 75.0,
              );
            }).toList();
          }
        }
      } catch (_) {
        // Fall back gracefully to curated fixtures
      }
    }

    // 2. Try Django Backend if configured
    if (ApiConfig.djangoBaseUrl.isNotEmpty) {
      try {
        final uri = Uri.parse(
          '${ApiConfig.djangoBaseUrl}/places/?q=${Uri.encodeComponent(query)}&category=${category ?? ''}',
        );
        final response = await http.get(uri).timeout(ApiConfig.connectTimeout);
        if (response.statusCode == 200) {
          final list = jsonDecode(response.body) as List<dynamic>;
          return list.map((e) => PlaceModel.fromJson(e as Map<String, dynamic>)).toList();
        }
      } catch (_) {
        // Fall back to clean local fixtures
      }
    }

    // 3. Graceful Local Curated Destination Fixtures
    await Future.delayed(const Duration(milliseconds: 300));
    final all = _curatedDestinations;
    if (query.trim().isEmpty) return all;
    return all.where((p) {
      final matchName = p.name.toLowerCase().contains(query.toLowerCase());
      final matchRegion = p.region.toLowerCase().contains(query.toLowerCase());
      final matchCategory = p.category.toLowerCase().contains(query.toLowerCase());
      return matchName || matchRegion || matchCategory;
    }).toList();
  }

  /// Curated nature destinations with valid high-res imagery
  static const List<PlaceModel> _curatedDestinations = [
    PlaceModel(
      id: 'dest-agumbe',
      name: 'Agumbe Cloud Rainforest',
      region: 'Western Ghats, Karnataka',
      category: 'Cloud Rainforest',
      description:
          'Known as the Cherrapunji of the South. Ancient rainforest canopy, pristine waterfalls, endemic flora, and magical misty sunsets from the highest Ghat edge.',
      imageUrl:
          'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviewsCount: 3200,
      estimatedCost: '₹400 / person',
      latitude: 13.5074,
      longitude: 75.0911,
      tags: ['Rainforest', 'Waterfalls', 'Sunset Point', 'Cobras & Flora'],
      openingHours: '06:00 AM – 06:30 PM',
      entryFee: 'Forest Entry ₹150',
    ),
    PlaceModel(
      id: 'dest-kudremukh',
      name: 'Kudremukh Peak & Grasslands',
      region: 'Chikkamagaluru District',
      category: 'High Altitude Peaks',
      description:
          'Rolling green horse-faced peak at 1,894m. Shola forest patches, river crossings, misty trails, and sweeping mountain panoramas with zero crowd congestion.',
      imageUrl:
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      rating: 4.95,
      reviewsCount: 2840,
      estimatedCost: '₹600 / person',
      latitude: 13.2144,
      longitude: 75.2536,
      tags: ['Horse-Face Peak', 'Trek', 'Grasslands', 'Campfire Stay'],
      openingHours: '06:00 AM – 05:00 PM',
      entryFee: 'Forest Dept Trek Pass ₹575',
    ),
    PlaceModel(
      id: 'dest-gokarna',
      name: 'Gokarna Om Beach & Cliffs',
      region: 'Uttara Kannada Coast',
      category: 'Coastal Beach',
      description:
          'Spiritual coastal sanctuary with dramatic cliffs, golden sands, seaside cafes, and dolphin-spotting boat trips.',
      imageUrl:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviewsCount: 4500,
      estimatedCost: '₹350 / person',
      latitude: 14.5186,
      longitude: 74.3168,
      tags: ['Cliff Walks', 'Sunset Cafes', 'Om Shape', 'Kayaking'],
      openingHours: 'Open 24 Hours',
      entryFee: 'Free Access',
    ),
    PlaceModel(
      id: 'dest-chikmagalur',
      name: 'Mullayanagiri & Estate Trails',
      region: 'Chikmagalur Highlands',
      category: 'Coffee Plantation',
      description:
          'Karnataka’s highest mountain crest paired with heritage coffee plantation estates, fresh brew tastings, and cool breeze ridges.',
      imageUrl:
          'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
      rating: 4.85,
      reviewsCount: 3900,
      estimatedCost: '₹300 / person',
      latitude: 13.3908,
      longitude: 75.7214,
      tags: ['Highest Peak', 'Coffee Estates', 'Cloud Walks', 'Boutique Stay'],
      openingHours: '06:00 AM – 06:00 PM',
      entryFee: 'Free (Vehicle Parking ₹50)',
    ),
    PlaceModel(
      id: 'dest-wayanad',
      name: 'Wayanad Chembra Mist Peak',
      region: 'Kerala - Karnataka Border',
      category: 'High Altitude Peaks',
      description:
          'Heart-shaped natural lake perched among the clouds, cardamom forest trails, and indigenous bamboo treehouse stays.',
      imageUrl:
          'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
      rating: 4.88,
      reviewsCount: 2650,
      estimatedCost: '₹450 / person',
      latitude: 11.5126,
      longitude: 76.0847,
      tags: ['Heart Lake', 'Spice Plantations', 'Mist Trail', 'Treehouse'],
      openingHours: '07:00 AM – 04:00 PM',
      entryFee: 'Entry Pass ₹750 per group of 5',
    ),
  ];
}
