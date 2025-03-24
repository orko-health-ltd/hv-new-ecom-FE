
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
    shippingMethod: '',
    shippingMethods: [
      {
        id: 1,
        name: 'Free Shipping',
        price: 0,
      },
      {
        id: 2,
        name: 'Standard Shipping',
        price: 10,
      },
      {
        id: 3,
        name: 'Express Shipping',
        price: 20,
      },
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
    applyPromo() {
      if (this.promoCode === 'DISCOUNT') {
        this.discount = 0.1
      } else {
        this.discount = 0
      }
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
