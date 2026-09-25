# 👾 PixelCraft Studio

> Modern, browser-based pixel art editor, sprite animator and **zero-dependency CSS box-shadow code generator**. Built purely with HTML5 Canvas, modern CSS, and Vanilla JavaScript.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Python 3](https://img.shields.io/badge/Python-3.x-3776AB?style=flat&logo=python&logoColor=white)
![i18n: TR/EN](https://img.shields.io/badge/Language-TR%20%7C%20EN-purple.svg)

---

## ✨ Features (Özellikler)

### 🌐 Multi-Language (Çoklu Dil)
- Instant **Turkish (TR)** and **English (EN)** toggle with persistent state saved in LocalStorage.

### 🎨 Drawing & Editing Tools
- **Pen:** Precise pixel-by-pixel drawing.
- **Bucket Fill:** Smart Flood Fill algorithm for contiguous color areas.
- **Eraser:** Fast pixel eraser.
- **Eyedropper:** Sample colors directly from the canvas.
- **Dynamic Grids:** 16x16, 24x24, and 32x32 adjustable grid resolutions.
- **Curated Neon & Retro Palette:** Quick color selection plus custom color picker.

### ⏱️ Live Sprite Animation & Timeline
- **Multi-Frame Support:** Add, duplicate and delete animation frames.
- **Live Preview:** Real-time playback of sprite animations.
- **FPS Controller:** Dynamic speed adjustment from 1 to 24 FPS with play/pause.

### ⚡ Undo / Redo & Shortcuts
- **`Ctrl + Z` / `Cmd + Z`:** Undo last action (up to 40 history steps).
- **`Ctrl + Y` / `Ctrl + Shift + Z`:** Redo.
- **Keyboard Shortcuts:** `P` (Pen), `B` (Bucket), `E` (Eraser), `I` (Eyedropper).

### 🚀 Export Options
1. **✨ Pure CSS Box-Shadow:** Converts the drawing into a single `<div>` pure CSS shadow without needing any external image file.
2. **💾 PNG Download:** High-resolution crisp 512x512 PNG file export.

---

## 🚀 Quick Start & Local Server

Requires zero external packages or build steps (`npm install` not needed).

### 1. Clone the Repository
```bash
git clone https://github.com/devilteams-s/Pixel-Studio-Web.git
cd Pixel-Studio-Web
```

### 2. Launch Local Server

#### 🐧 Linux:
```bash
./start-server.sh
# or
python3 server.py
```

#### 🪟 Windows:
- Double click `start-server.bat` or run:
```cmd
python server.py
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
