import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// NexTripia AI Unified Visual Theme & Design System
/// Rebuilt to match the signature Welcome Screen branding:
/// - Main Accent: Sky/Water Cyan (#00C6FF to #00E5FF) & Vibrant Teal (#00BFA5)
/// - Brand Accent: Warm Sunset Orange/Gold (#FFA726 to #FF5722)
/// - Secondary / Card Surfaces: Soft Creamy Tan / Light Sand (#F2EFE9 to #FFFFFF)
/// - Page Canvas / Scaffold: Warm Off-White (#F7F9FB)
/// - Typography: Signature Dark Pine/Slate (#1A3A34) & Deep Indigo-Black (#0A1F1C)
/// - Buttons: Smooth rounded pill shape (border-radius: 24px) with gradient fills
/// - Cards: Floating journey thumbnail styling (16-20px radius, white outline, soft drop shadow)
class AppTheme {
  AppTheme._();

  // Core Color Palette Tokens
  static const Color skyCyan = Color(0xFF00C6FF);
  static const Color waterCyan = Color(0xFF00E5FF);
  static const Color vibrantTeal = Color(0xFF00BFA5);
  static const Color deepTeal = Color(0xFF00897B);

  // Sunset Gold / Orange Accents
  static const Color sunsetGold = Color(0xFFFFA726);
  static const Color sunsetOrange = Color(0xFFFF5722);

  // Backgrounds & Surfaces
  static const Color lightSand = Color(0xFFF2EFE9);
  static const Color warmCream = Color(0xFFFAF8F5);
  static const Color canvasBg = Color(0xFFF7F9FB);
  static const Color pureWhite = Color(0xFFFFFFFF);
  static const Color cardSurface = Color(0xFFFFFFFF);
  static const Color softBorder = Color(0xFFE2EBE8);

  // Typography Tokens
  static const Color darkPine = Color(0xFF1A3A34);
  static const Color deepIndigo = Color(0xFF0A1F1C);
  static const Color mutedSlate = Color(0xFF5A726D);
  static const Color textSecondary = Color(0xFF718078);

  // Legacy compatibility aliases for existing widgets
  static const Color forestGreen = Color(0xFF00BFA5); // Remapped to Vibrant Teal
  static const Color deepForestGreen = Color(0xFF1A3A34); // Remapped to Dark Pine
  static const Color softSage = Color(0xFFE0F7F6); // Soft cyan/teal tint
  static const Color darkSlate = Color(0xFF1A3A34);
  static const Color mutedSage = Color(0xFF5A726D);
  static const Color accentGold = Color(0xFFFFA726);
  static const Color errorRed = Color(0xFFFF5722);

  // Corner Radii & Dimensions
  static const double cardRadius = 18.0;
  static const double cardPadding = 16.0;
  static const double buttonRadius = 24.0;
  static const double pillRadius = 24.0;

