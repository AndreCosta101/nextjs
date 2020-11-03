import { useRouter } from 'next/router';

import { GetStaticPaths, GetStaticProps } from "next";
import { client } from '@/lib/prismic';
import PrismicDOM from 'prismic-dom';
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';


interface ProductProps {
  product: Document;
}


export default function Product({ product }: ProductProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>CARREGANDO...</p>
  }
  console.log(product.data)

  return (
    <div>
      <h1>
        {PrismicDOM.RichText.asText(product.data.title)}
      </h1>

      <img src={product.data.thumbnail.url} width="600" alt={product.data.title} />

      <div dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(product.data.description) }} />

      <p>Price: ${product.data.price} </p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    //assim vai carregar conforme o usuário for acessando. Com o fallback true, ele tenta encontrar na api de novo
    paths: [],
    fallback: true
  }
};

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID('product', String(slug), {})

  return {
    props: {
      product,
    },
    revalidate: 5,
  }
}