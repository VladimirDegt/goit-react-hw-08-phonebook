import { AuthNav } from 'components/AuthNav/AuthNav';
import { useAuth } from 'components/hooks/useAuth';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { Navigation } from '../Navigation/Navigation';
import css from './AppBar.module.css';

export const AppBar = () => {
  const {isLoggetIn} = useAuth();

  return (
    <header className={css.header}>
      <Navigation />
      {isLoggetIn ? <UserMenu/> : <AuthNav/>}
    </header>
  );
};