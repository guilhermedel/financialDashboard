import { Transaction, TransactionFilter, TransactionsDepositsWithdraw, TransactionsInfo } from "@/types/transaction.types";

export const transactionService = {
    getTransactions: async (limit: number, offset: number, filters?: TransactionFilter): Promise<Transaction[]> => {
        const response = await fetch('/data/transactions.json');
        const data: Transaction[] = await response.json();
        console.log("data", data);

        // Apply filters if provided
        let filteredData = data;
        if (filters) {
            filteredData = data.filter(transaction => {
                // Filtro por estado
                if (filters.state && transaction.state !== filters.state) {
                    return false;
                }
                
                // Filtro por conta
                if (filters.account && transaction.account !== filters.account) {
                    return false;
                }
                
                // Filtro por indústria
                if (filters.industry && transaction.industry !== filters.industry) {
                    return false;
                }
                
                // Filtro por data
                if (filters.date && transaction.date) {
                    const transactionDate = new Date(transaction.date * 1000);
                    const filterDate = new Date(filters.date);
                    if (transactionDate.toDateString() !== filterDate.toDateString()) {
                        return false;
                    }
                }
                
                return true;
            });
        }

        // Apply pagination
        const startIndex = offset;
        const endIndex = startIndex + limit;
        return filteredData.slice(startIndex, endIndex);
    },

    getTransactionsInfo: async (filters?: TransactionFilter): Promise<TransactionsInfo> => {
        const response = await fetch('/data/transactions.json');
        let data: Transaction[] = await response.json();

        // Apply filters if provided
        if (filters) {
            data = data.filter(transaction => {
                if (filters.state && transaction.state !== filters.state) {
                    return false;
                }
                if (filters.account && transaction.account !== filters.account) {
                    return false;
                }
                if (filters.industry && transaction.industry !== filters.industry) {
                    return false;
                }
                if (filters.date && transaction.date) {
                    const transactionDate = new Date(transaction.date * 1000);
                    const filterDate = new Date(filters.date);
                    if (transactionDate.toDateString() !== filterDate.toDateString()) {
                        return false;
                    }
                }
                return true;
            });
        }

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
    },

    getDistinctsYears: async (filters?: TransactionFilter): Promise<number[]> => {
        const response = await fetch('/data/transactions.json');
        let data: Transaction[] = await response.json();

        // Apply filters if provided
        if (filters) {
            data = data.filter(transaction => {
                if (filters.state && transaction.state !== filters.state) {
                    return false;
                }
                if (filters.account && transaction.account !== filters.account) {
                    return false;
                }
                if (filters.industry && transaction.industry !== filters.industry) {
                    return false;
                }
                return true;
            });
        }

        const chunkSize = 1000;
        let years: any = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            chunk.forEach(transaction => {
                const transactionDate = new Date(transaction.date);
                years.push(transactionDate.getFullYear());
            });
        }
        return Array.from(new Set(years));
    },

    getTransactionsDepositsWithdraw: async (year: number, filters?: TransactionFilter): Promise<TransactionsDepositsWithdraw> => {
        const response = await fetch('/data/transactions.json');
        let data: Transaction[] = await response.json();

        // Apply filters if provided
        if (filters) {
            data = data.filter(transaction => {
                if (filters.state && transaction.state !== filters.state) {
                    return false;
                }
                if (filters.account && transaction.account !== filters.account) {
                    return false;
                }
                if (filters.industry && transaction.industry !== filters.industry) {
                    return false;
                }
                return true;
            });
        }

        const chunkSize = 1000;
        let totalDeposit = 0;
        let totalWithdraw = 0;
        const monthlyData = Array.from({ length: 12 }, (_, index) => ({
            month: new Date(0, index).toLocaleDateString('pt-BR', { month: 'short' }),
            totalDeposit: 0,
            totalWithdraw: 0
        }));

        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            chunk.forEach(transaction => {
                const transactionDate = new Date(transaction.date);

                if (transactionDate.getFullYear() === year) {
                    const month = transactionDate.getMonth();
                    const amount = +transaction.amount / 100;
                    if (transaction.transaction_type === 'withdraw') {
                        totalWithdraw += amount;
                        monthlyData[month].totalWithdraw += amount;
                    } else if (transaction.transaction_type === 'deposit') {
                        totalDeposit += amount;
                        monthlyData[month].totalDeposit += amount;
                    }
                }
            });
        }
        return {
            monthlyData
        };
    },

    getTransactionsBalanceByYear: async (filters?: TransactionFilter): Promise<{ year: number; totalBalance: number }[]> => {
        const response = await fetch('/data/transactions.json');
        let data: Transaction[] = await response.json();

        // Apply filters if provided
        if (filters) {
            data = data.filter(transaction => {
                if (filters.state && transaction.state !== filters.state) {
                    return false;
                }
                if (filters.account && transaction.account !== filters.account) {
                    return false;
                }
                if (filters.industry && transaction.industry !== filters.industry) {
                    return false;
                }
                return true;
            });
        }

        // Agrupar por ano
        const yearlyBalance = new Map<number, { totalDeposit: number; totalWithdraw: number }>();

        const chunkSize = 1000;
        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);

            chunk.forEach(transaction => {
                const transactionDate = new Date(transaction.date); // Converter timestamp para data
                const year = transactionDate.getFullYear();
                const amount = +transaction.amount / 100;

                // Inicializar ano se não existir
                if (!yearlyBalance.has(year)) {
                    yearlyBalance.set(year, { totalDeposit: 0, totalWithdraw: 0 });
                }

                const yearData = yearlyBalance.get(year)!;

                if (transaction.transaction_type === 'withdraw') {
                    yearData.totalWithdraw += amount;
                } else if (transaction.transaction_type === 'deposit') {
                    yearData.totalDeposit += amount;
                }
            });
        }

        // Converter para array e calcular saldo
        const result = Array.from(yearlyBalance.entries())
            .map(([year, data]) => ({
                year,
                totalBalance: data.totalDeposit - data.totalWithdraw
            }))
            .sort((a, b) => a.year - b.year); // Ordenar por ano

        return result;
    },

    // Novos métodos para dados dos filtros
    getDistinctsAccounts: async (): Promise<string[]> => {
        const response = await fetch('/data/transactions.json');
        const data: Transaction[] = await response.json();
        const accounts = Array.from(new Set(data.map(transaction => transaction.account).filter(Boolean))).sort();
        return accounts;
    },

    getDistinctsIndustries: async (): Promise<string[]> => {
        const response = await fetch('/data/transactions.json');
        const data: Transaction[] = await response.json();
        const industries = Array.from(new Set(data.map(transaction => transaction.industry).filter(Boolean))).sort();
        return industries;
    },

    getDistinctsLocations: async (): Promise<string[]> => {
        const response = await fetch('/data/transactions.json');
        const data: Transaction[] = await response.json();
        const locations = Array.from(new Set(data.map(transaction => transaction.state).filter(Boolean))).sort();
        return locations;
    },
}
