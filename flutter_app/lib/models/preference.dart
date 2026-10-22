// Member travel preference model for NexTripia AI

class MemberPreferenceModel {
  final String userId;
  final String memberName;
  final List<String> dreamDestinations;
  final List<String> preferredActivities;
  final double budgetMin;
  final double budgetMax;
  final String pacePreference; // 'Relaxed & Scenic', 'Balanced', 'Action Packed'
  final String accommodationType; // 'Eco Resort', 'Boutique Homestay', 'Hostel', 'Any'
  final List<String> dietaryNeeds;
  final bool hasApprovedPlan;

  const MemberPreferenceModel({
    required this.userId,
    required this.memberName,
    this.dreamDestinations = const [],
    this.preferredActivities = const ['Trekking', 'Sunset Viewpoints', 'Café Hopping'],
    this.budgetMin = 6000,
    this.budgetMax = 12000,
    this.pacePreference = 'Balanced',
    this.accommodationType = 'Eco Resort',
    this.dietaryNeeds = const ['Vegetarian friendly'],
    this.hasApprovedPlan = false,
  });

  factory MemberPreferenceModel.fromJson(Map<String, dynamic> json) {
    return MemberPreferenceModel(
      userId: json['user_id'] as String? ?? 'user-1',
      memberName: json['member_name'] as String? ?? 'Member',
      dreamDestinations: (json['dream_destinations'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          [],
      preferredActivities: (json['preferred_activities'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          ['Trekking', 'Café Hopping'],
      budgetMin: (json['budget_min'] as num?)?.toDouble() ?? 5000,
      budgetMax: (json['budget_max'] as num?)?.toDouble() ?? 10000,
      pacePreference: json['pace_preference'] as String? ?? 'Balanced',
      accommodationType: json['accommodation_type'] as String? ?? 'Eco Resort',
      dietaryNeeds: (json['dietary_needs'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          [],
      hasApprovedPlan: json['has_approved_plan'] as bool? ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'user_id': userId,
      'member_name': memberName,
      'dream_destinations': dreamDestinations,
      'preferred_activities': preferredActivities,
      'budget_min': budgetMin,
      'budget_max': budgetMax,
      'pace_preference': pacePreference,
      'accommodation_type': accommodationType,
      'dietary_needs': dietaryNeeds,
      'has_approved_plan': hasApprovedPlan,
    };
  }

  MemberPreferenceModel copyWith({
    String? userId,
    String? memberName,
    List<String>? dreamDestinations,
    List<String>? preferredActivities,
    double? budgetMin,
    double? budgetMax,
    String? pacePreference,
    String? accommodationType,
    List<String>? dietaryNeeds,
    bool? hasApprovedPlan,
  }) {
    return MemberPreferenceModel(
      userId: userId ?? this.userId,
      memberName: memberName ?? this.memberName,
      dreamDestinations: dreamDestinations ?? this.dreamDestinations,
      preferredActivities: preferredActivities ?? this.preferredActivities,
      budgetMin: budgetMin ?? this.budgetMin,
      budgetMax: budgetMax ?? this.budgetMax,
      pacePreference: pacePreference ?? this.pacePreference,
      accommodationType: accommodationType ?? this.accommodationType,
      dietaryNeeds: dietaryNeeds ?? this.dietaryNeeds,
      hasApprovedPlan: hasApprovedPlan ?? this.hasApprovedPlan,
    );
  }
}
