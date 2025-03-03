/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";
import App from "./App.vue";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import router from "./router";
import zh from "./locales/zh.js";
import vi from "./locales/vi.js";
// import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersist from "pinia-plugin-persist";

const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: "zh",
  fallbackLocale: "zh", // 设置回退语言
  missingWarn: true, // 缺少翻译的警告
  fallbackWarn: true, // 使用回退语言的警告
  messages: {
    zh,
    vi,
  },
});
// const vuetify = createVuetify({
//   components,
//   directives,
//   icons: {
//     defaultSet: "mdi",
//   },
// });
const pinia = createPinia();
const app = createApp(App);
registerPlugins(app);
app.use(pinia);
pinia.use(piniaPluginPersist);
app.use(i18n);
app.use(router);
// app.use(vuetify);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount("#app");
