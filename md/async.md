๐ axios
-
* ๋น๋๊ธฐ ์์ฒญ์ ํธํ๊ฒ ํ๊ธฐ ์ํ ์๋ฐ์คํฌ๋ฆฝํธ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๊ฐ ์๋ค.


<br/>

๐ axios ์ค์น
-
* axios๋ผ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ์ธ๋ฐ, ์๋์ ๊ฐ์ ๋ช๋ น์ด๋ก ์ค์นํ  ์ ์๋ค.
```text
npm i axios
```

* ์ค์นํ๊ณ  ๋๋ฉด, ์๋์ ๊ฐ์ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๊ฐ package.json์ ์ถ๊ฐ๋จ์ ์ ์ ์๋ค.
```text
"axios": "^0.21.1",
```


<br/>

๐ axios ๊ธฐ๋ณธ ์ฌ์ฉ๋ฒ
-
```javascript
// ํฌํจ
import axios from 'axios';

// ์์ฒญ
axios.post();
```


<br/>


๐ axios ๋ณ๋ ๊ด๋ฆฌ
-
* ๊ธฐ๋ณธ์ ์ผ๋ก ํ๋ก ํธ์๋์์  axios๋ฅผ ๋ง์ด ์ฌ์ฉํ  ๊ฒ์ด๊ธฐ ๋๋ฌธ์ ์๋์ ๊ฐ์ ํ์์ผ๋ก ๋ณ๋ ํ์ผ์์ ๊ตฌ์กฐํ ํ์ฌ ๊ด๋ฆฌ ํ  ์ ์๋๋ก ํฉ๋๋ค.
```javascript
import axios from 'axios';

function registerUser() {
    ...
}

export {
    registerUser
}
```

* ์์ฑ๋ ์์ค๋ ์๋์ ๊ฐ์ต๋๋ค.
```javascript
import axios from 'axios';

function registerUser() {
  const url = 'http://localhost:3000/signup';
  return axios.post(url, undefined, undefined);
}

export { registerUser };
```

* ๋ณ๋๋ก ํด๋๋ฅผ ์ฒจ๋ถํ๊ณ  ์ถ์ ๊ฒฝ์ฐ ์๋์ ๊ฐ์ด ํฉ๋๋ค
```javascript
import axios from 'axios';

function registerUser() {
  const url = 'http://localhost:3000/signup';
  return axios.post(url, undefined, {
                                        headers: {
                                          'X-AUTH-TOKEN': joinToken,
                                        },
                                      });
}

export { registerUser };
```


* ์ฌ์ฉํ  ๋๋ ์๋์ ๊ฐ์ ๋ฐฉ๋ฒ์ผ๋ก ์ฌ์ฉํฉ๋๋ค.
```javascript
import { registerUser } from '@/api/index';


// ๋ฉ์๋ ํธ์ถํ๊ธฐ
registerUser();
```

* api์ ๋ํ ์๋ต ๊ฒฐ๊ณผ๋ ๊ฐ๋ฐ์ ๋๊ตฌ Network ์ XHR ํญ์ผ๋ก ํ์ธ์ ํ๋๋ก ํฉ๋๋ค.
![์ด๋ฏธ์ง](./img/1_18.png)
* preview๋ฅผ ํตํด์ ํ์ธํ๋ฉด ์กฐ๊ธ ๋ ๊ฐํธํฉ๋๋ค.
![์ด๋ฏธ์ง](./img/1_19.png)


<br/>

๐ ๋น๋๊ธฐ์ ๋ํ ๊ฒฐ๊ณผ ์ฒ๋ฆฌ
-
* axios๋ ๊ธฐ๋ณธ์ ์ผ๋ก promise ๊ฐ์ฒด๋ฅผ ๋ฐํํ๊ธฐ ๋๋ฌธ์, ๊ฒฐ๊ณผ ์ฒ๋ฆฌ๋ฅผ ์ํด์ then์ ์ฌ์ฉํ  ์ ์๋ค.
![์ด๋ฏธ์ง](./img/1_20.png)


* async์ await๋ฅผ ์ด์ฉํ ๋ฐฉ๋ฒ
```javascript
async function ํจ์๋ช() {
  await ๋น๋๊ธฐ_์ฒ๋ฆฌ_๋ฉ์๋_๋ช();
}
```
* ์ฌ๊ธฐ์ async ํค์๋๋ ํ๋ก๋ฏธ์ค ๊ฐ์ฒด๋ฅผ ๋ฐํํจ์ ์๋ฏธํฉ๋๋ค. ์  ํค์๋๋ฅผ ๋ถ์ด๋ฉด, ํญ์ ํ๋ก๋ฏธ์ค ๊ฐ์ฒด๋ฅผ ๋ฐํํ๊ธฐ ๋๋ฌธ์ await ํค์๋๋ก ๋ฐ์ ์ ์๊ฒ ๋ฉ๋๋ค.
* await ํค์๋๋ ํ๋ก๋ฏธ์ค๊ฐ ๋ฐํํ๋ ๊ฒฐ๊ณผ๋ฅผ ๊ธฐ๋ค๋ฆฝ๋๋ค. then ๋ฉ์๋๋ก ์ฒ๋ฆฌํ๋ ๊ฒ๊ณผ ๋น์ทํฉ๋๋ค. ์ฌ๊ธฐ์ ์ฃผ์ํ  ์ ์, await ํค์๋๋ ๋ฐํํ๋ ๊ฐ์ฒด๊ฐ ํ๋ก๋ฏธ์ค์ผ๋๋ง ์ ์ ์๋ํฉ๋๋ค.

* async ์ฌ์ฉ์์ 
```javascript
async function f() {
  return 1;
}

f().then(alert); // 1
```

* ์ค์  ์์ 
![์ด๋ฏธ์ง](./img/1_21.png)


<br/>

๐ api ๊ณตํตํ
-
```javascript
import axios from 'axios';

const config = {
  baseUrl: 'http://localhost:3000/',
};

function registerUser(userData) {
  return axios.post(`${config.baseUrl}signup`, userData, undefined);
}
```
> ์ด๋ฐ์์ผ๋ก ๊ณตํต์ผ๋ก ์ฌ์ฉํ๋ url์ ๋ฌถ์ ์ ์๋ค.
> ๊ทธ๋ฌ๋, axios์์ ๊ธฐ๋ณธ ์ ๊ณตํ๋ ํจ์๋ฅผ ์ฌ์ฉํด๋ณด์.


```javascript
import axios from 'axios';

const ins = axios.create({
  baseURL: 'http://localhost:3000/',
});

function registerUser(userData) {
  return ins.post('signup', userData, undefined);
}
```
> ์ฝ๋๊ฐ ๊ต์ฅํ ๊น๋ํด์ก๋ค.


* ์ฌ์ฉ
```javascript
import { deletePost } from '@/api/posts';

... ์ค๋ต
  methods: {
    async deleteItem() {
      if (confirm('You want to delete it?')) {
        await deletePost(this.postItem._id);
        this.$emit('refresh');
      }
    },
... ์ค๋ต

```




    




