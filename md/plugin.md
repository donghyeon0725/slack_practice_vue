π μ μ­ λ©μλ λ±λ‘
-
* μ§μμ μΌλ‘ μ¬μ©νλ μ»΄ν¬λνΈμ κ²½μ°, λ§€λ² import ν, componentμ λ±λ‘ν΄μ λΆλ¬μ€λ μ½λλ₯Ό μ¬μ©νλ νμκ° λ§€μ° λΉν¨μ¨μ μ΄λ―λ‘ νλ¬κ·ΈμΈ ννλ‘ λ§λ€μ΄ μ μ­μΌλ‘ λ±λ‘ν΄μ μ¬μ©ν  νμμ±μ΄ μκ²Όμ


<br/>

π νλ¬κ·ΈμΈμ΄λ?
-
* λ€λ€ μκ³  μκ² μ§λ§, μ½κ² λ§νμλ©΄ νλ‘κ·Έλ¨μ νμ₯ κΈ°λ₯ κ°μ κ²μ΄λ€.
* μλ°μ€ν¬λ¦½νΈμμ νλ¬κ·ΈμΈμ΄λ, μ ν΄μ§ λ©μλλ κ°μ²΄λ₯Ό "μ½μλ ννλ‘ λΆλ¬μ" μ¬μ©νλ κ²μ μλ―Ένλ€.
* λ°λΌμ vue js μμλ νλ¬κ·ΈμΈ λ±λ‘μ μν΄μλ μ ν΄μ§ λ°©λ²μ΄ μμ΅λλ€.


<br/>


π κ³΅μλ¬Έμ
-
λ€μ΄κ°κΈ°μ μμμ κ³΅μλ¬Έμλ₯Ό νμΈνκΈ° λ°λλλ€. κ³΅μ λ¬Έμμ νλ¬κ·ΈμΈ λ±λ‘μ μν λ°©λ²μ μλ €μ£Όκ³  μμ΅λλ€.
* <https://kr.vuejs.org/v2/guide/plugins.html#%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0>


<br/>

π μμ½
-
* νλ¬κ·ΈμΈμΌλ‘ λ±λ‘ν  λ©μλ μμ±
* ν΄λΉ λ©μλλ‘ νλ¬κ·ΈμΈμ μμ±ν©λλ€. μ΄λ νμΌμ μ΄λ¦μ index.js κ° λ  κ²λλ€.
* λ§λ  index.js λ₯Ό main.js μμ import (μ μ­μΌλ‘ λ±λ‘νκΈ°)
* μ¬μ©νκΈ°



<br/>

π νλ¬κ·ΈμΈμΌλ‘ λ±λ‘ν  λ©μλ μμ±νκΈ°
-
* νμμ κ²½μ° λͺ¨λ¬μ νλ¬κ·ΈμΈμΌλ‘ λ±λ‘ν΄μ μ¬μ©ν  μμ μλλ€.
* νμΈμ΄λ alert μ©λμ λ©μλλ₯Ό νΈμΆν  λλ§λ€ import νλ κ²μ λ§€μ° λΉν¨μ¨μ μ΄κΈ° λλ¬Έμλλ€.
<details>
    <summary>νΌμΉκΈ°</summary>


```javascript
let modal = {
  confirmModal: function (title, message, options) {
    let config = {
      title: title,
      size: 'sm',
      buttonSize: 'sm',
      okVariant: 'primary',
      okTitle: 'νμΈ',
      cancelTitle: 'μ·¨μ',
      footerClass: 'p-2',
      hideHeaderClose: false,
      centered: true,
    };
    // λ³λ μ¬μ©ν  μ€μ μ΄ μλ κ²½μ°
    Object.assign(config, options);

    let result = this.$bvModal
      .msgBoxConfirm(message, config)
      .then(value => {
        // λ€μ μμμ΄ νμν κ²½μ° μ¬μ©
        if (value) return true;
        else return false;
      })
      .catch(err => {
        // An error occurred
        console.log(err);
        return false;
      });
    console.log(result);
    return result;
  },
};

export default modal;
```
</details>


