import { useAuth } from '@/contexts/AuthContext';
import { NavItem } from '@/types/navItems.types';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: DashboardOutlinedIcon },
];

export const footerNavItems: NavItem[] = [
  { label: 'Logout',  icon: LogoutOutlinedIcon, onClick: () => { useAuth().logout(); } },
];
