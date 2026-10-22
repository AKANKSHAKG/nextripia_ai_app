// Application Constants for NexTripia AI

class AppConstants {
  AppConstants._();

  static const String appName = 'NexTripia AI';
  static const String appTagline = 'Dream individually. Plan collectively. Travel dynamically.';

  // Standard Spacing & Sizing
  static const double cardRadius = 16.0;
  static const double cardPadding = 16.0;
  static const double buttonRadius = 16.0;
  static const double defaultPadding = 20.0;

  // Travel Categories
  static const List<String> travelCategories = [
    'Cloud Rainforest',
    'High Altitude Peaks',
    'Coastal Beach',
    'Coffee Plantation',
    'Heritage & Forts',
    'Wildlife & Safari',
    'Waterfalls & Trek',
  ];

  // Activities
  static const List<String> travelActivities = [
    'Nature Trekking',
    'Sunset Viewpoints',
    'Local Cuisine',
    'Café Hopping',
    'Campfire & Stargazing',
    'Kayaking & Water Sports',
    'Photography Walks',
    'Historical Trails',
  ];

  // Fallback Nature Image for Shimmer / Error States
  static const String placeholderNatureImage =
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80';
}
