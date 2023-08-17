import Banner from './components/Banner'
import BannerImage from '../../public/banner01.png';
import Products from './components/Products';
import { Product } from './interfaces/product';

async function getProducts(): Promise<any> {
  const res = await fetch('http:/localhost:3333/product', { cache: 'no-store' });
  if(!res.ok) {
    throw new Error('Failed to fetch data')  
  }

  const productsData: any[] = await res.json();
  productsData.forEach(product => {
    product.image = `http://localhost:3333/uploads/${product.fileName}`;
    product.formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price);
    product.splitPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price/10);
  })
  return productsData;
}

export default async function Home() {
  const products: Product[] = await getProducts()

  return (
    <main>
      <Banner image={BannerImage} width={1140} height={325} />
      <Products products={products} />
    </main>
  )
}
