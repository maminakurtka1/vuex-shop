<template>
  <div>
    <ul class="product_list">
      <button
        type="button"
        class="button item_button add_button abc"
        @click="toggleSorted()"
      >
        {{
          getSortBy() === "price"
            ? "Сортировать по имени"
            : "Сортировать по цене"
        }}
      </button>

      <button
        type="button"
        class="button item_button add_button qwe"
        @click="toggleSorted()"
      >
        Сортировать по имени
      </button>
      <li v-for="product in products" :key="product.id" class="product_item">
        <img :src="product.src" class="item_image" />
        <span class="item_name">{{ product.title }}</span>
        <span class="author">{{ product.author }}</span>
        <span class="item_price">{{ product.price + " ₽ " }}</span>

        <div class="product_actions">
          <button
            v-if="product.quantity === 0"
            type="button"
            class="button item_button add_button"
            @click="addToCart(product)"
          >
            Добавить
          </button>
          <div v-else>
            <button
              type="button"
              class="button item_button cart_button"
              @click="addToCart(product)"
            >
              +
            </button>
            <span v-if="product.quantity > 0" class="item_quantity">
              {{ product.quantity }}
            </span>
            <button
              type="button"
              class="button item_button remove_button"
              @click="removeFromCart(product)"
            >
              &minus;
            </button>
          </div>

          <button
            v-if="product.liked === 'no'"
            type="button"
            class="button item_button like_button"
            @click="addToLiked(product)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="2em"
              height="2em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFCDD2"
                d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12z"
              />
            </svg>
          </button>
          <button
            v-if="product.liked === 'yes'"
            type="button"
            class="button item_button remove_like_button"
            @click="removeFromLiked(product)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="2em"
              height="2em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 48 48"
            >
              <path
                fill="#F44336"
                d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12z"
              />
            </svg>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "products",

  computed: {
    ...mapState(["products"]),
  },
  methods: {
    ...mapActions(["getProducts", "getSortBy"]),
    ...mapMutations([
      "addToLiked",
      "removeFromLiked",
      "addToCart",
      "removeFromCart",
      "toggleSorted",
    ]),
  },
  async created() {
    this.getProducts();
  },
};
</script>

<style scoped>
.product_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.product_item {
  display: flex;
  width: 300px;
  flex-direction: column;

  margin-bottom: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  justify-content: space-between;
}
.item_image {
  margin-bottom: 10px;
}
.item_name {
  padding: 10px;
  font-weight: bold;
}
.author {
  padding: 10px;
  font-weight: bold;
}
.item_price,
.item_quantity {
  padding: 10px;
}
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
.abc {
  position: absolute;
  top: 40px;
  left: 200px;
}
.qwe {
  position: absolute;
  top: 40px;
  left: 330px;
}
</style>
