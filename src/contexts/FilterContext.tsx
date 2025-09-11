'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import { TransactionFilter } from '@/types/transaction.types';

interface FilterContextType {
  filters: TransactionFilter;
  setFilters: (filters: TransactionFilter) => void;
  updateFilter: (key: keyof TransactionFilter, value: any) => void;
  clearFilters: () => void;
  hasFilters: boolean;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [filters, setFilters] = useState<TransactionFilter>({});

  const updateFilter = (key: keyof TransactionFilter, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined // Remove se valor for null/undefined
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const hasFilters = Object.keys(filters).some(key => 
    filters[key as keyof TransactionFilter] !== undefined
  );

  return (
    <FilterContext.Provider value={{ filters, setFilters, updateFilter, clearFilters, hasFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}