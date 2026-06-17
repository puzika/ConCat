import { Avatar } from '../../../shared/ui/avatar/Avatar';
import { useCreateChat } from '../api/createChat.query';
import { ErrorPopup } from '../../../shared/ui/errorPopup/ErrorPopup';
import * as S from './ChatItem.styles';

type OldChatItemProps = {
  chatId: number,
}

type NewChatItemProps = {
  currUserId: number,
  targetUserId: number,
}

type ChatItemProps = {
  chatname: string,
  mostRecentMsg: string,
}

const ChatItem = (props: ChatItemProps) => {
  const { chatname, mostRecentMsg } = props;

  return (
    <S.ChatItem>
      <Avatar />
      <S.ChatItemDescription>
        <S.ChatItemName>{ chatname }</S.ChatItemName>
        <S.ChatItemLastMessage>{ mostRecentMsg || "No messages here yet" }</S.ChatItemLastMessage>
      </S.ChatItemDescription>
    </S.ChatItem>
  )
}

export const OldChatItem = ({ chatId, ...props}: ChatItemProps & OldChatItemProps) => {
  return (
    <S.ChatItemOld to={`/chat/${chatId}`}>
      <ChatItem {...props} />
    </S.ChatItemOld>
  )
}

export const NewChatItem = (props: ChatItemProps & NewChatItemProps) => {
  const { currUserId, targetUserId } = props;
  const { mutate, error } = useCreateChat();

  return (
    <div onClick={() => mutate({ participant_one_id: currUserId, participant_two_id: targetUserId})}>
      <ErrorPopup errorMessage={error?.message} />
      <ChatItem {...props} />
    </div>
  )
}


