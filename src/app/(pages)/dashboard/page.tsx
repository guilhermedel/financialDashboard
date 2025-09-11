"use client";

import { transactionService } from "@/services/transaction.services";
import { TransactionsInfo } from "@/types/transaction.types";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import LoadingContent from "./_components/loading/LoadingContent";
import { formatCurrency } from "@/lib/utils";
import { cardColors } from "@/config/theme.config";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';

export default function DashboardPage() {
  const [transactionResponse, setTransactionResponse] =
    useState<TransactionsInfo>({
      totalDeposit: 0,
      totalWithdraw: 0,
      totalBalance: 0,
      totalTransactions: 0,
    });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await transactionService.getTransactionsInfo();
    setTransactionResponse(data);
    setLoading(false);
  }

  return (
    <Grid container spacing={2}>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <Card>
          <CardHeader
            title={
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Total de receitas
              </Typography>
            }
            avatar={
              <Avatar
                sx={{ background: cardColors.green.background }}
                aria-label="recipe"
              >
                <TrendingUpOutlinedIcon />
              </Avatar>
            }
          />
          <LoadingContent isLoading={loading}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="success.main">
                {formatCurrency(transactionResponse.totalDeposit)}
              </Typography>
            </CardContent>
          </LoadingContent>
        </Card>
      </Grid>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <Card
        >
          <CardHeader
            title={
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Total de despesas
              </Typography>
            }
            avatar={
              <Avatar
                sx={{ background: cardColors.red.background }}
                aria-label="recipe"
              >
                <TrendingDownOutlinedIcon />
              </Avatar>
            }
          />
          <LoadingContent isLoading={loading}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="error.main">
                - {formatCurrency(transactionResponse.totalWithdraw)}
              </Typography>
            </CardContent>
          </LoadingContent>
        </Card>
      </Grid>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <Card>
          <CardHeader title="Receitas" />
          <LoadingContent isLoading={loading}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {formatCurrency(transactionResponse.totalDeposit)}
              </Typography>
            </CardContent>
          </LoadingContent>
        </Card>
      </Grid>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <Card>
          <CardHeader title="Saldo total" />
          <LoadingContent isLoading={loading}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {formatCurrency(transactionResponse.totalBalance)}
              </Typography>
            </CardContent>
          </LoadingContent>
        </Card>
      </Grid>
    </Grid>
  );
}
