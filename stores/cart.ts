
import { defineStore } from 'pinia'
import type { Product } from '~/types'
// type product = {
//   id: number
//   name: string
//   img: string
//   price: number
//   category: string
// }
type CartItem = {
    id: string
  product: Product,
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
    promoCode: '',
    discount: 0,
    shippingMethod: 0,
    shippingMethods: [
      {
        id: 1,
        name: 'Inside Dhaka',
        price: 60,
      },
      {
        id: 2,
        name: 'Outside Dhaka',
        price: 120,
      }
    ],
  }),
  getters: {
    total: (state) => {
      return state.cart.reduce(
        (total: number, item: { price: number; quantity: number }) =>
          total + item.price * item.quantity,
        0
      )
    },
    totalItems: (state) => {
      return state.cart.length
    },
  },
  actions: {
    addToCart(product: Product) {
      if (!this.cart.some((item) => item.id === product._id)) {
        let data = {
          id: product._id,
          product: product,
          price: product.price,
          quantity: 1,
        }
        console.log(data)
        this.cart.push(data)
      } else {
        const item = this.cart.find((item) => item.id === product._id)
        if (item) {
          item.quantity++
        }
      }
      this.calculateSubtotal()
    },
    increment(product: CartItem) {
      const item = this.cart.find((item) => item.id === product.id)
      if (item) {
        item.quantity++
      }
       this.calculateSubtotal()
    },
    decrement(product: CartItem) {
      const item = this.cart.find((item) => item.id === product.id)
      if (item && item.quantity > 1) {
        item.quantity--
      }
      this.calculateSubtotal()
    },
    removeFromCart(product: CartItem) {
      const index = this.cart.indexOf(product)
      if (index !== -1) {
        this.cart.splice(index, 1)
      }
       this.calculateSubtotal()
    },
    applyPromo() {
      if (this.promoCode === 'DISCOUNT') {
        this.discount = 0.1
      } else {
        this.discount = 0
      }
    },
    calculateSubtotal() {
      
      this.subtotal = this.total + this.shippingMethod
    },
    checkout() {
      this.isLoading = true
      this.isError = false
      this.errorMessage = ''
      setTimeout(() => {
        this.isLoading = false
        this.isOpen = false
      }, 2000)
    },
    clearCart() {
      this.cart = []
    },
    toggleCart() {
      this.isOpen = !this.isOpen
    },
  },

  persist: true,
})
