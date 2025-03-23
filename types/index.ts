export interface Product {
  _id:string
  name: string
  color: string
  price: number
  specification: string
  discount: number
  discount_unit: string
  is_active: boolean
  is_featured: boolean
  is_combo: boolean
  product_images: string[]
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
}
export interface Category {
  _id: string
  name: string
  image: string
  description: string
  is_active: boolean
}