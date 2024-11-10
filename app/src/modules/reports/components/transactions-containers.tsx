import { Card } from "@mui/material"
import TransactionsGrid from "./transactions-grid"

const TransactionsContainers = () => {
  return (
    <Card className="container mx-auto p-4">
      <TransactionsGrid />
    </Card>
  )
}

export default TransactionsContainers
