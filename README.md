# Akıllı İntihal Önleme Araçları: Eğitim ve Uygulama

[cite_start]Bu proje, Sakarya Uygulamalı Bilimler Üniversitesi Bilgisayar Mühendisliği Bölümü bitirme projesi kapsamında geliştirilmiştir. [cite: 65, 66]

**Geliştiriciler:**
* [cite_start]Hakan DEĞER (B210109370) [cite: 67]
* [cite_start]Emre ALMAMIŞ (B210109029) [cite: 68]
* [cite_start]İsmail Selim İNANIR (B210109017) [cite: 68]

**Danışman:**
* Doç. [cite_start]Dr. Selman HIZAL [cite: 69]

## 📝 Proje Hakkında

[cite_start]Bu proje, belgeler arasında intihal tespiti amacıyla, çoka çok karşılaştırma (many-to-many comparison) yeteneğine sahip, çok katmanlı ve kullanıcı dostu bir yazılım sistemi sunmaktadır. [cite: 8, 135] Sistem; [cite_start]ödev, tez, proje gibi belgelerin benzerlik oranlarını detaylı bir şekilde analiz edebilir ve eşleşen bölümleri görsel olarak raporlayabilir. [cite: 9, 136] [cite_start]Ayrıca, Jplag entegrasyonu sayesinde kaynak kodlar arasındaki intihal tespiti de desteklenmektedir. [cite: 10, 138]

## ✨ Temel Özellikler

* [cite_start]**Çoka Çok Karşılaştırma:** Sisteme yüklenen birden fazla belgeyi aynı anda birbiriyle karşılaştırarak grup ödevleri gibi senaryolarda kapsamlı bir analiz sunar. [cite: 30]
* [cite_start]**Detaylı Raporlama ve Görselleştirme:** Benzerlik oranlarını, eşleşen metin bölümlerini renk kodlamaları ve Chart.js ile oluşturulan grafiklerle görselleştirerek kullanıcıların sonuçları kolayca yorumlamasını sağlar. [cite: 31, 367]
* [cite_start]**Kod İntihal Tespiti:** Jplag entegrasyonu ile programlama ödevlerindeki benzerlikleri de analiz eder. [cite: 10, 38]
* [cite_start]**Kullanıcı Dostu Arayüz:** Öğrenci ve öğretim görevlileri için ayrı paneller sunan, kolay ve anlaşılır bir kullanıcı arayüzüne sahiptir. [cite: 217, 218]
* [cite_start]**Asenkron Analiz:** Büyük boyutlu dosyaların analizi gibi yoğun işlemler, sistem performansını etkilememesi için Celery ve Redis kullanılarak arka planda asenkron olarak yürütülür. [cite: 40, 551]
* [cite_start]**Düşük Maliyet ve Açık Kaynak:** Ticari yazılımlara alternatif olarak, açık kaynaklı teknolojilerle geliştirilmiş düşük maliyetli bir çözüm sunar. [cite: 32]

## 🛠️ Teknoloji ve Mimari

[cite_start]Proje, modern ve modüler bir mimari üzerine kurulmuştur. [cite: 44]

* [cite_start]**Ön Yüz (Frontend):** **Vue.js** [cite: 36, 99]
    * [cite_start]Dinamik, reaktif ve bileşen tabanlı bir kullanıcı arayüzü için tercih edilmiştir. [cite: 36, 538] [cite_start]Axios kütüphanesi ile backend servisleriyle iletişim kurar. [cite: 866]
* [cite_start]**Arka Yüz (Backend - Analiz Motoru):** **Python (Flask)** [cite: 11, 37]
    * [cite_start]Metin analizi, benzerlik hesaplama ve karşılaştırma motoru bu teknoloji ile geliştirilmiştir. [cite: 37]
