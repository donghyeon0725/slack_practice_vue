๐ ํ ์คํธ ๋ณ๋ ์ฌ์ฉ
-
* ๋ถํธ์คํธ๋ฉ ํ ์คํธ ๊ธฐ๋ฅ์, ํ ์คํธ๊ฐ open ๋์๋ง์, ํฌ๋ช๋๊ฐ 0์ด ๋์ด์ ์ฌ๋ผ์ง๋ ๊ฒ ์ฒ๋ผ ๋ณด์ด๋ ํ์์ด ๋ฐ๊ฒฌ ๋์๋ค.
* css ๋ฑ์ ์์ฑ์ ๋ณ๋๋ก ์ถ๊ฐํ๋ฉด, ํด๋น ๋ฒ๊ทธ๋ฅผ ๊ณ ์น ์๋ ์๊ฒ ์ง๋ง, ๊ทธ๋ฌ๋ฉด ํด๋น css๋ฅผ ๋ง๋์ ํฌํจ (์ ์ญ ์์ญ์ ํฌํจ ํ๋ฉด ๋๊ฒ ์ง๋ง, ์์กด์ฑ์ด ์๊ธฐ๋ ๊ฒ์ด ์ซ์ด์)ํ์ฌ์ผ ํ๊ธฐ ๋๋ฌธ์ ์์ ํ์ง ์๋ค๊ณ  ์๊ฐ
* ๋ฐ๋ผ์, ๋ค๋ฅธ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ฌ์ฉํด์ ๋ณ๋๋ก ๋ชจ๋ํ ํด๋๊ธฐ๋ก ํจ.
* ์ด์ : <https://github.com/bootstrap-vue/bootstrap-vue/issues/4498>, <https://github.com/bootstrap-vue/bootstrap-vue/issues/3934>
* ์ ๋งํฌ๋ฅผ ์ฐธ๊ณ ํ์ผ๋, ๋ฒ๊ทธ๋ ๊ณ ์ณ์ง์ง ์์


<br/>


๐ vue-toast-notification ๊ณต์ ๋ฌธ์
-
* <https://www.npmjs.com/package/vue-toast-notification> 


<br/>


๐ ์ค์น
-
```javascript
import VueToast from 'vue-toast-notification';
// Import one of the available themes
// import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);
```


<br/> 

๐ ์ฌ์ฉ
-
```javascript
this.$toast.open({
    message: '๋ฉ์ธ์ง',
    position: 'top-right',
    duration: 3000,
});
```

