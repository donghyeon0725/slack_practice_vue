๐ ๋งํฌ๋ค์ด ์ง์ํ๊ธฐ
-
* marked js ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ฌ์ฉํด์ markdown ์ ์ง์ ํฉ๋๋ค.
<br/>

๐ ๊ณผ์ 
-
1. ๊ธ์ ์๋ ฅ
2. html๋ก ๋ณํ ๋ ํ์คํธ๋ฅผ ๋ง๋ค์ด์ฃผ๋ computed ์์ฑ ์์ฑ (๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ฌ์ฉ)
3. ํ๋ฉด์ ๋ณด์ฌ์ค ๋์๋ html์ผ๋ก ๋ณด์ฌ์ฃผ์ด์ผ ํฉ๋๋ค. (DB์ ์ ์ฅ๋  ๋๋ ๋ ๊ฒ ๊ทธ๋๋ก์ ์ํ๋ก ์ ์ฅ๋์ด ์์)


<br/>

๐ ์์ํ๊ธฐ
-
* marked ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ค์น
```text
npm install marked
```

* markdownํ ๋ ํ์คํธ๋ฅผ ๋ณด์ฌ์ฃผ๋ vue ์ปดํฌ๋ํธ
```html
<template>
  <div id="app">
    <div class="container">
      <!--The main App-->
      <span v-html="previewText"></span>
    </div>
  </div>
</template>

<script>
import marked from 'marked';

export default {
  name: 'Markdown',
  data() {
    return {
      md_text: '### ํค๋', // ์ด ๊ณณ์ ์ํ๋ ํ์คํธ๋ฅผ ๋ฃ์ต๋๋ค.
    };
  },
  computed: {
    previewText() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
      });
      return marked(this.md_text);
    },
  },
};
</script>

<style scoped></style>
```


