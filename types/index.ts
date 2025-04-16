
export interface Product {
  _id: string
  name: string
  color: string
  price: number
  specification: string
  discount: number
  discount_unit: string
  is_active: boolean
  category: string
  is_featured: boolean
  is_combo: boolean
  product_images: {name:string,url:string,_id:string}[]
  brand_id: string
  sku_id: string
  category_id: string
  format: string
  features: string[]
  description: string
  ingredients: string[]
  brewing_guide: string[]
  front_image: string
  back_image: string
  sku: string
  slug: string
  brand: {
    _id: string
    name: string
    description: string
    image: string
    is_active: boolean
  }}
export interface Category {
  _id: string
  name: string
  image: string
  description: string
  is_active: boolean
}
export interface Brand {
  _id: string
  name: string
  description: string
  image: string
  is_active: boolean
}
export interface Customer {
  _id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  address: string
  city: string
  district: string
  country: string
  is_active: boolean
}
export interface Order {
  _id: string
  customerId: string
  customer:Customer
  products: Array<{
    productId: string
    product:Product
    quantity: number
    price: number
  }>
  totalAmount: number
  subTotal: number
  shippingcost: number
  status: string
  shippingAddress: {
    street: string
    city: string
    district: string
    country: string
  }
  contactPerson: {
    name: string
    phone: string
  }
  note: string
  paymentMethod: string
  paymentStatus: string
  partialPayment: number
  orderDate: Date
  deliveryDate: Date
  is_active: boolean
  order_id: string
  total:number
}