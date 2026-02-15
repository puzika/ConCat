import { Outlet } from 'react-router-dom';
import * as S from './Auth.styles';

export const AuthPage = () => {
  return (
    <S.Auth>
      <Outlet />
    </S.Auth>
  )
}