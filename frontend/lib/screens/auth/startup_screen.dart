import 'package:flutter/material.dart';
import '../../services/storage_service.dart';
import '../../api/profile_api.dart';
import '../../services/socket_service.dart';

class StartupScreen extends StatefulWidget {
  const StartupScreen({super.key});

  @override
  State<StartupScreen> createState() => _StartupScreenState();
}

class _StartupScreenState extends State<StartupScreen> {
  @override
  void initState() {
    super.initState();
    checkLogin();
  }

  Future<void> checkLogin() async {
    final token = await StorageService.getToken();

    if (token == null) {
      if (!mounted) return;
      Navigator.pushReplacementNamed(context, "/login");
      return;
    }

    final user = await ProfileApi.getProfile();

    if (user == null) {
      await StorageService.clear();
      if (!mounted) return;
      Navigator.pushReplacementNamed(context, "/login");
      return;
    }

    SocketService().connect(user.id);

    if (!mounted) return;
    Navigator.pushReplacementNamed(context, "/home");
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: CircularProgressIndicator()),
    );
  }
}
