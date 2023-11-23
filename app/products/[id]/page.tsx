import { getProductById } from '@/lib/store-service'

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProductById(Number(params.id))

  console.log(product)

  return <section>My Post: {product.title}</section>
}