* [cite_start]**Arka Yüz (Backend - Yönetim):** **ASP.NET Core Web API (C#)** [cite: 11, 39]
    * [cite_start]Kullanıcı kimlik doğrulama (JWT tabanlı), yetkilendirme ve içerik yönetimi gibi temel CRUD işlemleri için kullanılmıştır. [cite: 39, 785]
* [cite_start]**Veri Tabanı:** **Microsoft SQL Server (MSSQL)** [cite: 40]
    * [cite_start]Kullanıcı bilgileri, dosya meta verileri ve analiz sonuçları gibi verilerin depolanması için kullanılmıştır. [cite: 518]
* [cite_start]**Asenkron Görevler:** **Celery & Redis** [cite: 40, 99]
    * [cite_start]Yoğun analiz işlemlerini yönetmek ve sistemin yanıt süresini iyileştirmek için görev kuyruğu ve mesajlaşma sistemi olarak entegre edilmiştir. [cite: 40, 552]
* [cite_start]**API Testi:** **Postman** [cite: 99, 558]
    * [cite_start]Tüm API uç noktalarının doğruluğu ve performansı Postman ile test edilmiştir. [cite: 558]

### 📐 Sistem Mimarisi

![Sistem Mimarisi](https://i.imgur.com/gYlJgR8.png)
[cite_start]*Şekil: Proje raporundan alınan sistem mimarisi diyagramı. [cite: 526]*

## 🔬 Kullanılan Algoritmalar

[cite_start]Metin benzerlik analizinde aşağıdaki algoritmalar kullanılmıştır: [cite: 41, 139]

* [cite_start]**TF-IDF (Term Frequency-Inverse Document Frequency)** [cite: 41, 139]
* [cite_start]**Cosine Similarity (Kosinüs Benzerliği)** [cite: 41, 139]
* [cite_start]**Jaccard Index (Jaccard Benzerliği)** [cite: 41, 139]
* [cite_start]**Levenshtein Distance** [cite: 41, 139]
* [cite_start]**Jaro-Winkler Distance** [cite: 41, 139]
* [cite_start]**Monge-Elkan** [cite: 574]
* [cite_start]**Sorensen-Dice Coefficient** [cite: 592]

## 🚀 Kurulum

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1.  **Depoyu klonlayın:**
    ```bash
    git clone [https://github.com/hakand41/bitirme_projesi.git](https://github.com/hakand41/bitirme_projesi.git)
    cd bitirme_projesi
    ```

2.  **Backend Kurulumu (Flask & ASP.NET):**
    * **ASP.NET Core Backend (`IntihalProjesiOrjinal-master`):**
        * Visual Studio ile `IntihalProjesiOrjinal.sln` dosyasını açın.
        * `appsettings.json` dosyasında veritabanı bağlantı dizeninizi (`ConnectionString`) güncelleyin.
        * Package Manager Console'da `Update-Database` komutunu çalıştırarak veritabanı tablolarını oluşturun.
        * Projeyi çalıştırın (IIS Express).
    * **Python Backend (`jplag-bitirme`):**
        * Bir sanal ortam oluşturun ve aktive edin:
          ```bash
          python -m venv venv
          source venv/bin/activate  # Linux/macOS
          .\venv\Scripts\activate   # Windows
          ```
        * Gerekli kütüphaneleri yükleyin:
          ```bash
          pip install -r requirements.txt 
          ```
          *(Not: `requirements.txt` dosyası depoda bulunmadığından, `app.py` dosyasındaki import'lara göre oluşturulması gerekir: Flask, Flask-Cors, pyodbc, celery, redis, python-docx, PyPDF2, nltk, scikit-learn vb.)*
        * `config.py` dosyasındaki veritabanı ve Redis bağlantı bilgilerinizi düzenleyin.
        * Celery worker'ı başlatın: `celery -A celery_app.celery worker --loglevel=info`
        * Flask uygulamasını çalıştırın: `flask run`

3.  **Frontend Kurulumu (Vue.js - `Plagarism-front-end-master`):**
    ```bash
    cd Plagarism-front-end-master
    npm install
    npm run serve
    ```

4.  **Gerekli Servisler:**
    * Redis ve MSSQL sunucularınızın çalıştığından emin olun.

## 💻 Kullanım

* Uygulamayı başlattıktan sonra tarayıcınızdan `http://localhost:8080` (veya `package.json` dosyasında belirtilen port) adresine gidin.
* Öğretim görevlisi veya öğrenci olarak sisteme giriş yapın.
* **Öğretim Görevlisi:** Yeni bir ödev oluşturabilir, öğrencilerin yüklediği dosyaları görüntüleyebilir ve tüm dosyalar arasında "çoka çok" karşılaştırma işlemini başlatabilir. [cite_start]Analiz sonrası detaylı raporları ve görselleştirilmiş istatistikleri inceleyebilir. [cite: 204, 205]
* [cite_start]**Öğrenci:** Oluşturulmuş ödevlere kendi dosyalarını yükleyebilir ve kendi dosyasının diğerleriyle olan benzerlik raporunu görüntüleyebilir. [cite: 208, 215]

## Ekran Görüntüleri

Projenin arayüzüne ait detaylı görseller proje raporunda mevcuttur.

| [cite_start]Öğretmen Paneli [cite: 228] | [cite_start]Rapor Görünümü [cite: 257] |
| :---: | :---: |
| ![Öğretmen Paneli](https://i.imgur.com/kXlqD0H.png) | ![Rapor Görünümü](https://i.imgur.com/O6LlL7x.png) |

| [cite_start]İstatistikler [cite: 270] | [cite_start]Öğrenci Paneli [cite: 317] |
| :---: | :---: |
| ![İstatistikler](https://i.imgur.com/T0bO9aI.png) | ![Öğrenci Paneli](https://i.imgur.com/yVqXk1q.png) |

## 📜 Lisans

Bu proje, MIT Lisansı ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.
