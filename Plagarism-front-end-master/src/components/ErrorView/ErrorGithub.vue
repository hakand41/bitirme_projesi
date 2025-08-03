<template>
  <div class="service-unavailable-container">
    <div class="service-card">
      <div class="emoji">😔</div>
      <h1 class="title">Üzgünüz, Bu Özellik Şu Anda Kullanılamıyor</h1>
      
      <div class="message">
        <p>Maalesef şu anda bu hizmeti sunamıyoruz. Ekibimiz bu özelliği en kısa sürede devreye almak için çalışıyor.</p>
        
        <div class="features">
          <p>Yakında gelecek özellikler:</p>
          <ul>
            <li>GitHub entegrasyonu ile proje yönetimi</li>
            <li>Kod paylaşım ve işbirliği araçları</li>
            <li>Otomatik versiyon kontrol desteği</li>
          </ul>
        </div>
      </div>

      <div class="actions">
        <router-link to="/" class="primary-button">
          Ana Sayfaya Dön
        </router-link>
        <button @click="notifyMe" class="secondary-button">
          Hazır Olduğunda Haber Ver
        </button>
      </div>

     
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ServiceUnavailable',
  methods: {
    notifyMe() {
      alert('Tamamdır, bu özellik hazır olduğunda size haber vereceğiz!');
    }
  }
});
</script>

<style scoped>
.service-unavailable-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
}

.service-card {
  max-width: 600px;
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.emoji {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.title {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
}

.message {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.features {
  background: #f8f9fa;
  border-left: 4px solid #4299e1;
  padding: 1rem;
  margin: 1.5rem 0;
  text-align: left;
  border-radius: 0 8px 8px 0;
}

.features p {
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.features ul {
  padding-left: 1.5rem;
  margin: 0;
  color: #4a5568;
}

.features li {
  margin-bottom: 0.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.primary-button {
  background-color: #4299e1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.primary-button:hover {
  background-color: #3182ce;
  transform: translateY(-2px);
}

.secondary-button {
  background: white;
  color: #4299e1;
  padding: 0.75rem 1.5rem;
  border: 1px solid #4299e1;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.secondary-button:hover {
  background-color: #ebf8ff;
  transform: translateY(-2px);
}

.support {
  margin-top: 2.5rem;
  font-size: 0.9rem;
  color: #718096;
}

.support a {
  color: #4299e1;
  text-decoration: none;
  font-weight: 500;
}

.support a:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .service-card {
    padding: 2rem 1.5rem;
  }
  
  .title {
    font-size: 1.5rem;
  }
  
  .actions {
    flex-direction: column;
  }
}
</style>