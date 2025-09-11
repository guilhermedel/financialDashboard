import { CircularProgress } from "@mui/material";

interface LoadingContentProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function LoadingContent({ children, isLoading }: LoadingContentProps) {
  return <>{isLoading ? <CircularProgress /> : children}</>;
}