import { useAppDispatch, useAppSelector } from '../../../shared/lib/store';
import { closePopup, openPopup, selectPopupName } from '../../../shared/model/popupSlice';
import { selectUsername } from '../../../entities/user';
import { Avatar } from '../../../shared/ui/avatar/Avatar';
import { RiAccountCircleLine as EditProfileIcon } from 'react-icons/ri';
import { PiSignIn as SigninIcon } from 'react-icons/pi';
import { IoIosAddCircleOutline as NewAccountIcon } from "react-icons/io";
import { Overlay } from '../../../shared/ui/overlay/Overlay';
import { useLogout } from '../api/useLogout';
import * as S from './PopupSidebar.styles';

export const PopupSidebar = () => {
  const dispatch = useAppDispatch();
  const popupName = useAppSelector(selectPopupName);
  const username = useAppSelector(selectUsername);
  const { mutate } = useLogout();

  const handleClickOverlay = () => {
    dispatch(closePopup());
  }

  const handleClickEditProfile = () => {
    dispatch(openPopup('profile'));
  }

  const handleClickLogout = () => {
    mutate();
  }

  return (
    <>
      <Overlay isShown={popupName === 'sidebar'} clickHandler={handleClickOverlay} />
      <S.PopupSidebar $isOpen={popupName === 'sidebar'}>
        <S.PopupSidebarUserData>
          <Avatar name={username} size={5} />
          <p>{username}</p>
        </S.PopupSidebarUserData>
        <S.PopupSidebarList>
          <S.PopupSidebarItem onClick={handleClickEditProfile}>
            <S.PopupSidebarItemContent>
              <S.PopupSidebarIconContainer>
                <EditProfileIcon />
              </S.PopupSidebarIconContainer>
              <span>
                Edit profile
              </span>
            </S.PopupSidebarItemContent>
          </S.PopupSidebarItem>
          <S.PopupSidebarItem>
            <S.PopupSidebarLink to={'/auth/signup'}>
              <S.PopupSidebarItemContent>
                <S.PopupSidebarIconContainer>
                  <NewAccountIcon />
                </S.PopupSidebarIconContainer>
                <span>Create new account</span>
              </S.PopupSidebarItemContent>
            </S.PopupSidebarLink>
          </S.PopupSidebarItem>
          <S.PopupSidebarItem>
            <S.PopupSidebarLink to={'/auth/signin'}>
              <S.PopupSidebarItemContent>
                <S.PopupSidebarIconContainer>
                  <SigninIcon />
                </S.PopupSidebarIconContainer>
                <span>Sign in</span>
              </S.PopupSidebarItemContent>
            </S.PopupSidebarLink>
          </S.PopupSidebarItem>
          <S.PopupSidebarItem onClick={handleClickLogout}>
            <S.PopupSidebarLogoutWrapper>
              <S.PopupSidebarItemContent>
                <S.PopupSidebarLogoutIconContainer>
                  <S.PopupSidebarIconContainer>
                    <SigninIcon />
                  </S.PopupSidebarIconContainer>
                </S.PopupSidebarLogoutIconContainer>
                <span>Logout</span>
              </S.PopupSidebarItemContent>
            </S.PopupSidebarLogoutWrapper>
          </S.PopupSidebarItem>
        </S.PopupSidebarList>
      </S.PopupSidebar>
    </>
  )
}