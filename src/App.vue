<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import TheHeader from "./components/TheHeader.vue";
import TextInputArea from "./components/TextInputArea.vue";
import DiffViewer from "./components/DiffViewer.vue";
import AboutDialog from "./components/AboutDialog.vue";
import SettingDialog from "./components/SettingDialog.vue";
import PrivacyPolicyButton from "./components/PrivacyPolicyButton.vue";

//title
const appTitle = __APP_NAME__;

// テーマ切り替え
const isDarkMode = ref(false);
const themeClass = "dark-theme";

watch(isDarkMode, (newValue) => {
  const root = document.documentElement;
  if (newValue) {
    root.classList.add(themeClass);
    console.log("Added .dark-thme class");
  } else {
    root.classList.remove(themeClass);
    console.log("Removed .dark-theme class");
  }

  localStorage.setItem("darkMode", JSON.stringify(newValue));
});

// 入力テキストの状態
const text1 = ref("");
const text2 = ref("");

// ポップアップ表示状態
const showAboutDialog = ref(false);
const showSettingDialog = ref(false);

// 設定の状態
const settings = ref({
  highlightFullWidthSpace: false, // 全角スペース
  highlightHalfWidthSpace: false, // 半角スペース
  highlightHalfWidthSymbol: false, // 半角記号
  highlightHalfWidthAlpha: false, // 半角英字
  highlightHalfWidthDigit: false, // 半角数字
});
const HIGHLIGHT_CONFIG_KEY = "highlightConfig";

watch(
  settings,
  (newSettingValue) => {
    console.log("Highlight settings changed, saving:", newSettingValue);
    localStorage.setItem(HIGHLIGHT_CONFIG_KEY, JSON.stringify(newSettingValue));
  },
  { deep: true }
);

onMounted(() => {
  //title
  document.title = appTitle;
  console.log(`Document title set to: ${appTitle}`);

  //theme
  const root = document.documentElement;
  const storeDarkMode = localStorage.getItem("darkMode");
  let darkModePreference = false;

  if (storeDarkMode !== null) {
    darkModePreference = JSON.parse(storeDarkMode);
  } else {
    darkModePreference =
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
  }

  isDarkMode.value = darkModePreference;

  if (darkModePreference) {
    root.classList.add(themeClass);
    console.log("Applied initial .dark-theme class");
  } else {
    root.classList.remove(themeClass);
    console.log("Initial theme: light");
  }

  //highlight
  const storedHighlightSettings = localStorage.getItem(HIGHLIGHT_CONFIG_KEY);
  if (storedHighlightSettings) {
    try {
      const loadedSettings = JSON.parse(storedHighlightSettings);
      settings.value = { ...settings.value, ...loadedSettings };
      console.log(
        "Loaded highlight settings from localStorage:",
        settings.value
      );
    } catch (e) {
      console.error("Failed to parse highlight settings from localStorage:", e);
      localStorage.removeItem(HIGHLIGHT_CONFIG_KEY);
    }
  } else {
    console.log(
      "No highlight setting found in localStorage, using default values."
    );
  }
});

const openAbout = () => {
  showAboutDialog.value = true;
};
const openSettings = () => {
  showSettingDialog.value = true;
};
</script>

<template>
  <div class="app-container">
    <TheHeader @open-about="openAbout" @open-settings="openSettings" />

    <main class="main-content">
      <TextInputArea v-model:text1="text1" v-model:text2="text2" />
      <DiffViewer :text1="text1" :text2="text2" :settings="settings" />
    </main>

    <footer>
      <PrivacyPolicyButton />
    </footer>

    <AboutDialog v-model:visible="showAboutDialog" />
    <SettingDialog
      v-model:visible="showSettingDialog"
      v-model:settings="settings"
      v-model:isDarkMode="isDarkMode"
    />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding: 1rem;
}

@media (max-width: 768px) {
  .main-content {
    padding: 0.5rem;
  }
}
</style>
