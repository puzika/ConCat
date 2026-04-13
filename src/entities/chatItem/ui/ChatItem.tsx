import * as S from './ChatItem.styles';
import { Avatar } from '../../../shared/ui/avatar/Avatar';

type ChatItemProps = {
  chatname: string,
  mostRecentMsg?: string,
  chatId: number,
}

export const ChatItem = ({ chatname, mostRecentMsg, chatId }: ChatItemProps) => {
  return (
    <S.ChatItem to={`/chat/${chatId}`}>
      <Avatar />
      <S.ChatItemDescription>
        <S.ChatItemName>{ chatname }</S.ChatItemName>
        <S.ChatItemLastMessage>{ mostRecentMsg || "No messages here yet" }</S.ChatItemLastMessage>
      </S.ChatItemDescription>
    </S.ChatItem>
  );
}