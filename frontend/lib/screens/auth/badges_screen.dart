import 'package:flutter/material.dart';
import '../../api/profile_api.dart';
import '../../models/user.dart';

class BadgesScreen extends StatefulWidget {
  const BadgesScreen({super.key});

  @override
  State<BadgesScreen> createState() => _BadgesScreenState();
}

class _BadgesScreenState extends State<BadgesScreen> {
  bool loading = true;
  UserModel? user;

  @override
  void initState() {
    super.initState();
    loadBadges();
  }

  Future<void> loadBadges() async {
    final profile = await ProfileApi.getProfile();
    if (!mounted) return;
    setState(() {
      user = profile;
      loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Badges')),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : user == null
              ? const Center(child: Text('Unable to load badges.'))
              : user!.badges.isEmpty
                  ? const Center(child: Text('No badges earned yet.'))
                  : ListView.builder(
                      padding: const EdgeInsets.all(16),
                      itemCount: user!.badges.length,
                      itemBuilder: (context, index) {
                        final badge = user!.badges[index];
                        return Card(
                          margin: const EdgeInsets.only(bottom: 12),
                          child: ListTile(
                            leading: const Icon(Icons.emoji_events, color: Colors.amber),
                            title: Text(badge),
                            subtitle: const Text('Earned by catching fish, joining crews, and staying active'),
                          ),
                        );
                      },
                    ),
    );
  }
}
