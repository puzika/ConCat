import { type RefObject } from 'react';
import { useParams } from 'react-router-dom';
import { type MessageAction } from '../model/messageActions';
import { useDeleteMessage } from '../api/delete.query';
import * as S from './MessageActions.styles';

type MessageActionsProps = {
  messageId: number,
  actions: MessageAction[],
  ref: RefObject<HTMLUListElement | null>
}

export const MessageActions = ({ ref, messageId, actions }: MessageActionsProps) => {
  const { chatId } = useParams();
  const formattedChatId = Number(chatId);

  return (
    <S.Actions ref={ref} popover="auto">
      {
        actions.map(({ desc, icon, actionHandler }) => (
          <S.ActionsItem onClick={actionHandler} key={crypto.randomUUID()}>
            <S.ActionsButton>
              <S.ActionsIcon>{ icon }</S.ActionsIcon>
              <span>{desc}</span>
            </S.ActionsButton>
          </S.ActionsItem>
        ))
      }
    </S.Actions>
  )
}