import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../../widgets/sidebar";
import { useCurrentUser } from "../api/current-user.query";
import { Spinner } from "../../../shared/ui/spinner/Spinner";
import { useAppDispatch } from "../../../shared/lib/store";
import { updateUserInfo } from "../../../entities/user";
import { SESSION_EXPIRED_EVENT } from "../../../shared/config/axios.api";
import { PopupSidebar } from "../../../features/popupSidebar";
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
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToSignin = () => navigate('/auth/signin');
    window.addEventListener(SESSION_EXPIRED_EVENT, redirectToSignin);

    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, redirectToSignin);
    }
  }, [navigate]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(updateUserInfo(data));
    }
  }, [dispatch, isSuccess, data]);
  
  if (isSuccess) return (
    <S.Root>
      <PopupSidebar />
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