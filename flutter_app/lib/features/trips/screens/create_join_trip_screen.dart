import 'dart:math';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import '../../../core/theme/nature_theme.dart';
import '../models/trip_model.dart';

class CreateJoinTripScreen extends StatefulWidget {
  const CreateJoinTripScreen({super.key});

  @override
  State<CreateJoinTripScreen> createState() => _CreateJoinTripScreenState();
}

class _CreateJoinTripScreenState extends State<CreateJoinTripScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  // Create Form State
  final _createFormKey = GlobalKey<FormState>();
  final _tripNameController = TextEditingController();
  final _destinationsController = TextEditingController();
  DateTime _startDate = DateTime.now().add(const Duration(days: 14));
  DateTime _endDate = DateTime.now().add(const Duration(days: 20));
  int _groupSize = 4;
  String _selectedVibe = 'Balanced';
  bool _isCreating = false;
  TripModel? _createdTrip;

  // Join Form State
  final _joinFormKey = GlobalKey<FormState>();
  final _inviteCodeController = TextEditingController();
  bool _isJoining = false;
  String? _joinError;
  TripModel? _foundTrip;

  final List<String> _vibeOptions = const [
    'Balanced',
    'Adventure & Trekking',
    'Scenic & Relaxed',
    'Food & Culture',
    'Off-grid Nature',
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _tripNameController.dispose();
    _destinationsController.dispose();
    _inviteCodeController.dispose();
    super.dispose();
  }

  String _generateInvitationCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    final random = Random();
    final randomStr =
        List.generate(6, (index) => chars[random.nextInt(chars.length)]).join();
    return 'NEXT-$randomStr';
  }

  Future<void> _handleCreateTrip() async {
    if (!_createFormKey.currentState!.validate()) return;

    setState(() => _isCreating = true);

    try {
      // In production, call Django REST endpoint POST /api/trips/
      final destinations = _destinationsController.text
          .split(',')
          .map((s) => s.trim())
          .where((s) => s.isNotEmpty)
          .toList();

      final inviteCode = _generateInvitationCode();
      final newTrip = TripModel(
        id: 'trip_${DateTime.now().millisecondsSinceEpoch}',
        title: _tripNameController.text.trim(),
        invitationCode: inviteCode,
        createdByUserId: 'usr_current',
        createdByName: 'You (Organizer)',
        startDate: _startDate,
        endDate: _endDate,
        estimatedGroupSize: _groupSize,
        primaryDestinations: destinations,
        vibe: _selectedVibe,
        members: [
          TripMember(
            userId: 'usr_current',
            name: 'You (Organizer)',
            email: 'organizer@nextripia.app',
            role: 'host',
            hasSubmittedPreferences: true,
            joinedAt: DateTime.now(),
          ),
        ],
        createdAt: DateTime.now(),
      );

      await Future.delayed(const Duration(milliseconds: 800));

      setState(() {
        _createdTrip = newTrip;
      });
    } finally {
      if (mounted) setState(() => _isCreating = false);
    }
  }

  Future<void> _handleJoinTrip() async {
    if (!_joinFormKey.currentState!.validate()) return;

    setState(() {
      _isJoining = true;
      _joinError = null;
      _foundTrip = null;
    });

    try {
      final code = _inviteCodeController.text.trim().toUpperCase();
      // In production, GET /api/trips/verify/?code=...
      await Future.delayed(const Duration(milliseconds: 900));

      if (code.contains('FAIL')) {
        setState(() {
          _joinError = 'No trip found for code "$code". Please check with your trip organizer.';
        });
        return;
      }

      // Valid preview
      setState(() {
        _foundTrip = TripModel(
          id: 'trip_demo_101',
          title: 'Western Ghats Wilderness Retreat',
          invitationCode: code,
          createdByUserId: 'usr_host_1',
          createdByName: 'Rohan Sharma',
          startDate: DateTime.now().add(const Duration(days: 10)),
          endDate: DateTime.now().add(const Duration(days: 15)),
          estimatedGroupSize: 5,
          primaryDestinations: ['Agumbe Rainforest', 'Chikmagalur', 'Kudremukh'],
          vibe: 'Scenic & Relaxed',
          members: [
            TripMember(
              userId: 'usr_host_1',
              name: 'Rohan Sharma',
              email: 'rohan@example.com',
              role: 'host',
              hasSubmittedPreferences: true,
              joinedAt: DateTime.now().subtract(const Duration(days: 2)),
            ),
            TripMember(
              userId: 'usr_m_2',
              name: 'Sneha Patel',
              email: 'sneha@example.com',
              role: 'member',
              hasSubmittedPreferences: true,
              joinedAt: DateTime.now().subtract(const Duration(days: 1)),
            ),
          ],
          createdAt: DateTime.now().subtract(const Duration(days: 2)),
        );
      });
    } finally {
      if (mounted) setState(() => _isJoining = false);
    }
  }

  Future<void> _selectDateRange() async {
    final picked = await showDateRangePicker(
      context: context,
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 730)),
      initialDateRange: DateTimeRange(start: _startDate, end: _endDate),
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: const ColorScheme.light(
              primary: NatureTheme.forestGreen,
              onPrimary: Colors.white,
              surface: NatureTheme.warmCream,
              onSurface: NatureTheme.primaryText,
            ),
          ),
          child: child!,
        );
      },
    );

    if (picked != null) {
      setState(() {
        _startDate = picked.start;
        _endDate = picked.end;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('MMM dd, yyyy');

    return Scaffold(
      backgroundColor: NatureTheme.warmCream,
      appBar: AppBar(
        title: Text(
          'Start Your Journey',
          style: GoogleFonts.outfit(
            fontWeight: FontWeight.w700,
            fontSize: 20,
            color: NatureTheme.primaryText,
          ),
        ),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: NatureTheme.forestGreen,
          labelColor: NatureTheme.forestGreen,
          unselectedLabelColor: NatureTheme.secondaryText,
          labelStyle: GoogleFonts.plusJakartaSans(
            fontWeight: FontWeight.w700,
            fontSize: 14,
          ),
          unselectedLabelStyle: GoogleFonts.plusJakartaSans(
            fontWeight: FontWeight.w500,
            fontSize: 14,
          ),
          tabs: const [
            Tab(icon: Icon(Icons.add_location_alt_rounded), text: 'Create a Trip'),
            Tab(icon: Icon(Icons.group_add_rounded), text: 'Join with Code'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // TAB 1: CREATE A TRIP
          _createdTrip != null
              ? _buildTripCreatedSuccess(dateFormat)
              : _buildCreateTripForm(dateFormat),

          // TAB 2: JOIN A TRIP
          _buildJoinTripView(dateFormat),
        ],
      ),
    );
  }

  Widget _buildCreateTripForm(DateFormat dateFormat) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(22),
      child: Form(
        key: _createFormKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Trip Overview',
              style: GoogleFonts.outfit(
                fontSize: 18,
                fontWeight: FontWeight.w700,
                color: NatureTheme.primaryText,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'Set the foundational parameters for your group travel circle.',
              style: GoogleFonts.plusJakartaSans(
                fontSize: 13,
                color: NatureTheme.secondaryText,
              ),
            ),
            const SizedBox(height: 18),

            // Trip Name
            TextFormField(
              controller: _tripNameController,
              decoration: const InputDecoration(
                labelText: 'Trip Name',
                hintText: 'e.g. Monsoon Escape to Wayanad',
                prefixIcon: Icon(Icons.flight_takeoff_rounded),
              ),
              validator: (v) =>
                  (v == null || v.trim().isEmpty) ? 'Please name your trip' : null,
            ),
            const SizedBox(height: 16),

            // Primary Destinations
            TextFormField(
              controller: _destinationsController,
              decoration: const InputDecoration(
                labelText: 'Candidate Destinations / Region',
                hintText: 'e.g. Coorg, Ooty, Wayanad (comma separated)',
                prefixIcon: Icon(Icons.map_rounded),
              ),
              validator: (v) => (v == null || v.trim().isEmpty)
                  ? 'Enter at least one destination idea'
                  : null,
            ),
            const SizedBox(height: 16),

            // Dates Selector
            InkWell(
              onTap: _selectDateRange,
              borderRadius: BorderRadius.circular(14),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                decoration: BoxDecoration(
                  color: NatureTheme.pureWhite,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: const Color(0xFFD6E2D6)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.calendar_month_rounded,
                        color: NatureTheme.forestGreen),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Travel Dates & Duration',
                            style: GoogleFonts.plusJakartaSans(
                              fontSize: 11,
                              color: NatureTheme.secondaryText,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            '${dateFormat.format(_startDate)} – ${dateFormat.format(_endDate)} (${_endDate.difference(_startDate).inDays + 1} days)',
                            style: GoogleFonts.plusJakartaSans(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              color: NatureTheme.primaryText,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const Icon(Icons.edit_calendar_rounded,
                        size: 20, color: NatureTheme.forestGreen),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Group Size Selector
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: NatureTheme.pureWhite,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: const Color(0xFFD6E2D6)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.group_rounded, color: NatureTheme.forestGreen),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Estimated Travellers',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 11,
                            color: NatureTheme.secondaryText,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        Text(
                          '$_groupSize people',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 15,
                            fontWeight: FontWeight.w600,
                            color: NatureTheme.primaryText,
                          ),
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    onPressed: _groupSize > 2
                        ? () => setState(() => _groupSize--)
                        : null,
                    icon: const Icon(Icons.remove_circle_outline),
                    color: NatureTheme.forestGreen,
                  ),
                  Text(
                    '$_groupSize',
                    style: GoogleFonts.outfit(
                      fontSize: 16,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  IconButton(
                    onPressed: _groupSize < 20
                        ? () => setState(() => _groupSize++)
                        : null,
                    icon: const Icon(Icons.add_circle_outline),
                    color: NatureTheme.forestGreen,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Trip Vibe Dropdown
            DropdownButtonFormField<String>(
              value: _selectedVibe,
              decoration: const InputDecoration(
                labelText: 'Group Travel Style',
                prefixIcon: Icon(Icons.nature_people_rounded),
              ),
              items: _vibeOptions
                  .map(
                    (v) => DropdownMenuItem(
                      value: v,
                      child: Text(v),
                    ),
                  )
                  .toList(),
              onChanged: (val) {
                if (val != null) setState(() => _selectedVibe = val);
              },
            ),
            const SizedBox(height: 28),

            // Submit Button
            ElevatedButton(
              onPressed: _isCreating ? null : _handleCreateTrip,
              child: _isCreating
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        color: Colors.white,
                        strokeWidth: 2,
                      ),
                    )
                  : const Text('Generate Trip & Invite Code'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTripCreatedSuccess(DateFormat dateFormat) {
    final trip = _createdTrip!;
    return SingleChildScrollView(
      padding: const EdgeInsets.all(22),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: NatureTheme.pureWhite,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: NatureTheme.forestGreen, width: 1.5),
              boxShadow: [
                BoxShadow(
                  color: NatureTheme.forestGreen.withOpacity(0.08),
                  blurRadius: 20,
                  offset: const Offset(0, 8),
                ),
              ],
            ),
            child: Column(
              children: [
                const Icon(
                  Icons.check_circle_rounded,
                  color: NatureTheme.forestGreen,
                  size: 56,
                ),
                const SizedBox(height: 14),
                Text(
                  'Trip Successfully Created!',
                  style: GoogleFonts.outfit(
                    fontSize: 22,
                    fontWeight: FontWeight.w700,
                    color: NatureTheme.primaryText,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  trip.title,
                  textAlign: TextAlign.center,
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: NatureTheme.deepForestGreen,
                  ),
                ),
                const SizedBox(height: 20),

                // Invitation Code Box
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
                  decoration: BoxDecoration(
                    color: NatureTheme.softSage,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: const Color(0xFFC3D8C3)),
                  ),
                  child: Column(
                    children: [
                      Text(
                        'GROUP INVITATION CODE',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          letterSpacing: 1.2,
                          color: NatureTheme.deepForestGreen,
                        ),
                      ),
                      const SizedBox(height: 8),
                      SelectableText(
                        trip.invitationCode,
                        style: GoogleFonts.outfit(
                          fontSize: 28,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 4,
                          color: NatureTheme.primaryText,
                        ),
                      ),
                    ],
                  ),
                // Visual QR Code Placeholder Container
                Container(
                  margin: const EdgeInsets.symmetric(vertical: 16),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: NatureTheme.warmCream,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: const Color(0xFFD6E2D6)),
                  ),
                  child: Column(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.04),
                              blurRadius: 10,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Stack(
                          alignment: Alignment.center,
                          children: [
                            // QR Visual Pattern Placeholder
                            Container(
                              width: 140,
                              height: 140,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(8),
                                color: const Color(0xFFF2F5F2),
                              ),
                              child: CustomPaint(
                                painter: _QrCodePlaceholderPainter(),
                              ),
                            ),
                            // Center NexTripia Compass Emblem
                            Container(
                              width: 38,
                              height: 38,
                              decoration: BoxDecoration(
                                color: NatureTheme.forestGreen,
                                borderRadius: BorderRadius.circular(10),
                                border: Border.all(color: Colors.white, width: 2),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withOpacity(0.12),
                                    blurRadius: 6,
                                  ),
                                ],
                              ),
                              child: const Icon(
                                Icons.explore_rounded,
                                color: Colors.white,
                                size: 20,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 10),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(
                            Icons.qr_code_scanner_rounded,
                            size: 16,
                            color: NatureTheme.forestGreen,
                          ),
                          const SizedBox(width: 6),
                          Text(
                            'Scan with phone camera to join instantly',
                            style: GoogleFonts.plusJakartaSans(
                              fontSize: 11.5,
                              fontWeight: FontWeight.w600,
                              color: NatureTheme.secondaryText,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),

                Text(
                  'Share this code or QR with your travel buddies. Each member joins this trip room and independently submits preferences.',
                  textAlign: TextAlign.center,
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 12.5,
                    color: NatureTheme.secondaryText,
                  ),
                ),
                const SizedBox(height: 20),

                // Dedicated Share via WhatsApp Button
                ElevatedButton.icon(
                  onPressed: () {
                    // In production, execute launchUrl with whatsapp scheme:
                    // final text = Uri.encodeComponent(
                    //   'Hey! Join our trip "${trip.title}" on NexTripia AI.\nInvite code: ${trip.invitationCode}\nDates: ${dateFormat.format(trip.startDate)} to ${dateFormat.format(trip.endDate)}'
                    // );
                    // launchUrl(Uri.parse('whatsapp://send?text=$text'), mode: LaunchMode.externalApplication);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('Opening WhatsApp with invitation for "${trip.title}"...'),
                        backgroundColor: const Color(0xFF25D366),
                      ),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF25D366),
                    foregroundColor: Colors.white,
                  ),
                  icon: const Icon(Icons.chat_bubble_rounded),
                  label: const Text('Share via WhatsApp'),
                ),
                const SizedBox(height: 10),

                // Standard Copy / System Share Button
                OutlinedButton.icon(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('Copied invite code ${trip.invitationCode}'),
                        backgroundColor: NatureTheme.deepForestGreen,
                      ),
                    );
                  },
                  icon: const Icon(Icons.copy_rounded),
                  label: const Text('Copy Invitation Message'),
                ),
                const SizedBox(height: 10),

                // Continue to Individual Preferences
                ElevatedButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Opening Individual Preferences setup...'),
                      ),
                    );
                  },
                  child: const Text('Enter My Travel Preferences'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildJoinTripView(DateFormat dateFormat) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(22),
      child: Form(
        key: _joinFormKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Join an Existing Trip',
              style: GoogleFonts.outfit(
                fontSize: 18,
                fontWeight: FontWeight.w700,
                color: NatureTheme.primaryText,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'Enter the 6-character code shared by your trip organizer.',
              style: GoogleFonts.plusJakartaSans(
                fontSize: 13,
                color: NatureTheme.secondaryText,
              ),
            ),
            const SizedBox(height: 20),

            // Invitation Code Input
            TextFormField(
              controller: _inviteCodeController,
              textCapitalization: TextCapitalization.characters,
              decoration: const InputDecoration(
                labelText: 'Invitation Code',
                hintText: 'e.g. NEXT-7K9M2P',
                prefixIcon: Icon(Icons.vpn_key_rounded),
              ),
              validator: (v) {
                if (v == null || v.trim().isEmpty) {
                  return 'Please enter the invite code';
                }
                if (!v.trim().toUpperCase().startsWith('NEXT-') &&
                    v.trim().length < 6) {
                  return 'Code must be in format NEXT-XXXXXX';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),

            if (_joinError != null) ...[
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFFFDE8E8),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: const Color(0xFFF8B4B4)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.error_outline_rounded,
                        color: NatureTheme.errorRed, size: 18),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        _joinError!,
                        style: GoogleFonts.plusJakartaSans(
                          color: NatureTheme.errorRed,
                          fontSize: 12.5,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
            ],

            ElevatedButton(
              onPressed: _isJoining ? null : _handleJoinTrip,
              child: _isJoining
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        color: Colors.white,
                        strokeWidth: 2,
                      ),
                    )
                  : const Text('Verify & Find Trip'),
            ),
            const SizedBox(height: 24),

            // Found Trip Card
            if (_foundTrip != null) ...[
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: NatureTheme.pureWhite,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: NatureTheme.softSage, width: 1.5),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.05),
                      blurRadius: 16,
                      offset: const Offset(0, 6),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: NatureTheme.softSage,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            'Trip Found',
                            style: GoogleFonts.plusJakartaSans(
                              fontSize: 12,
                              fontWeight: FontWeight.w700,
                              color: NatureTheme.deepForestGreen,
                            ),
                          ),
                        ),
                        const Spacer(),
                        Text(
                          _foundTrip!.invitationCode,
                          style: GoogleFonts.outfit(
                            fontWeight: FontWeight.w700,
                            color: NatureTheme.forestGreen,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      _foundTrip!.title,
                      style: GoogleFonts.outfit(
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                        color: NatureTheme.primaryText,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Organized by ${_foundTrip!.createdByName}',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 13,
                        color: NatureTheme.secondaryText,
                      ),
                    ),
                    const Divider(height: 24),
                    Row(
                      children: [
                        const Icon(Icons.calendar_today_rounded,
                            size: 16, color: NatureTheme.forestGreen),
                        const SizedBox(width: 8),
                        Text(
                          '${dateFormat.format(_foundTrip!.startDate)} – ${dateFormat.format(_foundTrip!.endDate)}',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        const Icon(Icons.people_outline_rounded,
                            size: 16, color: NatureTheme.forestGreen),
                        const SizedBox(width: 8),
                        Text(
                          '${_foundTrip!.members.length} member(s) joined so far',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text(
                                'Joined ${_foundTrip!.title}! Proceeding to individual preferences.'),
                            backgroundColor: NatureTheme.deepForestGreen,
                          ),
                        );
                      },
                      child: const Text('Join This Trip Room'),
                    ),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _QrCodePlaceholderPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final darkPaint = Paint()..color = const Color(0xFF1E2922);
    final greenPaint = Paint()..color = NatureTheme.forestGreen;

    // Corner Finder Patterns
    // Top-Left
    canvas.drawRRect(RRect.fromRectAndRadius(const Rect.fromLTWH(8, 8, 36, 36), const Radius.circular(6)), darkPaint);
    canvas.drawRRect(RRect.fromRectAndRadius(const Rect.fromLTWH(14, 14, 24, 24), const Radius.circular(4)), Paint()..color = Colors.white);
    canvas.drawRRect(RRect.fromRectAndRadius(const Rect.fromLTWH(20, 20, 12, 12), const Radius.circular(2)), greenPaint);

    // Top-Right
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(size.width - 44, 8, 36, 36), const Radius.circular(6)), darkPaint);
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(size.width - 38, 14, 24, 24), const Radius.circular(4)), Paint()..color = Colors.white);
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(size.width - 32, 20, 12, 12), const Radius.circular(2)), greenPaint);

    // Bottom-Left
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(8, size.height - 44, 36, 36), const Radius.circular(6)), darkPaint);
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(14, size.height - 38, 24, 24), const Radius.circular(4)), Paint()..color = Colors.white);
    canvas.drawRRect(RRect.fromRectAndRadius(Rect.fromLTWH(20, size.height - 32, 12, 12), const Radius.circular(2)), greenPaint);

    // Stippled Matrix Simulation
    const matrixDots = [
      Offset(52, 12), Offset(68, 12), Offset(80, 12),
      Offset(52, 24), Offset(74, 24),
      Offset(12, 52), Offset(24, 52), Offset(36, 52), Offset(104, 52), Offset(116, 52),
      Offset(12, 64), Offset(30, 64), Offset(108, 64),
      Offset(52, 104), Offset(64, 104), Offset(80, 104),
      Offset(58, 116), Offset(74, 116), Offset(104, 116),
    ];

    for (final dot in matrixDots) {
      canvas.drawRRect(
        RRect.fromRectAndRadius(Rect.fromCenter(center: dot, width: 8, height: 8), const Radius.circular(2)),
        darkPaint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
