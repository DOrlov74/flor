export interface Service {
    id: string;
    name: string;
    img: string;
    content: string[];
    list?: string[];
    prices: Price[];
    duration: number;
}

export interface Price {
    address: string,
    price: number
}