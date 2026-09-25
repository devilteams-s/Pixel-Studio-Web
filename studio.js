
// ==========================================
// ÇOKLU DİL DESTEĞİ (TR / EN i18n)
// ==========================================
let currentLang = localStorage.getItem('pixel_lang') || 'tr';

const TRANSLATIONS = {
  tr: {
    langBtn: '🌐 EN',
    cssBtn: '✨ CSS Box-Shadow Al',
    pngBtn: '💾 PNG İndir',
    clearBtn: '🗑️ Temizle',
    undoBtn: '↩️ Geri Al',
    redoBtn: '↪️ İleri Al',
    toolsTitle: 'Araçlar',
    colorTitle: 'Renk',
    gridTitle: 'Izgara Boyutu',
    previewTitle: 'Canlı Animasyon Önizleme',
    framesTitle: 'Kareler (Frames)',
    addFrameBtn: '+ Yeni Kare',
    play: '▶️ Oynat',
    pause: '⏸️ Durdur',
    frameName: 'Kare',
    copiedAlert: 'CSS Kodu Panoya Kopyalandı!',
    copyBtn: '📋 Kodu Kopyala'
  },
  en: {
    langBtn: '🌐 TR',
    cssBtn: '✨ Export CSS Box-Shadow',
    pngBtn: '💾 Download PNG',
    clearBtn: '🗑️ Clear',
    undoBtn: '↩️ Undo',
    redoBtn: '↪️ Redo',
    toolsTitle: 'Tools',
    colorTitle: 'Color',
    gridTitle: 'Grid Size',
    previewTitle: 'Live Animation Preview',
    framesTitle: 'Frames Timeline',
    addFrameBtn: '+ New Frame',
    play: '▶️ Play',
    pause: '⏸️ Pause',
    frameName: 'Frame',
    copiedAlert: 'CSS Code copied to clipboard!',
    copyBtn: '📋 Copy Code'
  }
};

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('pixel_lang', lang);
  const t = TRANSLATIONS[lang];

  const langBtn = document.getElementById('btn-lang');
  if (langBtn) langBtn.textContent = t.langBtn;

  const cssBtn = document.getElementById('btn-export-css');
  if (cssBtn) cssBtn.textContent = t.cssBtn;

  const pngBtn = document.getElementById('btn-export-png');
  if (pngBtn) pngBtn.textContent = t.pngBtn;

  const clearBtn = document.getElementById('btn-clear-canvas');
  if (clearBtn) clearBtn.textContent = t.clearBtn;

  const undoBtn = document.getElementById('btn-undo');
  if (undoBtn) undoBtn.textContent = t.undoBtn;

  const redoBtn = document.getElementById('btn-redo');
  if (redoBtn) redoBtn.textContent = t.redoBtn;

  const addFrameBtn = document.getElementById('btn-add-frame');
  if (addFrameBtn) addFrameBtn.textContent = t.addFrameBtn;

  const copyBtn = document.getElementById('btn-copy-css');
  if (copyBtn) copyBtn.textContent = t.copyBtn;

  // Grup başlıkları
  const titles = document.querySelectorAll('.group-title');
  if (titles.length >= 3) {
    titles[0].textContent = t.toolsTitle;
    titles[1].textContent = t.colorTitle;
    titles[2].textContent = t.gridTitle;
  }

  const pHeader = document.querySelector('.panel-section .section-header span');
  if (pHeader) pHeader.textContent = t.previewTitle;

  const fHeader = document.querySelector('.frames-section .section-header span');
  if (fHeader) fHeader.textContent = t.framesTitle;

  updateFramesList();
}

/**
 * PixelCraft Studio - Core Engine
 */

let GRID_SIZE = 16;
const CANVAS_DISPLAY_SIZE = 480;

const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const previewCanvas = document.getElementById('previewCanvas');
const previewCtx = previewCanvas.getContext('2d');

let currentTool = 'pen';
let currentColor = '#ff4757';
let isMouseDown = false;

// Palet Renkleri
const DEFAULT_PALETTE = [
  '#000000', '#ffffff', '#747d8c', '#a4b0be',
  '#ff4757', '#ff6b81', '#ffa502', '#eccc68',
  '#2ed573', '#7bed9f', '#1e90ff', '#70a1ff',
  '#3742fa', '#5352ed', '#e056fd', '#be2edd'
];

// Kareler (Frames) Dizisi: Her kare GRID_SIZE * GRID_SIZE renk dizisidir
let frames = [];
let currentFrameIndex = 0;

// Geri / İleri Alma (Undo / Redo) Yığını
let undoStack = [];
let redoStack = [];
const MAX_HISTORY = 40;

