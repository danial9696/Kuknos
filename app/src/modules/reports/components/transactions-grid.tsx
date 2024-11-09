import { useState } from "react"
import useGetTransactions from "../libs/hooks/useGetTransactions"
import { DataGrid, GridSortItem, GridSortModel } from "@mui/x-data-grid"
import { Columns } from "./transactions-cols"
import { ROWS_PER_PAGE } from "@/libs/constants"
import { GetTransactionParamsModel } from "../types"

const TransactionsGrid = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 15,
  })

  const [sort, setSort] = useState<GridSortItem>({
    sort: "desc",
    field: "date",
  })

  const handleSortModelChange = (model: GridSortModel) => {
    if (!model || !model[0]) return

    setPaginationModel({ page: 0, pageSize: paginationModel.pageSize })

    if (!model[0].field || !model[0].sort) {
      setSort({ sort: "desc", field: "date" })
    }

    setSort(model ? model[0] : { sort: "desc", field: "date" })
  }

  const params: GetTransactionParamsModel = {
    page: paginationModel.page + 1,
    take: paginationModel.pageSize,
    order: (sort.sort as "ASC" | "DESC") ?? "",
    orderBy:
      sort.field === "createdAt" ? "date" : (sort.field as "date" | "name"),
  }

  const { data, isFetching } = useGetTransactions(params)

  console.log("data", data)

  return (
    <DataGrid
      paginationMode="server"
      pagination
      columns={Columns}
      rows={data?.payload.data}
      rowCount={data?.payload?.meta?.pageCount ?? 1}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      onSortModelChange={handleSortModelChange}
      pageSizeOptions={ROWS_PER_PAGE}
      loading={isFetching}
      getRowId={(row) => row.transaction_id}
      slotProps={{
        baseButton: {
          variant: "outlined",
        },
      }}
    />
  )
}

export default TransactionsGrid
