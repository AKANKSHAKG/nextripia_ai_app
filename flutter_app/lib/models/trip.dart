// Trip model for NexTripia AI

import 'preference.dart';

class TripModel {
  final String id;
  final String title;
  final String destination;
  final String startingCity;
  final DateTime startDate;
  final DateTime endDate;
  final String coverImageUrl;
  final String creatorName;
  final String invitationCode;
  final double estimatedBudgetPerPerson;
  final int memberCount;
  final double groupHarmonyScore; // 0.0 to 100.0
  final String status; // 'planning', 'confirmed', 'ongoing', 'completed'
  final List<String> memberNames;
  final List<MemberPreferenceModel> memberPreferences;

  const TripModel({
    required this.id,
    required this.title,
    required this.destination,
    required this.startingCity,
    required this.startDate,
    required this.endDate,
    required this.coverImageUrl,
    required this.creatorName,
    required this.invitationCode,
    this.estimatedBudgetPerPerson = 8500.0,
    this.memberCount = 4,
    this.groupHarmonyScore = 96.0,
    this.status = 'planning',
    this.memberNames = const ['Aria K.', 'Rohan S.', 'Sneha P.', 'Dev M.'],
    this.memberPreferences = const [],
  });

  int get durationDays => endDate.difference(startDate).inDays + 1;

  factory TripModel.fromJson(Map<String, dynamic> json) {
    return TripModel(
      id: json['id'] as String? ?? 'trip-${DateTime.now().millisecondsSinceEpoch}',
      title: json['title'] as String? ?? 'Western Ghats Expedition',
      destination: json['destination'] as String? ?? 'Agumbe & Kudremukh',
      startingCity: json['starting_city'] as String? ?? 'Bengaluru',
      startDate: json['start_date'] != null
          ? DateTime.tryParse(json['start_date'].toString()) ?? DateTime.now().add(const Duration(days: 7))
          : DateTime.now().add(const Duration(days: 7)),
      endDate: json['end_date'] != null
          ? DateTime.tryParse(json['end_date'].toString()) ?? DateTime.now().add(const Duration(days: 10))
          : DateTime.now().add(const Duration(days: 10)),
      coverImageUrl: json['cover_image_url'] as String? ??
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      creatorName: json['creator_name'] as String? ?? 'Aria K.',
      invitationCode: json['invitation_code'] as String? ?? 'NEX-8821',
      estimatedBudgetPerPerson: (json['estimated_budget_per_person'] as num?)?.toDouble() ?? 8500.0,
      memberCount: json['member_count'] as int? ?? 4,
      groupHarmonyScore: (json['group_harmony_score'] as num?)?.toDouble() ?? 96.0,
      status: json['status'] as String? ?? 'planning',
      memberNames: (json['member_names'] as List<dynamic>?)?.map((e) => e.toString()).toList() ??
          ['Aria K.', 'Rohan S.', 'Sneha P.', 'Dev M.'],
      memberPreferences: (json['member_preferences'] as List<dynamic>?)
              ?.map((e) => MemberPreferenceModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'destination': destination,
      'starting_city': startingCity,
      'start_date': startDate.toIso8601String(),
      'end_date': endDate.toIso8601String(),
      'cover_image_url': coverImageUrl,
      'creator_name': creatorName,
      'invitation_code': invitationCode,
      'estimated_budget_per_person': estimatedBudgetPerPerson,
      'member_count': memberCount,
      'group_harmony_score': groupHarmonyScore,
      'status': status,
      'member_names': memberNames,
      'member_preferences': memberPreferences.map((e) => e.toJson()).toList(),
    };
  }
}
