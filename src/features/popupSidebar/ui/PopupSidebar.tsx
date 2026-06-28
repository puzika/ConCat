import { useAppDispatch, useAppSelector } from '../../../shared/lib/store';
import { closePopup, selectPopupIsOpen } from '../../../shared/model/popupSlice';
import { selectUsername } from '../../../entities/user';
import { Avatar } from '../../../shared/ui/avatar/Avatar';
import { RiAccountCircleLine as EditProfileIcon } from 'react-icons/ri';
import { PiSignIn as SigninIcon } from 'react-icons/pi';
import { IoIosAddCircleOutline as NewAccountIcon } from "react-icons/io";
import { Overlay } from '../../../shared/ui/overlay/Overlay';
import * as S from './PopupSidebar.styles';

export const PopupSidebar = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectPopupIsOpen);
  const username = useAppSelector(selectUsername);

  const handleClickOverlay = () => {
    dispatch(closePopup());
  }

  return (
    <>
      <Overlay isShown={isOpen} clickHandler={handleClickOverlay} />
      <S.PopupSidebar $isOpen={isOpen}>
        <S.PopupSidebarUserData>
          <Avatar name={username} size={5} />
          <p>{username}</p>
        </S.PopupSidebarUserData>
        <S.PopupSidebarList>
          <S.PopupSidebarItem>
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
          <S.PopupSidebarItem>
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