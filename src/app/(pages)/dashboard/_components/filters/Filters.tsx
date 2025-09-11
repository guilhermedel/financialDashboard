'use client'

import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Box, 
  Chip, 
  Typography,
  Grid,
  Autocomplete
} from '@mui/material';
import { useState, useEffect } from 'react';
import { FilterList, Clear } from '@mui/icons-material';
import { useFilters } from '@/contexts/FilterContext';
import { useFiltersData } from '../../hooks/useTransaction';

export const Filters = () => {
  const { filters, updateFilter, clearFilters, hasFilters } = useFilters();
  const { data: filtersData, loading: filtersLoading } = useFiltersData();
  const [localFilters, setLocalFilters] = useState({
    state: filters.state || '',
    account: filters.account || '',
    industry: filters.industry || ''
  });

  // Sincronizar filtros locais com globais
  useEffect(() => {
    setLocalFilters({
      state: filters.state || '',
      account: filters.account || '',
      industry: filters.industry || ''
    });
  }, [filters]);

  const handleLocalChange = (field: string, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyFilters = () => {
    Object.entries(localFilters).forEach(([key, value]) => {
      updateFilter(key as keyof typeof localFilters, value || undefined);
    });
  };

  const handleClearFilters = () => {
    setLocalFilters({
      state: '',
      account: '',
      industry: ''
    });
    clearFilters();
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <Card sx={{ mb: 3, borderRadius: 2 }}>
      <CardContent>
        {/* Header dos Filtros */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          mb: 3
        }}>
          <FilterList color="primary" />
          <Typography variant="h6" component="div">
            Filtros
          </Typography>
          {activeFiltersCount > 0 && (
            <Chip 
              label={`${activeFiltersCount} ativo${activeFiltersCount > 1 ? 's' : ''}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </Box>

        {/* Filtros em linha */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Autocomplete
              options={filtersData.locations}
              value={localFilters.state || null}
              onChange={(_, newValue) => handleLocalChange('state', newValue || '')}
              loading={filtersLoading}
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Estado"
                  variant="outlined"
                  placeholder="Selecione um estado"
                  fullWidth
                />
              )}
              noOptionsText="Nenhum estado encontrado"
              clearText="Limpar"
              openText="Abrir"
              closeText="Fechar"
              disabled={filtersLoading}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Autocomplete
              options={filtersData.accounts}
              value={localFilters.account || null}
              onChange={(_, newValue) => handleLocalChange('account', newValue || '')}
              loading={filtersLoading}
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Conta"
                  variant="outlined"
                  placeholder="Selecione uma conta"
                  fullWidth
                />
              )}
              noOptionsText="Nenhuma conta encontrada"
              clearText="Limpar"
              openText="Abrir"
              closeText="Fechar"
              disabled={filtersLoading}
              freeSolo
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Autocomplete
              options={filtersData.industries}
              value={localFilters.industry || null}
              onChange={(_, newValue) => handleLocalChange('industry', newValue || '')}
              loading={filtersLoading}
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Indústria"
                  variant="outlined"
                  placeholder="Selecione uma indústria"
                  fullWidth
                />
              )}
              noOptionsText="Nenhuma indústria encontrada"
              clearText="Limpar"
              openText="Abrir"
              closeText="Fechar"
              disabled={filtersLoading}
              freeSolo
            />
          </Grid>
        </Grid>

        {/* Botões de ação */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button 
            variant="contained" 
            onClick={applyFilters}
            disabled={filtersLoading}
            sx={{ minWidth: 120 }}
          >
            Aplicar Filtros
          </Button>
          
          {hasFilters && (
            <Button 
              variant="outlined" 
              onClick={handleClearFilters}
              startIcon={<Clear />}
              color="secondary"
              sx={{ minWidth: 120 }}
            >
              Limpar Filtros
            </Button>
          )}
        </Box>

        {/* Chips dos Filtros Ativos */}
        {hasFilters && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {filters.state && (
              <Chip 
                label={`Estado: ${filters.state}`} 
                onDelete={() => updateFilter('state', undefined)}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            {filters.account && (
              <Chip 
                label={`Conta: ${filters.account}`} 
                onDelete={() => updateFilter('account', undefined)}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            {filters.industry && (
              <Chip 
                label={`Indústria: ${filters.industry}`} 
                onDelete={() => updateFilter('industry', undefined)}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
        )}

        {/* Loading indicator */}
        {filtersLoading && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Carregando opções de filtros...
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};