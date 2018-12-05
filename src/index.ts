import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css'

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
