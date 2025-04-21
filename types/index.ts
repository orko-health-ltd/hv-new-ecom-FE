
export interface Product {
  _id: string
  name: string
  color: string
  price: number
  specification: string
  discount: number
  stock: number
  discount_unit: string
  is_active: boolean
  category: string
  is_featured: boolean
  is_combo: boolean
  product_images: { name: string; url: string; _id: string }[]
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
  }
  brand_info: {
    _id: string
    name: string
    description: string
    image: string
    is_active: boolean
  }
  category_info: {
    _id: string
    name: string
    image: string
    description: string
    is_active: boolean
  }
  sku_info: {
    _id: string
    name: string
    image: string
    description: string
    is_active: boolean
  }
  stock_info: [
    {
      _id: string
      quantity: string
      date: string
      type: string
      reason: boolean
    }
  ]
}
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
  total: number
  ssl_ipn: {
    status: string
    status_message: string
    amount: number
    tran_id: string
    store_amount: number
    currency: string
    method: string
    transaction_id: string
    card_brand: string
    tran_date: string
    card_type: string
    card_number: string
    card_issuer: string
    card_issuer_country: string
    card_issuer_country_code: string
    card_issuer_phone: string
    card_issuer_email: string
    card_issuer_bank_name: string
    card_issuer_bank_phone: string
    card_issuer_bank_address: string
    card_issuer_bank_city: string
    card_issuer_bank_state: string
    card_issuer_bank_zip: string
    card_issuer_bank_country: string
    card_issuer_bank_country_code: string
    card_issuer_bank_country_phone: string
  }
}