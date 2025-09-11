"use client";
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useState } from "react";
import LoadingContent from "../loading/LoadingContent";
import { useDistinctYears, useMonthlyData } from "../../hooks/useTransaction";

export default function DepositWithdrawCard() {
  const { data: years, loading: yearsLoading } = useDistinctYears();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const { data: transactionResponse, loading: dataLoading } =
    useMonthlyData(selectedYear);

  const loading = yearsLoading || dataLoading;

  const handleChange = (event: any) => {
    setSelectedYear(event.target.value);
  };

  const valueFormatter = (value: number | null) => {
    return value ? `R$ ${value.toLocaleString("pt-BR")}` : "R$ 0";
  };

  // Atualizar selectedYear quando years carregarem
  if (years.length > 0 && !selectedYear) {
    setSelectedYear(years[0]);
  }

  return (
    <Card>
      <CardHeader
        action={
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="year-select-label">Ano</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={selectedYear || ""}
              onChange={handleChange}
              disabled={yearsLoading}
            >
              {years.map((year: any) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
        title="Receitas x Despesas por ano"
        subheader="Evolução da relação entre receitas e despesas no ano selecionado"
      />
      <CardContent>
        <LoadingContent isLoading={loading}>
          {transactionResponse ? (
            <BarChart
              dataset={transactionResponse?.monthlyData || []}
              xAxis={[{ dataKey: "month" }]}
              series={[
                {
                  dataKey: "totalDeposit",
                  label: "Depósitos",
                  valueFormatter,
                  color: "#10B981",
                },
                {
                  dataKey: "totalWithdraw",
                  label: "Despesas",
                  valueFormatter,
                  color: "#EF4444",
                },
              ]}
              height={300}
              sx={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Typography>
              Nenhum dado disponível para o ano selecionado.
            </Typography>
          )}
        </LoadingContent>
      </CardContent>
    </Card>
  );
}
