import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../../../widgets/sidebar";
import { useAppSelector} from "../../../shared/lib/store";
import { selectUsername } from "../../../entities/user";
import * as S from './Root.styles';

export const RootPage = () => {
  const username = useAppSelector(selectUsername);

  if (!username) return (
    <Navigate to="/auth/sign-in" />
  )

  return (
    username && (
      <S.Root>
        <Sidebar />
        <Outlet />
      </S.Root>
    )
  )
}