// User model for NexTripia AI

class UserModel {
  final String id;
  final String name;
  final String email;
  final String? avatarUrl;
  final String role;
  final int totalTrips;
  final double harmonyRating;

  const UserModel({
    required this.id,
    required this.name,
    required this.email,
    this.avatarUrl,
    this.role = 'Traveler',
    this.totalTrips = 3,
    this.harmonyRating = 4.9,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] as String? ?? 'guest-1',
      name: json['name'] as String? ?? 'Traveler',
      email: json['email'] as String? ?? 'traveler@nextripia.ai',
      avatarUrl: json['avatar_url'] as String?,
      role: json['role'] as String? ?? 'Traveler',
      totalTrips: json['total_trips'] as int? ?? 1,
      harmonyRating: (json['harmony_rating'] as num?)?.toDouble() ?? 4.9,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'avatar_url': avatarUrl,
      'role': role,
      'total_trips': totalTrips,
      'harmony_rating': harmonyRating,
    };
  }

  UserModel copyWith({
    String? id,
    String? name,
    String? email,
    String? avatarUrl,
    String? role,
    int? totalTrips,
    double? harmonyRating,
  }) {
    return UserModel(
      id: id ?? this.id,
      name: name ?? this.name,
      email: email ?? this.email,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      role: role ?? this.role,
      totalTrips: totalTrips ?? this.totalTrips,
      harmonyRating: harmonyRating ?? this.harmonyRating,
    );
  }
}
