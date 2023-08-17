'use client';

import { ThemeConsumer, styled } from "styled-components";
import { Container } from "../styles/util";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import Logo from "../../../public/logo.png";
import { Product } from "../interfaces/product";

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  return (
    <StyledProducts>
      <StyledTitle>
        <span>De</span>staque
      </StyledTitle>
      <StyledProductList>
        {
            products && products.map((product) => {
             return (
              <StyledProductItem key={product._id}>
                <Link href="/">
                  <Image src={product.image} width={230} height={230} alt="produto" />
                  <StyledProductName>{product.name}</StyledProductName>
                  <StyledProductPrice>{product.formattedPrice}</StyledProductPrice>
                  <StyledProductSplitPrice>10x de {product.splitPrice} sem juros</StyledProductSplitPrice>
                </Link>
              </StyledProductItem>
             ) 
            })
        }
      </StyledProductList>
    </StyledProducts>
  );
};

const StyledProducts = styled.section`
  ${Container};
`;

const StyledTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  margin-top: 3.125rem;
  margin-bottom: 2.8rem;

  span {
    text-decoration: underline ${({ theme }) => theme.colors.primary};
  }
`;

const StyledProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.125rem;
  margin-bottom: 11.25rem;
`;

const StyledProductItem = styled.div`
  height: 25rem;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  box-shadow: 5px 0px 10px #d9d9d9;
  padding: 1rem;

  &:hover {
    box-shadow: 5px 10px 10px #d9d9d9;
    p {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const StyledProductName = styled.p`
  font-size: 0.875rem;
`;

const StyledProductPrice = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  margin: 1.125rem;
`;

const StyledProductSplitPrice = styled.small`
  font-size: 0.75rem;
  font-weight: 700;
  color: #999;
  margin-bottom: 2rem;;
`;

export default Products;
