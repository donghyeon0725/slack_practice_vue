๐ store์ api/index.js ํ์ผ์ ์์ ์ฐจ์ด
-
* api ์์ฒญ์ ํ๋ ํ์ผ์ ์ผ๋ถ๋ฅผ ๋ณด๋ฉด ๋ก๊ทธ์ธ ์์ ์ป์ ํ ํฐ์, ํค๋์ ๊ฐ์ด ๋ฃ์ด์ผ๋ง, ์์ฒญํ  ์ ์๋ api๊ฐ ์๋ค.
* ๊ทธ๋ฐ๋ฐ ๋ฌธ์ ์ ์ ์ฐ๋ฆฌ๊ฐ api ๋ฅผ ๋ชจ๋ํํ์ฌ ์ฌ์ฉํ๊ณ  ์๊ธฐ ๋๋ฌธ์ axios์ config json์ ๊ณตํตํํด์ ์ฌ์ฉํ๊ณ  ์๋ค๋ ์ ์ด๋ค.
* js ํ์ผ์ด export ๋  ๋น์์ json์ ์์ฑํ๊ณ  ๊ทธ ๋๋ vuex store์ ํ ํฐ๊ฐ์ด ์๋ค(๋ก๊ทธ์ธ ํ๊ธฐ ์ด์ )
* ๋ฐ๋ผ์, interceptor๋ก ์์ฒญํ  ๋ config ๊ฐ์ ์ถ๊ฐํด์ค ํ์์ฑ์ด ์๋ค.


<br/>


๐ interceptor ๊ณต์ ๋ฌธ์
-
* <https://github.com/axios/axios#interceptors>


<br/>

๐ ์ฌ์ฉ๋ฒ
-
* ๊ณต์ ๋ฌธ์์๋ ์๋์ ๊ฐ์ด ์ฌ์ฉํ๋ผ๊ณ  ๋์์๋ค.
![์ด๋ฏธ์ง](./img/2_10.png)
* ๋ณด๋ฉด axios ๊ฐ์ฒด์ interceptor๋ฅผ ์ถ๊ฐํ๊ณ  ์๋ค. ๋ฐ๋ผ์ ์ฐ๋ฆฌ๋ ๋ณ๋์ interceptor๋ฅผ ์ฅ์ฐฉํด์ค ๋ฉ์๋๋ฅผ ๋ง๋ค์ด์ ๊ด๋ฆฌํ  ๊ฒ์ด๋ค.

    1. intercept ํด์ค ๋ฉ์๋ ์์ฑํ๊ธฐ (src/api/common ์๋ interceptor.js ์์ฑํ๊ธฐ)
    ```javascript
    import store from '@/store/index';
    
    export function setInterceptors(instance) {
      // Add a request interceptor
      instance.interceptors.request.use(
        function (config) {
          // Do something before request is sent
          // console.log(config);
  
          // => ์ด๋ ๊ฒ ํด๋๋ฅผ ์ธํํด์ค ์ ์๋ค.
          config.headers.Authorization = store.state.token;
          return config;
        },
        function (error) {
          // Do something with request error
          return Promise.reject(error);
        },
      );
    
      // Add a response interceptor
      instance.interceptors.response.use(
        function (response) {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          return response;
        },
        function (error) {
          // Any status codes that falls outside the range of 2xx cause this function to trigger
          // Do something with response error
          return Promise.reject(error);
        },
      );
      return instance;
    }
    ```
    
    2. ๋ง๋  ํ์ผ์์ ํธ์ถ
    ```javascript
    import { setInterceptors } from './common/interceptors';

    const instance = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
    );
  
    // axios ๊ฐ์ฒด์ ์ธํฐ์ํฐ ์ฅ์ฐฉ
    setInterceptors(instance);
    ```
  
    3. ์กฐ๊ธ ๋ ๊น๋ํ๊ฒ ๋ฉ์๋๋ก ์ ๋ฆฌ
    ```javascript
    function getInstance() {
      const instance = axios.create({
        baseURL: process.env.VUE_APP_API_URL,
      });
      return setInterceptors(instance);
    }
    const instance = getInstance();
    ```
    
    

