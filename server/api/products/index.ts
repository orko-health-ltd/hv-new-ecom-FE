// import Prod from '~/assets/images/Web-image-04.jpg'

export default defineEventHandler(async (event) => {
  interface Product {
    id: number
    name: string
    price: number
    img: string
    img2: string
    slug: string
    category: string
  }
const Prod = '/_nuxt/assets/images/Web-image-04.jpg'
const Prod2 =
  'https://cdn.intelligencebank.com/au/share/NOrD/2lPAP/dMgDY/size=408&quality=70&compresstype=WebP&ext=png/image-hero-banner'
  const products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      slug: 'product-1',
      price: 210,
      category: 'Black tea',
      img: Prod,
      img2: Prod2,
    },
    {
      id: 2,
      price: 310,
      name: 'Product 2',
      category: 'Green tea',
      slug: 'product-2',
      img: Prod,
      img2: Prod2,
    },
    {
      id: 3,
      price: 410,
      name: 'Product 3',
      category: 'White tea',
      slug: 'product-3',
      img: Prod,
      img2: Prod2,
    },
    {
      id: 4,
      price: 510,
      name: 'Product 4',
      category: 'Herbal tea',
      slug: 'product-4',
      img: Prod,
      img2: Prod2,
    },
    {
      id: 5,
      price: 610,
      name: 'Product 5',
      category: 'Black tea',
      slug: 'product-5',
      img: Prod,
      img2: Prod2,
    },
    {
      id: 6,
      price: 710,
      name: 'Product 6',
      category: 'Green tea',
      slug: 'product-6',
      img: Prod,
      img2: Prod2,
    },
  ]
  return products
})
