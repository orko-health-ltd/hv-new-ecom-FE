// import Prod from '~/assets/images/Web-image-04.jpg'

export default defineEventHandler(async (event) => {
  interface Product {
    id: number
    name: string
    price: number
    img: string
    slug: string
  }
const Prod = '/_nuxt/assets/images/Web-image-04.jpg'
  const products: Product[] = [
    { id: 1, name: 'Product 1',slug:'product-1', price: 210, img: Prod },
    {
      id: 2,
      price: 310,
      name: 'Product 2',
      slug: 'product-2',
      img: Prod,
    },
    {
      id: 3,
      price: 410,
      name: 'Product 3',
      slug: 'product-3',
      img: Prod,
    },
    {
      id: 4,
      price: 510,
      name: 'Product 4',
      slug: 'product-4',
      img: Prod,
    },
    {
      id: 5,
      price: 610,
      name: 'Product 5',
      slug: 'product-5',
      img: Prod,
    },
    {
      id: 6,
      price: 710,
      name: 'Product 6',
      slug: 'product-6',
      img: Prod,
    },
  ]
  return products
})
