export type Transaction = {
  date: number;
  amount: string;
  transaction_type: 'deposit' | 'withdraw';
  currency: string;
  account: string;
  industry: string;
  state: string;
}

export type TransactionFilter = {
  date?: Date;
  account?: string;
  industry?: string;
  state?: string;
}

export type TransactionsInfo = {
  totalDeposit: number;
  totalWithdraw: number;
  totalBalance: number;
  totalTransactions: number;
}

export type TransactionsDepositsWithdraw = {
  monthlyData: {month:string, totalDeposit: number; totalWithdraw: number }[];
}

export type YearlyBalance = {
  year: number;
  totalBalance: number;
}