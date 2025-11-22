# Building Standalone macOS App

This guide walks you through building a self-contained macOS application that users can run by simply double-clicking.

## Prerequisites

1. **Rust** (already installed ✅)
   ```bash
   rustc --version  # Should show: rustc 1.91.1 or higher
   ```

2. **Node.js & npm** (already installed ✅)
   ```bash
   node --version  # Should show: v25.x or higher
   ```

## Development Mode

Run the app as a native macOS window during development:

```bash
npm run tauri:dev
```

This will:
- Start Vite dev server
- Compile Rust code
- Open a native macOS window
- Enable hot-reload for instant updates

**First run takes 1-2 minutes** to compile Rust dependencies. Subsequent runs are much faster (~2-5 seconds).

## Production Build

Build the standalone app for distribution:

```bash
npm run tauri:build
```

This creates:
- **App Bundle**: `src-tauri/target/release/bundle/macos/Agentic Workflow Composer.app`
- **DMG Installer**: `src-tauri/target/release/bundle/dmg/Agentic Workflow Composer_1.0.0_x64.dmg`

Build time: ~2-3 minutes

## Distribution

### Option 1: Share the .app (Simplest)

1. Navigate to: `src-tauri/target/release/bundle/macos/`
2. Compress the app:
   ```bash
   cd src-tauri/target/release/bundle/macos/
   zip -r "Agentic Workflow Composer.zip" "Agentic Workflow Composer.app"
   ```
3. Share the `.zip` file
4. Users unzip and drag to Applications folder

### Option 2: Share the .dmg (Professional)

1. Navigate to: `src-tauri/target/release/bundle/dmg/`
2. Share the `.dmg` file directly
3. Users double-click the DMG
4. Drag app to Applications folder
5. Eject DMG and run

### Option 3: Code Sign & Notarize (Enterprise)

For wider distribution without Gatekeeper warnings:

```bash
# 1. Sign the app
codesign --deep --force --verify --verbose \
  --sign "Developer ID Application: Your Name (TEAM_ID)" \
  --options runtime \
  "src-tauri/target/release/bundle/macos/Agentic Workflow Composer.app"

# 2. Create a signed DMG
hdiutil create -volname "Agentic Workflow Composer" \
  -srcfolder "src-tauri/target/release/bundle/macos/Agentic Workflow Composer.app" \
  -ov -format UDZO \
  "Agentic-Workflow-Composer-Signed.dmg"

# 3. Notarize with Apple
xcrun notarytool submit "Agentic-Workflow-Composer-Signed.dmg" \
  --apple-id "your@email.com" \
  --team-id "TEAM_ID" \
  --password "app-specific-password" \
  --wait

# 4. Staple the notarization ticket
xcrun stapler staple "Agentic-Workflow-Composer-Signed.dmg"
```

**Requirements:**
- Apple Developer Account ($99/year)
- Developer ID Application certificate
- App-specific password from appleid.apple.com

## What Users Get

✅ **Native macOS app** that:
- Opens with a double-click
- Runs completely offline
- No terminal or browser needed
- No visible localhost:3000
- Appears in Dock and Applications
- ~5-8 MB file size (30x smaller than Electron!)

## Troubleshooting

### "App is damaged and can't be opened"

This happens on unsigned apps. Users can bypass with:
```bash
xattr -cr "/Applications/Agentic Workflow Composer.app"
```

Or right-click → Open → Open anyway

### Build fails with "cargo not found"

Restart terminal after installing Rust:
```bash
source $HOME/.cargo/env
```

### "Port 3000 already in use"

Kill existing Vite server:
```bash
pkill -f vite
```

### First build is very slow

Normal! Rust compiles all dependencies on first build. Subsequent builds are much faster.

## File Sizes

- **Development build** (debug): ~50 MB
- **Production build** (release): ~5-8 MB
- **DMG installer**: ~3-4 MB (compressed)

## Architecture

```
Agentic Workflow Composer.app/
├── Contents/
│   ├── MacOS/
│   │   └── agentic-workflow-composer  (Rust binary)
│   ├── Resources/
│   │   ├── dist/                      (React app)
│   │   └── icon.icns                  (App icon)
│   └── Info.plist                     (App metadata)
```

The app bundles:
- Rust runtime
- WebKit webview
- React application
- All dependencies

No external dependencies needed!

## Next Steps

1. **Test the app**: Run `npm run tauri:dev`
2. **Build for production**: Run `npm run tauri:build`
3. **Test the built app**: Open the .app from `src-tauri/target/release/bundle/macos/`
4. **Distribute**: Share the .dmg or .app.zip with users

---

**Questions?** Check the main README.md or Tauri documentation at https://tauri.app

