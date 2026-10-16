# Novarge Okuma Yazma

4–6 yaş grubu için Türkçe, dokunmatik uyumlu etkileşimli web prototipi. `dist/` statik olarak sunulur; derleme veya API anahtarı gerekmez.

## İçerik

- 29 Türkçe harf: büyük ve küçük harfleri parmak, kalem veya fareyle izleme. Harf maskesi üzerinde kapsama ve çizgi yakınlığı kontrolü.
- 6 hece, 6 kelime ve 4 cümle oluşturma oyunu. Dokunarak ekleme, dokunarak geri alma ve sesli model.
- 8 dinle–resim eşleştirmesi ve 8 söyleme alıştırması.
- Günlük oyun hedefi, benzersiz etkinlikler için yıldızlar, kazanılan rozetler.
- Ebeveyn alanı: takma ad, hedef, oturumluk mikrofon tercihi, JSON dışa aktarımı, iki adımlı ilerleme sıfırlama.
- Yerel kayıt: `localStorage`; kayıt kapalıysa oturum içinde çalışır.

## Ses ve sınırlar

Seslendirme Web Speech Synthesis ile `tr-TR` sesini tercih eder. Kalite ve ses desteği cihaza bağlıdır; insan tarafından kaydedilmiş öğretim amaçlı fonem kayıtları yoktur. SpeechRecognition desteklenen tarayıcılarda ebeveyn tercihi ve tarayıcı mikrofon izniyle çalışır; hizmet sesleri uzak sunucuya gönderebilir. Uygulama sesleri kaydetmez. Mikrofon kullanmadan yetişkin eşliğinde söyleme seçeneği vardır.

Bu sürümde sunucu, kullanıcı hesabı veya yapay zekâ servisi yoktur. Çizim kontrolü harf şeklinin izlenmesine, konuşma oyunu tanınan kelimenin eşleşmesine bakar; tanı, gelişim veya telaffuz değerlendirmesi değildir. İçerik tam bir müfredat veya öğretmen onaylı eğitim programı olarak sunulmaz. Üretim sürümünde eğitim uzmanı incelemesi, fonem kayıtları, yaşa uygun öğrenme sırası ve ebeveyn kontrolündeki sunucu entegrasyonu gerekir.

## Yerel çalıştırma

`node preview.mjs` komutu `http://127.0.0.1:4173` adresinde önizleme açar.
