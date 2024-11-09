import transactions from "@/@fake-db/list.json"
import { TransactionModel } from "@/modules/reports/types"
import { NextRequest, NextResponse } from "next/server"

// Define a type for sortable fields
type SortableTransactionFields = "amount" | "price" | "timestamp"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const asset = searchParams.get("asset")
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")
  const sortBy = searchParams.get("sortBy") as SortableTransactionFields
  const order = (searchParams.get("order") ?? "asc") as "asc" | "desc"
  const page = parseInt(searchParams.get("page") ?? "1", 10)
  const limit = parseInt(searchParams.get("take") ?? "5", 10)

  // Filter by transaction type, asset, and date range
  let filteredTransactions = transactions
  if (type) {
    filteredTransactions = filteredTransactions.filter((t) => t.type === type)
  }
  if (asset) {
    filteredTransactions = filteredTransactions.filter((t) => t.asset === asset)
  }
  if (startDate || endDate) {
    const start = startDate ? new Date(startDate) : new Date("2000-01-01")
    const end = endDate ? new Date(endDate) : new Date()
    filteredTransactions = filteredTransactions.filter((t) => {
      const timestamp = new Date(t.timestamp)
      return timestamp >= start && timestamp <= end
    })
  }

  // Sorting based on fields like amount, price, or timestamp
  if (sortBy) {
    filteredTransactions = filteredTransactions.sort((a, b) => {
      if (order === "asc") return a[sortBy] > b[sortBy] ? 1 : -1
      return a[sortBy] < b[sortBy] ? 1 : -1
    })
  }

  // Pagination
  const startIndex = (page - 1) * limit
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + limit
  )
  const itemCount = filteredTransactions.length
  const pageCount = Math.ceil(itemCount / limit)

  // Create the pagination response model
  const pagination: PaginationResponseModel = {
    hasNextPage: page < pageCount,
    hasPreviousPage: page > 1,
    itemCount,
    page,
    pageCount,
    take: limit,
  }

  // API response format
  const response: ApiResponses<{
    data: TransactionModel[]
    pagination: PaginationResponseModel
  }> = {
    success: true,
    message: "Transactions retrieved successfully",
    payload: {
      data: paginatedTransactions,
      pagination,
    },
  }

  // Return the formatted response
  return NextResponse.json(response)
}
