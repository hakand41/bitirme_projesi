<template>
  <div class="min-h-screen bg-gray-50 p-0 md:p-4 relative">
    <LoadingOverlay
      :visible="loading"
      message="Veriler yükleniyor, lütfen bekleyin..."
    />

    <div
      v-if="!loading && stats"
      class="max-w-screen-2xl mx-auto bg-white shadow-lg md:rounded-xl overflow-hidden"
    >
      <ReportHeader
        :user1="stats.user1"
        :user2="stats.user2"
        :similarity="stats.similarity"
        @toggle-chart="toggleChart"
        :show-chart="showChart"
        class="px-4 md:px-6 lg:px-8"
      />

      <div class="p-4 text-center text-sm text-gray-600 bg-gray-100 border-y">
        Birbiriyle eşleşen metin blokları her iki tarafta da aynı renkle işaretlenmiştir. Farklı eşleşme grupları farklı renklere sahiptir.
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-px bg-gray-200">
        <div class="bg-white p-3 md:p-4 lg:p-6 overflow-x-auto">
          <h3 class="text-lg font-semibold text-gray-700 mb-3 sticky top-0 bg-white py-2 border-b -mx-3 md:-mx-4 lg:-mx-6 px-3 md:px-4 lg:px-6 z-10">{{ stats.user1 }}</h3>
          <div
            class="comparison-pane"
            v-html="highlightedText1Html"
            ref="pane1Content"
            @click="handleContentClick"
          ></div>
        </div>

        <div class="bg-white p-3 md:p-4 lg:p-6 overflow-x-auto">
          <h3 class="text-lg font-semibold text-gray-700 mb-3 sticky top-0 bg-white py-2 border-b -mx-3 md:-mx-4 lg:-mx-6 px-3 md:px-4 lg:px-6 z-10">{{ stats.user2 }}</h3>
          <div
            class="comparison-pane"
            v-html="highlightedText2Html"
            ref="pane2Content"
            @click="handleContentClick"
          ></div>
        </div>
      </div>

      <transition name="slide-fade">
        <div
          v-if="showChart"
          class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          @click.self="toggleChart"
        >
          <div
            class="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
          >
            <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 class="text-xl md:text-2xl font-semibold text-gray-800">
                Detaylı Rapor ve İstatistikler
              </h2>
              <button
                @click="toggleChart"
                class="text-gray-400 hover:text-gray-600 p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Kapat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="p-6 space-y-8 overflow-y-auto">
              <div v-if="stats">
                <section aria-labelledby="similarity-stats-title">
                  <h3 id="similarity-stats-title" class="text-lg font-medium text-gray-900 mb-4">Genel Benzerlik İstatistikleri</h3>
                  <StatisticsGrid :stats="statCardsForReport" />
                </section>

                <hr class="my-8 border-gray-300">

                <section aria-labelledby="word-distribution-chart-title">
                  <h3 id="word-distribution-chart-title" class="text-lg font-medium text-gray-900 mb-1">Kelime Dağılım Grafiği</h3>
                  <p class="text-sm text-gray-500 mb-4">İşaretlenen bloklardaki kelime sayıları ve metinlere özgü kelime sayıları.</p>
                  <div class="h-72 md:h-80 relative">
                    <SimilarityBarChart :data="barChartDataForReport" :options="barChartOptions" />
                  </div>
                </section>
              </div>
               <div v-else class="text-center py-10">
                <p class="text-gray-500">İstatistik verileri yüklenemedi.</p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div v-else-if="!loading && !stats" class="text-center py-10">
        <p class="text-red-500 text-lg">Rapor verileri yüklenemedi veya bulunamadı.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { ChartData, ChartOptions, TooltipItem } from "chart.js";
import Chart from 'chart.js/auto';

