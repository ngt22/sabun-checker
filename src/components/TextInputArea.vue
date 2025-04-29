<script setup lang="ts">
import Textarea from 'primevue/textarea';

const text1 = defineModel<string>('text1');
const text2 = defineModel<string>('text2');

</script>

<template>
  <div class="p-grid p-nogutter">
    <div class="p-col-12 p-md-6">
      <Textarea v-model="text1" placeholder="テキスト1" autoResize rows="10" class="w-full border-round-md"/>
    </div>
    <div class="p-col-12 p-md-6">
      <Textarea v-model="text2" placeholder="テキスト2" autoResize rows="10" class="w-full border-round-md"/>
    </div>
  </div>
</template>

<style scoped>

.p-grid {
  gap: 1rem; 
}

.p-inputtextarea {
  min-height: 200px;
}

.w-full {
  width: 100%;
}
.border-round-md {
    border-radius: var(--p-border-radius);
}
</style>