function saveHistoryState() {
  // Aktif karenin kopyasını undo yığınına ekle
  const currentFrameCopy = [...frames[currentFrameIndex]];
  undoStack.push({
    frameIndex: currentFrameIndex,
    data: currentFrameCopy
  });
  if (undoStack.length > MAX_HISTORY) {
    undoStack.shift();
  }
  // Yeni bir işlem yapıldığında redo yığını sıfırlanır
  redoStack = [];
  updateUndoRedoUI();
}

function undo() {
  if (undoStack.length === 0) return;
  const lastState = undoStack.pop();
  
  // Mevcut durumu redo'ya kaydet
  redoStack.push({
    frameIndex: currentFrameIndex,
    data: [...frames[currentFrameIndex]]
  });

  currentFrameIndex = lastState.frameIndex;
  frames[currentFrameIndex] = [...lastState.data];

  renderCanvas();
  updateFramesList();
  updateUndoRedoUI();
}

function redo() {
  if (redoStack.length === 0) return;
  const nextState = redoStack.pop();

  undoStack.push({
    frameIndex: currentFrameIndex,
    data: [...frames[currentFrameIndex]]
  });

  currentFrameIndex = nextState.frameIndex;
  frames[currentFrameIndex] = [...nextState.data];

  renderCanvas();
  updateFramesList();
  updateUndoRedoUI();
}

function updateUndoRedoUI() {
  const undoBtn = document.getElementById('btn-undo');
  const redoBtn = document.getElementById('btn-redo');
  if (undoBtn) undoBtn.disabled = undoStack.length === 0;
  if (redoBtn) redoBtn.disabled = redoStack.length === 0;
}

function createEmptyFrame() {
  return new Array(GRID_SIZE * GRID_SIZE).fill(null);
}

// Başlangıç Ayarları
function init() {
  canvas.width = GRID_SIZE;
  canvas.height = GRID_SIZE;
  canvas.style.width = `${CANVAS_DISPLAY_SIZE}px`;
  canvas.style.height = `${CANVAS_DISPLAY_SIZE}px`;

  initPalette();
  frames = [createEmptyFrame()];
  currentFrameIndex = 0;
  
  // Örnek çizim (Kalp şekli)
  drawSampleHeart();

  renderCanvas();
  updateFramesList();
  startAnimationLoop();
}

function initPalette() {
  const palContainer = document.getElementById('palette');
  palContainer.innerHTML = '';
  DEFAULT_PALETTE.forEach(c => {
    const swatch = document.createElement('div');
    swatch.className = 'palette-swatch';
    swatch.style.backgroundColor = c;
    swatch.addEventListener('click', () => {
      currentColor = c;
      document.getElementById('primary-color').value = c;
    });
    palContainer.appendChild(swatch);
  });
}

function drawSampleHeart() {
  const frame = frames[0];
  const heartCoords = [
    [4,3], [5,3], [7,3], [8,3],
    [3,4], [4,4], [5,4], [6,4], [7,4], [8,4], [9,4],
    [3,5], [4,5], [5,5], [6,5], [7,5], [8,5], [9,5],
    [4,6], [5,6], [6,6], [7,6], [8,6],
    [5,7], [6,7], [7,7],
    [6,8]
  ];
  heartCoords.forEach(([x, y]) => {
    if (x < GRID_SIZE && y < GRID_SIZE) {
      frame[y * GRID_SIZE + x] = '#ff4757';
    }
  });
}

function renderCanvas() {
  const currentFrame = frames[currentFrameIndex];
  ctx.clearRect(0, 0, GRID_SIZE, GRID_SIZE);

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const color = currentFrame[y * GRID_SIZE + x];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}

// Araç İşlemleri
function applyTool(x, y) {
  if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return;
  const currentFrame = frames[currentFrameIndex];
  const idx = y * GRID_SIZE + x;

  if (currentTool === 'pen') {
    currentFrame[idx] = currentColor;
  } else if (currentTool === 'eraser') {
    currentFrame[idx] = null;
  } else if (currentTool === 'eyedropper') {
    const picked = currentFrame[idx];
    if (picked) {
      currentColor = picked;
      document.getElementById('primary-color').value = picked;
      setTool('pen');
    }
    return;
  } else if (currentTool === 'bucket') {
    floodFill(x, y, currentFrame[idx], currentColor);
  }

  renderCanvas();
  updateFramesList();
}