import LoadingOverlay from "@/components/ui/LoadingOverlay.vue";
import ReportHeader from "@/components/reports/ReportHeader.vue";
import SimilarityBarChart from "@/components/charts/SimilarityBarChart.vue";
// SimilarityDoughnutChart importu kaldırıldı, çünkü son kodunuzda yoktu.
import StatisticsGrid from "@/components/reports/StatisticsGrid.vue";

interface ApiMatchSpan {
  start1: number;
  length: number;
  start2: number;
}

interface ProcessedMatchSpanWithColor extends ApiMatchSpan {
  id: string;
  color: string;
}

interface ReportDataFromApi {
  user1: string;
  user2: string;
  similarity: number;
  raw_text1: string;
  raw_text2: string;
  matchSpans: ApiMatchSpan[];
  matchingWords?: string[];
  matchingWordCount?: number; // API'den gelen orijinal (benzersiz) eşleşen kelime sayısı
  uniqueWords1?: number;
  uniqueWords2?: number;
  totalWords1?: number;
  totalWords2?: number;
  timeElapsed?: number;
}

interface StatCard {
  title: string;
  value: string | number;
  description?: string;
  icon?: string;
}

const distinctColors = [
  '#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF',
  '#A0C4FF', '#BDB2FF', '#FFC6FF', '#AED9E0', '#FFC0CB',
  '#D8BFD8', '#FFE4B5',
];

function getColorForIndex(index: number): string {
  return distinctColors[index % distinctColors.length];
}

function escapeHtml(unsafe: string | undefined): string {
  if (typeof unsafe !== 'string') return '';
  return unsafe
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
}

