<template>
  <div>
    <h2
      :class="[
        'text-lg font-semibold mb-3 px-2 py-1 rounded inline-block',
        titleClass,
      ]"
    >
      {{ title }}
    </h2>

    <!-- Bildirim Kutusu -->
    <div
      v-if="notificationMessage"
      class="fixed top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
    >
      {{ notificationMessage }}
    </div>

    <div
      class="prose max-w-none text-[1rem] bg-gray-50 border rounded-lg p-4 h-[400px] overflow-auto"
      @click="handleTextClick"
      ref="textContainer"
    >
      <div v-html="highlightedText"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";

interface MatchSpan {
  start1?: number;
  start2?: number;
  length: number;
  id: string;
}

export default defineComponent({
  name: "TextComparisonPane",
  props: {
    title: { type: String, required: true },
    text: { type: String, default: "" },
    matchSpans: { type: Array as () => MatchSpan[], default: () => [] },
    matchingWords: { type: Array as () => string[], default: () => [] },
    highlightMode: { type: String, default: "none" },
    type: { type: String as () => "start1" | "start2", required: true },
    color: { type: String as () => "indigo" | "purple", default: "indigo" },
  },
  emits: ["span-clicked"],
  setup(props, { emit }) {
    const textContainer = ref<HTMLElement | null>(null);
    const notificationMessage = ref("");

    const showNotification = (message: string) => {
      notificationMessage.value = message;
      setTimeout(() => {
        notificationMessage.value = "";
      }, 3000);
    };

    const titleClass = computed(() =>
      props.color === "indigo"
        ? "bg-indigo-100 text-indigo-700"
        : "bg-purple-100 text-purple-700"
    );

    const highlightColors = computed(() =>
      props.color === "indigo"
        ? "bg-indigo-100 text-indigo-900 border border-indigo-200 hover:bg-indigo-200 cursor-pointer"
        : "bg-purple-100 text-purple-900 border border-purple-200 hover:bg-purple-200 cursor-pointer"
    );

    const highlightedText = computed(() => {
      const text = props.text;
      if (!text) return "";

      const sortedWords = [...props.matchingWords].sort(
        (a, b) => b.length - a.length
      );
      const wordRegex = sortedWords.length
        ? new RegExp(`\\b(${sortedWords.join("|")})\\b`, "gi")
        : null;

      if (props.highlightMode === "match" && wordRegex) {
        const matches = [...text.matchAll(wordRegex)];
        return matches
          .map(
            (m) =>
              `<span class="${highlightColors.value}" data-word="${m[1].toLowerCase()}">${m[1]}</span>`
          )
          .join(" ");
      }

      if (props.highlightMode === "diff" && wordRegex) {
        return text
          .split(/\b/)
          .filter((word) => !props.matchingWords.includes(word))
          .join("")
          .replace(/\n/g, "<br>");
      }

      const spanMap = new Map<number, { length: number; id: string }>();
      for (const span of props.matchSpans) {
        const start = span[props.type] ?? 0;
        spanMap.set(start, { length: span.length, id: span.id });
      }

      let result = "";
      let i = 0;

      while (i < text.length) {
        if (spanMap.has(i)) {
          const { length, id } = spanMap.get(i)!;
          const chunk = text.slice(i, i + length);
          result += `<span class="${highlightColors.value}" data-span-id="${id}">${chunk}</span>`;
          i += length;
        } else {
          result += text[i];
          i++;
        }
      }

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = result.replace(/\n/g, "<br>");

      if (wordRegex) {
        const walk = (node: Node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const original = node.nodeValue!;
            if (wordRegex.test(original)) {
              const replaced = original.replace(
                wordRegex,
                (match) =>
                  `<span class="${highlightColors.value}" data-word="${match.toLowerCase()}">${match}</span>`
              );
              const tempSpan = document.createElement("span");
              tempSpan.innerHTML = replaced;
              (node as ChildNode).replaceWith(...Array.from(tempSpan.childNodes));
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            if (!el.hasAttribute("data-span-id")) {
              for (const child of [...el.childNodes]) {
                walk(child);
              }
            }
          }
        };

        for (const child of [...tempDiv.childNodes]) {
          walk(child);
        }
      }

      return tempDiv.innerHTML;
    });

    const handleTextClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "SPAN") {
        if (target.dataset.spanId) {
          emit("span-clicked", target.dataset.spanId);
        } else if (target.dataset.word) {
          emit("span-clicked", target.dataset.word);
          scrollToWord(target.dataset.word);
        }
      }
    };

    const scrollToSpan = (spanId: string) => {
      if (!textContainer.value) return;
      const allSpans = textContainer.value.querySelectorAll("span[data-span-id]");
      allSpans.forEach((el) => {
        el.classList.remove("ring-2", "ring-offset-2", "ring-yellow-400");
      });
      const matches = textContainer.value.querySelectorAll(
        `span[data-span-id="${spanId}"]`
      );
      matches.forEach((el, i) => {
        el.classList.add("ring-2", "ring-offset-2", "ring-yellow-400");
        if (i === 0) {
          (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    };

    const scrollToWord = (word: string) => {
      if (!textContainer.value) return;
      const allSpans = textContainer.value.querySelectorAll("span[data-word]");
      allSpans.forEach((el) => {
        el.classList.remove("ring-2", "ring-offset-2", "ring-yellow-400");
      });
      const matches = textContainer.value.querySelectorAll(
        `span[data-word="${word.toLowerCase()}"]`
      );
      matches.forEach((el, i) => {
        el.classList.add("ring-2", "ring-offset-2", "ring-yellow-400");
        if (i === 0) {
          (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
      showNotification(`${matches.length} adet "${word}" bulundu.`);
    };

    return {
      titleClass,
      highlightedText,
      handleTextClick,
      scrollToSpan,
      scrollToWord,
      textContainer,
      notificationMessage,
    };
  },
});
</script>

<style scoped>
.prose :deep(span[data-span-id]),
.prose :deep(span[data-word]) {
  box-decoration-break: clone;
  padding: 0.1em 0.2em;
  margin: 0 -0.1em;
  transition: background-color 0.2s ease;
}
</style>