<br/>


π ν΄λΉ λ©μλλ‘ νλ¬κ·ΈμΈμ μμ±νκΈ°.
-
* λ§λ  λ©μλλ₯Ό νλ¬κ·ΈμΈμΌλ‘ μμ±νλ λΆλΆμλλ€.
* μ΄λ μ£Όμ ν  μ μ, λͺ¨λ¬μμ μ¬μ©ν  λ©μλλ νλ¬κ·ΈμΈμμ νΈμΆ ν΄μΌν  λ©μλκ° ν¬ν¨λμ΄ μμ΅λλ€.
* μ¦, this ν€μλ (μ€νμ»¨νμ€νΈ)κ° vue Componentλ₯Ό λ°λΌλ³Ό μ μλλ‘ νλ €λ©΄ μλμ κ°μ΄, λ©μλλ₯Ό λ΄μ κ°μ²΄λ₯Ό λ£μ κ²μ΄ μλλΌ, λ©μλ μμ²΄λ₯Ό λ£μ΄μ€μΌ ν©λλ€. μμΈν λ΄μ©μ μλ μμ€λ₯Ό μ°Έκ³ ν©λλ€.

<details>
    <summary>νΌμ³λ³΄κΈ°</summary>

```javascript
/* κΈλ‘λ²λ‘ μ¬μ©ν  ν¨μμ μ»΄ν¬λνΈ λ±λ‘ */
import Modal from '@/util/modal';

// νμ΄ νμν  λ μ¬μ©ν©λλ€.
const swichers = {
  created: true,
  beforeMount: true,
  mounted: true,
  destroyed: true,
};

let plugin = {};
// optionsμ μΈμ€ν΄μ€ μμ±μ λκ²¨μ£Όλ options κ° μλλ€. => λ³λ μ€μ μ΄ νμν  κ²½μ° μ¬μ©ν©λλ€.
plugin.install = function (Vue, options) {
  // options μ swichersλ₯Ό λ³ν©
  Object.assign(swichers, options);
  // μΈμ€ν΄μ€ λ©μλ => μ€ν μ»¨νμ€νΈκ° Modal μ΄ λμ΄λ μκ΄μ΄ μλ€λ©΄ μ¬μ©
  // Vue.prototype.$inst = Modal;
  // μΈμ€ν΄μ€ λ©μλ => μ€νμ»¨νμ€νΈκ° νμ¬ μ»΄ν¬λνΈ(μ΄ λ©μλλ₯Ό μ€ννλ κ°μ²΄)λ₯Ό κ°λ¦¬μΌμΌ νλ€λ©΄, μλμ κ°μ΄ μ¬μ©ν΄μΌ νλ€.
  Vue.prototype.$confirmModal = Modal.confirmModal;

  // μ μ­ λ©μλ
  Vue.myGlobalMethod = function () {};
};

export default plugin;

```

</details>


<br/>

π λ§λ  index.js λ₯Ό main.js μμ import νκΈ° (μ μ­μΌλ‘ λ±λ‘νκΈ°)
-
* λ§λ  λ©μλλ₯Ό main.js μμ import ν©λλ€.  
<details>
    <summary>νΌμ³λ³΄κΈ°</summary>

```javascript
import globalPlugin from '@/global/index'; // global νμΌ import

// μ λ©μλμμ μ¬μ©ν  λΆνΈμ€νΈλ© νλ¬κ·ΈμΈ
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// global νλ¬κ·ΈμΈμΌλ‘μ¨ λ±λ‘
Vue.use(globalPlugin);

... μ€λ΅
```

</details>


<br/>

π μ¬μ©νκΈ°
-
* μλμ κ°μ ννλ‘ μ¬μ©ν©λλ€.

```javascript
let modal = {
  title: 'μ­μ ',
  message: 'λ³΄λλ₯Ό μ­μ  νμ κ² μ΅λκΉ?',
};

// νμΈ λͺ¨λ¬ νΈμΆ
let confirm = await this.$confirmModal(modal.title, modal.message);
if (confirm) {
console.log('νμΈ λλ¦');
}
```