export default defineComponent({
  name: "ComparisonView",
  components: {
    LoadingOverlay,
    ReportHeader,
    SimilarityBarChart,
    // SimilarityDoughnutChart, // Kaldırıldı
    StatisticsGrid,
  },
  setup() {
    const route = useRoute();
    const stats = ref<ReportDataFromApi | null>(null);
    const showChart = ref(false);
    const loading = ref(true);

    const pane1Content = ref<HTMLElement | null>(null);
    const pane2Content = ref<HTMLElement | null>(null);

    const processedSpansWithColors = computed((): ProcessedMatchSpanWithColor[] => {
      if (!stats.value?.matchSpans) return [];
      return stats.value.matchSpans.map((span, index) => ({
        ...span,
        id: `match-${index}`,
        color: getColorForIndex(index),
      }));
    });

    const generateHighlightedHtml = (
      text: string | undefined,
      spans: ProcessedMatchSpanWithColor[],
      spanType: 'start1' | 'start2'
    ): string => {
      if (!text || !spans || spans.length === 0) { return escapeHtml(text); }
      let html = "";
      let lastIndex = 0;
      const sortedSpans = [...spans].sort((a, b) => a[spanType] - b[spanType]);
      sortedSpans.forEach(span => {
        const startPosition = span[spanType];
        const endPosition = startPosition + span.length;
        const originalTextSegment = text.substring(startPosition, endPosition);
        html += escapeHtml(text.substring(lastIndex, startPosition));
        html += `<mark data-span-id="${escapeHtml(span.id)}" style="background-color: ${span.color}; cursor:pointer; padding: 0.1em 0.2em; border-radius: 0.2em;">${escapeHtml(originalTextSegment)}</mark>`;
        lastIndex = endPosition;
      });
      html += escapeHtml(text.substring(lastIndex));
      return html;
    };

    const highlightedText1Html = computed(() => generateHighlightedHtml(stats.value?.raw_text1, processedSpansWithColors.value, 'start1'));
    const highlightedText2Html = computed(() => generateHighlightedHtml(stats.value?.raw_text2, processedSpansWithColors.value, 'start2'));

    const fetchData = async () => {
      loading.value = true;
      const content_id_from_path = route.params.contentId as string;
      const file1_id_from_query = route.query.file1_id as string;
      const file2_id_from_query = route.query.file2_id as string;

      if (!content_id_from_path || !file1_id_from_query || !file2_id_from_query) {
        stats.value = null; loading.value = false; return;
      }
      try {
        const response = await axios.post<ReportDataFromApi>(
          "http://localhost:5000/get_comparison_detail_json",
          { content_id: content_id_from_path, file1_id: file1_id_from_query, file2_id: file2_id_from_query }
        );
        stats.value = response.data;
      } catch (err) {
        console.error("Veri alınırken hata:", err); stats.value = null;
      } finally {
        loading.value = false;
      }
    };

    const scrollToElementInPane = (paneContentRef: typeof pane1Content | typeof pane2Content, spanId: string) => {
      if (paneContentRef.value) {
        const element = paneContentRef.value.querySelector(`mark[data-span-id="${spanId}"]`) as HTMLElement;
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.style.transition = 'outline 0.1s ease-in-out, box-shadow 0.1s ease-in-out';
          element.style.outline = `3px solid #0056b3`;
          element.style.boxShadow = `0 0 10px rgba(0, 86, 179, 0.5)`;
          setTimeout(() => {
            element.style.outline = 'none';
            element.style.boxShadow = 'none';
          }, 1500);
        }
      }
    };
    
    const handleActualSpanClick = (spanId: string) => {
        scrollToElementInPane(pane1Content, spanId);
        scrollToElementInPane(pane2Content, spanId);
    };

    const handleContentClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.tagName === 'MARK' && target.dataset.spanId) {
            handleActualSpanClick(target.dataset.spanId);
        }
    };

    // --- YENİ COMPUTED PROPERTY: MatchSpans içindeki toplam kelime sayısı ---
    const wordsInMatchSpansCount = computed((): number => {
      if (!stats.value || !stats.value.matchSpans || !stats.value.raw_text1) {
        return 0;
      }
      let totalWords = 0;
      stats.value.matchSpans.forEach(span => {
        const textSegment = stats.value!.raw_text1.substring(span.start1, span.start1 + span.length);
        const wordsInSegment = textSegment.split(/\s+/).filter(word => word.trim().length > 0);
        totalWords += wordsInSegment.length;
      });
      return totalWords;
    });

    // --- BAR GRAFİK İÇİN VERİ VE SEÇENEKLER (Güncellendi) ---
    const barChartDataForReport = computed<ChartData<"bar">>(() => { // Eski adı chartDataForReport idi, barChartDataForReport olarak kalabilir veya eski adına dönebilirsiniz.
      const s = stats.value;
      const user1Name = s?.user1 || 'Metin 1';
      const user2Name = s?.user2 || 'Metin 2';
      return {
        labels: [ 
          `Eşleşen Bloklardaki Kelimeler`, // ETİKET GÜNCELLENDİ
          `'${user1Name}' Özgü Kelimeler`, 
          `'${user2Name}' Özgü Kelimeler`
        ],
        datasets: [{
            label: "Kelime Sayısı",
            data: [ 
              wordsInMatchSpansCount.value, // YENİ VERİ KAYNAĞI KULLANILIYOR
              s?.uniqueWords1 || 0, 
              s?.uniqueWords2 || 0
            ],
            backgroundColor: [ 'rgba(75, 192, 192, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 159, 64, 0.7)'],
            borderColor: [ 'rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1, borderRadius: 4, barPercentage: 0.6, categoryPercentage: 0.7,
        }],
      };
    });

    const barChartOptions = computed<ChartOptions<"bar">>(() => ({ // Eski adı chartOptions idi.
      responsive: true, maintainAspectRatio: false, indexAxis: 'y',
      plugins: {
        legend: { display: false },
        title: { display: false },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)', titleFont: {size: 13}, bodyFont: {size: 13}, padding: 8, cornerRadius: 3, displayColors: false,
          callbacks: { label: (c: TooltipItem<"bar">) => `${c.dataset.label || ''}: ${c.parsed.x}` }
        },
      },
      scales: {
        x: { beginAtZero: true, grid: { color: 'rgba(200,200,200,0.1)', drawBorder: false }, ticks: { precision: 0, font: {size: 11}, color: '#555'} },
        y: { grid: { display: false }, ticks: { font: {size: 11}, color: '#333'} }
      },
      animation: { duration: 800, easing: 'easeOutCubic' },
    }));
    
    // İstatistik Kartları (Güncellendi)
    const statCardsForReport = computed<StatCard[]>(() => {
      if (!stats.value) return [];
      const s = stats.value;
      return [
        { title: `Toplam Kelime (${s.user1})`, value: s.totalWords1 || 0, description: `${s.user1} adlı kullanıcının metnindeki toplam kelime sayısı.` },
        { title: `Toplam Kelime (${s.user2})`, value: s.totalWords2 || 0, description: `${s.user2} adlı kullanıcının metnindeki toplam kelime sayısı.` },
        { 
          title: "Eşleşen Bloklardaki Kelime Sayısı", // BAŞLIK GÜNCELLENDİ
          value: wordsInMatchSpansCount.value,      // YENİ VERİ KAYNAĞI KULLANILIYOR
          description: "Vurgulanan benzer metin bloklarındaki toplam kelime sayısı." // AÇIKLAMA GÜNCELLENDİ
        },
        { title: `Özgün Kelime (${s.user1})`, value: s.uniqueWords1 || 0, description: `${s.user1} adlı kullanıcının metnine özgü, diğer metinde bulunmayan kelime sayısı.` },
        { title: `Özgün Kelime (${s.user2})`, value: s.uniqueWords2 || 0, description: `${s.user2} adlı kullanıcının metnine özgü, diğer metinde bulunmayan kelime sayısı.` },
        { title: "JSON İşlem Süresi", value: `${s.timeElapsed?.toFixed(3) || 'N/A'} saniye`, description: "Karşılaştırma JSON verisinin sunucuda üretilme süresi." },
      ];
    });

    const toggleChart = () => { showChart.value = !showChart.value; };

    onMounted(fetchData);

    return {
      stats, showChart, loading,
      processedSpansWithColors,
      handleContentClick,
      pane1Content, pane2Content,
      barChartDataForReport, // Güncellenmiş isim
      barChartOptions,       // Güncellenmiş isim
      // doughnutChartDataForReport, // Bu versiyonda kaldırıldı
      // doughnutChartOptions,      // Bu versiyonda kaldırıldı
      statCardsForReport, toggleChart,
      highlightedText1Html, highlightedText2Html,
    };
  },
});
</script>

