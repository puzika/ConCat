import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../../widgets/sidebar";
import { useCurrentUser } from "../api/current-user.query";
import { Spinner } from "../../../shared/ui/spinner/Spinner";
import { useAppDispatch } from "../../../shared/lib/store";
import { updateUserInfo } from "../../../entities/user";
import * as S from './Root.styles';

const Fallback = () => {
  return (
    <S.RootFallback>
      <Spinner />
      <p>Loading. Please wait...</p>
    </S.RootFallback>
  )
}

export const RootPage = () => {
  const { data, isPending, isSuccess } = useCurrentUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(updateUserInfo(data));
    }
  }, [dispatch, isSuccess, data]);
  
  if (isSuccess) return (
    <S.Root>
      <Sidebar />
      <Outlet />
    </S.Root>
  )

  if (isPending) return (
    <Fallback />
  )

  return (
    <></>
  )
}