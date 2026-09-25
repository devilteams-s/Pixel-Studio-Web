# 👾 PixelCraft Studio

> Modern, tarayıcı tabanlı piksel sanatı çizim aracı, sprite animatörü ve **saf CSS box-shadow kod üreteci**. Sıfır harici kütüphane bağımlılığı ile saf HTML5 Canvas ve modern JavaScript ile geliştirilmiştir.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Python 3](https://img.shields.io/badge/Python-3.x-3776AB?style=flat&logo=python&logoColor=white)

---

## ✨ Özellikler

### 🎨 Çizim & Düzenleme Araçları
- **Kalem (Pen):** Piksel piksel hassas çizim.
- **Kova Dolgusu (Flood Fill):** Akıllı algoritma ile aynı renkteki kapalı alanları tek tıkla boyama.
- **Silgi (Eraser):** Hızlı piksel temizleme.
- **Damlalık (Eyedropper):** Çizimden anında renk örneği alma.
- **Dinamik Izgara Seçenekleri:** 16x16, 24x24 ve 32x32 boyutlarında ayarlanabilir tuval.
- **Hazır Neon & Retro Renk Paleti:** Hızlı renk seçimi ve özelleştirilebilir HEX renk seçici.

### ⏱️ Canlı Animasyon & Kare (Frame) Timeline
- **Çoklu Kare Desteği:** Yeni kareler ekleme, silme ve önceki kareyi kopyalayarak akıcı animasyonlar üretme.
- **Canlı Önizleme:** Sağ üstteki mini oynatıcıda çizdiğin sprite animasyonunu anlık olarak izleme.
- **FPS Kontrolü:** 1 - 24 FPS arasında animasyon hızını dinamik ayarlama ve duraklatma.

### ⚡ Geri Al / İleri Al (Undo / Redo) & Kısayollar
- **`Ctrl + Z` / `Cmd + Z`:** Son yapılan çizim hamlesini geri alma (40 adıma kadar geçmiş).
- **`Ctrl + Y` / `Ctrl + Shift + Z`:** Geri alınan işlemi ileri alma.
- **Klavye Kısayolları:** 
  - `P`: Kalem (Pen)
  - `B`: Kova (Bucket)
  - `E`: Silgi (Eraser)
  - `I`: Damlalık (Eyedropper)

### 🚀 Dışa Aktarma (Export)
1. **✨ Saf CSS Box-Shadow:** Harici hiçbir resim (.png, .jpg vb.) kullanmadan, tek bir `<div>` etiketiyle piksel sanatını web sitelerine ekleme kodu üretir.
2. **💾 PNG İndir:** Yüksek çözünürlüklü (512x512) piksel-keskinliğinde PNG olarak cihazınıza kaydeder.

---

## 🚀 Kurulum ve Yerel Sunucu Başlatma

Harici hiçbir paket veya kütüphane (`npm install` vb.) gerektirmez.

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/devilteams-s/Pixel-Studio-Web.git
cd Pixel-Studio-Web
```

### 2. Yerel Sunucuyu Başlatın

Projede hem **Linux** hem **Windows** için otomatik tarayıcı açan Python geliştirme sunucusu hazır bulunmaktadır:

#### 🐧 Linux:
```bash
# Betiği çalıştırın (Otomatik tarayıcı açar)
./start-server.sh

# Veya doğrudan Python ile:
python3 server.py
```

#### 🪟 Windows:
- `start-server.bat` dosyasına **çift tıklayın**,
- Veya Komut İstemi'nde (CMD / PowerShell):
```cmd
python server.py
```

> **Not:** Sunucu başlatıldığında varsayılan tarayıcınızda otomatik olarak `http://localhost:5173` adresi açılır. Port meşgulse otomatik olarak bir sonraki boş port seçilir.

---

## 📁 Proje Yapısı

```
Pixel-Studio-Web/
├── index.html        # Ana uygulama arayüzü
├── style.css         # Glassmorphism & modern karanlık tema stilleri
├── studio.js         # Çizim motoru, timeline, undo/redo ve export algoritmaları
├── server.py         # Çapraz platform Python yerel geliştirme sunucusu
├── start-server.sh   # Linux tek tıkla başlatma betiği
├── start-server.bat  # Windows tek tıkla başlatma betiği
├── README.md         # Dokümantasyon
└── LICENSE           # MIT Lisansı
```

---

## 📄 Lisans
Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.