<style scoped>
/* ... (scoped stiller öncekiyle aynı kalabilir) ... */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.comparison-pane {
  font-family: 'Roboto Mono', 'SF Mono', 'Consolas', 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.75;
  color: #2d3748; /* Tailwind gray-800 */
  text-align: left;
  white-space: pre-wrap; 
  word-wrap: break-word; 
  padding-top: 0.5rem;
  min-height: 400px;
  max-height: 70vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #a0aec0 #e2e8f0; /* Tailwind gray-500 / gray-300 */
}

.comparison-pane::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.comparison-pane::-webkit-scrollbar-track {
  background: #e2e8f0; /* Tailwind gray-300 */
  border-radius: 10px;
}
.comparison-pane::-webkit-scrollbar-thumb {
  background-color: #a0aec0; /* Tailwind gray-500 */
  border-radius: 10px;
  border: 2px solid #e2e8f0; 
}
.comparison-pane::-webkit-scrollbar-thumb:hover {
  background-color: #718096; /* Tailwind gray-600 */
}

:global(.comparison-pane mark) {
  padding: 0.15em 0.3em !important;
  border-radius: 0.3em !important;
  transition: filter 0.2s ease-in-out, box-shadow 0.2s ease-in-out !important;
}

:global(.comparison-pane mark:hover) {
  filter: brightness(110%);
}
</style>