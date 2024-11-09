import axios from "@/services/api"
import { GetTransactionParamsModel, TransactionResponseModel } from "../types"
import { URLs } from "../libs/constants/urls"

export const getTransactions = async (params?: GetTransactionParamsModel) => {
  console.log("params", params)
  try {
    const res = await axios.get<TransactionResponseModel>(
      URLs.transactions.GET,
      {
        params,
      }
    )

    return res.data
  } catch (error) {
    console.log("Get transaction list error:", error)
    throw error
  }
}
