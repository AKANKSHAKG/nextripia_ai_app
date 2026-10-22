import 'dart:async';
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../widgets/custom_button.dart';
import '../auth/login_screen.dart';
import '../tour/app_tour_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1400),
    );

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic),
    );

    _scaleAnimation = Tween<double>(begin: 0.88, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutBack),
    );

      _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.canvasBg,
      body: Stack(
        fit: StackFit.expand,
        children: [
          // Background scenic photography with subtle glassmorphic overlay
          Image.network(
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
            fit: BoxFit.cover,
            errorBuilder: (_, __, ___) => Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xFF00C6FF), Color(0xFF00BFA5)],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
              ),
            ),
          ),

          // Cinematic ambient gradient
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  AppTheme.canvasBg.withOpacity(0.92),
                  AppTheme.canvasBg.withOpacity(0.75),
                  AppTheme.darkPine.withOpacity(0.5),
                ],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
            ),
          ),

          SafeArea(
            child: Center(
              child: FadeTransition(
                opacity: _fadeAnimation,
                child: ScaleTransition(
                  scale: _scaleAnimation,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      // Circular Pin Badge with Mountain & River Glow
                      Container(
                        width: 108,
                        height: 108,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: AppTheme.pureWhite,
                          border: Border.all(color: AppTheme.pureWhite, width: 3),
                          boxShadow: [
                            BoxShadow(
                              color: AppTheme.skyCyan.withOpacity(0.4),
                              blurRadius: 30,
                              offset: const Offset(0, 10),
                            ),
                          ],
                        ),
                        child: Center(
                          child: Container(
                            width: 82,
                            height: 82,
                            decoration: const BoxDecoration(
                              shape: BoxShape.circle,
                              gradient: AppTheme.primaryGradient,
                            ),
                            child: const Icon(
                              Icons.terrain_rounded,
                              size: 46,
                              color: AppTheme.pureWhite,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),

                      // Brand Name matching Welcome Screen Typography
                      RichText(
                        text: const TextSpan(
                          text: 'NexTripia',
                          style: TextStyle(
                            fontFamily: 'Outfit',
                            fontSize: 36,
                            fontWeight: FontWeight.w900,
                            color: AppTheme.darkPine,
                            letterSpacing: -0.5,
                          ),
                          children: [
                            WidgetSpan(
                              alignment: PlaceholderAlignment.top,
                              child: Padding(
                                padding: EdgeInsets.only(left: 3, top: 4),
                                child: Text(
                                  'AI',
                                  style: TextStyle(
                                    fontFamily: 'Outfit',
                                    fontSize: 16,
                                    fontWeight: FontWeight.w900,
                                    color: AppTheme.vibrantTeal,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 8),

                      // Tagline in Signature Dark Pine
                      const Text(
                        'Dream Together. Travel Smarter.',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                          color: AppTheme.darkPine,
                          letterSpacing: 0.1,
                        ),
                      ),
                      const SizedBox(height: 6),

                      const Padding(
                        padding: EdgeInsets.symmetric(horizontal: 40),
                        child: Text(
                          'Plan your perfect group trip with AI — because better journeys are shared.',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                            color: AppTheme.mutedSlate,
                            height: 1.4,
                          ),
                        ),
                      ),
                      const SizedBox(height: 36),

                      // Primary "Tour of the App" Pill Button
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 24),
                        child: CustomButton(
                          label: 'Tour of the App',
                          icon: Icons.map_rounded,
                          variant: ButtonVariant.primary,
                          isPill: true,
                          onPressed: () {
                            Navigator.of(context).pushReplacement(
                              MaterialPageRoute(builder: (_) => const AppTourScreen()),
                            );
                          },
                        ),
                      ),
                      const SizedBox(height: 12),

                      // Secondary "Log In" Frosted Glass Pill Button
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 24),
                        child: CustomButton(
                          label: 'Log In',
                          variant: ButtonVariant.secondary,
                          isPill: true,
                          onPressed: () {
                            Navigator.of(context).pushReplacement(
                              MaterialPageRoute(builder: (_) => const LoginScreen()),
                            );
                          },
                        ),
                      ),
                      const SizedBox(height: 18),

                      // 3-Dot Pagination Indicator
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            width: 22,
                            height: 8,
                            decoration: BoxDecoration(
                              color: AppTheme.waterCyan,
                              borderRadius: BorderRadius.circular(4),
                              boxShadow: [
                                BoxShadow(
                                  color: AppTheme.waterCyan.withOpacity(0.5),
                                  blurRadius: 8,
                                  offset: const Offset(0, 2),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 6),
                          Container(
                            width: 8,
                            height: 8,
                            decoration: BoxDecoration(
                              color: AppTheme.pureWhite.withOpacity(0.6),
                              borderRadius: BorderRadius.circular(4),
                            ),
                          ),
                          const SizedBox(width: 6),
                          Container(
                            width: 8,
                            height: 8,
                            decoration: BoxDecoration(
                              color: AppTheme.pureWhite.withOpacity(0.6),
                              borderRadius: BorderRadius.circular(4),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
