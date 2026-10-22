import 'package:flutter/material.dart';
import '../../config/theme.dart';

/// Legacy alias for AppTheme to guarantee 100% visual unification with Welcome Screen
/// All tokens point directly to AppTheme:
/// - Primary / Accent: Sky Cyan (#00C6FF) & Vibrant Teal (#00BFA5)
/// - Accent Gold: Sunset Gold (#FFA726 to #FF5722)
/// - Canvas: Off-White (#F7F9FB)
/// - Cards: Soft Light Sand (#F2EFE9 to #FFFFFF)
/// - Typography: Dark Pine Slate (#1A3A34)
class NatureTheme {
  NatureTheme._();

  static const Color forestGreen = AppTheme.vibrantTeal;
  static const Color deepForestGreen = AppTheme.darkPine;
  static const Color softSage = AppTheme.softCyanShimmer;
  static const Color warmCream = AppTheme.canvasOffWhite;
  static const Color primaryText = AppTheme.darkPine;
  static const Color secondaryText = AppTheme.mutedSlate;
  static const Color pureWhite = AppTheme.pureWhite;
  static const Color accentGold = AppTheme.sunsetGold;
  static const Color errorRed = Color(0xFFBA1A1A);
  static const Color surfaceMuted = AppTheme.lightSand;

  static ThemeData get lightTheme => AppTheme.lightTheme;
}