  // Gradients
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [skyCyan, waterCyan, vibrantTeal],
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
  );

  static const LinearGradient tealCyanGradient = LinearGradient(
    colors: [skyCyan, vibrantTeal],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient sunsetGradient = LinearGradient(
    colors: [sunsetGold, sunsetOrange],
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
  );

  static const LinearGradient cardHeaderGradient = LinearGradient(
    colors: [Colors.black54, Colors.transparent],
    begin: Alignment.bottomCenter,
    end: Alignment.topCenter,
  );

  // Journey Thumbnail Card Box Decoration
  static BoxDecoration journeyCardDecoration({
    Color backgroundColor = pureWhite,
    double radius = cardRadius,
  }) {
    return BoxDecoration(
      color: backgroundColor,
      borderRadius: BorderRadius.circular(radius),
      border: Border.all(color: pureWhite, width: 1.5),
      boxShadow: [
        BoxShadow(
          color: darkPine.withOpacity(0.08),
          blurRadius: 16,
          offset: const Offset(0, 6),
        ),
      ],
    );
  }

  // Frosted Glassmorphism Box Decoration
  static BoxDecoration frostedGlassDecoration({
    double opacity = 0.85,
    double radius = pillRadius,
  }) {
    return BoxDecoration(
      color: pureWhite.withOpacity(opacity),
      borderRadius: BorderRadius.circular(radius),
      border: Border.all(color: pureWhite.withOpacity(0.9), width: 1.5),
      boxShadow: [
        BoxShadow(
          color: darkPine.withOpacity(0.12),
          blurRadius: 20,
          offset: const Offset(0, 8),
        ),
      ],
    );
  }

  static ThemeData get lightTheme {
    final baseTextTheme = GoogleFonts.plusJakartaSansTextTheme();

    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: canvasBg,
      colorScheme: const ColorScheme(
        brightness: Brightness.light,
        primary: vibrantTeal,
        onPrimary: pureWhite,
        primaryContainer: Color(0xFFE0F7F6),
        onPrimaryContainer: darkPine,
        secondary: skyCyan,
        onSecondary: pureWhite,
        secondaryContainer: lightSand,
        onSecondaryContainer: darkPine,
        tertiary: sunsetGold,
        onTertiary: pureWhite,
        surface: pureWhite,
        onSurface: darkPine,
        error: sunsetOrange,
        onError: pureWhite,
      ),
      textTheme: baseTextTheme.copyWith(
        displayLarge: GoogleFonts.outfit(
          fontSize: 32,
          fontWeight: FontWeight.w800,
          letterSpacing: -0.5,
          color: darkPine,
        ),
        displayMedium: GoogleFonts.outfit(
          fontSize: 26,
          fontWeight: FontWeight.w800,
          letterSpacing: -0.3,
          color: darkPine,
        ),
        headlineMedium: GoogleFonts.plusJakartaSans(
          fontSize: 20,
          fontWeight: FontWeight.w700,
          color: darkPine,
        ),
        titleLarge: GoogleFonts.plusJakartaSans(
          fontSize: 18,
          fontWeight: FontWeight.w700,
          color: darkPine,
        ),
        titleMedium: GoogleFonts.plusJakartaSans(
          fontSize: 15,
          fontWeight: FontWeight.w600,
          color: darkPine,
        ),
        bodyLarge: GoogleFonts.plusJakartaSans(
          fontSize: 15,
          fontWeight: FontWeight.w400,
          color: darkPine,
        ),
        bodyMedium: GoogleFonts.plusJakartaSans(
          fontSize: 13,
          fontWeight: FontWeight.w400,
          color: mutedSlate,
        ),
        labelLarge: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          fontWeight: FontWeight.w700,
          color: pureWhite,
        ),
      ),
      cardTheme: CardTheme(
        color: pureWhite,
        elevation: 0,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(cardRadius),
          side: const BorderSide(color: pureWhite, width: 1.5),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: vibrantTeal,
          foregroundColor: pureWhite,
          elevation: 2,
          shadowColor: vibrantTeal.withOpacity(0.4),
          minimumSize: const Size(double.infinity, 52),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(buttonRadius),
          ),
          textStyle: GoogleFonts.plusJakartaSans(
            fontSize: 15,
            fontWeight: FontWeight.w700,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: darkPine,
          minimumSize: const Size(double.infinity, 52),
          side: const BorderSide(color: softBorder, width: 1.5),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(buttonRadius),
          ),
          textStyle: GoogleFonts.plusJakartaSans(
            fontSize: 15,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: pureWhite,
        contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 15),
        hintStyle: GoogleFonts.plusJakartaSans(
          color: mutedSlate,
          fontSize: 14,
        ),
        labelStyle: GoogleFonts.plusJakartaSans(
          color: darkPine,
          fontSize: 14,
          fontWeight: FontWeight.w600,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: softBorder),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: softBorder),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: vibrantTeal, width: 2),
        ),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: canvasBg,
        elevation: 0,
        centerTitle: false,
        iconTheme: const IconThemeData(color: darkPine),
        titleTextStyle: GoogleFonts.outfit(
          fontSize: 20,
          fontWeight: FontWeight.w800,
          color: darkPine,
        ),
      ),
    );
  }
}
