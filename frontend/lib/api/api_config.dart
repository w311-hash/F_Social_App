import 'package:flutter/foundation.dart' show defaultTargetPlatform, kReleaseMode, TargetPlatform;

class ApiConfig {
  static String get apiBaseUrl {
    if (kReleaseMode) {
      return 'https://anglerscentral-social-app.onrender.com/api';
    }

    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return 'http://10.0.2.2:5000/api';
      case TargetPlatform.iOS:
      case TargetPlatform.macOS:
      case TargetPlatform.linux:
      case TargetPlatform.windows:
        return 'http://localhost:5000/api';
      default:
        return 'https://anglerscentral-social-app.onrender.com/api';
    }
  }

  static String get socketUrl {
    if (kReleaseMode) {
      return 'https://anglerscentral-social-app.onrender.com';
    }

    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return 'http://10.0.2.2:5000';
      case TargetPlatform.iOS:
      case TargetPlatform.macOS:
      case TargetPlatform.linux:
      case TargetPlatform.windows:
        return 'http://localhost:5000';
      default:
        return 'https://anglerscentral-social-app.onrender.com';
    }
  }
}
