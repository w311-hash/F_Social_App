# Anglers Central - Flutter Build & Deployment Guide

## Prerequisites

- Flutter SDK (3.0+)
- Dart SDK (included with Flutter)
- Android Studio or Xcode (for mobile builds)
- Firebase CLI (for web deployment)

## Local Setup

### 1. Install Flutter

Download and install Flutter from [flutter.dev](https://flutter.dev/docs/get-started/install)

### 2. Get Dependencies

```bash
cd frontend
flutter pub get
```

### 3. Run on Emulator/Device

```bash
# List available devices
flutter devices

# Run on specific device
flutter run -d <device_id>

# Run with logs
flutter run -v
```

## API Configuration

The app automatically selects the correct API endpoint based on the platform and build mode:

- **iOS/Web (Debug)**: `http://localhost:5000/api`
- **Android (Debug)**: `http://10.0.2.2:5000/api`
- **All (Release)**: `https://anglerscentral-social-app.onrender.com/api`

After deploying the backend to Render, update the production URL in `lib/api/api_config.dart` if different.

## Build for Android

### Debug APK

```bash
flutter build apk --debug
# Output: build/app/outputs/flutter-apk/app-debug.apk
```

### Release APK

```bash
flutter build apk --release
# Output: build/app/outputs/flutter-apk/app-release.apk
```

### App Bundle (for Google Play Store)

```bash
flutter build appbundle --release
# Output: build/app/outputs/bundle/release/app-release.aab
```

## Build for iOS

### Debug IPA

```bash
flutter build ios --debug
```

### Release IPA

```bash
flutter build ios --release
```

## Build for Web

### Debug

```bash
flutter run -d chrome
```

### Release

```bash
flutter build web --release
# Output: build/web/
```

## Deploy Frontend to Firebase Hosting

### Prerequisites

1. Firebase project already created
2. Firebase CLI installed: `npm install -g firebase-tools`

### Deploy Steps

```bash
# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init

# Build Flutter web
flutter build web --release

# Deploy to Firebase Hosting
firebase deploy

# View your app
# https://anglerscentral2026.web.app
```

## Testing

### Run Tests

```bash
flutter test
```

### Unit Tests

```bash
flutter test test/unit/
```

### Widget Tests

```bash
flutter test test/widget/
```

## Troubleshooting

### "No devices found"

```bash
# List available emulators
flutter emulators

# Launch emulator
flutter emulators --launch <emulator_id>
```

### Build fails with "SDK version not supported"

```bash
# Check Flutter version
flutter --version

# Upgrade Flutter
flutter upgrade
```

### Gradle build fails

```bash
# Clean build
flutter clean
flutter pub get
flutter run
```

### iOS build fails

```bash
cd ios
rm -rf Pods
cd ..
flutter clean
flutter pub get
flutter run
```

### Can't connect to backend API

1. Check that backend is running (or deployed on Render)
2. Verify API URL in `lib/api/api_config.dart`
3. Check CORS configuration on backend
4. Use DevTools Network tab to inspect requests

### Hot Reload not working

Press `r` in terminal or use:
```bash
flutter hot_reload
```

## Performance Optimization

- Use `flutter build apk --split-per-abi` for smaller APKs by ABI
- Use `--no-tree-shake-icons` to reduce icon assets if needed
- Profile app with DevTools: `flutter run -v`

## Version Management

Update version in `pubspec.yaml`:

```yaml
version: 1.0.0+1  # Format: version_number+build_number
```

## Release Checklist

- [ ] Update version in pubspec.yaml
- [ ] Backend deployed and tested on Render
- [ ] API endpoints verified in api_config.dart
- [ ] Firebase Hosting configured and linked
- [ ] flutter analyze shows no issues
- [ ] flutter test passes
- [ ] Build for all target platforms
- [ ] Test on real devices/phones
- [ ] Deploy to Firebase Hosting
- [ ] Test live app

## Additional Resources

- [Flutter Documentation](https://flutter.dev/docs)
- [Dart Documentation](https://dart.dev/guides)
- [Firebase Hosting Guide](https://firebase.google.com/docs/hosting)
- [Flutter Web Guide](https://flutter.dev/multi-platform/web)
