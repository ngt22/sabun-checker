<script setup lang="ts">
// import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';
import Fieldset from 'primevue/fieldset';
import Button from 'primevue/button';
import ToggleSwitch from 'primevue/inputswitch';


const visible = defineModel<boolean>('visible');
const settings = defineModel<Record<string, any>>('settings', { required: true });
const isDarkMode = defineModel<boolean>('isDarkMode');

const closeDialog = () => {
    visible.value = false;
};

</script>

<template>
    <Dialog v-model:visible="visible" modal header="Settings" :style="{ width: '35rem' }">
        <div class="settings-content">

            <Fieldset legend="テーマ設定" :toggleable="true" class="mb-4">
                <div class="field-switch">
                    <label for="darkModeSwitch">ダークモード</label>
                    <ToggleSwitch v-model="isDarkMode" inputId="darkModeSwitch" />
                </div>
            </Fieldset>

            <Fieldset legend="ハイライト設定" :toggleable="true" class="mb-4">
                <div class="field-checkbox">
                    <Checkbox v-model="settings.highlightFullWidthSpace" inputId="highlightFullWidthSpace"
                        :binary="true" />
                    <label for="highlightFullWidthSpace">全角スペース (U+3000) をハイライト</label>
                </div>
                <div class="field-checkbox">
                    <Checkbox v-model="settings.highlightHalfWidthSpace" inputId="highlightHalfWidthSpace"
                        :binary="true" />
                    <label for="highlightHalfWidthSpace">半角スペースをハイライト</label>
                </div>
                <div class="field-checkbox">
                    <Checkbox v-model="settings.highlightHalfWidthSymbol" inputId="highlightHalfWidthSymbol"
                        :binary="true" />
                    <label for="highlightHalfWidthSymbol">半角記号をハイライト</label>
                </div>
                <div class="field-checkbox">
                    <Checkbox v-model="settings.highlightHalfWidthAlpha" inputId="highlightHalfWidthAlpha"
                        :binary="true" />
                    <label for="highlightHalfWidthAlpha">半角英字 (a-z, A-Z) をハイライト</label>
                </div>
                <div class="field-checkbox">
                    <Checkbox v-model="settings.highlightHalfWidthDigit" inputId="highlightHalfWidthDigit"
                        :binary="true" />
                    <label for="highlightHalfWidthDigit">半角数字 (0-9) をハイライト</label>
                </div>
            </Fieldset>

        </div>

        <template #footer>
            <Button label="Close" icon="pi pi-times" @click="closeDialog" text />
        </template>
    </Dialog>
</template>

<style scoped>
.settings-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.field,
.field-checkbox {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 0.5rem;
}

.field-checkbox label {
    margin-left: 0.5rem;
    cursor: pointer;
}


.field label {
    min-width: 150px;
}

.field-switch {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    gap: 1rem;
}

.field-switch label {
    cursor: pointer;
}
</style>