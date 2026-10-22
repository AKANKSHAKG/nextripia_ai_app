import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../config/theme.dart';

/// Reusable network image with a clean, sage-green shimmer loading placeholder
/// and an elegant nature graphic fallback on broken URLs.
class SageCachedImage extends StatelessWidget {
  final String imageUrl;
  final double? width;
  final double? height;
  final BoxFit fit;
  final BorderRadius? borderRadius;

  const SageCachedImage({
    super.key,
    required this.imageUrl,
    this.width,
    this.height,
    this.fit = BoxFit.cover,
    this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    final clipRadius = borderRadius ?? BorderRadius.circular(AppTheme.cardRadius);

    return ClipRRect(
      borderRadius: clipRadius,
      child: CachedNetworkImage(
        imageUrl: imageUrl,
        width: width,
        height: height,
        fit: fit,
        placeholder: (context, url) => Container(
          width: width,
          height: height,
          color: AppTheme.softSage,
          child: Center(
            child: SizedBox(
              width: 24,
              height: 24,
              child: CircularProgressIndicator(
                strokeWidth: 2.5,
                valueColor: AlwaysStoppedAnimation<Color>(
                  AppTheme.forestGreen.withOpacity(0.6),
                ),
              ),
            ),
          ),
        ),
        errorWidget: (context, url, error) => Container(
          width: width,
          height: height,
          color: AppTheme.softSage,
          padding: const EdgeInsets.all(12),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.landscape_rounded,
                color: AppTheme.forestGreen.withOpacity(0.5),
                size: 32,
              ),
              const SizedBox(height: 6),
              const Text(
                'NexTripia Nature View',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.mutedSage,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
