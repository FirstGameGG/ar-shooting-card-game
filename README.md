# 🎮 AR Shooting Card Game

An immersive Augmented Reality shooting game built with MindAR and A-Frame, featuring card-based character and weapon detection for real-time AR battles.

![AR Shooting Game](https://img.shields.io/badge/AR-WebAR-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![A-Frame](https://img.shields.io/badge/A--Frame-1.6.0-ff69b4) ![MindAR](https://img.shields.io/badge/MindAR-1.2.5-orange)

## 🎯 Overview

This AR shooting game allows players to engage in turn-based battles using physical cards. Point your device's camera at character cards (Agent A and Agent B) and weapon cards to trigger animations, attacks, and dynamic gameplay mechanics.

### ✨ Features

- **🎴 Card-Based AR Recognition**: Uses MindAR image tracking to detect up to 8 different cards
- **👥 Two Agent System**: 
  - Agent A (FBI Agent) - Blue team
  - Agent B (Balkan Agent) - Red team
- **🔫 Multiple Weapons**: 
  - Agent A weapons: AK-47, FAMAS F1, PP-19 Bizon
  - Agent B weapons: M14, SKS Type 56, VZ-61 Skorpion
- **💥 Dynamic Combat System**:
  - Real-time damage calculation
  - Critical hit mechanics (20% chance for 1.5x damage)
  - Weapon malfunction system (15% chance for no damage)
  - Health bar visualization
- **🎬 Animations**: 
  - Idle animations for characters
  - Shooting animations with weapon attachments
  - Death/explosion effects
  - Muzzle flash effects
- **📊 Game UI**: 
  - Real-time HP displays for both agents
  - Color-coded health bars (Green → Yellow → Red)
  - Status messages (Normal Hit, Critical Hit, Weapon Malfunction)
  - Game Over screen with winner announcement

## 🎮 Gameplay

1. **Setup**: Print out the character cards (AgentA.png, AgentB.png) and weapon cards
2. **Start**: Open the game in a WebAR-compatible browser
3. **Play**: 
   - Show Agent A or Agent B cards to spawn characters
   - Show weapon cards near character cards to equip weapons and attack
   - Characters automatically face each other when both are visible
   - Deal damage to reduce opponent's HP to 0
4. **Win**: Eliminate the opposing agent to win!

### 🗡️ Weapon Stats

| Weapon | Damage | Agent |
|--------|--------|-------|
| AK-47 | 28 | A |
| FAMAS F1 | 22 | A |
| PP-19 Bizon | 15 | A |
| M14 | 100 | B |
| SKS Type 56 | 24 | B |
| VZ-61 Skorpion | 14 | B |

*Note: All weapons have a 20% chance for critical hit (1.5x damage) and 15% chance for malfunction (0 damage)*

## 🚀 Quick Start

### Prerequisites

- Modern web browser with WebAR support (Chrome, Safari on iOS, etc.)
- Camera permissions enabled
- Printed target cards (located in `/plane` directory)

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/FirstGameGG/ar-shooting-card-game.git
cd ar-shooting-card-game
```

2. Start a local web server:
```bash
# Using Python 3
python -m http.server 8000

# Or using Python 2
python -m SimpleHTTPServer 8000

# Or using Node.js http-server
npx http-server -p 8000
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

4. Allow camera permissions when prompted

### 🌐 GitHub Pages Deployment

This project is ready for GitHub Pages deployment:

1. Go to your repository settings on GitHub
2. Navigate to **Pages** section
3. Under **Source**, select the `main` branch
4. Click **Save**
5. Your game will be available at: `https://firstgamegg.github.io/ar-shooting-card-game/`

The game will automatically deploy when you push changes to the main branch.

## 📁 Project Structure

```
ar-shooting-card-game/
├── index.html              # Main HTML file (entry point)
├── styles.css              # Game styles and UI styling
├── game.js                 # Game logic and A-Frame components
├── README.md               # Project documentation
├── .nojekyll              # GitHub Pages configuration
├── mind/
│   └── targets.mind       # MindAR tracking data
├── model/                 # 3D models (GLB format)
│   ├── ak_47.glb
│   ├── balkan_cs2_agent.glb
│   ├── famas_f1.glb
│   ├── fbi_cs2_agent.glb
│   ├── m14.glb
│   ├── pp_19_bizon.glb
│   ├── sks_type_56.glb
│   ├── vz61_skorpion.glb
│   ├── timeframe_explosion.glb
│   └── muzzle_flash_test_effect.glb
└── plane/                 # Target images (printable cards)
    ├── AgentA.png
    ├── AgentB.png
    ├── ak_47.png
    ├── famas_f1.png
    ├── m14.png
    ├── pp_19_bizon.png
    ├── sks_type_56.png
    └── vz61_skorpion.png
```

## 🛠️ Technologies Used

- **[A-Frame](https://aframe.io/)** (v1.6.0) - WebVR framework
- **[MindAR](https://hiukim.github.io/mind-ar-js-doc/)** (v1.2.5) - Image tracking library
- **[A-Frame Extras](https://github.com/c-frame/aframe-extras)** (v7.4.0) - Animation mixer
- **[Three.js](https://threejs.org/)** - 3D graphics (via A-Frame)
- **HTML5/CSS3/JavaScript** - Core web technologies

## 🎨 Customization

### Adding New Weapons

1. Add weapon GLB model to `/model` directory
2. Add weapon card image to `/plane` directory
3. Update MindAR tracking data in `/mind/targets.mind`
4. Add weapon detection logic in the `draw-line` component
5. Define damage value in `DAMAGE_VALUES` object

### Modifying Game Balance

Edit the following in `index.html`:

```javascript
// Initial HP
this.stats = {
  charaA: { hp: 200 },
  charaB: { hp: 200 },
};

// Weapon damage
const DAMAGE_VALUES = {
  ak_47: 28,
  // ... modify values here
};

// Critical hit chance (default: 20%)
if (critChance <= 0.35) { // 35% = 15% malfunction + 20% crit
  return damage * 1.5;
}

// Malfunction chance (default: 15%)
if (critChance <= 0.15) {
  return 0;
}
```

## 📱 Browser Compatibility

- ✅ Chrome (Android & Desktop)
- ✅ Safari (iOS & macOS)
- ✅ Edge
- ✅ Firefox
- ❌ Internet Explorer (not supported)

**Note**: HTTPS or localhost is required for camera access.

## 🐛 Troubleshooting

### Camera not working
- Ensure camera permissions are granted
- Use HTTPS or localhost
- Check if another app is using the camera

### Cards not detected
- Ensure good lighting conditions
- Print cards at recommended size
- Hold cards steady and flat
- Keep cards within camera view

### Models not loading
- Check browser console for errors
- Ensure all files are accessible
- Verify GLB model file paths

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/FirstGameGG/ar-shooting-card-game/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**FirstGameGG**
- GitHub: [@FirstGameGG](https://github.com/FirstGameGG)

## 🙏 Acknowledgments

- [MindAR](https://hiukim.github.io/mind-ar-js-doc/) - For the amazing image tracking library
- [A-Frame](https://aframe.io/) - For the WebVR framework
- [Sketchfab](https://sketchfab.com/) - For 3D model resources
- CS:GO/CS2 - For character and weapon inspiration

---

⭐️ If you like this project, please give it a star on GitHub!
