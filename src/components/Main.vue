<template>
  <div>
    <form class="login">
      <h1>Sign in</h1>
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
      <button type="submit" @click="f(username, password)">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: function () {
    return {
      username: "",
      password: "",
    };
  },
  name: "main2",
  methods: {
    ...mapActions(["login"]),
    f: function (username, password) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      this.login();
    },
  },
};
</script>