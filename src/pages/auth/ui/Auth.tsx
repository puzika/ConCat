import { Outlet } from 'react-router-dom';
import { Logo } from '../../../shared/ui/logo/Logo';
import * as S from './Auth.styles';

export const AuthPage = () => {
  return (
    <S.Auth>
      <Logo />
      <Outlet />
    </S.Auth>
  )
}