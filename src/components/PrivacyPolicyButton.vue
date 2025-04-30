<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue"

type DialogType = "policy" | "terms"

interface Props {
  policyLinkText?: string
  termsLinkText?: string
}

withDefaults(defineProps<Props>(), {
  policyLinkText: "プライバシーポリシー",
  termsLinkText: "免責事項",
})

const visibleDialog = ref<DialogType | null>(null)

/**
 * 指定された種類のダイアログを開く
 * @param type 表示するダイアログの種類 ('policy' または 'terms')
 */
const openDialog = (type: DialogType): void => {
  visibleDialog.value = type
}

/**
 * 表示中のダイアログを閉じる
 */
const closeDialog = (): void => {
  visibleDialog.value = null
}

watch(visibleDialog, (newValue) => {
  if (typeof document !== "undefined") {
    if (newValue !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.removeProperty("overflow")
    }
  }
})

onUnmounted(() => {
  if (typeof document !== "undefined" && visibleDialog.value !== null) {
    document.body.style.removeProperty("overflow")
  }
})
</script>

<template>
  <div class="policy-links-container">
    <a href="#" @click.prevent="openDialog('policy')" class="policy-link">
      {{ policyLinkText }}
    </a>
    <a href="#" @click.prevent="openDialog('terms')" class="policy-link">
      {{ termsLinkText }}
    </a>

    <teleport to="body">
      <div
        v-if="visibleDialog === 'policy'"
        class="dialog-overlay"
        @click.self="closeDialog"
      >
        <div
          class="dialog-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="policyDialogTitle"
        >
          <button class="close-button" @click="closeDialog" aria-label="閉じる">
            &times;
          </button>
          <h2 id="policyDialogTitle">プライバシーポリシー</h2>
          <div class="content-body">
            <section>
              <h3>プライバシーポリシー</h3>

              <h4>1. はじめに</h4>
              <p>
                本プライバシーポリシーは、「テキスト差分チェッカーβ」（以下、「本アプリ」といいます）の利用において、開発者が取得する可能性のある利用者情報とその取り扱いについて定めるものです。本アプリをご利用いただく際には、本ポリシーの内容をご理解いただき、同意の上でご利用ください。
              </p>

              <h4>2. 取得する情報と利用目的</h4>
              <p>
                本アプリでは、現在および将来において、以下の情報を取得し、それぞれの目的のために利用することがあります。
              </p>
              <ul>
                <li>
                  <strong>(1) 利用者が入力したテキストデータ:</strong><br />
                  取得情報: 利用者が比較のために入力する2つのテキストデータ。<br />
                  取得方法: 利用者によるフォームへの入力。<br />
                  利用目的: テキストの差分を計算し、結果を表示するため。<br />
                  特記事項:
                  利用者が入力したテキストデータは、差分計算処理のために一時的にブラウザのメモリ上で扱われますが、<strong
                    >開発者のサーバー等に送信・保存されることはありません。</strong
                  >
                  差分計算は利用者のブラウザ内で完結します。
                </li>
                <li>
                  <strong
                    >(2) Cookie及びアクセス情報（広告配信・サービス改善のため -
                    将来利用する可能性あり）:</strong
                  ><br />
                  取得情報:
                  Cookie情報、IPアドレス、アクセス日時、閲覧ページ、利用環境（OS、ブラウザ情報など）。<br />
                  取得方法:
                  将来的に導入する可能性のある第三者配信事業者（広告配信サービスやアクセス解析ツール提供事業者）による自動取得。<br />
                  将来的な利用目的:<br />
                  - 広告配信:
                  利用者の興味関心に応じた広告を表示するため、広告の効果測定のため。（例:
                  Google AdSense）<br />
                  - サービス改善:
                  本アプリの利用状況を分析し、機能改善や利便性向上に役立てるため。（例:
                  Google Analytics）<br />
                  特記事項:<br />
                  -
                  <strong
                    >現時点では、広告配信サービスおよびアクセス解析ツールは導入しておりません。</strong
                  ><br />
                  -
                  将来的にこれらのサービスを導入する可能性があります。その場合、Cookie等の技術が使用され、上記目的のために利用者の情報（個人を特定しない形式）が収集されることがあります。<br />
                  - これらのサービスの利用を開始する際には、<strong
                    >本プライバシーポリシーを更新し、収集される情報の詳細、利用目的、および情報収集を無効化する方法（オプトアウト手順など）について、改めて本アプリ上でお知らせいたします。</strong
                  >
                </li>
                <li>
                  <strong
                    >(3)
                    PWA（プログレッシブウェブアプリ）機能のためのキャッシュ:</strong
                  ><br />
                  取得情報: 本アプリの動作に必要なファイル（HTML, CSS,
                  JavaScript, 画像など）。<br />
                  取得方法: Service Workerによる自動キャッシュ。<br />
                  利用目的:
                  オフラインでの利用や、次回以降の高速な表示を実現するため。<br />
                  特記事項:
                  利用者のデバイス上にキャッシュデータが保存されます。キャッシュの削除は、ご利用のブラウザ設定から行うことができます。
                </li>
              </ul>

              <h4>3. 情報の第三者提供</h4>
              <p>
                開発者は、以下の場合を除き、取得した個人情報を第三者に提供することはありません。（ただし、上記(2)で述べた通り、将来的に広告配信事業者やアクセス解析ツール提供事業者へ、個人を特定できない統計的な情報として提供する可能性があります。その場合は本ポリシーを更新し告知します。）
              </p>
              <ul>
                <li>法令に基づく場合。</li>
                <li>
                  人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき。
                </li>
                <li>
                  公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき。
                </li>
                <li>
                  国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき。
                </li>
              </ul>

              <h4>4. 情報の管理</h4>
              <p>
                開発者は、取得した情報の漏えい、滅失又はき損の防止その他の安全管理のために必要かつ適切な措置を講じます。本アプリはGitHub
                Pages上で公開されており、通信はHTTPSにより暗号化されています。
              </p>

              <h4>5. プライバシーポリシーの変更</h4>
              <p>
                開発者は、法令の変更、サービスの変更（広告配信やアクセス解析ツールの導入を含む）、または改善に伴い、本プライバシーポリシーを改定することがあります。重要な変更がある場合は、本アプリ上でお知らせします。変更後のプライバシーポリシーは、本アプリ上に掲載された時点から効力を生じるものとします。
              </p>

              <h4>6. お問い合わせ先</h4>
              <p>
                本プライバシーポリシーに関するお問い合わせは、以下の連絡先までお願いいたします。<br />
                https://github.com/ngt22/sabun-checker/issues
              </p>

              <p>制定日: 2025年4月29日</p>
            </section>
          </div>
        </div>
      </div>

      <div
        v-if="visibleDialog === 'terms'"
        class="dialog-overlay"
        @click.self="closeDialog"
      >
        <div
          class="dialog-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="termsDialogTitle"
        >
          <button class="close-button" @click="closeDialog" aria-label="閉じる">
            &times;
          </button>
          <h2 id="termsDialogTitle">免責事項</h2>
          <div class="content-body">
            <section>
              <h3>免責事項</h3>

              <h4>1. 本アプリの利用について</h4>
              <p>
                本アプリ「テキスト差分チェッカーβ」のご利用は、利用者ご自身の責任において行っていただくものとします。
              </p>

              <h4>2. 差分チェック結果について</h4>
              <p>
                本アプリは、入力された2つのテキスト間の差分を表示する機能を提供しますが、その計算結果の完全性、正確性、有用性、特定目的への適合性を保証するものではありません。差分チェックの結果に基づいて利用者が行った判断や行動により生じたいかなる損害についても、開発者は一切の責任を負いません。機密性の高い情報や、正確性が厳密に要求されるテキストの比較に本アプリを使用する場合は、利用者の責任において十分にご確認ください。
              </p>

              <h4>3. コンテンツ及び機能の保証</h4>
              <p>
                開発者は、本アプリで提供される情報、機能、ソフトウェア等について、その安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグがないこと、権利侵害がないこと等を含め、明示的にも黙示的にも一切保証しておりません。
              </p>

              <h4>4. 損害賠償責任</h4>
              <p>
                開発者は、本アプリの利用、または利用できなかったことによって利用者に生じたいかなる損害（直接損害、間接損害、派生損害、逸失利益等を含むがこれらに限定されない）についても、一切の責任を負いません。これには、データの消失、利用中断、コンピュータウイルス感染等による損害も含まれます。
              </p>

              <h4>5. 広告及び外部リンクについて</h4>
              <p>
                本アプリには、第三者が提供する広告や、外部ウェブサイトへのリンクが含まれる場合があります。これらの広告内容やリンク先のウェブサイトは、それぞれの運営者の責任によって管理されており、開発者が管理・運営するものではありません。広告内容やリンク先サイトの利用によって生じたいかなる損害についても、開発者は一切の責任を負いません。
              </p>

              <h4>6. サービス内容の変更・中断・終了</h4>
              <p>
                開発者は、利用者に事前の通知をすることなく、本アプリの内容や仕様を変更したり、提供を中断または終了したりすることができるものとします。これにより利用者に損害が生じた場合でも、開発者は一切の責任を負いません。
              </p>

              <h4>7. 免責事項の変更</h4>
              <p>
                開発者は、必要に応じて本免責事項の内容を変更できるものとします。変更後の免責事項は、本アプリ上に掲載された時点から効力を生じるものとします。
              </p>

              <p>制定日: 2025年4月29日</p>
            </section>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style scoped>
