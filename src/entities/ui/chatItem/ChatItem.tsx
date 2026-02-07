import { Avatar } from '../../../shared/ui/avatar/Avatar';
import * as S from './ChatItem.styles';

export const ChatItem = () => {
  return (
    <S.ChatItem>
      <Avatar />
      <S.ChatItemDescription>
        <S.ChatItemName>Some kind of chat</S.ChatItemName>
        <S.ChatItemLastMessage>Most recent message in chat</S.ChatItemLastMessage>
      </S.ChatItemDescription>
    </S.ChatItem>
  );
}