π λ·° λΆνΈμ€νΈλ© μμνκΈ°
-
> <https://bootstrap-vue.org/docs> μλ λ§ν¬λ‘ λ€μ΄κ°λ©΄ μμΈν λ΄μ©μ νμΈν  μ μλ€.
* μ€μΉνκΈ°
```text
npm install vue bootstrap bootstrap-vue
```

* main.js μ μ¬μ©νκ² λ€κ³  λͺμνκΈ°
```javascript
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
```

* μ»΄ν¬λνΈ κ°μ Έμ μ¬μ©νλ©΄ λ
