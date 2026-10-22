import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../widgets/custom_button.dart';
import '../auth/login_screen.dart';

/// App Tour Screen for NexTripia AI
/// Guided visual walkthrough styled strictly according to the Welcome Screen:
/// - Mountain-meets-water nature backdrop with frosted glassmorphism overlays
/// - Sky/Water Cyan & Vibrant Teal highlights
/// - Sunset Gold badges
/// - Floating journey cards (16-20px radius, white borders, subtle shadows)
/// - Primary "Log In" pill button
class AppTourScreen extends StatefulWidget {
  const AppTourScreen({super.key});

  @override
  State<AppTourScreen> createState() => _AppTourScreenState();
}

class _AppTourScreenState extends State<AppTourScreen> {
  final PageController _pageController = PageController();
  int _currentIndex = 0;

  final List<Map<String, dynamic>> _tourScenes = [
    {
      'title': '1. Dream Individually',
      'tagline': 'Zero Peer Pressure Wishlists',
      'badge': 'Explore',
      'badgeColor': AppTheme.vibrantTeal,
      'badgeIcon': Icons.explore_rounded,
      'description':
          'Every group member adds their dream viewpoints, homestays, and budget limits in private. No one compromises upfront.',
      'image':
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'stats': '100% individual privacy',
      'tags': ['Hidden Waterfalls', 'Budget Boundaries', 'Solo Pace'],
    },
    {
      'title': '2. Plan Fairly With AI',
      'tagline': 'Algorithmic Group Consensus',
      'badge': 'Plan Together',
      'badgeColor': AppTheme.skyCyan,
      'badgeIcon': Icons.groups_rounded,
      'description':
          'Gemini AI computes the Nash equilibrium of group preferences — balancing budget, travel style, and must-see destinations.',
      'image':
          'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
      'stats': '96% group harmony rating',
      'tags': ['Zero WhatsApp Chaos', 'Fair Scheduling', 'Dietary Harmony'],
    },
    {
      'title': '3. Travel Dynamically',
      'tagline': 'Live Weather & Road Copilot',
      'badge': 'Travel',
      'badgeColor': AppTheme.sunsetGold,
      'badgeIcon': Icons.navigation_rounded,
      'description':
          'Sudden downpour or road closure? NexTripia AI recalculates your itinerary in real time, keeping your crew moving smoothly.',
      'image':
          'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      'stats': 'Live adaptive recalculation',
      'tags': ['Offline Ready', 'Google Places', 'Dynamic Reroute'],
    },
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _navigateToLogin() {
    Navigator.of(context).pushReplacement(
      PageRouteBuilder(
        pageBuilder: (_, __, ___) => const LoginScreen(),
        transitionsBuilder: (_, animation, __, child) =>
            FadeTransition(opacity: animation, child: child),
        transitionDuration: const Duration(milliseconds: 400),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final currentScene = _tourScenes[_currentIndex];

    return Scaffold(
      backgroundColor: AppTheme.canvasBg,
      body: Stack(
        fit: StackFit.expand,
        children: [
          // Background scenic photo
          AnimatedSwitcher(
            duration: const Duration(milliseconds: 600),
            child: Image.network(
              currentScene['image'] as String,
              key: ValueKey<int>(_currentIndex),
              fit: BoxFit.cover,
              height: double.infinity,
              width: double.infinity,
              errorBuilder: (_, __, ___) => Container(
                color: AppTheme.canvasBg,
              ),
            ),
          ),

          // Glassmorphic natural gradient overlay
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  AppTheme.canvasBg.withOpacity(0.85),
                  AppTheme.canvasBg.withOpacity(0.92),
                  AppTheme.darkPine.withOpacity(0.65),
                ],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                stops: const [0.0, 0.45, 1.0],
              ),
            ),
          ),

          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              child: Column(
                children: [
                  // Top Navigation Header
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // Circular Logo Badge
                      Row(
                        children: [
                          Container(
                            width: 38,
                            height: 38,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              gradient: AppTheme.primaryGradient,
                              boxShadow: [
                                BoxShadow(
                                  color: AppTheme.skyCyan.withOpacity(0.35),
                                  blurRadius: 10,
                                  offset: const Offset(0, 3),
                                ),
                              ],
                            ),
                            child: const Icon(
                              Icons.terrain_rounded,
                              size: 22,
                              color: AppTheme.pureWhite,
                            ),
                          ),
                          const SizedBox(width: 10),
                          RichText(
                            text: const TextSpan(
                              text: 'NexTripia',
                              style: TextStyle(
                                fontFamily: 'Outfit',
                                fontSize: 18,
                                fontWeight: FontWeight.w900,
                                color: AppTheme.darkPine,
                              ),
                              children: [
                                WidgetSpan(
                                  alignment: PlaceholderAlignment.top,
                                  child: Text(
                                    'AI',
                                    style: TextStyle(
                                      fontFamily: 'Outfit',
                                      fontSize: 11,
                                      fontWeight: FontWeight.w900,
                                      color: AppTheme.vibrantTeal,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),

                      // Direct Log In action
                      TextButton.icon(
                        onPressed: _navigateToLogin,
                        icon: const Icon(
                          Icons.login_rounded,
                          size: 16,
                          color: AppTheme.darkPine,
                        ),
                        label: const Text(
                          'Log In',
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w700,
                            color: AppTheme.darkPine,
                          ),
                        ),
                        style: TextButton.styleFrom(
                          backgroundColor: AppTheme.pureWhite.withOpacity(0.85),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 14,
                            vertical: 8,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                            side: BorderSide(
                              color: AppTheme.pureWhite.withOpacity(0.9),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),

                  const Spacer(),

                  // Floating Tour Card (Mirroring Floating Journey Thumbnail Design)
                  Expanded(
                    flex: 12,
                    child: PageView.builder(
                      controller: _pageController,
                      onPageChanged: (idx) => setState(() => _currentIndex = idx),
                      itemCount: _tourScenes.length,
                      itemBuilder: (context, index) {
                        final scene = _tourScenes[index];
                        final Color badgeColor = scene['badgeColor'] as Color;

                        return Container(
                          margin: const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
                          padding: const EdgeInsets.all(20),
                          decoration: AppTheme.journeyCardDecoration(
                            backgroundColor: AppTheme.pureWhite.withOpacity(0.92),
                            radius: 20,
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  // Journey Waypoint Badge
                                  Container(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 12,
                                      vertical: 6,
                                    ),
                                    decoration: BoxDecoration(
                                      color: badgeColor,
                                      borderRadius: BorderRadius.circular(20),
                                      boxShadow: [
                                        BoxShadow(
                                          color: badgeColor.withOpacity(0.35),
                                          blurRadius: 10,
                                          offset: const Offset(0, 3),
                                        ),
                                      ],
                                    ),
                                    child: Row(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        Icon(
                                          scene['badgeIcon'] as IconData,
                                          size: 14,
                                          color: AppTheme.pureWhite,
                                        ),
                                        const SizedBox(width: 6),
                                        Text(
                                          scene['badge'] as String,
                                          style: const TextStyle(
                                            fontSize: 11,
                                            fontWeight: FontWeight.w800,
                                            color: AppTheme.pureWhite,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),

                                  // High impact indicator
                                  Container(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 10,
                                      vertical: 4,
                                    ),
                                    decoration: BoxDecoration(
                                      color: AppTheme.lightSand,
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                    child: Text(
                                      scene['stats'] as String,
                                      style: const TextStyle(
                                        fontSize: 10,
                                        fontWeight: FontWeight.w700,
                                        color: AppTheme.darkPine,
                                      ),
                                    ),
                                  ),
                                ],
                              ),

                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    scene['title'] as String,
                                    style: const TextStyle(
                                      fontFamily: 'Outfit',
                                      fontSize: 22,
                                      fontWeight: FontWeight.w900,
                                      color: AppTheme.darkPine,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    scene['tagline'] as String,
                                    style: TextStyle(
                                      fontSize: 13,
                                      fontWeight: FontWeight.w700,
                                      color: badgeColor,
                                    ),
                                  ),
                                  const SizedBox(height: 10),
                                  Text(
                                    scene['description'] as String,
                                    style: const TextStyle(
                                      fontSize: 13,
                                      color: AppTheme.mutedSlate,
                                      height: 1.45,
                                    ),
                                  ),
                                ],
                              ),

                              // Tag badges
                              Wrap(
                                spacing: 6,
                                runSpacing: 6,
                                children: (scene['tags'] as List<String>)
                                    .map(
                                      (t) => Container(
                                        padding: const EdgeInsets.symmetric(
                                          horizontal: 10,
                                          vertical: 5,
                                        ),
                                        decoration: BoxDecoration(
                                          color: AppTheme.canvasBg,
                                          borderRadius: BorderRadius.circular(10),
                                          border: Border.all(
                                            color: AppTheme.softBorder,
                                          ),
                                        ),
                                        child: Text(
                                          '#$t',
                                          style: const TextStyle(
                                            fontSize: 10,
                                            fontWeight: FontWeight.w700,
                                            color: AppTheme.darkPine,
                                          ),
                                        ),
                                      ),
                                    )
                                    .toList(),
                              ),
                            ],
                          ),
                        );
                      },
                    ),
                  ),

                  const SizedBox(height: 12),

                  // 3-Dot Pagination matching Welcome Screen
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(
                      _tourScenes.length,
                      (idx) => AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        margin: const EdgeInsets.symmetric(horizontal: 4),
                        width: _currentIndex == idx ? 22 : 8,
                        height: 8,
                        decoration: BoxDecoration(
                          color: _currentIndex == idx
                              ? AppTheme.waterCyan
                              : AppTheme.pureWhite.withOpacity(0.6),
                          borderRadius: BorderRadius.circular(4),
                          boxShadow: _currentIndex == idx
                              ? [
                                  BoxShadow(
                                    color: AppTheme.waterCyan.withOpacity(0.5),
                                    blurRadius: 8,
                                    offset: const Offset(0, 2),
                                  ),
                                ]
                              : null,
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Primary "Log In" Pill Action
                  CustomButton(
                    label: 'Log In to NexTripia AI',
                    icon: Icons.login_rounded,
                    variant: ButtonVariant.primary,
                    isPill: true,
                    onPressed: _navigateToLogin,
                  ),

                  const SizedBox(height: 8),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
