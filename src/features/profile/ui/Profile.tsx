import { useAppSelector, useAppDispatch } from '../../../shared/lib/store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { selectUserState } from '../../../entities/user';
import { closePopup, selectPopupName } from '../../../shared/model/popupSlice';
import { Overlay } from '../../../shared/ui/overlay/Overlay';
import { Avatar } from '../../../shared/ui/avatar/Avatar';
import { Input } from '../../../shared/ui/input/Input';
import { profileSchema, type TProfileSchema } from '../model/profile.schema';
import { useEditProfile } from '../api/editProfile.query';
import * as S from './Profile.styles';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { username, email } = useAppSelector(selectUserState);
  const popupName = useAppSelector(selectPopupName);
  const { mutate } = useEditProfile();
  const { 
    handleSubmit, 
    register, 
    formState: { errors }
  } = useForm<TProfileSchema>({
    resolver: zodResolver(profileSchema),
    values: {
      username: username || '',
      email: email || '',
    }
  });

  const closeProfile = () => {
    dispatch(closePopup());
  }

  const submitHandler = async (profileBody: TProfileSchema) => {
    mutate(profileBody);
  }

  return (
    <>
      <Overlay clickHandler={closeProfile} isShown={popupName === 'profile'} />
      <S.Profile onSubmit={handleSubmit(submitHandler)} $isShown={popupName === 'profile'}>
        <Avatar size={5.5} name={username} />
        <Input 
          {...register('username')}
          placeholder="Username"
          error={errors.username}
        />
        <Input
          {...register('email')}
          placeholder="Email" 
          error={errors.email}
        />
        <S.ProfileActions>
          <S.ProfileAction onClick={closeProfile} type="button">Cancel</S.ProfileAction>
          <S.ProfileAction type="submit">Save</S.ProfileAction>
        </S.ProfileActions>
      </S.Profile>
    </>
  )
}