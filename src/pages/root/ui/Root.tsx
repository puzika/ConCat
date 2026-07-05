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
import { Profile } from "../../../features/profile";
import { ErrorMessage } from "../../../shared/ui/errorMessage/ErrorMessage";
import * as S from './Root.styles';

export const RootPage = () => {
  const { data, isPending, isSuccess, isError, error } = useCurrentUser();
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

  if (isError) {
    return (
      <S.RootFallback>
        <ErrorMessage 
          size={3} 
          message={`Oops! something went wrong. ${error.message}`}
        />
      </S.RootFallback>
    )
  }
  
  if (isSuccess) return (
    <S.Root>
      <PopupSidebar />
      <Profile />
      <Sidebar />
      <Outlet />
    </S.Root>
  )

  if (isPending) return (
    <S.RootFallback>
      <Spinner />
      <p>Loading. Please wait...</p>
    </S.RootFallback>
  )

  return (
    <></>
  )
}