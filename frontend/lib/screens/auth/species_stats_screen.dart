import 'package:flutter/material.dart';
import '../../api/profile_api.dart';
import '../../models/user.dart';

class SpeciesStatsScreen extends StatefulWidget {
  const SpeciesStatsScreen({super.key});

  @override
  State<SpeciesStatsScreen> createState() => _SpeciesStatsScreenState();
}

class _SpeciesStatsScreenState extends State<SpeciesStatsScreen> {
  bool loading = true;
  UserModel? user;

  @override
  void initState() {
    super.initState();
    loadSpeciesStats();
  }

  Future<void> loadSpeciesStats() async {
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
      appBar: AppBar(title: const Text('Species Stats')),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : user == null
              ? const Center(child: Text('Unable to load species stats.'))
              : user!.speciesStats.isEmpty
                  ? const Center(child: Text('Catch some fish to build species stats!'))
                  : ListView(
                      padding: const EdgeInsets.all(16),
                      children: user!.speciesStats.entries.map((entry) {
                        return Card(
                          margin: const EdgeInsets.only(bottom: 12),
                          child: ListTile(
                            title: Text(entry.key),
                            trailing: Text('${entry.value} catches'),
                          ),
                        );
                      }).toList(),
                    ),
    );
  }
}
