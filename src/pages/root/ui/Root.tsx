import { Outlet } from "react-router-dom";
import { Sidebar } from "../../../widgets/sidebar";
import * as S from './Root.styles';

export const RootPage = () => {
  return (
    <S.Root>
      <Sidebar />
      <Outlet />
    </S.Root>
  )
}