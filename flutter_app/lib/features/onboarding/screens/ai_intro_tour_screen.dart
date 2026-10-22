import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../../core/theme/nature_theme.dart';
import '../../trips/screens/create_join_trip_screen.dart';

class AiIntroTourScreen extends StatefulWidget {
  const AiIntroTourScreen({super.key});

  @override
  State<AiIntroTourScreen> createState() => _AiIntroTourScreenState();
}

class _AiIntroTourScreenState extends State<AiIntroTourScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<TourStep> _steps = const [
    TourStep(
      badge: 'Step 1 • Individual Dreams',
      title: 'Each traveller shares dream destinations & vibe',
      description:
          'No compromises yet. Everyone inputs their personal must-visit spots, budgets, food choices, pace, and accessibility preferences in private freedom.',
      icon: Icons.person_pin_circle_rounded,
      tag: 'Individual Preferences',
    ),
    TourStep(
      badge: 'Step 2 • Collective Circle',
      title: 'Everyone joins the same synchronized trip room',
      description:
          'Share a secure, unique invite code. Friends enter and lock in their travel schedules and budgets without awkward group-chat chaos.',
      icon: Icons.groups_rounded,
      tag: 'Live Group Board',
    ),
    TourStep(
      badge: 'Step 3 • Gemini Fairness Engine',
      title: 'AI identifies overlaps and crafts a truly fair itinerary',
      description:
          'Not just the majority vote! NexTripia balances introverts, foodies, and adventure seekers—highlighting coverage scores and compromise transparency.',
      icon: Icons.auto_awesome_rounded,
      tag: 'Fairness Optimization',
    ),
    TourStep(
      badge: 'Step 4 • Collaborative Decisions',
      title: 'Review, vote, replace stops, and approve together',
      description:
          'Seamlessly swap stops, examine real accommodation booking links, and lock in approved versions with full group consent.',
      icon: Icons.thumb_up_alt_rounded,
      tag: 'Trip Approval',
    ),
    TourStep(
      badge: 'Step 5 • Dynamic Live Travel',
      title: 'Travel on ground with live maps & adaptive updates',
      description:
          'Device GPS tracking, visited checkpoints, weather-aware alternatives, and live meeting points keep everyone united and stress-free.',
      icon: Icons.explore_rounded,
      tag: 'Live Trip Mode',
    ),
  ];

  void _finishTour() {
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (_) => const CreateJoinTripScreen(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: NatureTheme.warmCream,
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: NatureTheme.forestGreen,
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Icon(
                Icons.terrain_rounded,
                color: Colors.white,
                size: 16,
              ),
            ),
            const SizedBox(width: 8),
            Text(
              'How NexTripia Works',
              style: GoogleFonts.outfit(
                fontSize: 18,
                fontWeight: FontWeight.w700,
                color: NatureTheme.primaryText,
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: _finishTour,
            child: Text(
              'Skip',
              style: GoogleFonts.plusJakartaSans(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: NatureTheme.secondaryText,
              ),
            ),
          ),
          const SizedBox(width: 12),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                itemCount: _steps.length,
                onPageChanged: (index) {
                  setState(() => _currentPage = index);
                },
                itemBuilder: (context, index) {
                  final step = _steps[index];
                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // Card with Nature Accent
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(28),
                          decoration: BoxDecoration(
                            color: NatureTheme.pureWhite,
                            borderRadius: BorderRadius.circular(28),
                            border: Border.all(
                              color: NatureTheme.softSage,
                              width: 1.5,
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: NatureTheme.forestGreen.withOpacity(0.06),
                                blurRadius: 24,
                                offset: const Offset(0, 10),
                              ),
                            ],
                          ),
                          child: Column(
                            children: [
                              // Step Icon
                              Container(
                                width: 84,
                                height: 84,
                                decoration: BoxDecoration(
                                  color: NatureTheme.softSage,
                                  shape: BoxShape.circle,
                                  border: Border.all(
                                    color: NatureTheme.forestGreen.withOpacity(0.2),
                                    width: 2,
                                  ),
                                ),
                                child: Icon(
                                  step.icon,
                                  color: NatureTheme.forestGreen,
                                  size: 42,
                                ),
                              ),
                              const SizedBox(height: 20),

                              // Badge
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                                decoration: BoxDecoration(
                                  color: NatureTheme.softSage,
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: Text(
                                  step.badge,
                                  style: GoogleFonts.plusJakartaSans(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w700,
                                    color: NatureTheme.deepForestGreen,
                                  ),
                                ),
                              ),
                              const SizedBox(height: 16),

                              // Title
                              Text(
                                step.title,
                                textAlign: TextAlign.center,
                                style: GoogleFonts.outfit(
                                  fontSize: 22,
                                  fontWeight: FontWeight.w700,
                                  color: NatureTheme.primaryText,
                                  height: 1.25,
                                ),
                              ),
                              const SizedBox(height: 12),

                              // Description
                              Text(
                                step.description,
                                textAlign: TextAlign.center,
                                style: GoogleFonts.plusJakartaSans(
                                  fontSize: 14,
                                  height: 1.55,
                                  color: NatureTheme.secondaryText,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),

            // Pagination Dots & Actions
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(
                      _steps.length,
                      (index) => AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        margin: const EdgeInsets.symmetric(horizontal: 4),
                        height: 8,
                        width: _currentPage == index ? 24 : 8,
                        decoration: BoxDecoration(
                          color: _currentPage == index
                              ? NatureTheme.forestGreen
                              : const Color(0xFFD3E0D3),
                          borderRadius: BorderRadius.circular(4),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  Row(
                    children: [
                      if (_currentPage > 0) ...[
                        Expanded(
                          flex: 1,
                          child: OutlinedButton(
                            onPressed: () {
                              _pageController.previousPage(
                                duration: const Duration(milliseconds: 300),
                                curve: Curves.easeInOut,
                              );
                            },
                            child: const Text('Back'),
                          ),
                        ),
                        const SizedBox(width: 12),
                      ],
                      Expanded(
                        flex: 2,
                        child: ElevatedButton(
                          onPressed: () {
                            if (_currentPage == _steps.length - 1) {
                              _finishTour();
                            } else {
                              _pageController.nextPage(
                                duration: const Duration(milliseconds: 300),
                                curve: Curves.easeInOut,
                              );
                            }
                          },
                          child: Text(
                            _currentPage == _steps.length - 1
                                ? 'Tour of the App'
                                : 'Next Step',
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class TourStep {
  final String badge;
  final String title;
  final String description;
  final IconData icon;
  final String tag;

  const TourStep({
    required this.badge,
    required this.title,
    required this.description,
    required this.icon,
    required this.tag,
  });
}
