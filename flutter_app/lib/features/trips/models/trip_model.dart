class TripModel {
  final String id;
  final String title;
  final String invitationCode;
  final String createdByUserId;
  final String createdByName;
  final DateTime startDate;
  final DateTime endDate;
  final int estimatedGroupSize;
  final List<String> primaryDestinations;
  final String vibe; // 'Relaxed', 'Adventure', 'Cultural', 'Balanced'
  final List<TripMember> members;
  final DateTime createdAt;

  TripModel({
    required this.id,
    required this.title,
    required this.invitationCode,
    required this.createdByUserId,
    required this.createdByName,
    required this.startDate,
    required this.endDate,
    required this.estimatedGroupSize,
    required this.primaryDestinations,
    required this.vibe,
    required this.members,
    required this.createdAt,
  });

  int get durationDays => endDate.difference(startDate).inDays + 1;

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'invitation_code': invitationCode,
      'created_by_user_id': createdByUserId,
      'created_by_name': createdByName,
      'start_date': startDate.toIso8601String(),
      'end_date': endDate.toIso8601String(),
      'estimated_group_size': estimatedGroupSize,
      'primary_destinations': primaryDestinations,
      'vibe': vibe,
      'members': members.map((m) => m.toJson()).toList(),
      'created_at': createdAt.toIso8601String(),
    };
  }

  factory TripModel.fromJson(Map<String, dynamic> json) {
    return TripModel(
      id: json['id'] as String,
      title: json['title'] as String,
      invitationCode: json['invitation_code'] as String,
      createdByUserId: json['created_by_user_id'] as String,
      createdByName: json['created_by_name'] as String,
      startDate: DateTime.parse(json['start_date'] as String),
      endDate: DateTime.parse(json['end_date'] as String),
      estimatedGroupSize: json['estimated_group_size'] as int? ?? 4,
      primaryDestinations: (json['primary_destinations'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          [],
      vibe: json['vibe'] as String? ?? 'Balanced',
      members: (json['members'] as List<dynamic>?)
              ?.map((m) => TripMember.fromJson(m as Map<String, dynamic>))
              .toList() ??
          [],
      createdAt: DateTime.parse(json['created_at'] as String),
    );
  }
}

class TripMember {
  final String userId;
  final String name;
  final String email;
  final String role; // 'host' or 'member'
  final bool hasSubmittedPreferences;
  final DateTime joinedAt;

  TripMember({
    required this.userId,
    required this.name,
    required this.email,
    required this.role,
    this.hasSubmittedPreferences = false,
    required this.joinedAt,
  });

  Map<String, dynamic> toJson() {
    return {
      'user_id': userId,
      'name': name,
      'email': email,
      'role': role,
      'has_submitted_preferences': hasSubmittedPreferences,
      'joined_at': joinedAt.toIso8601String(),
    };
  }

  factory TripMember.fromJson(Map<String, dynamic> json) {
    return TripMember(
      userId: json['user_id'] as String,
      name: json['name'] as String,
      email: json['email'] as String,
      role: json['role'] as String? ?? 'member',
      hasSubmittedPreferences:
          json['has_submitted_preferences'] as bool? ?? false,
      joinedAt: DateTime.parse(json['joined_at'] as String),
    );
  }
}
