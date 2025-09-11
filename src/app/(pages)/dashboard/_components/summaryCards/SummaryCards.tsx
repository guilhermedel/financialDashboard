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
import LoadingContent from "../../_components/loading/LoadingContent";
import { formatCurrency } from "@/lib/utils";
import { cardColors } from "@/config/theme.config";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { useTransactionInfo } from "../../hooks/useTransaction";
import { blue, purple } from "@mui/material/colors";

export default function SummaryCards() {
  const { data, loading } = useTransactionInfo();

  return (
    <Grid container spacing={2}>
      <Grid size={{ lg: 4, sm: 6, xs: 12 }}>
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
                {formatCurrency(data?.totalDeposit || 0)}
              </Typography>
            </CardContent>
          </LoadingContent>
        </Card>
      </Grid>
      <Grid size={{ lg: 4, sm: 6, xs: 12 }}>
        <Card>
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
                - {formatCurrency(data?.totalWithdraw || 0)}
              </Typography>
            </CardContent>
          </LoadingContent>
        </Card>
      </Grid>

      <Grid size={{ lg: 4, sm: 6, xs: 12 }}>
        <Card>
          <CardHeader
            title={
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Saldo total
              </Typography>
            }
            avatar={
              <Avatar
                sx={{ bgcolor: purple[500] }}
                aria-label="recipe"
              >
                <AccountBalanceWalletOutlinedIcon />
              </Avatar>
            }
          />
          <LoadingContent isLoading={loading}>
            <CardContent>
              <Typography
                variant="h6"
                color={
                  data?.totalBalance && data.totalBalance >= 0
                    ? "success.main"
                    : "error.main"
                }
                gutterBottom
              >
                {formatCurrency(data?.totalBalance || 0)}
              </Typography>
            </CardContent>
          </LoadingContent>
        </Card>
      </Grid>
    </Grid>
  );
}
