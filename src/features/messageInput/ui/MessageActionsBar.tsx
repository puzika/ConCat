import { RxCross2 } from 'react-icons/rx';
import { RiEditLine, RiReplyLine } from "react-icons/ri";
import { useAppDispatch } from '../../../shared/lib/store';
import { setMessageState } from '../../../entities/message/model/messageSlice';
import * as S from './MessageActionBar.styles';

type MessageActionBarProps = {
  action: 'reply' | 'edit' | 'regular',
  content?: string,
}

export const MessageActionBar = ({ action, content }: MessageActionBarProps) => {
  const dispatch = useAppDispatch();

  if (action === 'regular') return <></>;

  const handleCancel = () => {
    dispatch(setMessageState({
      messageId: null,
      messageStatus: 'regular',
      messageContent: '',
    }))
  }

  return (
    <S.MessageActionBar>
      <S.MessageActionIcon>
        { action === 'edit' ? <RiEditLine /> : <RiReplyLine /> }
      </S.MessageActionIcon>
      <S.MessageActionDetails>
        <S.MessageActionType>{action}</S.MessageActionType>
        <S.MessageActionText>{content}</S.MessageActionText>
      </S.MessageActionDetails>
      <S.MessageActionCancel onClick={handleCancel} aria-label='cancel-message-action button' type='button'>
        <RxCross2 />
      </S.MessageActionCancel>
    </S.MessageActionBar>
  )
}