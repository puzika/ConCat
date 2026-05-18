import { type RefObject } from 'react';
import { useParams } from 'react-router-dom';
import { actions } from '../model/Actions';
import { useDeleteMessage } from '../api/delete.query';
import * as S from './MessageActions.styles';

type MessageActionsProps = {
  messageId: number,
  ref: RefObject<HTMLUListElement | null>
}

export const MessageActions = ({ref, messageId}: MessageActionsProps) => {
  const { chatId } = useParams();
  const formattedChatId = Number(chatId);
  const { mutate, isPending } = useDeleteMessage(formattedChatId);

  return (
    <S.Actions ref={ref} popover="auto">
      {
        actions.map(({ description, img }) => (
          <S.ActionsItem onClick={() => mutate(messageId)} key={crypto.randomUUID()}>
            <S.ActionsButton>
              <S.ActionsIcon>{ img }</S.ActionsIcon>
              <span>{description}</span>
            </S.ActionsButton>
          </S.ActionsItem>
        ))
      }
    </S.Actions>
  )
}