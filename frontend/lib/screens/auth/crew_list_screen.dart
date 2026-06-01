import 'package:flutter/material.dart';

class CrewListScreen extends StatelessWidget {
  const CrewListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Later: call CrewApi.getMyCrews()
    return Scaffold(
      appBar: AppBar(title: const Text('Crews')),
      body: const Center(
        child: Text('Your crews will show here'),
      ),
    );
  }
}
