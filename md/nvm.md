π nvm μ΄λ?
-
Node Version Managerμ μ½μ
λΈλμ κ²½μ°, κ°λ° νκ²½μμ μ¬λ¬ λ²μ μ΄ νμν  μ μλλ°,
λΈλ λ²μ μ μ€μμΉ­μ μ½κ² ν  μ μλλ‘ λμμ€.
νμ¬ νλ‘μ νΈμμ λΈλλ 10.16.3


<br/>

π nvm μ€μΉ
-
<https://github.com/nvm-sh/nvm> λ§ν¬μμ μ€μΉ κ°λ₯ν¨

nvm-windows λ§ν¬μΈ <https://github.com/coreybutler/nvm-windows>μ λ€μ΄κ°

download Now νκΈ° <https://github.com/coreybutler/nvm-windows/releases>

nvm-setup.zip νμΌμ λ€μ΄λ‘λ ν΄μ μ€μΉνλ©΄ λλ€.

<br/>

π nvm μ€μ 
-
μλμ°κ° μλ bash shell λ±μ μ¬μ©νλ κ²½μ° λ³λμ μ€μ μ΄ νμνλ°
μλμ κ°μ μ€μ μ ν΄μ£Όλ©΄ λλ€

* ~/.bashrc μ΄μ΄μ μλμ κ°μ΄ μμ 
```text
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```


<br/>

π nvm λ²μ  νμΈ 
-
```text
nvm --version
```

<br/>

π node λ²μ  λ³κ²½
-

* μ€μΉ
```text
nvm install <version>
nvm install 10.16.3 
```

* λ²μ  λ³κ²½
```text
nvm use 10.16.3
```

* λΈλ λ²μ  νμΈ
```text
node -v
```



<br/>

π node λ₯Ό ν΅ν μμ‘΄μ± λ€μ΄λ‘λ
-

* νλ‘μ νΈ ν΄λλ‘ μ΄λ
```text
cd /mnt
cd c
cd Users
cd <μ¬μ©μμ΄λ¦>
cd Desktop
```

* μμ‘΄μ± μ€μΉ
```text
npm i
npm install
```

