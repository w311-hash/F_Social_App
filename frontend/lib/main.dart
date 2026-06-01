import 'package:flutter/material.dart';
import 'screens/auth/startup_screen.dart';
import 'screens/auth/login_screen.dart';
import 'screens/auth/register_screen.dart';
import 'screens/auth/home_screen.dart';
import 'screens/auth/profile_screen.dart';
import 'screens/auth/badges_screen.dart';
import 'screens/auth/species_stats_screen.dart';

void main() {
  runApp(const AnglersCentralApp());
}

class AnglersCentralApp extends StatelessWidget {
  const AnglersCentralApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Anglers Central",
      theme: ThemeData.dark(),
      debugShowCheckedModeBanner: false,
      initialRoute: "/startup",
      routes: {
        "/startup": (context) => const StartupScreen(),
        "/login": (context) => const LoginScreen(),
        "/register": (context) => const RegisterScreen(),
        "/home": (context) => const HomeScreen(),
        "/profile": (context) => const ProfileScreen(),
        "/badges": (context) => const BadgesScreen(),
        "/species-stats": (context) => const SpeciesStatsScreen(),
      },
    );
  }
}
