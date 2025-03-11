
import { defineStore } from 'pinia'
type CartItem = {
    id: number
  product: { name: string, img: string, price: number , category: string},
  price: number
    quantity: number
}
export const useMyCartStore = defineStore('myCartStore', {
  state: () => ({
    cart: [] as CartItem[],
    subtotal: 0,
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
        let data = {
          id: product.id,
          product: product.product,
          price: product.price,
          quantity: 1
        }
        this.cart.push(data)
      }
      else {
        const item = this.cart.find((item) => item.id === product.id)
        if (item) {
          item.quantity++
        }
      }
    },
    increment(product: CartItem) {
      const item = this.cart.find((item) => item.id === product.id)
      if (item) {
        item.quantity++
      }
    },
    decrement(product: CartItem) {
      const item = this.cart.find((item) => item.id === product.id)
      if (item && item.quantity > 1) {
        item.quantity--
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
