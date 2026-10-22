import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/place.dart';
import '../../models/trip.dart';
import '../../services/auth_service.dart';
import '../../services/places_service.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/place_card.dart';
import '../../widgets/trip_card.dart';
import '../preferences/dream_trip_preferences_screen.dart';
import '../itinerary/main_itinerary_screen.dart';

class HomeDashboardScreen extends StatefulWidget {
  const HomeDashboardScreen({super.key});

  @override
  State<HomeDashboardScreen> createState() => _HomeDashboardScreenState();
}

class _HomeDashboardScreenState extends State<HomeDashboardScreen> {
  final _searchController = TextEditingController();
  List<PlaceModel> _places = [];
  bool _loadingPlaces = true;

  final TripModel _activeTrip = TripModel(
    id: 'trip-ghats-2026',
    title: 'Western Ghats Rainforest & Mist Expedition',
    destination: 'Agumbe & Kudremukh High Peaks',
    startingCity: 'Bengaluru',
    startDate: DateTime.now().add(const Duration(days: 4)),
    endDate: DateTime.now().add(const Duration(days: 8)),
    coverImageUrl:
        'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
    creatorName: 'Aria Kapoor',
    invitationCode: 'NEX-8821',
    estimatedBudgetPerPerson: 8500,
    memberCount: 4,
    groupHarmonyScore: 97.0,
  );

  @override
  void initState() {
    super.initState();
    _loadPlaces();
  }

  Future<void> _loadPlaces({String query = ''}) async {
    setState(() => _loadingPlaces = true);
    final results = await PlacesService.instance.searchPlaces(query: query);
    if (mounted) {
      setState(() {
        _places = results;
        _loadingPlaces = false;
      });
    }
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final user = AuthService.instance.currentUser;

    return Scaffold(
      backgroundColor: AppTheme.canvasBg,
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          padding: const EdgeInsets.fromLTRB(20, 16, 20, 36),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Top Bar: User Greeting & Profile
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 44,
                        height: 44,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: AppTheme.pureWhite, width: 2),
                          boxShadow: [
                            BoxShadow(
                              color: AppTheme.skyCyan.withOpacity(0.3),
                              blurRadius: 10,
                              offset: const Offset(0, 3),
                            ),
                          ],
                        ),
                        child: ClipOval(
                          child: Image.network(
                            user?.photoUrl ??
                                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                            fit: BoxFit.cover,
                            errorBuilder: (_, __, ___) => Container(
                              color: AppTheme.vibrantTeal,
                              child: const Icon(Icons.person, color: Colors.white),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Good morning, ${user?.name.split(' ').first ?? 'Aria'}! 🌿',
                            style: const TextStyle(
                              fontFamily: 'Outfit',
                              fontSize: 16,
                              fontWeight: FontWeight.w800,
                              color: AppTheme.darkPine,
                            ),
                          ),
                          const Text(
                            'Ready for Western Ghats?',
                            style: TextStyle(
                              fontSize: 12,
                              color: AppTheme.mutedSlate,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),

                  // Notifications Pill Badge
                  Container(
                    decoration: BoxDecoration(
                      color: AppTheme.pureWhite,
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: AppTheme.pureWhite, width: 1.5),
                      boxShadow: [
                        BoxShadow(
                          color: AppTheme.darkPine.withOpacity(0.06),
                          blurRadius: 10,
                          offset: const Offset(0, 3),
                        ),
                      ],
                    ),
                    child: IconButton(
                      icon: const Icon(
                        Icons.notifications_none_rounded,
                        color: AppTheme.darkPine,
                        size: 22,
                      ),
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('All trip members are in sync!'),
                            backgroundColor: AppTheme.darkPine,
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Search Bar (Light Sand / White Card with soft border)
              Container(
                decoration: AppTheme.journeyCardDecoration(
                  backgroundColor: AppTheme.pureWhite,
                  radius: 20,
                ),
                child: TextField(
                  controller: _searchController,
                  onChanged: (val) => _loadPlaces(query: val),
                  decoration: InputDecoration(
                    hintText: 'Search waterfalls, homestays, viewpoints...',
                    prefixIcon: const Icon(Icons.search_rounded, color: AppTheme.vibrantTeal),
                    suffixIcon: _searchController.text.isNotEmpty
                        ? IconButton(
                            icon: const Icon(Icons.clear, size: 18),
                            onPressed: () {
                              _searchController.clear();
                              _loadPlaces();
                            },
                          )
                        : null,
                    border: InputBorder.none,
                    enabledBorder: InputBorder.none,
                    focusedBorder: InputBorder.none,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                  ),
                ),
              ),
              const SizedBox(height: 18),

              // Floating Waypoint Category Navigation (Matching Welcome Screen's 4 badges!)
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                physics: const BouncingScrollPhysics(),
                child: Row(
                  children: [
                    _buildWaypointBadge(
                      title: 'Explore',
                      icon: Icons.explore_rounded,
                      color: AppTheme.vibrantTeal,
                      onTap: () => _loadPlaces(query: 'Waterfall'),
                    ),
                    const SizedBox(width: 10),
                    _buildWaypointBadge(
                      title: 'Stay',
                      icon: Icons.hotel_rounded,
                      color: AppTheme.skyCyan,
                      onTap: () => _loadPlaces(query: 'Resort'),
                    ),
                    const SizedBox(width: 10),
                    _buildWaypointBadge(
                      title: 'Plan Together',
                      icon: Icons.groups_rounded,
                      color: AppTheme.vibrantTeal,
                      onTap: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_) => const DreamTripPreferencesScreen(),
                          ),
                        );
                      },
                    ),
                    const SizedBox(width: 10),
                    _buildWaypointBadge(
                      title: 'Travel',
                      icon: Icons.navigation_rounded,
                      color: AppTheme.sunsetGold,
                      onTap: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_) => const MainItineraryScreen(),
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Active Trip Room Card
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Active Group Room',
                    style: TextStyle(
                      fontFamily: 'Outfit',
                      fontSize: 18,
                      fontWeight: FontWeight.w800,
                      color: AppTheme.darkPine,
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      gradient: AppTheme.primaryGradient,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: const Text(
                      'Live Copilot',
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w800,
                        color: AppTheme.pureWhite,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              TripCard(
                trip: _activeTrip,
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (_) => const MainItineraryScreen(),
                    ),
                  );
                },
              ),
              const SizedBox(height: 16),

              // Action Buttons: Quick Navigation to Preferences & Itinerary
              Row(
                children: [
                  Expanded(
                    child: CustomButton(
                      label: 'My Wishlist',
                      icon: Icons.favorite_border_rounded,
                      variant: ButtonVariant.secondary,
                      height: 48,
                      isPill: true,
                      onPressed: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_) => const DreamTripPreferencesScreen(),
                          ),
                        );
                      },
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: CustomButton(
                      label: 'View Itinerary',
                      icon: Icons.map_outlined,
                      variant: ButtonVariant.primary,
                      height: 48,
                      isPill: true,
                      onPressed: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_) => const MainItineraryScreen(),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 28),

