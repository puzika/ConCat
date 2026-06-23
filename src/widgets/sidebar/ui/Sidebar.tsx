import { useRef, useState, Suspense, type ReactNode } from 'react';
import { useDebouncedValue } from '@tanstack/react-pacer';
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { OldChatItem, NewChatItem } from '../../../entities/chatItem';
import { SearchBar } from '../../../features/searchBar';
import { ScrollBtn } from '../../../features/scrollBtn';
import { Spinner } from '../../../shared/ui/spinner/Spinner';
import { ErrorMessage } from '../../../shared/ui/errorMessage/ErrorMessage';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { handleScrollUp } from '../../../shared/lib/utils/handlers';
import { useChatList } from '../api/chatList.query';
import { useAppSelector } from '../../../shared/lib/store';
import { selectUserId } from '../../../entities/user';
import { selectIsActive } from '../model/search.slice';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { useUsers } from '../api/usersList.query';
import { formatTime } from '../../../shared/lib/utils/timeFormatter';
import * as S from './Sidebar.styles';
import { useNewChat } from '../api/useNewChat';

type SidebarItemListProps = {
  children?: ReactNode | ReactNode[]
}

const SidebarItemList = ({ children }: SidebarItemListProps) => {
  const scrollTargetRef = useRef<HTMLUListElement>(null);
  const [scrollBtnVisible, setScrollBtnVisible] = useState<boolean>(false);

  return (
    <>
      <S.SidebarChats
        data-testid="sidebar-chats"
        ref={scrollTargetRef}
        onScroll={handleScrollUp.bind(null, scrollTargetRef, setScrollBtnVisible)}
      >
        { children }
      </S.SidebarChats>
      <ScrollBtn 
        direction='up' 
        targetRef={scrollTargetRef}
        visible={scrollBtnVisible}
      />
    </>
  )
}

const Chats = () => {
  const id = useAppSelector(selectUserId) ?? -1;
  const { data } = useChatList(id);

  const chats = data.map(({ participant_one, participant_two, id: chatId }) => {
    const { id: userId, username, is_online, last_seen} = participant_one.id !== id ? participant_one : participant_two;
    const formattedTime = formatTime(last_seen);

    return (
      <li key={`chat-user-${userId}`}>
        <OldChatItem
          chatId={chatId}
          targetUserId={userId ?? -1}
          currUserId={id}
          chatname={ username }
          mostRecentMsg={ is_online ? 'Online' : `last seen ${formattedTime || 'recently'}` }
        />
      </li>
    )
  });

  return (
    <SidebarItemList>{ chats }</SidebarItemList>
  )
}

type SearchResultsProps = {
  debouncedSearchTerm: string
}

const SearchResults = ({ debouncedSearchTerm }: SearchResultsProps) => {
  const { data } = useUsers(debouncedSearchTerm);
  const userId = useAppSelector(selectUserId);

  if (!data) return (
    <></>
  );

  const chats = data.map(({ username, id, last_seen, is_online }) => {
    const formattedTime = formatTime(last_seen);

    return (
      <li key={`search-user-${id}`}>
        <NewChatItem
          currUserId={userId ?? -1}
          targetUserId={id ?? -1}
          chatname={ username }
          mostRecentMsg={ is_online ? 'Online' : `last seen ${formattedTime || 'recently'}` }
        />
      </li>
    )
  });

  return (
    <>
      <SidebarItemList>{ chats }</SidebarItemList>
    </>
  )
}

export const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, { wait: 300 });
  const isActive = useAppSelector(selectIsActive);
  useNewChat();

  const handleError = ({ error, resetErrorBoundary }: FallbackProps) => {
    if (error instanceof AxiosError) return (
      <ErrorMessage 
        message={error.response?.data ?? error.message}
        reset={resetErrorBoundary}
      />
    )

    if (error instanceof ZodError) return (
      <ErrorMessage 
        message={error.message}
        reset={resetErrorBoundary}
      />
    )

    return (
      <ErrorMessage 
        message={"Something went wrong"}
        reset={resetErrorBoundary}
      />
    )
  }

  return (
    <S.Sidebar>
      <S.SidebarHeader>
        <SearchBar 
          searchTerm={searchTerm} 
          searchTermSetter={setSearchTerm}
        />
      </S.SidebarHeader>
      <S.SidebarChatsContainer>
        {
          isActive ? (
            <SearchResults debouncedSearchTerm={debouncedSearchTerm}/>
          ) : (
            <QueryErrorResetBoundary>
              {({ reset }) => (
                <ErrorBoundary 
                  onReset={reset}
                  fallbackRender={handleError}
                >
                  <Suspense fallback={
                    <>
                      <Spinner/>
                      <p>...Loading your chats</p>
                    </>
                  }>
                    <Chats />
                  </Suspense>
                </ErrorBoundary>
              )}
            </QueryErrorResetBoundary>
          )
        }
      </S.SidebarChatsContainer>
    </S.Sidebar>
  )
}
