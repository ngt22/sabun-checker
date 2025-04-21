<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const visible = defineModel<boolean>('visible');

const appName = __APP_NAME__;
const appVersion = __APP_VERSION__;
const author = 'ngt22';
const repositoryUrl = 'https://github.com/ngt22/sabun-checker';

</script>

<template>
    <Dialog v-model:visible="visible" modal :header="`About ${appName}`" :style="{ width: '30rem' }">
        <div class="about-content">
            <p><strong>Version:</strong> {{ appVersion }}</p>
            <p>二つのテキストを比較して差分（追加・削除）を分かりやすく表示するシンプルなウェブアプリケーションです。</p>
            <p><strong>主な機能:</strong></p>
            <ul>
                <li>テキスト比較と差分ハイライト (LCSアルゴリズム)</li>
                <li>モバイル対応レスポンシブデザイン</li>
                <li>PWA対応 (インストール可能, オフライン動作)</li>
                <li>設定オプション (例: 半角文字のハイライト)</li>
            </ul>
            <p><strong>Author:</strong> {{ author }}</p>
            <p>
                <strong>Repository:</strong>
                <a :href="repositoryUrl" target="_blank" rel="noopener noreferrer">{{ repositoryUrl }}</a>
            </p>
            <p>このアプリケーションはオープンソースソフトウェアです。</p>
        </div>
        <template #footer>
            <Button label="Close" icon="pi pi-times" @click="visible = false" text />
        </template>
    </Dialog>
</template>

<style scoped>
.about-content p,
.about-content ul {
    margin-bottom: 1rem;
    line-height: 1.6;
}

.about-content ul {
    padding-left: 1.5rem;
}

.about-content strong {
    margin-right: 0.5em;
}

a {
    color: var(--p-primary-color);
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>