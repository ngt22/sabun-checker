<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import Menu from 'primevue/menu';

const emit = defineEmits(['open-about', 'open-config']);

const appName = __APP_NAME__

const menu = ref();
const items = ref([
    {
        label: 'Config',
        icon: 'pi pi-cog',
        command: () => {
            emit('open-config');
        }
    },
    {
        label: 'About',
        icon: 'pi pi-info-circle',
        command: () => {
            emit('open-about');
        }
    },
]);

const toggleMenu = (event: Event) => {
    menu.value.toggle(event);
};
</script>

<template>
    <Toolbar>
        <template #start>
            <div class="flex align-items-center gap-2">
                <i class="pi pi-search" style="font-size: 1.5rem; color: var(--p-primary-color);"></i>
                <h1 class="app-title inline text-xl font-semibold">テキスト差分チェッカーβ</h1>
            </div>
        </template>

        <template #end>
            <Button icon="pi pi-bars" text rounded aria-label="Menu" @click="toggleMenu" />
            <Menu ref="menu" :model="items" :popup="true" />
        </template>
    </Toolbar>
</template>

<style scoped>
h1 {
    font-size: 1.5rem;
    margin: 0;
}
</style>