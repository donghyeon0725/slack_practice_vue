π νλ‘ νΈ μλ apiμ λ¬Έμν
-
* jsDoc λ¬Έλ²μ μ¬μ©ν΄μ api λ¬Έμνλ₯Ό μ§ννλ©΄ λ¨


<br/>

π jsDoc κ³΅μ λ¬Έμ
-
* <https://jsdoc.app/about-getting-started.html>


<br/>


π jsDoc κ°λ¨ μμνκΈ°
-
* μλ μ½λμ κ°μ ννλ‘ λ¬Έμν νλ€.
```javascript
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {
}
```
* jsdoc νμΌμ λ΄μ ν΄λ μμ±
```text
mkdir doc-js
cd doc-js
```
* jsDocμ μμ±νλ €λ ν΄λ μλμμ μ΄κΈ°νλ₯Ό μ§ννλ€.
```text
npm init -y
```

* index.js νμΌ μμ± (μ΄ λ index.js λ λ¬Έμν ν  νμΌμ΄λ€.)
```text
touch index.js
```


* jsDoc μ€μΉ
```text
// cmd
npm i --save-dev jsdoc
```

* νλ§ μ€μΉ (μ ν)
```text
// cmd
npm install docdash
```

* μμ±ν μ£Όμμ, λ¬Έμλ‘ λ§λ€κΈ°
```text
npm install -g jsdoc
jsdoc ./index.js 
```



