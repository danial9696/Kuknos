import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"

export const Columns: GridColDef[] = [
  { field: "transaction_id", headerName: "Transaction ID", width: 150 },
  { field: "type", headerName: "Type", width: 100 },
  { field: "asset", headerName: "Asset", width: 100 },
  { field: "amount", headerName: "Amount", width: 130 },
  { field: "price", headerName: "Price", width: 130 },
  { field: "timestamp", headerName: "Timestamp", width: 200 },
]
