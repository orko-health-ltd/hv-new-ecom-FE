
import { defineStore } from 'pinia'
type CartItem = {
    id: number
    product: object
    price: number
    quantity: number
}
export const useMyCartStore = defineStore('myCartStore', {
  state: () => ({
    cart: [] as CartItem[],
    total: 0,
    isOpen: false,
    isLoading: false,
    isError: false,
    errorMessage: '',
  }),
  getters: {
    total:(state) => {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    },
    totalItems: (state) => {
      return state.cart.length
    }
  },
  actions: {
    addToCart(product: CartItem) {
      if (!this.cart.some((item) => item.id === product.id)) {
        this.cart.push({id:product.id,product:product, price: product.price, quantity: 1})
      }
      else {
        this.cart.find((item) => item.id === product.id).quantity++
      }
    },
    increment(product: CartItem) {
      this.cart.find((item) => item.id === product.id).quantity++
    },
    decrement(product: CartItem) {
      if (this.cart.find((item) => item.id === product.id).quantity > 1) {
        this.cart.find((item) => item.id === product.id).quantity--
      }
    },
    removeFromCart(product: CartItem) {
      const index = this.cart.indexOf(product)
      if (index !== -1) {
        this.cart.splice(index, 1)
      }
    },
    clearCart() {
      this.cart = []
    },
    toggleCart() {
      this.isOpen = !this.isOpen
    },
  },

  persist: true
})
