import { type RefObject } from 'react';
import { type MessageAction } from '../model/messageActions';
import * as S from './MessageActions.styles';

type MessageActionsProps = {
  actions: MessageAction[],
  ref: RefObject<HTMLUListElement | null>
}

export const MessageActions = ({ ref, actions }: MessageActionsProps) => {

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