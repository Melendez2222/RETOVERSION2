
export interface Product {
    id_Product: number;
    productName: string;
    productCode: string;
    price: number;
    stock: number;
    productActive?: boolean;
    category: string;
    createdAt: string;
    qty?: number;
}
export interface ProductUpdate {
    id_Product: number;
    productCode: string;
    productName: string;
    catProductId: number;
    price: number;
    stock: number;
    productActive?: boolean;
}
export interface Category{
    catProductId:number,
    catProductName:string,
    catProductActive?:boolean,
}
export interface Client {
    userId: number;
    userRucDni: string;
    userName: string;
    userAddress: string;
    userEmail: string;
    userPhone:number;
    userUsuario:string;
    userPassword:string;
    userActive?: boolean;
    createdAt: string;
    roleName:string;
    qty?: number;
}
    export interface logincredentials{
        token:string;
    }
export interface Loginuser{
    username:string;
    password:string;
}
export interface ClienteSeleccionado {
    rucdni: string;
    nombre: string;
    correo: string;
}
export interface Facturs {
    idFactura: number;
    numeroFactura: string;
    idCliente: string;
    subtotal: number;
    porcentajeIGV: 18;
    igv: number;
    total: number;
    items: any[];
}
export interface LoginModalProps {
    open: boolean;
    onClose: () => void;
}
export interface AuthProvProps {
    children: React.ReactNode;
}
export interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null
    login: (newToken: string, expirationDate: string) => void;
    logout: () => void;
    handle401:()=>void;
}

export interface ClientModalProps {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    client: Client | null;
}
export interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    product: Product | null;
}
export interface HeaderProps {
    cartItems: any[];
}
export interface HomeProps {
    addToCart: (product: Product) => void;
}
export interface CartProps {
    addToCart: (product: Product) => void;
    deleteQty: (product: Product) => void;
    decreaseQty: (product: Product) => void;
    cartItems: Product[];
}
export interface AseoProps {
    selectedIndex: string;
    products: Product[];
    addToCart: (product: Product) => void;
}
export interface CalzadoProps {
    selectedIndex: string;
    products: Product[];
    addToCart: (product: Product) => void;
}
export interface CamisaProps {
    selectedIndex: string;
    products: Product[];
    addToCart: (product: Product) => void;
}
export interface LimpiezaProps {
    selectedIndex: string;
    products: Product[];
    addToCart: (product: Product) => void;
}
export interface PantalonProps {
    selectedIndex: string;
    products: Product[];
    addToCart: (product: Product) => void;
}
export interface CategoriaProps {
    onSelectCategory: (cateName: string, index: number) => void;
}
export interface SubMenuAdmProps {
    onSelectMenu: (menu: string) => void;
}
export interface FacturaI {
    cliente_id: number;
    personal_id: number;
    subtotal: number;
    porcentaje_IGV: number;
}
export interface Detalle_Factura {
    factura_id: number;
    producto_id: number;
    cantidad: number;
}