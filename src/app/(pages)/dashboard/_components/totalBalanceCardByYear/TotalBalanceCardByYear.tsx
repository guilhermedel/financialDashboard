"use client";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { transactionService } from "@/services/transaction.services";
import LoadingContent from "../loading/LoadingContent";
import { YearlyBalance } from "@/types/transaction.types";
import { useYearlyBalance } from "../../hooks/useTransaction";

export default function TotalBalanceCardByYear() {
  const { data: yearlyBalances, loading } = useYearlyBalance();

  useEffect(() => {
    console.log("Yearly Balances:", yearlyBalances);
  }, [yearlyBalances]);

  const valueFormatter = (value: number | null) => {
    return value
      ? `R$ ${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : "R$ 0,00";
  };

  return (
    <Card>
      <CardHeader
        title="Saldo Total por Ano"
        subheader="Evolução do saldo ao longo dos anos"
      />
      <CardContent>
        <LoadingContent isLoading={loading}>
          {yearlyBalances.length > 0 ? (
            <LineChart
              dataset={yearlyBalances}
              xAxis={[
                {
                  dataKey: "year",
                  label: "Ano",
                  scaleType:"point"
                },
              ]}
              series={[
                {
                  dataKey: "totalBalance",
                  label: "Saldo Total",
                  curve: "linear",
                  valueFormatter,
                  color: "#8B5CF6",
                },
              ]}
              height={300}
              sx={{ width: "100%" }}
            />
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Nenhum dado encontrado
            </Typography>
          )}
        </LoadingContent>
      </CardContent>
    </Card>
  );
}
