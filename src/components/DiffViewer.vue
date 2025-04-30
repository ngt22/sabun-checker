<script setup lang="ts">
import { computed } from "vue"
import { diffChars, type Change } from "diff"
import Card from "primevue/card"

interface Settings {
  highlightFullWidthSpace: boolean
  highlightHalfWidthSpace: boolean
  highlightHalfWidthSymbol: boolean
  highlightHalfWidthAlpha: boolean
  highlightHalfWidthDigit: boolean
}

interface Props {
  text1: string
  text2: string
  settings: Settings
}

const props = defineProps<Props>()

const diffResult = computed(() => {
  const t1 = props.text1 ?? ""
  const t2 = props.text2 ?? ""
  return diffChars(t1, t2)
})

const getChangeClass = (change: Change): string[] => {
  const classes = []
  if (change.added) {
    classes.push("diff-added")
  } else if (change.removed) {
    classes.push("diff-removed")
  } else {
    classes.push("diff-common")
  }
  return classes
}

const highlightCharacters = (text: string): string => {
  let escapedText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

  // ハイライト対象の正規表現
  const patterns: string[] = []
  if (props.settings.highlightFullWidthSpace) patterns.push("\\u3000") // 全角スペース
  if (props.settings.highlightHalfWidthSpace) patterns.push(" ") // 半角スペース
  if (props.settings.highlightHalfWidthSymbol)
    patterns.push("[!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]")
  if (props.settings.highlightHalfWidthAlpha) patterns.push("[a-zA-Z]") // 半角英字
  if (props.settings.highlightHalfWidthDigit) patterns.push("[0-9]") // 半角数字

  if (patterns.length > 0) {
    const combinedRegex = new RegExp(`(${patterns.join("|")})`, "g")
    escapedText = escapedText.replace(
      combinedRegex,
      '<span class="highlight-outline">$1</span>'
    )
  }

  return escapedText
}
</script>

<template>
  <Card class="col-12 diff-viewer-card">
    <template #title>差分結果</template>
    <template #content>
      <pre
        v-if="diffResult.length > 0"
      ><template v-for="(part, _index) in diffResult" :key="_index"><span :class="getChangeClass(part)" v-html="highlightCharacters(part.value)"></span></template>
</pre>
      <p v-else>テキストを入力して比較してください。</p>
    </template>
  </Card>
</template>

<style scoped>
.diff-viewer-card {
  margin-top: 1rem;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
  font-family: monospace;
  font-size: 1.5rem;
  background-color: var(--p-surface-ground);
  color: var(--p-text-color);
  padding: 1rem;
  border-radius: var(--p-border-radius);
}

.diff-added {
  background-color: var(--p-green-200);
  color: var(--p-green-700);
  text-decoration: none;
}

.diff-removed {
  background-color: var(--p-red-200);
  color: var(--p-red-700);
  text-decoration: line-through;
}

.diff-common {
  color: var(--p-text-secondary-color);
}

:deep(.highlight-outline) {
  /* background-color: yellow;  */
  outline: 1px dotted orange;
  /* background-color: var(--p-yellow-50);  */
  /* color: var(--p-yellow-700); */
  font-weight: normal;
}
</style>