              // Recommended Verified Places
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Top Western Ghats Gems',
                    style: TextStyle(
                      fontFamily: 'Outfit',
                      fontSize: 18,
                      fontWeight: FontWeight.w800,
                      color: AppTheme.darkPine,
                    ),
                  ),
                  Text(
                    '${_places.length} places',
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      color: AppTheme.vibrantTeal,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 14),

              if (_loadingPlaces)
                const Center(
                  child: Padding(
                    padding: EdgeInsets.all(32),
                    child: CircularProgressIndicator(color: AppTheme.vibrantTeal),
                  ),
                )
              else if (_places.isEmpty)
                Container(
                  padding: const EdgeInsets.all(24),
                  decoration: AppTheme.journeyCardDecoration(
                    backgroundColor: AppTheme.lightSand,
                  ),
                  child: const Center(
                    child: Text(
                      'No destinations match your search query.',
                      style: TextStyle(color: AppTheme.mutedSlate),
                    ),
                  ),
                )
              else
                ListView.separated(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: _places.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 14),
                  itemBuilder: (context, index) {
                    final place = _places[index];
                    return PlaceCard(
                      place: place,
                      onTap: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Selected: ${place.name}'),
                            backgroundColor: AppTheme.darkPine,
                          ),
                        );
                      },
                      onAddDestination: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Added ${place.name} to Group Pool!'),
                            backgroundColor: AppTheme.vibrantTeal,
                          ),
                        );
                      },
                    );
                  },
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildWaypointBadge({
    required String title,
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppTheme.pureWhite, width: 1.5),
          boxShadow: [
            BoxShadow(
              color: color.withOpacity(0.35),
              blurRadius: 10,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 14, color: AppTheme.pureWhite),
            const SizedBox(width: 6),
            Text(
              title,
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w800,
                color: AppTheme.pureWhite,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
