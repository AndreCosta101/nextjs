import SEO from '@/components/SEO';
import Link from 'next/link';
import { client } from '@/lib/prismic';
import { GetServerSideProps } from 'next';
import { Title } from '../styles/pages/Home';
import PrismicDOM from 'prismic-dom';
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';

interface IProduct {
  id: string;
  title: string;
}

interface IHomeProps {
  recommendedProducts: Document[];
}


export default function Home({ recommendedProducts }: IHomeProps) {

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
                <Link href={`/catalog/products/${recommendedProduct.uid}`} >
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>

      </section>

    </div>
  )
}

// server side rendering para motores de busca (TTFB Time to First Bite= 2s)
// O NEXT_PUBLIC_ torna a variável pública, disponível no browser
export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])
  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
}