π νν° μμ±νκΈ°
-
* νν°λ₯Ό μμ±νλ λ°©λ²μ μ§μ­μΌλ‘ μμ±νλ λ°©λ² & μ μ­μΌλ‘ μμ±νλ λ°©λ² 2κ°μ§κ° μλ€.


<br/>


π μ§μ­ νν° μμ±νκΈ°
-
* μ»΄ν¬λνΈλ‘ λ±λ‘λ§ νκ³  μ¬μ©νλ©΄ λλ€.
```javascript
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

* νΈμΆ
```html
<!-- μ€κ΄νΈ λ³΄κ°λ² -->
{{ message | capitalize }}

<!-- v-bind νν -->
<div v-bind:id="rawId | formatId"></div>
```

<br/>

π μ μ­ νν°
-
* μλλ μ μ­ νν°λ‘ λ±λ‘νλ λ°©λ²μ μλμ κ°μ΄ νλ€. Vue μΈμ€ν΄μ€ μμ± μ΄μ μ λ±λ‘ν΄μΌ νλ€.
```javascript
import Vue from 'vue';

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
...
})
```
* μ μ­ νν°λ‘ λ±λ‘ν λ©μλλ μμ λμΌν λ°©μμΌλ‘ νΈμΆνλ©΄ λλ€.
* λλ, Filter λ‘ λ±λ‘νλ λ‘μ§μ λ³λ νμΌλ‘ λΆλ¦¬νκ³  main.js μμ import νμ¬ μ¬μ©νλ λ°©λ²λ μλ€.

```javascript
import Vue from 'vue';
import { formatDate } from '@/util/date';

Vue.filter('formatDate', formatDate);
```
* μ νμΌμ, main.js μμ import νλ©΄ λλ€.

