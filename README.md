# 👾 PixelCraft Studio

> Modern, tarayıcı tabanlı piksel sanatı çizim aracı, sprite animatörü ve **saf CSS box-shadow kod üreteci**. Sıfır harici kütüphane bağımlılığı ile saf HTML5 Canvas ve modern JavaScript ile geliştirilmiştir.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

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
  - `P`: Kalem
  - `B`: Kova
  - `E`: Silgi
  - `I`: Damlalık

### 🚀 Dışa Aktarma (Export)
1. **✨ Saf CSS Box-Shadow:** Harici hiçbir resim (.png vb.) kullanmadan, tek bir `<div>` etiketiyle piksel sanatını web sitelerine ekleme kodu üretir.
2. **💾 PNG İndir:** Yüksek çözünürlüklü (512x512) piksel-keskinliğinde PNG olarak kaydeder.

---

## 🚀 Hızlı Başlangıç

Harici bir paket yükleme (`npm install` vb.) gerektirmez.

```bash
# 1. Depoyu klonlayın
git clone https://github.com/KULLANICI_ADINIZ/pixelcraft-studio.git
cd pixelcraft-studio

# 2. Yerel sunucu başlatın
python3 -m http.server 5173
```
Ardından tarayıcınızda `http://localhost:5173` adresini açın.

---

## 📄 Lisans
Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.