// Kova Dolgusu (Flood Fill)
function floodFill(startX, startY, targetColor, fillColor) {
  if (targetColor === fillColor) return;
  const currentFrame = frames[currentFrameIndex];
  const queue = [[startX, startY]];
  const visited = new Uint8Array(GRID_SIZE * GRID_SIZE);

  while (queue.length > 0) {
    const [cx, cy] = queue.pop();
    const idx = cy * GRID_SIZE + cx;

    if (visited[idx]) continue;
    visited[idx] = 1;

    if (currentFrame[idx] === targetColor) {
      currentFrame[idx] = fillColor;

      if (cx > 0) queue.push([cx - 1, cy]);
      if (cx < GRID_SIZE - 1) queue.push([cx + 1, cy]);
      if (cy > 0) queue.push([cx, cy - 1]);
      if (cy < GRID_SIZE - 1) queue.push([cx, cy + 1]);
    }
  }
}

function getCanvasCoords(e) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / (rect.width / GRID_SIZE));
  const y = Math.floor((e.clientY - rect.top) / (rect.height / GRID_SIZE));
  return [x, y];
}

canvas.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    isMouseDown = true;
    saveHistoryState();
    const [x, y] = getCanvasCoords(e);
    applyTool(x, y);
  }
});

window.addEventListener('mouseup', () => {
  isMouseDown = false;
});

canvas.addEventListener('mousemove', (e) => {
  if (isMouseDown && (currentTool === 'pen' || currentTool === 'eraser')) {
    const [x, y] = getCanvasCoords(e);
    applyTool(x, y);
  }
});

// Klavye Kısayolları (Undo / Redo & Araçlar)
window.addEventListener('keydown', (e) => {
  // Input veya textarea içindeyse müdahale etme
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  // Ctrl + Z veya Command + Z -> Geri Al (Undo)
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
    e.preventDefault();
    if (e.shiftKey) {
      redo(); // Ctrl + Shift + Z
    } else {
      undo();
    }
  }
  // Ctrl + Y -> İleri Al (Redo)
  else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
    e.preventDefault();
    redo();
  }
  // Kısayol Tuşları: P (Pen), B (Bucket), E (Eraser), I (Eyedropper)
  else if (e.key.toLowerCase() === 'p') setTool('pen');
  else if (e.key.toLowerCase() === 'b') setTool('bucket');
  else if (e.key.toLowerCase() === 'e') setTool('eraser');
  else if (e.key.toLowerCase() === 'i') setTool('eyedropper');
});

// Araç Seçimi
function setTool(toolName) {
  currentTool = toolName;
  document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tool === toolName);
  });
}

document.querySelectorAll('.tool-btn').forEach(btn => {
  btn.addEventListener('click', () => setTool(btn.dataset.tool));
});

document.getElementById('primary-color').addEventListener('input', (e) => {
  currentColor = e.target.value;
});

// Izgara Boyutu Değiştirme
document.getElementById('grid-size-select').addEventListener('change', (e) => {
  saveHistoryState();
  GRID_SIZE = parseInt(e.target.value);
  canvas.width = GRID_SIZE;
  canvas.height = GRID_SIZE;
  frames = [createEmptyFrame()];
  currentFrameIndex = 0;
  renderCanvas();
  updateFramesList();
});

// Temizle Butonu
document.getElementById('btn-clear-canvas').addEventListener('click', () => {
  saveHistoryState();
  frames[currentFrameIndex] = createEmptyFrame();
  renderCanvas();
  updateFramesList();
});

// Kareler (Frames) Yönetimi
function updateFramesList() {
  const listEl = document.getElementById('framesList');
  listEl.innerHTML = '';

  frames.forEach((frame, idx) => {
    const item = document.createElement('div');
    item.className = `frame-item ${idx === currentFrameIndex ? 'active' : ''}`;

    // Mini Thumbnail Canvas
    const thumb = document.createElement('canvas');
    thumb.className = 'frame-thumb';
    thumb.width = GRID_SIZE;
    thumb.height = GRID_SIZE;
    const tCtx = thumb.getContext('2d');
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const c = frame[y * GRID_SIZE + x];
        if (c) {
          tCtx.fillStyle = c;
          tCtx.fillRect(x, y, 1, 1);
        }
      }
    }

    const info = document.createElement('div');
    info.className = 'frame-info';
    info.textContent = `${TRANSLATIONS[currentLang].frameName} ${idx + 1}`;

    const actions = document.createElement('div');
    actions.className = 'frame-actions';
    if (frames.length > 1) {
      const delBtn = document.createElement('button');
      delBtn.textContent = '❌';
      delBtn.title = 'Kareyi Sil';
      delBtn.onclick = (e) => {
        e.stopPropagation();
        frames.splice(idx, 1);
        if (currentFrameIndex >= frames.length) currentFrameIndex = frames.length - 1;
        renderCanvas();
        updateFramesList();
      };
      actions.appendChild(delBtn);
    }

    item.appendChild(thumb);
    item.appendChild(info);
    item.appendChild(actions);

    item.onclick = () => {
      currentFrameIndex = idx;
      renderCanvas();
      updateFramesList();
    };

    listEl.appendChild(item);
  });
}

