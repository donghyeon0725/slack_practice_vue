π μΏ ν€ λͺ¨λννκΈ°
-
* vuexλ₯Ό μ¬μ©νλ©΄, μλ°μ€ν¬λ¦½νΈ λ¨μ μ μ₯μ νλ κ²μ΄κΈ° λλ¬Έμ λ¦¬λ‘λ©μ νμ λ νμ΄μ§μ μ λ³΄κ° λͺ¨λ λ μκ°λ€. λ°λΌμ μΏ ν€μ μ μ₯ν  νμκ° μλ€. 
* ννΈ, μΏ κΈ°μ κ°μ set νκ³  get νλ κ²μ μ§μμ μΌλ‘ κ°μ λ‘μ§μΌλ‘ λμν  κ²μ΄λ―λ‘, μΏ ν€ setter getter λ©μλλ μμ μ΄ μ§μ  μ§€ νμ μμ΄ κΈ°μ‘΄μ μλ κ²μ κ°μ Έλ€κ° μ°λ©΄ λ¨. μμ  μ½λλ μλμ κ°λ€.
```javascript
function saveAuthToCookie(value) {
  document.cookie = `til_auth=${value}`;
}

function saveUserToCookie(value) {
  document.cookie = `til_user=${value}`;
}

function getAuthFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)til_auth\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getUserFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)til_user\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

// deleteCookie('til_auth'), deleteCookie('til_user')
function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
  saveAuthToCookie,
  saveUserToCookie,
  getAuthFromCookie,
  getUserFromCookie,
  deleteCookie,
};

```


<br/>


π μΏ ν€ μ μ₯μ νμΈνκΈ°
-
* κ°λ°μ λκ΅¬μ application ν­μ νμΈνλ©΄ λλ€.
![μ΄λ―Έμ§](./img/2_12.png)


<br/>



π vuexμ λ¨μ μ λ³΄μνκΈ° μν΄μ, μΏ ν€μ vuex μ°κ²°νκΈ°
-
> κ°μ κ°μ Έμ¬ λ
* stateμ κ°μ, cookieλ‘ λΆν° κΊΌλ΄μ€λ λ°©λ²μ΄ μλ€.
* vuex store λ΄λΆμ state μμ±μΌλ‘ μλμ κ°μ΄ μΆκ°ν΄μ€λ€.
* μ΄λ, getAuthFromCookie λ©μλμ getUserFromCookie λ©μλλ μ μμ  μ½λλ₯Ό import ν κ²μ΄λ€.
```javascript
    // vuex store λ΄λΆμ state μμ±μΌλ‘ μλμ κ°μ΄ μΆκ°ν΄μ€λ€.
  state: {
    username: getAuthFromCookie() || '',
    token: getUserFromCookie() || '',
  },
```
* (μ μ½λλ, νΌμ°μ°μμ μν΄ trueμΈ κ°μ΄ return λλ€.)

> κ°μ μΈνν  λ
* vuexμ action μμ±μ μΆκ°νλ€.
    * actionμ΄λ mutationμ λ©μλλ₯Ό λΆλ₯΄λ μμμ μμΉ μν€λ κ³³μΌλ‘ λΉλκΈ° μ²λ¦¬ λν μ¬κΈ°μ μ§ν λ  μ μλ€.
    * [λ§ν¬](https://vuex.vuejs.org/kr/guide/actions.html) λ₯Ό μ°Έκ³ νλ€.
    ![μ΄λ―Έμ§](./img/2_13.png)

* μλμ κ°μ΄ μ¬μ©νλ€.
    * μ²« λ²μ§Έ μΈμλ‘λ commit μμμ νΈμΆν  μ μλ κ°μ²΄λ₯Ό λ°λλ€.
    ```javascript
    actions: {
        async LOGIN({ commit }, userData) {
          // λ‘κ·ΈμΈμ μνν΄μ, ν ν°μ λ°μμ¨λ€.
          const { data } = await loginUser(userData);
          
          // μ»€λ° μμμΌλ‘ storeμ κ°μ μΈννλ€. (λλ μΏ ν€λ‘ μ μ₯ν΄λκ³  νμ΄μ§λ₯Ό λ¦¬λ‘λ μ²λ¦¬νλ€)
          commit('setToken', data.token);
          commit('setUsername', data.user.username);
          
          // μΏ κΈ°λ‘ μ μ₯νλ€.
          saveAuthToCookie(data.token);
          saveUserToCookie(data.user.username);
    
          return data;
        },
    }
    ```
   * μμ±ν action μ μλμ κ°μ λ°©λ²μΌλ‘ νΈμΆνλ€.
   ```javascript
   store.dispatch('LOGIN', {name:'kim'})
   // await this.$store.dispatch('LOGIN', userDataJson);
   ```
   * μ΄ λ, awaitλ₯Ό λΆμ¬μ€ μ΄μ λ LOGINμ΄ async λμ(λΉλκΈ°)μ΄κΈ° λλ¬Έμ΄λ€. κ·Έλ¦¬κ³  awaitλ₯Ό μ¬μ©ν λ©μλ νλ‘λ―Έμ€ κ°μ²΄λ₯Ό λ¦¬ν΄ν΄μΌ νλ―λ‘ async ν€μλλ₯Ό λ©μλ μμ λΆμ¬μΌνλ€.
  
  
   


<br/>

π νλ¦ μμ½
-   
* vuexμ storeλ λΈλΌμ°μ (μλ°μ€ν¬λ¦½νΈλ¨)μ μ μ₯λλ μμ μ μ₯μλ‘ λ¦¬λ‘λνλ©΄ λ μκ°λ²λ¦°λ€. 
* νλ μ»΄ν¬λνΈμ μ€μ μ μ₯μμ΄κΈ° λλ¬Έμ μ¬κΈ°μ λ‘κ·ΈμΈ μ λ³΄κ° μ μ₯λμ΄μΌ νλ κ²μ λ§μΌλ μΏ ν€μ μ°κ²°ν΄μ μ¬μ©ν  νμκ° μλ€.
* μ΄ λ, state μμ± κ°(λ‘κ·ΈμΈμ¬λΆ)μ λ³ν μν€κΈ° μν΄ μ¬μ© νλ μμ±μ mutationμ΄κ³  μ΄ μμμ νΈμΆνκΈ° μν΄ μ¬μ©νλ μμ±μ action μ΄λ€.
* μ¬κΈ°μ λ§λ  actionμ νΈμΆν  λ dispatch λ©μλλ₯Ό μ΄μ©νλ€.
