export interface TransactionModel {
  type: string
  transaction_id: string
  asset: string
  amount: number
  price: number
  timestamp: string
}

export type TransactionResponseModel = ApiResponses<{
  data: TransactionModel[]
  meta: PaginationResponseModel
}>

export interface GetTransactionParamsModel {
  page: number
  take: number
  name?: string
  order: "ASC" | "DESC"
  orderBy: "date" | "name"
}
