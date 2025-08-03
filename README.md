# Akıllı İntihal Önleme Araçları: Eğitim ve Uygulama

Bu proje, Sakarya Uygulamalı Bilimler Üniversitesi Bilgisayar Mühendisliği Bölümü bitirme projesi kapsamında geliştirilmiştir.

**Geliştiriciler:**
* Hakan DEĞER 
* Emre ALMAMIŞ 
* İsmail Selim İNANIR 

**Danışman:**
* Doç. Dr. Selman HIZAL

## 📝 Proje Hakkında

Bu proje, belgeler arasında intihal tespiti amacıyla, çoka çok karşılaştırma (many-to-many comparison) yeteneğine sahip, çok katmanlı ve kullanıcı dostu bir yazılım sistemi sunmaktadır. Sistem; ödev, tez, proje gibi belgelerin benzerlik oranlarını detaylı bir şekilde analiz edebilir ve eşleşen bölümleri görsel olarak raporlayabilir. Ayrıca, Jplag entegrasyonu sayesinde kaynak kodlar arasındaki intihal tespiti de desteklenmektedir.

Projenin temel amacı, Turnitin gibi ticari araçların yüksek maliyetli ve genellikle "bire çok" karşılaştırmaya odaklanan yapısına bir alternatif sunmaktır. Özellikle bir sınıf içindeki tüm ödevlerin birbiriyle karşılaştırılması (çoka çok) gereken senaryolardaki boşluğu doldurarak, eğitim kurumlarına yönelik düşük maliyetli ve kapsamlı bir çözüm sunmayı hedefler.

## ✨ Temel Özellikler

* **Çoka Çok Karşılaştırma:** Sisteme yüklenen birden fazla belgeyi aynı anda birbiriyle karşılaştırarak grup ödevleri gibi senaryolarda kapsamlı bir analiz sunar.
* **Detaylı Raporlama ve Görselleştirme:** Benzerlik oranlarını, eşleşen metin bölümlerini renk kodlamaları ve Chart.js ile oluşturulan grafiklerle görselleştirerek kullanıcıların sonuçları kolayca yorumlamasını sağlar.
* **Kod İntihal Tespiti:** Jplag entegrasyonu ile programlama ödevlerindeki benzerlikleri de analiz eder.
* **Kullanıcı Dostu Arayüz:** Öğrenci ve öğretim görevlileri için ayrı paneller sunan, kolay ve anlaşılır bir kullanıcı arayüzüne sahiptir.
* **Asenkron Analiz:** Büyük boyutlu dosyaların analizi gibi yoğun işlemler, sistem performansını etkilememesi için Celery ve Redis kullanılarak arka planda asenkron olarak yürütülür.
* **Düşük Maliyet ve Açık Kaynak:** Ticari yazılımlara alternatif olarak, açık kaynaklı teknolojilerle geliştirilmiş düşük maliyetli bir çözüm sunar.

## 🛠️ Teknoloji ve Mimari

Proje, modern ve modüler bir mimari üzerine kurulmuştur.

* **Ön Yüz (Frontend):** **Vue.js**
    * Dinamik, reaktif ve bileşen tabanlı bir kullanıcı arayüzü için tercih edilmiştir. Axios kütüphanesi ile backend servisleriyle iletişim kurar.
* **Arka Yüz (Backend - Analiz Motoru):** **Python (Flask)**
    * Metin analizi, benzerlik hesaplama ve karşılaştırma motoru bu teknoloji ile geliştirilmiştir.
* **Arka Yüz (Backend - Yönetim):** **ASP.NET Core Web API (C#)**
    * Kullanıcı kimlik doğrulama (JWT tabanlı), yetkilendirme ve içerik yönetimi gibi temel CRUD işlemleri için kullanılmıştır.
* **Veri Tabanı:** **Microsoft SQL Server (MSSQL)**
    * Kullanıcı bilgileri, dosya meta verileri ve analiz sonuçları gibi verilerin depolanması için kullanılmıştır.
* **Asenkron Görevler:** **Celery & Redis**
    * Yoğun analiz işlemlerini yönetmek ve sistemin yanıt süresini iyileştirmek için görev kuyruğu ve mesajlaşma sistemi olarak entegre edilmiştir.
* **API Testi:** **Postman**
    * Tüm API uç noktalarının doğruluğu ve performansı Postman ile test edilmiştir.

### 📐 Sistem Mimarisi

![Sistem Mimarisi](https://i.imgur.com/gYlJgR8.png)
*Şekil: Proje raporundan alınan sistem mimarisi diyagramı.*

## 🔬 Kullanılan Algoritmalar

Metin benzerlik analizinde aşağıdaki algoritmalar kullanılmıştır:

* **TF-IDF (Term Frequency-Inverse Document Frequency)**
* **Cosine Similarity (Kosinüs Benzerliği)**
* **Jaccard Index (Jaccard Benzerliği)**
* **Levenshtein Distance**
* **Jaro-Winkler Distance**
* **Monge-Elkan**
* **Sorensen-Dice Coefficient**

## 🚀 Kurulum

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1.  **Depoyu klonlayın:**
    ```bash
    git clone [https://github.com/kullaniciadi/proje-adi.git](https://github.com/kullaniciadi/proje-adi.git)
    cd proje-adi
    ```

2.  **Backend Kurulumu (Flask & ASP.NET):**
    * *(Buraya backend'i kurmak ve çalıştırmak için gerekli adımları ekleyin. Örneğin: sanal ortam oluşturma, pip ile bağımlılıkları yükleme, .NET bağımlılıkları, veritabanı bağlantı ayarları vb.)*

3.  **Frontend Kurulumu (Vue.js):**
    ```bash
    cd frontend-klasoru
    npm install
    npm run serve
    ```

4.  **Gerekli Servisler:**
    * Redis ve MSSQL sunucularınızın çalıştığından emin olun.

## 💻 Kullanım

* Uygulamayı başlattıktan sonra tarayıcınızdan `http://localhost:8080` (veya belirlediğiniz port) adresine gidin.
* Öğretim görevlisi veya öğrenci olarak sisteme giriş yapın.
* **Öğretim Görevlisi:** Yeni bir ödev oluşturabilir, öğrencilerin yüklediği dosyaları görüntüleyebilir ve tüm dosyalar arasında "çoka çok" karşılaştırma işlemini başlatabilir. Analiz sonrası detaylı raporları ve görselleştirilmiş istatistikleri inceleyebilir.
* **Öğrenci:** Oluşturulmuş ödevlere kendi dosyalarını yükleyebilir ve kendi dosyasının diğerleriyle olan benzerlik raporunu görüntüleyebilir.

## Ekran Görüntüleri

Projenin arayüzüne ait detaylı görseller proje raporunda mevcuttur.

| Öğretmen Paneli                                       | Rapor Görünümü                                     |
| :---------------------------------------------------- | :------------------------------------------------- |
| ![Öğretmen Paneli](https://i.imgur.com/kXlqD0H.png)    | ![Rapor Görünümü](https://i.imgur.com/O6LlL7x.png) |

| İstatistikler                                         | Öğrenci Paneli                                     |
| :---------------------------------------------------- | :------------------------------------------------- |
| ![İstatistikler](https://i.imgur.com/T0bO9aI.png)      | ![Öğrenci Paneli](https://i.imgur.com/yVqXk1q.png) |

## 📜 Lisans

Bu proje, MIT Lisansı ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

*(Not: Projenizde bir lisans dosyası oluşturmanız tavsiye edilir.)*