document.getElementById('btn-add-frame').addEventListener('click', () => {
  // Önceki kareyi kopyalayarak yeni kare oluştur
  const clone = [...frames[currentFrameIndex]];
  frames.push(clone);
  currentFrameIndex = frames.length - 1;
  renderCanvas();
  updateFramesList();
});

// Canlı Önizleme Oynatıcı
let animFps = 6;
let isPlaying = true;
let animTimer = null;
let animFrameIdx = 0;

function startAnimationLoop() {
  if (animTimer) clearInterval(animTimer);
  animTimer = setInterval(() => {
    if (!isPlaying || frames.length === 0) return;
    animFrameIdx = (animFrameIdx + 1) % frames.length;
    renderPreview(frames[animFrameIdx]);
  }, 1000 / animFps);
}

function renderPreview(frameData) {
  previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
  const pixelSize = previewCanvas.width / GRID_SIZE;

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const c = frameData[y * GRID_SIZE + x];
      if (c) {
        previewCtx.fillStyle = c;
        previewCtx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  }
}

document.getElementById('fps-slider').addEventListener('input', (e) => {
  animFps = parseInt(e.target.value);
  document.getElementById('fps-label').textContent = `${animFps} FPS`;
  startAnimationLoop();
});

document.getElementById('btn-play-pause').addEventListener('click', (e) => {
  isPlaying = !isPlaying;
  e.target.textContent = isPlaying ? '⏸️ Durdur' : '▶️ Oynat';
});

// --- CSS BOX-SHADOW EXPORT ---
document.getElementById('btn-export-css').addEventListener('click', () => {
  const frame = frames[currentFrameIndex];
  const pixelSize = 10; // CSS'te her piksel 10px kabul edilsin
  const shadows = [];

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const color = frame[y * GRID_SIZE + x];
      if (color) {
        // x offset, y offset, blur(0), color
        shadows.push(`${(x + 1) * pixelSize}px ${(y + 1) * pixelSize}px 0 ${color}`);
      }
    }
  }

  const cssCode = `/* Saf CSS Piksel Sanatı (Zero Image) */
.pixel-art {
  width: ${pixelSize}px;
  height: ${pixelSize}px;
  background: transparent;
  box-shadow: 
    ${shadows.join(',\n    ')};
}

<!-- HTML -->
<div class="pixel-art"></div>`;

  document.getElementById('cssCodeOutput').textContent = cssCode;
  document.getElementById('cssModal').classList.add('active');
});

document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('cssModal').classList.remove('active');
});

document.getElementById('btn-copy-css').addEventListener('click', () => {
  const code = document.getElementById('cssCodeOutput').textContent;
  navigator.clipboard.writeText(code).then(() => {
    alert(TRANSLATIONS[currentLang].copiedAlert);
  });
});

// PNG Export
document.getElementById('btn-export-png').addEventListener('click', () => {
  // Büyütülmüş yüksek çözünürlüklü export canvas
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = 512;
  exportCanvas.height = 512;
  const eCtx = exportCanvas.getContext('2d');
  eCtx.imageSmoothingEnabled = false;

  const currentFrame = frames[currentFrameIndex];
  const pSize = 512 / GRID_SIZE;

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const c = currentFrame[y * GRID_SIZE + x];
      if (c) {
        eCtx.fillStyle = c;
        eCtx.fillRect(x * pSize, y * pSize, pSize, pSize);
      }
    }
  }

  const link = document.createElement('a');
  link.download = `pixel-art-${Date.now()}.png`;
  link.href = exportCanvas.toDataURL('image/png');
  link.click();
});

// Undo / Redo Butonları
const btnUndo = document.getElementById('btn-undo');
const btnRedo = document.getElementById('btn-redo');
if (btnUndo) btnUndo.addEventListener('click', undo);
if (btnRedo) btnRedo.addEventListener('click', redo);

// Başlat
init();
applyLanguage(currentLang);
const btnLang = document.getElementById('btn-lang');
if (btnLang) {
  btnLang.addEventListener('click', () => {
    applyLanguage(currentLang === 'tr' ? 'en' : 'tr');
  });
}
