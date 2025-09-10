import { NavItem } from '@/types/navItems.types';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export const navItems: NavItem[] = [
  { label: 'Home', href: '/home', icon: HomeOutlinedIcon },
  { label: 'Dashboard', href: '/dashboard', icon: DashboardOutlinedIcon },
];

export const footerNavItems: NavItem[] = [
  { label: 'Logout',  icon: LogoutOutlinedIcon },
];
