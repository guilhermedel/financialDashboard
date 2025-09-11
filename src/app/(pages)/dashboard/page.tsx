import SummaryCards from "./_components/summaryCards/SummaryCards";
import { Grid } from "@mui/material";
import DepositWithdrawCard from "./_components/depositWithdrawCardByYear/DepositWithdrawCard";
import TotalBalanceCardByYear from "./_components/totalBalanceCardByYear/TotalBalanceCardByYear";
import { Filters } from "./_components/filters/Filters";

export default function DashboardPage() {
  return (
    <section>
      <Filters />
      <SummaryCards />
      <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
        <Grid size={{ lg: 6, sm: 12, xs: 12 }}>
          <DepositWithdrawCard />
        </Grid>
        <Grid size={{ lg: 6, sm: 12, xs: 12 }}>
          <TotalBalanceCardByYear />
        </Grid>
      </Grid>
    </section>
  );
}
