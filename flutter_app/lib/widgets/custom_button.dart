import 'package:flutter/material.dart';
import '../config/theme.dart';

enum ButtonVariant { primary, secondary, outlined, accent }

class CustomButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;
  final ButtonVariant variant;
  final IconData? icon;
  final bool isLoading;
  final double height;
  final double? width;
  final bool isPill;

  const CustomButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.variant = ButtonVariant.primary,
    this.icon,
    this.isLoading = false,
    this.height = 52,
    this.width,
    this.isPill = true,
  });

  @override
  Widget build(BuildContext context) {
    final effectiveWidth = width ?? double.infinity;
    final borderRadius = BorderRadius.circular(isPill ? AppTheme.pillRadius : 14.0);

    // Accent: Warm Sunset Gold to Sunset Orange gradient
    if (variant == ButtonVariant.accent) {
      return Container(
        width: effectiveWidth,
        height: height,
        decoration: BoxDecoration(
          gradient: AppTheme.sunsetGradient,
          borderRadius: borderRadius,
          boxShadow: [
            BoxShadow(
              color: AppTheme.sunsetGold.withOpacity(0.35),
              blurRadius: 16,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: isLoading ? null : onPressed,
            borderRadius: borderRadius,
            child: Center(
              child: _buildChild(AppTheme.pureWhite),
            ),
          ),
        ),
      );
    }

    // Outlined / Frosted Border
    if (variant == ButtonVariant.outlined) {
      return Container(
        width: effectiveWidth,
        height: height,
        decoration: BoxDecoration(
          color: AppTheme.pureWhite.withOpacity(0.85),
          borderRadius: borderRadius,
          border: Border.all(color: AppTheme.pureWhite, width: 1.5),
          boxShadow: [
            BoxShadow(
              color: AppTheme.darkPine.withOpacity(0.06),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: isLoading ? null : onPressed,
            borderRadius: borderRadius,
            child: Center(
              child: _buildChild(AppTheme.darkPine),
            ),
          ),
        ),
      );
    }

    // Secondary: Light Sand / Cream frosted pill
    if (variant == ButtonVariant.secondary) {
      return Container(
        width: effectiveWidth,
        height: height,
        decoration: BoxDecoration(
          color: AppTheme.lightSand,
          borderRadius: borderRadius,
          border: Border.all(color: AppTheme.pureWhite, width: 1.2),
          boxShadow: [
            BoxShadow(
              color: AppTheme.darkPine.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: isLoading ? null : onPressed,
            borderRadius: borderRadius,
            child: Center(
              child: _buildChild(AppTheme.darkPine),
            ),
          ),
        ),
      );
    }

    // Default / Primary: Signature Welcome Screen Cyan -> Teal Gradient Pill
    return Container(
      width: effectiveWidth,
      height: height,
      decoration: BoxDecoration(
        gradient: AppTheme.primaryGradient,
        borderRadius: borderRadius,
        boxShadow: [
          BoxShadow(
            color: AppTheme.skyCyan.withOpacity(0.4),
            blurRadius: 18,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: isLoading ? null : onPressed,
          borderRadius: borderRadius,
          child: Center(
            child: _buildChild(AppTheme.pureWhite),
          ),
        ),
      ),
    );
  }

  Widget _buildChild(Color contentColor) {
    if (isLoading) {
      return SizedBox(
        width: 22,
        height: 22,
        child: CircularProgressIndicator(
          strokeWidth: 2.2,
          valueColor: AlwaysStoppedAnimation<Color>(contentColor),
        ),
      );
    }

    if (icon != null) {
      return Row(
        mainAxisAlignment: MainAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 18, color: contentColor),
          const SizedBox(width: 8),
          Text(
            label,
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w700,
              color: contentColor,
              letterSpacing: 0.2,
            ),
          ),
        ],
      );
    }

    return Text(
      label,
      style: TextStyle(
        fontSize: 15,
        fontWeight: FontWeight.w700,
        color: contentColor,
        letterSpacing: 0.2,
      ),
    );
  }
}
