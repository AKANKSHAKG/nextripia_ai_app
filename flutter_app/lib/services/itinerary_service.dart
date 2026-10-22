// Itinerary Service for NexTripia AI
// Manages day-by-day schedules, dynamic live recalculations, and stay listings.

import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';
import '../models/trip.dart';
import 'ai_service.dart';

class ItineraryService {
  ItineraryService._();
  static final ItineraryService instance = ItineraryService._();

  Future<Map<String, dynamic>> fetchItinerary(String tripId) async {
    if (ApiConfig.djangoBaseUrl.isNotEmpty) {
      try {
        final uri = Uri.parse('${ApiConfig.djangoBaseUrl}/trips/$tripId/itinerary/');
        final res = await http.get(uri).timeout(ApiConfig.connectTimeout);
        if (res.statusCode == 200) {
          return jsonDecode(res.body) as Map<String, dynamic>;
        }
      } catch (_) {
        // Fall back gracefully
      }
    }

    final defaultTrip = TripModel(
      id: tripId,
      title: 'Western Ghats Rainforest & Mist Expedition',
      destination: 'Agumbe & Kudremukh',
      startingCity: 'Bengaluru',
      startDate: DateTime.now().add(const Duration(days: 5)),
      endDate: DateTime.now().add(const Duration(days: 8)),
      coverImageUrl:
          'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
      creatorName: 'Aria K.',
      invitationCode: 'NEX-8821',
    );

    return AiService.instance.generateItinerary(
      trip: defaultTrip,
      memberPreferences: const [],
    );
  }

  /// Dynamic recalculation: When weather changes, group runs late, or a stop is skipped
  Future<Map<String, dynamic>> recalculateItinerary({
    required String tripId,
    required String reason, // 'Heavy Rain Warning', 'Running 1 Hour Late', 'Budget Shift'
  }) async {
    await Future.delayed(const Duration(milliseconds: 500));
    return {
      'status': 'recalculated',
      'reason': reason,
      'notice':
          'AI Copilot adjusted Day 2 afternoon: Replaced exposed outdoor summit with covered canopy walk & local spice museum.',
      'time_saved_minutes': 45,
    };
  }
}
