export type FilterInitialState = {
    searchPizza: string
    categories: CategoryType[]
    currentCategory: CategoryType
    sortTypes: SortType[]
    currentSortType: SortType
    order: Order
    totalCount: number
    currentPage: number
}

export enum SortBy {
    RATING ='rating',
    PRICE = 'price',
    TITLE = 'title',
}

export type SortType = {
    title: string
    sortBy: SortBy
}

export type CategoryType = {
    id: number
    title: string
}

export enum Order  {
    DESC = 'desc',
    ASC = 'asc'
}