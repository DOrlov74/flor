export interface Service {
    id: string;
    name: string;
    enName: string;
    img: string;
    content: string[];
    enContent: string[];
    list?: string[];
    enList?: string[];
    prices: Price[];
    duration: number;
}

export interface Price {
    address: string,
    price: number
}