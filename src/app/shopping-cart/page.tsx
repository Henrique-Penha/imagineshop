"use client";

import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../contexts/ShoppingCart";
import Image from "next/image";
import { styled } from "styled-components";
import { Container } from "../styles/util";
import { Product } from "../interfaces/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';


const ShoppingCart = () => {
  const {
    getProducts,
    getTotalProducts,
    getTotalValue,
    getShippingValue,
    deleteProduct,
    clearAll,
  } = useContext(ShoppingCartContext);
  const [products, Setproducts] = useState<Product[]>([]);
  const [refreshPage, setRefreshPage] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const productsList = getProducts();
    Setproducts(productsList);
  }, [refreshPage]);

  const deleteProductInPage = (id: string) => {
    toast.success('Produto removido do carrinho.');
    deleteProduct(id);
    setRefreshPage(refreshPage + 1);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const token = await getToken();
    if(!token) {
      toast.error('Falha ao realizar p login.')
      return;
    }
    const productIds: string[] = [];
    products.map(product => productIds.push(product._id));
    const sellProducts = await sellAllProducts(token, productIds);
    if(!sellProducts) {
      toast.error('Não foi possivel realizar a venda.');
      return;
    }
    toast.success('Venda realizada com sucesso.');
    clearAll();
    router.push('/success');
  }

  const getToken = async (): Promise<any> => {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      const { access_token } = await result.json();
      return access_token;
  }

  const sellAllProducts = async (token: string, productIds: string[]): Promise<any> => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API}/products/sell`, {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productIds })
    });
    if(result.status !== 201) return null;
    return 'success';
  }


  return products && products.length > 0 ? (
    <Main>
      <Title>Meu Carrinho</Title>
      <SubTitle>Produtos</SubTitle>
      <ShoppingCartContainer>
        <ShoppingCartProducts>
          <Separator></Separator>
          {products &&
            products.map((product, index) => (
              <div key={index}>
                <ButtonContainer>
                  <button onClick={() => deleteProductInPage(product._id)}>
                    <DeleteIcon icon={faX}></DeleteIcon>
                  </button>
                </ButtonContainer>
                <Product>
                  <div>
                    <Image
                      src={product.image}
                      width={180}
                      height={180}
                      alt="foto do produto"
                    />
                  </div>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>{product.formattedPrice}</ProductPrice>
                </Product>
                <Separator></Separator>
              </div>
            ))}
        </ShoppingCartProducts>

        <section>
          <ShoppingCartPayment>
            <PaymentTitle>1. Resumo do pedido</PaymentTitle>
            <PaymentValue>
              <span>{products.length} Produtos</span>{" "}
              <span>{getTotalProducts()}</span>
            </PaymentValue>
            <PaymentShipping>
              <span>Frete</span> <span>{getShippingValue()}</span>
            </PaymentShipping>
            <PaymentTotal>
              <span>Total</span> <span>{getTotalValue()}</span>
            </PaymentTotal>
            <Separator></Separator>
            <LoginTitle>2. Login</LoginTitle>
            <InputGroup>
              <span>E-MAIL:</span>
              <input type="text" value={email || ''} onChange={(e) => setEmail(e.currentTarget.value)}/>
            </InputGroup>
            <InputGroup>
              <span>SENHA:</span>
              <input type="password" value={password || ''} onChange={(e) => setPassword(e.currentTarget.value)}/>
            </InputGroup>
            <Button type="submit" onClick={handleSubmit}>
              Continuar
            </Button>
          </ShoppingCartPayment>
        </section>
      </ShoppingCartContainer>
    </Main>
  ) : (
    <Main>Sem produto</Main>
  );
};

const Main = styled.main`
  ${Container};
  min-height: 60vh;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.875rem;
  font-weight: 700;
  margin: 5.625rem 0;
`;

const SubTitle = styled.p`
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
`;

const ShoppingCartContainer = styled.div`
  display: grid;
  grid-template-columns: 780px auto;
  gap: 1.5rem;
  min-height: 800px;
`;

const ShoppingCartProducts = styled.section``;

const Separator = styled.hr`
  border: 1px solid #c8c9c3;
  border-radius: 0px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.8rem 0;

  button {
    border: unset;
    background: unset;
    cursor: pointer;
  }
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1rem;
`;

const Product = styled.div`
  display: grid;
  grid-template-columns: auto 350px auto;
`;

const ProductName = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 700;
  padding: 0;
  margin: 0;
`;

const ProductPrice = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  padding: 0;
  margin: 0;
  place-self: start end;
`;

const ShoppingCartPayment = styled.div`
  background-color: #f0f1ef;
  border-radius: 4px;
  padding: 1rem;
`;

const PaymentTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
`;

const PaymentValue = styled.div`
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
  margin-top: 5rem;
  display: flex;
  justify-content: space-between;

  span {
    display: block;
  }
`;

const PaymentShipping = styled.div`
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;

  span {
    display: block;
  }
`;

const PaymentTotal = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 3.125rem 0 5rem 0;
  display: flex;
  justify-content: space-between;

  span {
    display: block;
  }
`;

const LoginTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 2rem 0;
`;

const InputGroup = styled.div`
  span {
    text-transform: uppercase;
    margin-bottom: 0.625rem;
    display: block;
  }

  input {
    width: 100%;
    height: 1.25rem;
    border: unset;
  }

  margin-bottom: 1.3rem;
`;

const Button = styled.button`
  display: block;
  border: unset;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 700;
  font-size: 1.5rem;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  cursor: pointer;
  margin: 0 auto;
  width: 240px;
  height: 60px;
`;

export default ShoppingCart;