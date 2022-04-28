<template>
  <div>
    <form class="login">
      <h1>Регистрация</h1>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/mini.css/3.0.1/mini-default.css"
      />
      <label>User name</label>
      <input required v-model="username" type="text" placeholder="Snoopy" />
      <label>Password</label>
      <input
        required
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <hr />
      <button
        type="submit"
        class="button item_button add_button"
        @click="f(username, password)"
      >
        Login
      </button>
      <button>Registration</button>
    </form>
  </div>
</template>

<script>
</script>

<style scoped>
.button {
  border-radius: 4px;
  background: #35a2c7;
  color: #fff;
  border: none;
}
.button:hover {
  border: none;
  cursor: pointer;
}
.item_button {
  align-self: flex-start;
  padding: 5px;
  margin: 10px;
}
.product_actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cart_button,
.remove_button {
  width: 30px;
  height: 30px;
}

.add_button {
  width: 120px;
  height: 42px;
}
.remove_like_button,
.like_button {
  width: 42px;
  height: 42px;
  background-color: transparent;
}
</style>
