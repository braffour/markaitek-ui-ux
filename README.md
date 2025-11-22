# Agentic Workflow Composer

A modern, enterprise-grade UI/UX for building and managing AI-powered workflow automation with built-in governance and compliance controls.

## 🚀 Features

### Three Powerful Modes

1. **Yolo Mode** — Natural language workflow creation
   - Express automation goals in plain English
   - Real-time agent processing with live transcript
   - Automatic policy compliance checking
   - Context-aware RAG document upload
   - Configurable urgency and environment targeting

2. **Classic Mode** — Visual workflow builder
   - Drag-and-drop component library (Triggers, Actions, Connectors)
   - Interactive node-based canvas
   - Real-time inspector panel for configuration
   - Schema mapping and error handling
   - Version control and deployment targeting

3. **I'm Lucky Mode** — AI-assisted automation
   - Historical pattern recognition
   - Auto-fit recommendations based on past success
   - Memory insights from previous workflows
   - Budget and security constraint optimization
   - One-click workflow generation

### Enterprise-Ready Governance

- **Policy Enforcement** — GDPR, SOC2, Internal, and Public Sandbox policies
- **Audit Logging** — Complete activity tracking for compliance
- **QA Checklist** — Automated data residency, PII masking, and permission checks
- **Multi-Workspace** — Isolated environments for different teams
- **Deployment Controls** — Dev, Staging, and Production targeting

## 🛠️ Tech Stack

- **React 18.3** — Modern UI framework
- **Vite 6.0** — Lightning-fast build tool and dev server
- **Tailwind CSS 3.4** — Utility-first styling
- **Lucide React** — Beautiful, consistent iconography
- **Tauri 1.5** — Lightweight native app framework (~5MB app size!)
- **TypeScript/JSX** — Type-safe component development

## 📦 Installation

### Web Development (Browser-based)

For standard web development:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Native macOS App (Standalone)

For building a self-contained macOS application:

```bash
# Prerequisites (one-time setup)
# Install Rust if not already installed
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# Install dependencies
npm install

# Run as native macOS app (development)
npm run tauri:dev

# Build standalone macOS app (production)
npm run tauri:build
```

**The built app will be located at:**
- `src-tauri/target/release/bundle/macos/Agentic Workflow Composer.app`
- `src-tauri/target/release/bundle/dmg/Agentic Workflow Composer_1.0.0_x64.dmg`

**Just double-click the .app or .dmg to run!** No terminal, no browser, no localhost:3000 visible.

## 🚦 Getting Started

### Option 1: Web Development Mode

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd markaitek-ui-ux
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the dev server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - The application will automatically open in your default browser

### Option 2: Native macOS App Mode

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd markaitek-ui-ux
   npm install
   ```

2. **Install Rust (if not already installed)**
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   source $HOME/.cargo/env
   ```

3. **Run as native app**
   ```bash
   npm run tauri:dev
   ```
   
   A native macOS window will open with your app!

4. **Build for distribution**
   ```bash
   npm run tauri:build
   ```
   
   Find your app at: `src-tauri/target/release/bundle/macos/`

## 🎨 Project Structure

```
markaitek-ui-ux/
├── src/
│   ├── components/
│   │   └── AgenticWorkflowComposer.tsx    # Main application component
│   ├── main.jsx                            # Application entry point
│   └── index.css                           # Global styles with Tailwind
├── index.html                              # HTML template
├── vite.config.js                          # Vite configuration
├── tailwind.config.js                      # Tailwind CSS configuration
├── postcss.config.js                       # PostCSS configuration
└── package.json                            # Project dependencies
```

## 🎯 Usage Examples

### Yolo Mode
1. Enter your automation goal in natural language
2. Select policy scope (GDPR, SOC2, etc.)
3. Upload context documents for RAG
4. Set urgency and target environments
5. Click "Execute" and watch the agent build your workflow

### Classic Mode
1. Drag components from the library onto the canvas
2. Connect nodes to define workflow logic
3. Configure each node in the inspector panel
4. Map data schemas between components
5. Deploy to your target environment

### I'm Lucky Mode
1. Describe your integration intent
2. Select primary systems to integrate
3. Set budget and security constraints
4. Review AI-generated recommendations
5. Generate and deploy with one click

## 🔧 Configuration

### Environment Variables
Currently, the application runs entirely client-side. For production deployments, you may want to configure:

- API endpoints for backend services
- Authentication providers
- Workspace configurations
- Policy definitions

### Tailwind Customization
Modify `tailwind.config.js` to customize:
- Color schemes
- Typography
- Spacing
- Animations
- Breakpoints

## 🧪 Development

### Code Style
- React functional components with hooks
- Tailwind utility classes for styling
- Lucide icons for consistent UI elements
- JSX for component templates

### Hot Module Replacement
Vite provides instant HMR — changes appear immediately without full page reload.

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📝 Component Architecture

### Main Components
- **AgenticWorkflowComposer** — Root application shell
- **YoloMode** — Natural language interface
- **ClassicMode** — Visual workflow builder
- **LuckyMode** — AI-assisted automation
- **Modal** — Reusable modal component
- **Badge** — Status and metadata badges

### Mock Data
The application includes mock data for demonstration:
- Workspaces (Engineering, Finance, Customer Support)
- Policies (GDPR, SOC2, Internal, Public)
- Component library (Triggers, Actions, Connectors)
- Past success insights

### Tauri Architecture
- **Frontend**: React + Vite (runs in webview)
- **Backend**: Rust (native system integration)
- **Communication**: Tauri API bridge
- **Rendering**: Native macOS WebKit (Safari engine)
- **Bundle**: Single .app file with all dependencies

## 🚀 Deployment

### Web Deployment

**Build for Production:**
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

**Preview Production Build:**
```bash
npm run preview
```

**Deploy to Hosting:**
The `dist/` folder can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting service

### Native macOS App Distribution

**Build Standalone App:**
```bash
npm run tauri:build
```

**Distribution Options:**

1. **Direct Distribution** (Easiest)
   - Share the `.app` file from `src-tauri/target/release/bundle/macos/`
   - Users drag it to their Applications folder
   - Double-click to run

2. **DMG Distribution** (Professional)
   - Share the `.dmg` file from `src-tauri/target/release/bundle/dmg/`
   - Users mount the DMG and drag app to Applications
   - Provides a nice installation experience

3. **Code Signing** (For wider distribution)
   ```bash
   # Sign with Apple Developer certificate
   codesign --deep --force --verify --verbose \
     --sign "Developer ID Application: Your Name" \
     "Agentic Workflow Composer.app"
   
   # Notarize with Apple (prevents Gatekeeper warnings)
   xcrun notarytool submit "Agentic Workflow Composer.dmg" \
     --apple-id your@email.com \
     --team-id TEAMID \
     --password app-specific-password
   ```

**App Size Comparison:**
- 🦀 Tauri macOS app: **~5-8 MB**
- ⚡ Electron equivalent: **~150-200 MB**
- 🎉 **30x smaller!**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software developed for Markaitek.

## 🆘 Support

For issues, questions, or feature requests:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🎉 Acknowledgments

Built with modern web technologies and best practices for enterprise workflow automation.

---

## 🎯 Quick Start Summary

**Web Development:**
```bash
npm install && npm run dev
```

**Native macOS App:**
```bash
npm install && npm run tauri:dev
```

**Build macOS App:**
```bash
npm run tauri:build
# Find app at: src-tauri/target/release/bundle/macos/
```

---

**Version:** 1.0.0  
**Last Updated:** November 2025  
**Status:** Active Development • Tauri-Enabled

