π νμ΄μ§ μμ±
-
* μ»΄ν¬λνΈ μμ±νκΈ° (λ³΄ν΅ λΉμ§λμ€ λ‘μ§λ³λ‘ λΆλ¦¬ν΄μ λͺ¨λμ λ§λ­λλ€)
```html
<template>
  <header>
    <router-link to="/login">λ‘κ·ΈμΈ</router-link
    ><!-- router-linkλ₯Ό ν΅ν΄μ λ€λ₯Έ urlλ‘ λ³΄λΌ μ μμ -->&nbsp;|&nbsp;
    <router-link to="/signup">νμκ°μ</router-link
    ><!-- toλΌλ μμ±μ ν΅ν΄μ λ§ν¬λ₯Ό λ³΄λ -->
  </header>
</template>

<script>
import Demo from '@/demo/basic/Demo';
// import Demo from '@/demo/basic/Demo'

export default {};
</script>

<style></style>
```

* λͺ¨λμ λΆλ¬μ¬ νμ΄μ§μμ, μ»΄ν¬λνΈμ λμμΌλ‘ μΆκ°
```html
<AppHeader></AppHeader><!-- μΆκ°ν λͺ¨λ λ£κΈ° -->

<script >
    import AppHeader from '@/components/common/AppHeader.vue';
    
    export default {
      components: {
        AppHeader,
      },
    };
</script>
```


<br/>


π λΉ λ₯Έ vue νμ΄μ§ μμ±
-
* vue snippetsμμ μ κ³΅νλ λ¨μΆμ΄μΈ "vim"μ μλ ₯νλ©΄ λ¦¬μ€νΈλ‘ viewportκ° λ°νλ°, μ΄κ²μ μ ννμ¬ νΌμ λΉ λ₯΄κ² μμ±ν  μ μλ€.



<br/>


π λ·° νμ΄μ§ μμ± μμΉ
-
* λΉμ§λμ€ λ‘μ§μ λ΄λ λͺ¨λ : components ν΄λ μλμ, μ»΄ν¬λνΈ λ³λ‘ μμ±μ νλ€.
* λΌλ(νμ΄μ§)κ° λλ μ»΄ν¬λνΈ : views ν΄λ μλμ μμ± νλ€. λ§λ  components νμΌ λ€μ λΆλ¬μ μ¬μ©νλ€.


<br/>


π vue μ»΄ν¬λνΈμ data μμ± λ¨μΆμ΄
-
* vda


<br/>


