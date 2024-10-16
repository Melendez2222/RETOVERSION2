import { Product } from "../components/BODY/Interfaces";

const TOKEN_KEY = 'token';
const EXPIRES_KEY = 'expiration';
const CART_ITEMS_KEY = 'cartItems';
const USERNAME_KEY = 'username';
const PASSWORD_KEY = 'password';

export const setToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
    
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};
export const setUsernameLT = (token: string): void => {
    localStorage.setItem(USERNAME_KEY, token);
};

export const getUsernameLT = (): string | null => {
    
    return localStorage.getItem(USERNAME_KEY);
};

export const removeUsernameLT = (): void => {
    localStorage.removeItem(USERNAME_KEY);
};
export const setPasswordLT = (token: string): void => {
    localStorage.setItem(PASSWORD_KEY, token);
};

export const getPasswordLT = (): string | null => {
    
    return localStorage.getItem(PASSWORD_KEY);
};

export const removePasswordLT = (): void => {
    localStorage.removeItem(PASSWORD_KEY);
};
export const setExpires = (expiration: Date): void => {
    localStorage.setItem(EXPIRES_KEY, expiration.toISOString());
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

export const setCartItemStorage = (items: Product[]): void => {
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
};

export const getCartItemsStorage = (): Product[] => {
    return JSON.parse(localStorage.getItem(CART_ITEMS_KEY) || '[]');
};
export const clearCartItemStorage = (): void => {
    localStorage.removeItem(CART_ITEMS_KEY);
};