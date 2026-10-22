// Place and destination model for NexTripia AI

class PlaceModel {
  final String id;
  final String name;
  final String region;
  final String category;
  final String description;
  final String imageUrl;
  final double rating;
  final int reviewsCount;
  final String estimatedCost;
  final double latitude;
  final double longitude;
  final List<String> tags;
  final String openingHours;
  final String entryFee;

  const PlaceModel({
    required this.id,
    required this.name,
    required this.region,
    required this.category,
    required this.description,
    required this.imageUrl,
    this.rating = 4.8,
    this.reviewsCount = 1240,
    this.estimatedCost = '₹350 / person',
    this.latitude = 13.5074,
    this.longitude = 75.0911,
    this.tags = const ['Nature', 'Trek', 'Scenic'],
    this.openingHours = '06:00 AM – 06:30 PM',
    this.entryFee = 'Free (Forest Permit ₹150)',
  });

  factory PlaceModel.fromJson(Map<String, dynamic> json) {
    return PlaceModel(
      id: json['id'] as String? ?? 'place-${DateTime.now().millisecondsSinceEpoch}',
      name: json['name'] as String? ?? 'Scenic Destination',
      region: json['region'] as String? ?? 'Western Ghats',
      category: json['category'] as String? ?? 'Nature',
      description: json['description'] as String? ?? '',
      imageUrl: json['image_url'] as String? ??
          'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
      rating: (json['rating'] as num?)?.toDouble() ?? 4.8,
      reviewsCount: json['reviews_count'] as int? ?? 500,
      estimatedCost: json['estimated_cost'] as String? ?? '₹300 / person',
      latitude: (json['latitude'] as num?)?.toDouble() ?? 13.5,
      longitude: (json['longitude'] as num?)?.toDouble() ?? 75.0,
      tags: (json['tags'] as List<dynamic>?)?.map((e) => e.toString()).toList() ??
          const ['Nature', 'Scenic'],
      openingHours: json['opening_hours'] as String? ?? '06:00 AM – 06:00 PM',
      entryFee: json['entry_fee'] as String? ?? 'Free',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'region': region,
      'category': category,
      'description': description,
      'image_url': imageUrl,
      'rating': rating,
      'reviews_count': reviewsCount,
      'estimated_cost': estimatedCost,
      'latitude': latitude,
      'longitude': longitude,
      'tags': tags,
      'opening_hours': openingHours,
      'entry_fee': entryFee,
    };
  }
}
