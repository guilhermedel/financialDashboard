import { Transaction, TransactionFilter, TransactionsInfo } from "@/types/transaction.types";

export const transactionService = {
    getTransactions: async (limit: number, offset: number, filters?: TransactionFilter): Promise<Transaction[]> => {
        const response = await fetch('/data/transactions.json');
        const data: Transaction[] = await response.json();
        console.log("data", data);
        
        // Apply filters if provided
        let filteredData = data;
        if (filters) {
            // Add filter logic here based on your TransactionFilter type
        }
        
        // Apply pagination
        const startIndex = offset;
        const endIndex = startIndex + limit;
        return filteredData.slice(startIndex, endIndex);
    },

    getTransactionsInfo: async (): Promise<TransactionsInfo> => {
        const response = await fetch('/data/transactions.json');
        const data: Transaction[] = await response.json();

        // Process data in chunks to calculate withdraw and deposit
        const chunkSize = 1000;
        let totalWithdraw = 0;
        let totalDeposit = 0;
        let totalBalance = 0;

        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            
            chunk.forEach(transaction => {
                const amount = +transaction.amount / 100;
                if (transaction.transaction_type === 'withdraw') {
                    totalWithdraw += amount;
                } else if (transaction.transaction_type === 'deposit') {
                    totalDeposit += amount;
                }
            });
        }
        totalBalance = totalDeposit - totalWithdraw;

        return {
            totalDeposit,
            totalWithdraw,
            totalBalance,
            totalTransactions: data.length
        };
    }
}
