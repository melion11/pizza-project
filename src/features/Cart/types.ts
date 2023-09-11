export type CartInitialState = {
    items: PizzaItem[]
    totalPrice: number
}

export type PizzaItem = {
    id: string,
    imageUrl: string,
    title: string,
    type: string,
    size: number,
    price: number,
    count: number
}