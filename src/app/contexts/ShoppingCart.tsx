import { createContext } from 'react';
import { Product } from '../interfaces/products';

interface ShoppingCart {
    addProduct: (product: Product) => void;
    getProducts: () => Product[];
    deleteProduct: (id: string) => void;
    getTotalValue: () => string;
    getTotalProducts: () => string;
    getShippingValue: () => string;
}

export const ShoppingCartContext = createContext({} as ShoppingCart);

const ShoppingCartProvider = ({ children }: any) => {

    const isBrowser = typeof window !== 'undefined';
    const SESSION_STORAGE = 'products';
    const SHIPPING_VALUE = 50;

    const addProduct = (product: Product) => {
        const products = getProducts();
        const findProduct = products.find(p => p._id === product._id);
        if(findProduct) return;
        products.push(product);
        if(isBrowser) {
            sessionStorage.setItem(SESSION_STORAGE, JSON.stringify(products));
        }
    }

    const getProducts = (): Product[] => {
        if(isBrowser) {
            const products = sessionStorage.getItem(SESSION_STORAGE);
            return products ? JSON.parse(products) : [];
        }
        return[];
    }

    const deleteProduct = (id: string) => {
        const products = getProducts();
        const newProductsList = products.filter(p => p._id !== id);
        if(isBrowser) {
            sessionStorage.setItem(SESSION_STORAGE, JSON.stringify(newProductsList));
        }   
    }

    const getTotalProducts = (): string => {
        const products = getProducts();
        const total = products.reduce((acc, cur) => acc + cur.price, 0);
        return new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL",}).format(total);
    }

    const getShippingValue = (): string => {
        return new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL",}).format(SHIPPING_VALUE);
    }

    const getTotalValue = (): string => {
        const products = getProducts();
        const total = products.reduce((acc, cur) => acc + cur.price, 0);
        return new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL",}).format(total + SHIPPING_VALUE);
    }

    return (
        <ShoppingCartContext.Provider value={{ addProduct, getProducts, deleteProduct, getTotalProducts, getShippingValue, getTotalValue }}>
            { children }
        </ShoppingCartContext.Provider>
    )
};

export default ShoppingCartProvider;