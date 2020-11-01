import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const AddToCartModal = dynamic(
  () => import('@/components/AddToCartModal'),
  { loading: () => <p>Loading...</p>, ssr: false }
)
/** ssr: --->
* Quando eu precisar utilizar um componente e esse componente depende
* exclusivamente diretamente de algo que só existe no browser e não dentro
* do node, vc pode colocar ssr: false, para fazer ele sempre ser renderizado
* pelo lado do browser e nunca pelo servidor.
* ssr: server side rendering
*  { loading: () => <p>Loading...</p>, ssr: false}
*/


export default function Product() {
  const router = useRouter();
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false)

  function handleAddToCart() {
    setIsAddToCartModalVisible(true)
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button onClick={handleAddToCart}>Add To Cart</button>

      {isAddToCartModalVisible && <AddToCartModal />}
    </div>
  )
}