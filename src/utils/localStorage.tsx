import { Product } from "../components/BODY/Interfaces";

const TOKEN_KEY = 'token';
const EXPIRES_KEY = 'expires';
const CART_ITEMS_KEY = 'cartItems';

export const setToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
    
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};

export const setExpires = (expires: Date): void => {
    localStorage.setItem(EXPIRES_KEY, expires.toISOString());
};

export const getExpires = (): Date | null => {
    const expires = localStorage.getItem(EXPIRES_KEY);
    return expires ? new Date(expires) : null;
};

export const removeExpires = (): void => {
    localStorage.removeItem(EXPIRES_KEY);
};

export const clearStorage = (): void => {
    localStorage.clear();
};

export const setCartItems = (items: Product[]): void => {
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
};

export const getCartItems = (): Product[] => {
    return JSON.parse(localStorage.getItem(CART_ITEMS_KEY) || '[]');
};