.policy-links-container {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.policy-link {
  font-size: 0.9rem;
  color: #777777;
  text-decoration: underline;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.2s ease;
}
.policy-link:hover,
.policy-link:focus {
  color: #0056b3;
  text-decoration: none;
}

.dialog-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
}
.dialog-content {
  background-color: white;
  padding: 25px 35px;
  border-radius: 8px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 750px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 2.2rem;
  color: #999;
  cursor: pointer;
  line-height: 1;
  padding: 5px;
  transition: color 0.2s ease;
}
.close-button:hover {
  color: #555;
}

h2 {
  margin-top: 0;
  margin-bottom: 25px;
  text-align: center;
  color: #333;
  font-size: 1.6rem;
  font-weight: 600;
}
.content-body {
  overflow-y: auto;
  flex-grow: 1;
  padding-right: 15px;
  margin-right: -15px;
  padding-left: 5px;
}

section {
  margin-bottom: 0;
}
h4 {
  margin-top: 1.5em;
  margin-bottom: 0.8em;
  color: #333;
  font-weight: 600;
  font-size: 1.1rem;
}
h4:first-of-type {
  margin-top: 0;
}
p,
li {
  margin-bottom: 1em;
  line-height: 1.7;
  color: #444;
  font-size: 0.95rem;
}
strong {
  color: #000;
  font-weight: 600;
}
ul {
  padding-left: 25px;
  margin-top: 0.5em;
  list-style-type: disc;
}
ul > li {
  margin-bottom: 0.8em;
}

.content-body::-webkit-scrollbar {
  width: 8px;
}
.content-body::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
.content-body::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}
.content-body::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}
.content-body {
  scrollbar-width: thin;
  scrollbar-color: #ccc #f1f1f1;
}
</style>
