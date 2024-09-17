
export interface Product {
    iD_PRODUCTO: number;
    nombre: string;
    codigo: string;
    precio: number;
    stock: number;
    activo?: boolean;
    categoria_pro_id: number;
    fecha_Creacion: string;
    qty?: number;
}
export interface Client {
    iD_CLIENTE: number;
    rucdni: string;
    nombre: string;
    direccion: string;
    correo: string;
    usuario: string;
    contraseña: string;
    activo?: boolean;
    fecha_Creacion: string;
    qty?: number;
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
    login: () => void;
    logout: () => void;
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
    selectedIndex: number;
    products: Product[];
    addToCart: (product: Product) => void;
}
export interface CalzadoProps {
    selectedIndex: number;
    products: Product[];
    addToCart: (product: Product) => void;
}
export interface CamisaProps {
    selectedIndex: number;
    products: Product[];
    addToCart: (product: Product) => void;
}
export interface LimpiezaProps {
    selectedIndex: number;
    products: Product[];
    addToCart: (product: Product) => void;
}
export interface PantalonProps {
    selectedIndex: number;
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