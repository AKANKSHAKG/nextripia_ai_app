// Central API & Service Configuration for NexTripia AI
// Use this file to configure backend endpoints and 3P API keys for local execution in VS Code.

class ApiConfig {
  ApiConfig._();

  /// Google Places API Key
  /// Set this key to enable live Google Places search, photos, and auto-complete.
  /// If empty, [PlacesService] will gracefully fall back to rich local destination fixtures.
  static const String googlePlacesApiKey = String.fromEnvironment(
    'GOOGLE_PLACES_API_KEY',
    defaultValue: '', // e.g. 'AIzaSy...'
  );

  /// Django Backend Base URL
  /// Point this to your local or deployed Django REST Framework backend.
  static const String djangoBaseUrl = String.fromEnvironment(
    'DJANGO_BASE_URL',
    defaultValue: 'http://localhost:8000/api',
  );

  /// Firebase Project Configuration Flags
  /// When true and Firebase is initialized, AuthService and TripService use Firestore.
  static const bool useFirebase = bool.fromEnvironment(
    'USE_FIREBASE',
    defaultValue: false,
  );

  /// Gemini AI API Key
  /// Used for live AI itinerary generation and collaborative consensus calculation.
  /// If empty, [AiService] falls back to the deterministic local Nash-equilibrium engine.
  static const String geminiApiKey = String.fromEnvironment(
    'GEMINI_API_KEY',
    defaultValue: '',
  );

  /// Network Timeout configuration
  static const Duration connectTimeout = Duration(seconds: 12);
  static const Duration receiveTimeout = Duration(seconds: 15);

  /// Feature Flags
  static const bool enableLiveTracking = false;
  static const bool debugMockDelay = true;

  /// Helper to check if real Google Places is available
  static bool get hasPlacesApiKey => googlePlacesApiKey.trim().isNotEmpty;

  /// Helper to check if real Gemini API is available
  static bool get hasGeminiApiKey => geminiApiKey.trim().isNotEmpty;
}
