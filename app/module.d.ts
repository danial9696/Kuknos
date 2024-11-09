export {}

declare global {
  export interface ApiResponses<T = null> {
    success: boolean
    message: string
    payload: T
  }

  export interface PaginationResponseModel {
    hasNextPage: boolean
    hasPreviousPage: boolean
    itemCount: number
    page: number
    pageCount: number
    take: number
  }
}
