<template>
  <div>
    <h3>Корзина</h3>
    <div v-show="!products.length">
      <p>Ваша корзина пуста!</p>
      <router-link to="/products">
        <button>Продолжить покупки</button></router-link
      >
    </div>

    <div v-show="products.length">
      <div class="cart_list">
        <div v-for="p in products" :key="p.id">
          <div class="cart_item">
            <span>{{ p.title }}</span>
            <span>Коляичество: {{ p.quantity }}</span>
            <span> {{ p.price * p.quantity }} ₽ </span>
            <div>
              <button
                type="button"
                class="button item_button cart_button"
                @click="addToCart(p)"
              >
                +
              </button>
              <button
                type="button"
                class="button item_button remove_button"
                @click="removeFromCart(p)"
              >
                &minus;
              </button>
            </div>
          </div>
        </div>
      </div>
      <span class="total"
        >Общая стоимость:
        {{ new Intl.NumberFormat("ru-RU").format(total) }} ₽</span
      >
    </div>

    <button v-show="products.length" @click="checkout" class="checkout">
      Оформить
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      products: "cartProducts",
      total: "total",
    }),
  },
  methods: {
    ...mapActions(["add_product_to_bill"]),
    ...mapMutations(["addToCart", "removeFromCart"]),
    checkout() {
      const string = this.products
        .map((item) => {
          this.add_product_to_bill(item.id, item.quantity);
          return item.title + " " + item.quantity + " шт.";
        })
        .join("\n");

      alert(string + "\nОбщая стоимость " + this.total + " ₽ ");
    },
  },
};
</script>

<style scoped>
.cart_list {
  margin-bottom: 20px;
}
.cart_item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid gray;
}
.cart_item > span {
  width: 300px;
}
.button {
  background: #fff;
  border: 1px solid #35a2c7;
  border-radius: 4px;
}
.button:hover {
  background: #35a2c7;
  color: #fff;
  border: none;
  cursor: pointer;
}
.item_button {
  margin-right: 10px;
}
.cart_button,
.remove_button {
  width: 30px;
  height: 30px;
}
.checkout {
  margin-top: 30px;
  padding: 10px;
  border-radius: 4px;

  background: #35a2c7;
  color: #fff;
  border: none;
  cursor: pointer;
}
.total {
  font-weight: bold;
}
</style>
