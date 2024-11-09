import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { getTransactions } from "../../services/api"
import { QK } from "../constants/query-keys"
import { GetTransactionParamsModel } from "../../types"

const useGetTransactions = (params?: GetTransactionParamsModel) => {
  return useQuery({
    queryKey: [QK.GET_TRANSACTIONS, params],
    queryFn: () => getTransactions(params),
    // placeholderData: keepPreviousData,
  })
}

export default useGetTransactions
