import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../services/auth_service.dart';
import '../../widgets/custom_button.dart';
import '../hub/home_dashboard_screen.dart';
import '../tour/app_tour_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController(text: 'aria.kapoor@nextripia.ai');
  final _passwordController = TextEditingController(text: 'travelharmony2026');
  final _nameController = TextEditingController(text: 'Aria Kapoor');

  bool _isSignUp = false;
  bool _isLoading = false;
  bool _obscurePassword = true;
  String? _errorMessage;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _nameController.dispose();
    super.dispose();
  }

  Future<void> _handleEmailAuth() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      if (_isSignUp) {
        await AuthService.instance.register(
          name: _nameController.text.trim(),
          email: _emailController.text.trim(),
          password: _passwordController.text,
        );
      } else {
        await AuthService.instance.signInWithEmailPassword(
          email: _emailController.text.trim(),
          password: _passwordController.text,
        );
      }

      if (mounted) {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (_) => const HomeDashboardScreen()),
        );
      }
    } catch (e) {
      setState(() {
        _errorMessage = 'Authentication failed. Please verify credentials.';
      });
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _handleGoogleAuth() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      await AuthService.instance.signInWithGoogle();
      if (mounted) {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (_) => const HomeDashboardScreen()),
        );
      }
    } catch (_) {
      setState(() => _errorMessage = 'Google sign-in could not be completed.');
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final bottomInset = MediaQuery.of(context).viewInsets.bottom;

    return Scaffold(
      backgroundColor: AppTheme.canvasBg,
      body: Stack(
        fit: StackFit.expand,
        children: [
          // Background scenic mountain/lake nature photo
          Image.network(
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
            fit: BoxFit.cover,
            errorBuilder: (_, __, ___) => Container(
              color: AppTheme.canvasBg,
            ),
          ),

          // Cinematic ambient glassmorphic overlay
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  AppTheme.canvasBg.withOpacity(0.88),
                  AppTheme.canvasBg.withOpacity(0.95),
                  AppTheme.darkPine.withOpacity(0.7),
                ],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                stops: const [0.0, 0.5, 1.0],
              ),
            ),
          ),

          SafeArea(
            child: LayoutBuilder(
              builder: (context, constraints) {
                return SingleChildScrollView(
                  physics: const BouncingScrollPhysics(),
                  padding: EdgeInsets.fromLTRB(24, 16, 24, 32 + bottomInset),
                  child: ConstrainedBox(
                    constraints: BoxConstraints(
                      minHeight: constraints.maxHeight - 48,
                    ),
                    child: IntrinsicHeight(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          // Top Bar with Brand Badge
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                children: [
                                  Container(
                                    width: 36,
                                    height: 36,
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      gradient: AppTheme.primaryGradient,
                                      boxShadow: [
                                        BoxShadow(
                                          color: AppTheme.skyCyan.withOpacity(0.4),
                                          blurRadius: 10,
                                          offset: const Offset(0, 3),
                                        ),
                                      ],
                                    ),
                                    child: const Icon(
                                      Icons.terrain_rounded,
                                      size: 20,
                                      color: AppTheme.pureWhite,
                                    ),
                                  ),
                                  const SizedBox(width: 8),
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

                              // "Tour the App" Pill Button
                              TextButton.icon(
                                onPressed: () {
                                  Navigator.of(context).push(
                                    MaterialPageRoute(
                                      builder: (_) => const AppTourScreen(),
                                    ),
                                  );
                                },
                                icon: const Icon(
                                  Icons.explore_outlined,
                                  size: 15,
                                  color: AppTheme.vibrantTeal,
                                ),
                                label: const Text(
                                  'Tour the App',
                                  style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w700,
                                    color: AppTheme.vibrantTeal,
                                  ),
                                ),
                                style: TextButton.styleFrom(
                                  backgroundColor: AppTheme.pureWhite.withOpacity(0.9),
                                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(16),
                                    side: BorderSide(color: AppTheme.pureWhite),
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 24),

                          // Heading
                          Text(
                            _isSignUp ? 'Create Your Account' : 'Welcome Back',
                            style: const TextStyle(
                              fontFamily: 'Outfit',
                              fontSize: 28,
                              fontWeight: FontWeight.w900,
                              color: AppTheme.darkPine,
                              letterSpacing: -0.3,
                            ),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            _isSignUp
                                ? 'Join your travel circle and plan trips fairly.'
                                : 'Sign in to access your shared trip rooms.',
                            style: const TextStyle(
                              fontSize: 14,
                              color: AppTheme.mutedSlate,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          const SizedBox(height: 20),

                          // Frosted Glassmorphism Card Container
                          Container(
                            padding: const EdgeInsets.all(22),
                            decoration: AppTheme.journeyCardDecoration(
                              backgroundColor: AppTheme.pureWhite.withOpacity(0.92),
                              radius: 22,
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                // Toggle: Sign In vs Sign Up (Pill Tabs)
                                Container(
                                  padding: const EdgeInsets.all(4),
                                  decoration: BoxDecoration(
                                    color: AppTheme.lightSand,
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                  child: Row(
                                    children: [
                                      Expanded(
                                        child: GestureDetector(
                                          onTap: () => setState(() => _isSignUp = false),
                                          child: AnimatedContainer(
                                            duration: const Duration(milliseconds: 200),
                                            padding: const EdgeInsets.symmetric(vertical: 9),
                                            decoration: BoxDecoration(
                                              color: !_isSignUp
                                                  ? AppTheme.pureWhite
                                                  : Colors.transparent,
                                              borderRadius: BorderRadius.circular(16),
                                              boxShadow: !_isSignUp
                                                  ? [
                                                      BoxShadow(
                                                        color: AppTheme.darkPine.withOpacity(0.08),
                                                        blurRadius: 8,
                                                        offset: const Offset(0, 2),
                                                      ),
                                                    ]
                                                  : null,
                                            ),
                                            child: Text(
                                              'Log In',
                                              textAlign: TextAlign.center,
                                              style: TextStyle(
                                                fontSize: 13,
                                                fontWeight: FontWeight.w800,
                                                color: !_isSignUp
                                                    ? AppTheme.darkPine
                                                    : AppTheme.mutedSlate,
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                      Expanded(
                                        child: GestureDetector(
                                          onTap: () => setState(() => _isSignUp = true),
                                          child: AnimatedContainer(
                                            duration: const Duration(milliseconds: 200),
                                            padding: const EdgeInsets.symmetric(vertical: 9),
                                            decoration: BoxDecoration(
                                              color: _isSignUp
                                                  ? AppTheme.pureWhite
                                                  : Colors.transparent,
                                              borderRadius: BorderRadius.circular(16),
                                              boxShadow: _isSignUp
                                                  ? [
                                                      BoxShadow(
                                                        color: AppTheme.darkPine.withOpacity(0.08),
                                                        blurRadius: 8,
                                                        offset: const Offset(0, 2),
                                                      ),
                                                    ]
                                                  : null,
                                            ),
                                            child: Text(
                                              'Sign Up',
                                              textAlign: TextAlign.center,
                                              style: TextStyle(
                                                fontSize: 13,
                                                fontWeight: FontWeight.w800,
                                                color: _isSignUp
                                                    ? AppTheme.darkPine
                                                    : AppTheme.mutedSlate,
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(height: 20),

                                // Error Banner
                                if (_errorMessage != null)
                                  Container(
                                    padding: const EdgeInsets.all(12),
                                    margin: const EdgeInsets.only(bottom: 16),
                                    decoration: BoxDecoration(
                                      color: AppTheme.sunsetOrange.withOpacity(0.12),
                                      borderRadius: BorderRadius.circular(12),
                                      border: Border.all(
                                        color: AppTheme.sunsetOrange.withOpacity(0.4),
                                      ),
                                    ),
                                    child: Row(
                                      children: [
                                        const Icon(
                                          Icons.info_outline_rounded,
                                          size: 16,
                                          color: AppTheme.sunsetOrange,
                                        ),
                                        const SizedBox(width: 8),
                                        Expanded(
                                          child: Text(
                                            _errorMessage!,
                                            style: const TextStyle(
                                              fontSize: 12,
                                              fontWeight: FontWeight.w600,
                                              color: AppTheme.sunsetOrange,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),

                                // Full Name (Sign up only)
                                if (_isSignUp) ...[
                                  TextFormField(
                                    controller: _nameController,
                                    decoration: const InputDecoration(
                                      labelText: 'Full Name',
                                      hintText: 'Aria Kapoor',
                                      prefixIcon: Icon(Icons.person_outline_rounded),
                                    ),
                                  ),
                                  const SizedBox(height: 14),
                                ],

                                // Email Input
                                TextFormField(
                                  controller: _emailController,
                                  keyboardType: TextInputType.emailAddress,
                                  decoration: const InputDecoration(
                                    labelText: 'Email Address',
                                    hintText: 'aria.kapoor@nextripia.ai',
                                    prefixIcon: Icon(Icons.mail_outline_rounded),
                                  ),
                                ),
                                const SizedBox(height: 14),

                                // Password Input
                                TextFormField(
                                  controller: _passwordController,
                                  obscureText: _obscurePassword,
                                  decoration: InputDecoration(
                                    labelText: 'Password',
                                    hintText: '••••••••',
                                    prefixIcon: const Icon(Icons.lock_outline_rounded),
                                    suffixIcon: IconButton(
                                      icon: Icon(
                                        _obscurePassword
                                            ? Icons.visibility_off_outlined
                                            : Icons.visibility_outlined,
                                        size: 20,
                                      ),
                                      onPressed: () => setState(
                                        () => _obscurePassword = !_obscurePassword,
                                      ),
                                    ),
                                  ),
                                ),
                                const SizedBox(height: 22),

                                // Primary Cyan -> Teal Gradient Pill Action
                                CustomButton(
                                  label: _isSignUp ? 'Create My Account' : 'Log In',
                                  icon: _isSignUp ? Icons.person_add_rounded : Icons.login_rounded,
                                  isLoading: _isLoading,
                                  variant: ButtonVariant.primary,
                                  isPill: true,
                                  onPressed: _handleEmailAuth,
                                ),
                                const SizedBox(height: 16),

                                // Divider
                                Row(
                                  children: [
                                    const Expanded(child: Divider(color: AppTheme.softBorder)),
                                    Padding(
                                      padding: const EdgeInsets.symmetric(horizontal: 12),
                                      child: Text(
                                        'OR CONTINUE WITH',
                                        style: TextStyle(
                                          fontSize: 10,
                                          fontWeight: FontWeight.w700,
                                          color: AppTheme.mutedSlate,
                                          letterSpacing: 0.5,
                                        ),
                                      ),
                                    ),
                                    const Expanded(child: Divider(color: AppTheme.softBorder)),
                                  ],
                                ),
                                const SizedBox(height: 14),

                                // Google Sign In Button
                                OutlinedButton.icon(
                                  onPressed: _isLoading ? null : _handleGoogleAuth,
                                  icon: const Icon(Icons.g_mobiledata_rounded, size: 24),
                                  label: const Text('Continue with Google'),
                                  style: OutlinedButton.styleFrom(
                                    backgroundColor: AppTheme.pureWhite,
                                    side: const BorderSide(color: AppTheme.softBorder),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(AppTheme.pillRadius),
                                    ),
                                    padding: const EdgeInsets.symmetric(vertical: 14),
                                  ),
                                ),
                              ],
                            ),
                          ),

                          const Spacer(),
                          const SizedBox(height: 16),

                          // Slogan & Security Footer
                          Center(
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const Icon(
                                  Icons.shield_outlined,
                                  size: 14,
                                  color: AppTheme.pureWhite,
                                ),
                                const SizedBox(width: 6),
                                Text(
                                  'Protected by NexTripia AI Privacy Safeguard',
                                  style: TextStyle(
                                    fontSize: 11,
                                    fontWeight: FontWeight.w600,
                                    color: AppTheme.pureWhite.withOpacity(0.9),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
