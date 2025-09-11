'use client'

import { useState, useEffect } from 'react';
import { transactionService } from '@/services/transaction.services';
import { useFilters } from '@/contexts/FilterContext';
import {
  Transaction,
  TransactionsInfo,
  YearlyBalance,
  TransactionsDepositsWithdraw
} from '@/types/transaction.types';

// Hook para informações gerais das transações
export function useTransactionInfo() {
  const { filters } = useFilters();
  const [data, setData] = useState<TransactionsInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const result = await transactionService.getTransactionsInfo(filters);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filters]);


  return { data, loading, error };
}

// Hook para saldo anual
export function useYearlyBalance() {
  const { filters } = useFilters();
  const [data, setData] = useState<YearlyBalance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const result = await transactionService.getTransactionsBalanceByYear(filters);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filters]);

  return { data, loading, error };
}


// Hook para dados mensais de depósito/saque por ano
export function useMonthlyData(year: number | null) {
  const { filters } = useFilters();
  const [data, setData] = useState<TransactionsDepositsWithdraw | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (year !== null) {
      async function fetchData() {
        try {
          setLoading(true);
          setError(null);
          const result = await transactionService.getTransactionsDepositsWithdraw(year ?? 0, filters);
          setData(result);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Erro desconhecido');
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }
  }, [year, filters]);

  return { data, loading, error };
}

export function useFiltersData() {
  const { filters } = useFilters();
  const [data, setData] = useState<{
    accounts: string[];
    industries: string[];
    locations: string[];
  }>({
    accounts: [],
    industries: [],
    locations: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Buscar todos os dados distintos em paralelo
        const [accounts, industries, locations] = await Promise.all([
          transactionService.getDistinctsAccounts(),
          transactionService.getDistinctsIndustries(),
          transactionService.getDistinctsLocations()
        ]);

        setData({
          accounts,
          industries,
          locations
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filters]); // Recarrega quando filtros mudam

  return { data, loading, error };
}

// Hook para lista paginada de transações
export function useTransactions(limit: number = 10, offset: number = 0) {
  const { filters } = useFilters();
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const result = await transactionService.getTransactions(limit, offset, filters);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [limit, offset, filters]);

  return { data, loading, error };
}

// Hook para anos distintos
export function useDistinctYears() {
  const { filters } = useFilters();
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const result = await transactionService.getDistinctsYears(filters);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filters]);

  return { data, loading, error };
}

// Hook principal que combina todos os dados necessários para o dashboard
export function useDashboardData() {
  const transactionInfo = useTransactionInfo();
  const yearlyBalance = useYearlyBalance();
  const distinctYears = useDistinctYears();

  // Pega o primeiro ano disponível para dados mensais
  const currentYear = distinctYears.data[0] || new Date().getFullYear();
  const monthlyData = useMonthlyData(currentYear);

  const loading = transactionInfo.loading || yearlyBalance.loading ||
    distinctYears.loading || monthlyData.loading;

  const error = transactionInfo.error || yearlyBalance.error ||
    distinctYears.error || monthlyData.error;

  return {
    transactionInfo: transactionInfo.data,
    yearlyBalance: yearlyBalance.data,
    monthlyData: monthlyData.data,
    distinctYears: distinctYears.data,
    currentYear,
    loading,
    error
  };
}

// Hook para paginação avançada
export function usePaginatedTransactions(initialLimit: number = 10) {
  const { filters } = useFilters();
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(initialLimit);

  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const result = await transactionService.getTransactions(limit, offset, filters);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [limit, offset, filters]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const previousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  // Reset da página quando filtros mudam
  useEffect(() => {
    resetPage();
  }, [filters]);

  return {
    data,
    loading,
    error,
    currentPage,
    limit,
    goToPage,
    nextPage,
    previousPage,
    resetPage
  };
}