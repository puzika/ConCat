import type { RefObject } from 'react';
import { actions } from '../model/Actions';
import * as S from './MessageActions.styles';

type MessageActionsProps = {
  ref: RefObject<HTMLUListElement | null>
}

export const MessageActions = ({ref}: MessageActionsProps) => {
  return (
    <S.Actions ref={ref} popover="auto">
      {
        actions.map(({ description, img }) => (
          <S.ActionsItem key={crypto.randomUUID()}>
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