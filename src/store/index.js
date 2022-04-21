import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  products: [],
  images: [
    6123150777, 6126039472, 6126040354, 6128597660, 6134992334, 6136170572,
    6136172483, 6140906765, 6142673815, 6142681673, 6142683276, 6148226736,
    6123150777, 6126039472, 6126040354, 6128597660, 6134992334, 6136170572,
    6136172483, 6140906765, 6142673815, 6142681673, 6142683276, 6148226736,
  ],
  sortBy: 'title',
  username: "",
  password: ""
};

const getters = {
  total(state, getters) {
    return getters.cartProducts.reduce((total, p) => {
      return total + p.price * p.quantity;
    }, 0);
  },
  cartProducts: (state) => {
    return state.products.filter((p) => p.quantity !== 0);
  },
  likedProducts: (state) => {
    return state.products.filter((p) => p.liked === "yes");
  },
  itemsInCart: (state, getters) => {
    return getters.cartProducts.reduce(
      (accum, item) => accum + item.quantity,
      0
    );
  },
  itemsInLiked(state, getters) {
    return getters.likedProducts.length;
  },

};

const actions = {
  async getProducts({ commit }) {
    let response = await fetch(
      "http://localhost:8000/books"
    );
    if (response.ok) {
      let json = await response.json();
      commit("allProducts", json);
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  },

  async login() {


    let response = await fetch("http://localhost:8000/customers/login", {
      method: 'POST', body: JSON.stringify({
        phone: localStorage.getItem("username"),
        password: localStorage.getItem("password")
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })

    if (response.ok) {
      let json = await response.json();
      console.log(json)
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  },

  getSortBy(state) {
    return state.state.sortBy;
  }
};

const mutations = {
  allProducts: (state, payload) => {
    payload.forEach((el) => {
      el.quantity = 0;
      let rand = Math.floor(Math.random() * state.images.length);
      el.src = "images/" + state.images[rand] + ".webp";
      el.liked = "no";
    });
    if (state.sortBy === "title") {
      state.products = payload.sort((a, b) => {
        if (a.title < b.title) return -1
        return 1
      });
    }
    else if (state.sortBy === "price") {
      state.products = payload.sort((a, b) => a.price - b.price)
    }
  },

  addToCart: (state, product) => {
    const item = state.products.find((p) => p.id === product.id);
    item.quantity++;
  },

  removeFromCart: (state, product) => {
    const item = state.products.find((p) => p.id === product.id);
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      item.quantity = 0;
    }
  },

  addToLiked: (state, product) => {
    const item = state.products.find((p) => p.id === product.id);
    if (item) {
      item.liked = "yes";
    }
  },
  removeFromLiked: (state, product) => {
    const item = state.products.find((p) => p.id === product.id);
    item.liked = "no";
  },
  toggleSorted: (state) => {
    let x = localStorage.getItem('hui');
    console.log('x = ', x);
    // console.log('hui = ')
    if (state.sortBy === 'title') {
      state.sortBy = 'price'
    } else if (state.sortBy === 'price') {
      state.sortBy = 'title'
    }
    if (state.sortBy === "title") {
      state.products = state.products.sort((a, b) => {
        if (a.title < b.title) return -1
        return 1
      });
    }
    else if (state.sortBy === "price") {
      state.products = state.products.sort((a, b) => a.price - b.price)
    }
  }

};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
