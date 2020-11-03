import SEO from '@/components/SEO';
import { GetServerSideProps } from 'next';
import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface IHomeProps {
  recommendedProducts: IProduct[];
}


export default function Home({ recommendedProducts }: IHomeProps) {
  async function handleSum() {
    const math = (await import('../lib/math')).default;
    alert(math.sum(3, 5))
  }

  return (
    <div>
      <SEO
        title="DevCommerce, your best choice !"
        image="bond.png"
        shouldExcludeTitleSuffix />

      <section>
        <Title>Yippee Kai Yay MotherFucker!!!</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })}
        </ul>

      </section>

      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

// server side rendering para motores de busca (TTFB Time to First Bite= 2s)
// O NEXT_PUBLIC_ torna a variável pública, disponível no browser
export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}