import 'package:flutter/material.dart';
import 'config/theme.dart';
import 'screens/splash/splash_screen.dart';
import 'screens/auth/login_screen.dart';
import 'screens/hub/home_dashboard_screen.dart';
import 'screens/preferences/dream_trip_preferences_screen.dart';
import 'screens/itinerary/main_itinerary_screen.dart';
import 'screens/tour/app_tour_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const NexTripiaApp());
}

class NexTripiaApp extends StatelessWidget {
  const NexTripiaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NexTripia AI',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      initialRoute: '/',
      routes: {
        '/': (context) => const SplashScreen(),
        '/tour': (context) => const AppTourScreen(),
        '/login': (context) => const LoginScreen(),
        '/home': (context) => const HomeDashboardScreen(),
        '/preferences': (context) => const DreamTripPreferencesScreen(),
        '/itinerary': (context) => const MainItineraryScreen(),
      },
    );
  }
}
