<script setup lang="ts">
import { computed } from "vue"
import Textarea from "primevue/textarea"
import Button from "primevue/button"
import Tooltip from "primevue/tooltip"

const text1 = defineModel<string>("text1", { default: "" })
const text2 = defineModel<string>("text2", { default: "" })

const emit = defineEmits(["swap-texts"])

const handleSwap = () => {
  emit("swap-texts")
}

const count1 = computed(() => text1.value.length)
const count2 = computed(() => text2.value.length)

const clearText1 = () => {
  text1.value = ""
}
const clearText2 = () => {
  text2.value = ""
}

const copyText1 = async () => {
  if (!navigator.clipboard) {
    console.error("Clipboard API not available")
    return
  }
  try {
    await navigator.clipboard.writeText(text1.value)
    console.log("Text 1 copied!")
  } catch (err) {
    console.error("Failed to copy text 1: ", err)
  }
}
const copyText2 = async () => {
  if (!navigator.clipboard) {
    console.error("Clipboard API not available")
    return
  }
  try {
    await navigator.clipboard.writeText(text2.value)
    console.log("Text 2 copied!")
  } catch (err) {
    console.error("Failed to copy text 2: ", err)
  }
}

const pasteText1 = async () => {
  if (!navigator.clipboard?.readText) {
    console.error("Clipboard API (readText) is not available or permitted.")
    alert(
      "このブラウザまたはコンテキストではクリップボードの読み取りが許可されていません。"
    )
    return
  }
  try {
    const textToPaste = await navigator.clipboard.readText()
    text1.value = textToPaste
    console.log("Pasted into Text 1!")
  } catch (err) {
    console.error("Failed to paste into Text 1:", err)
    alert(`貼り付けに失敗しました。\n${err}`)
  }
}

const pasteText2 = async () => {
  if (!navigator.clipboard?.readText) {
    console.error("Clipboard API (readText) is not available or permitted.")
    alert(
      "このブラウザまたはコンテキストではクリップボードの読み取りが許可されていません。"
    )
    return
  }
  try {
    const textToPaste = await navigator.clipboard.readText()
    text2.value = textToPaste
    console.log("Pasted into Text 2!")
  } catch (err) {
    console.error("Failed to paste into Text 2:", err)
    alert(`貼り付けに失敗しました。\n${err}`)
  }
}

const copyText1ToText2 = () => {
  text2.value = text1.value
  console.log("Copied Text 1 to Text 2")
}

const copyText2ToText1 = () => {
  text1.value = text2.value
  console.log("Copied Text 2 to Text 1")
}
</script>

<template>
  <div class="grid text-input-grid nogutter">
    <div class="col-12 lg:col-5">
      <div
        class="input-header flex align-items-center justify-content-between mb-2"
      >
        <div class="flex align-items-center gap-2">
          <i class="pi pi-align-left text-secondary"></i>
          <span class="text-secondary font-medium">テキスト1 (比較元)</span>
        </div>
        <div class="flex gap-1">
          <Button
            icon="pi pi-clipboard"
            severity="secondary"
            text
            rounded
            size="small"
            @click="pasteText1"
            v-tooltip.bottom="'貼付け'"
          />
          <Button
            icon="pi pi-copy"
            severity="secondary"
            text
            rounded
            size="small"
            @click="copyText1"
            v-tooltip.bottom="'コピー'"
          />
          <Button
            icon="pi pi-times"
            severity="danger"
            text
            rounded
            size="small"
            @click="clearText1"
            v-tooltip.bottom="'クリア'"
          />
        </div>
      </div>
      <Textarea
        v-model="text1"
        placeholder="比較元のテキストを入力してください..."
        autoResize
        rows="10"
        class="w-full flex-grow-1"
      />
      <div class="input-footer text-right text-xs text-secondary mt-1">
        文字数: {{ count1 }}
      </div>
    </div>

    <div
      class="col-12 lg:col-2 flex align-items-center justify-content-center swap-button-container"
    >
      <div class="flex lg:flex-column gap-3 lg:gap-2">
        <Button
          icon="pi pi-arrow-up"
          class="lg:hidden"
          rounded
          severity="secondary"
          @click="copyText2ToText1"
          v-tooltip.bottom="'テキスト2の内容をテキスト1へコピー'"
        />
        <Button
          icon="pi pi-arrow-left"
          class="hidden lg:inline-flex"
          rounded
          severity="secondary"
          @click="copyText2ToText1"
          v-tooltip.bottom="'テキスト2の内容をテキスト1へコピー'"
        />

        <Button
          icon="pi pi-sync"
          rounded
          severity="secondary"
          @click="handleSwap"
          v-tooltip.bottom="'内容を入れ替え'"
        />

        <Button
          icon="pi pi-arrow-down"
          class="lg:hidden"
          rounded
          severity="secondary"
          @click="copyText1ToText2"
          v-tooltip.bottom="'テキスト1の内容をテキスト2へコピー'"
        />
        <Button
          icon="pi pi-arrow-right"
          class="hidden lg:inline-flex"
          rounded
          severity="secondary"
          @click="copyText1ToText2"
          v-tooltip.bottom="'テキスト1の内容をテキスト2へコピー'"
        />
      </div>
    </div>

    <div class="col-12 lg:col-5">
      <div
        class="input-header flex align-items-center justify-content-between mb-2"
      >
        <div class="flex align-items-center gap-2">
          <i class="pi pi-align-right text-secondary"></i>
          <span class="text-secondary font-medium">テキスト2 (比較先)</span>
        </div>
        <div class="flex gap-1">
          <Button
            icon="pi pi-clipboard"
            severity="secondary"
            text
            rounded
            size="small"
            @click="pasteText2"
            v-tooltip.bottom="'貼付け'"
          />
          <Button
            icon="pi pi-copy"
            severity="secondary"
            text
            rounded
            size="small"
            @click="copyText2"
            v-tooltip.bottom="'コピー'"
          />
          <Button
            icon="pi pi-times"
            severity="danger"
            text
            rounded
            size="small"
            @click="clearText2"
            v-tooltip.bottom="'クリア'"
          />
        </div>
      </div>
      <Textarea
        v-model="text2"
        placeholder="比較先のテキストを入力してください..."
        autoResize
        rows="10"
        class="w-full flex-grow-1"
      />
      <div class="input-footer text-right text-xs text-secondary mt-1">
        文字数: {{ count2 }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-input-grid {
}

.input-block {
  border: 1px solid var(--p-surface-border);
  border-radius: var(--p-border-radius);
  padding: 1rem;
  background-color: var(--p-surface-section);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.input-header span {
  font-size: 0.9rem;
}

.input-footer {
  font-size: 0.75rem;
}

.p-inputtextarea.flex-grow-1 {
  min-height: 150px;
  resize: vertical;
  flex-grow: 1;
}

.swap-button-container {
  align-self: center;
}

@media (max-width: 992px) {
  .text-input-grid {
    gap: 1rem;
  }
  .swap-button-container {
    order: 1;
  }
  .col-12:first-of-type {
    order: 0;
  }
  .col-12:last-of-type {
    order: 2;
  }
}
</style>
