
import { defineStore } from 'pinia'
type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
}
export const useMyCartStore = defineStore({
  id: 'myCartStore',
  state: () => ({
    cart: [] as CartItem[],
    total: 0,
    isOpen: false,
    isLoading: false,
    isError: false,
    errorMessage: '',
  }),
  actions: {
    addToCart(product: CartItem) {
      this.cart.push(product)
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
})
