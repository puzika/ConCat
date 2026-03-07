import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../../widgets/sidebar";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../shared/lib/store";
import { selectUsername } from "../../../entities/user/model/user.slice";
import * as S from './Root.styles';

export const RootPage = () => {
  const username = useAppSelector(selectUsername);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) navigate('/auth/sign-in');
  }, []);

  return (
    username && (
      <S.Root>
        <Sidebar />
        <Outlet />
      </S.Root>
    )
  )
}