import { useRef, useState, Suspense } from 'react';
import { useDebouncedValue } from '@tanstack/react-pacer';
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { ChatItem } from '../../../entities/chatItem';
import { SearchBar } from '../../../features/searchBar';
import { ScrollBtn } from '../../../features/scrollBtn';
import { Spinner } from '../../../shared/ui/spinner/Spinner';
import { ErrorMessage } from '../../../shared/ui/errorMessage/ErrorMessage';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { handleScrollUp } from '../../../shared/lib/utils/handlers';
import { useChatList } from '../api/chatList.query';
import { useAppSelector } from '../../../shared/lib/store';
import { selectUserId } from '../../../entities/user';
import { AxiosError } from 'axios';
import * as S from './Sidebar.styles';

const Chats = () => {
  const id = useAppSelector(selectUserId) ?? -1;
  const { data } = useChatList(id);
  const scrollTargetRef = useRef<HTMLUListElement>(null);
  const [scrollBtnVisible, setScrollBtnVisible] = useState<boolean>(false);

  const chats = data.map(({ participant_one, participant_two, id: chatId }) => {
    const user = participant_one.id !== id ? participant_one : participant_two;

    return (
      <li key={user.id}>
        <ChatItem
          chatId={chatId}
          chatname={ user.username }
          mostRecentMsg='Most recent message in the chat'
        />
      </li>
    )
  });

  return (
    <>
      <S.SidebarChats
        data-testid="sidebar-chats"
        ref={scrollTargetRef}
        onScroll={handleScrollUp.bind(null, scrollTargetRef, setScrollBtnVisible)}
      >
        { chats }
      </S.SidebarChats>
      <ScrollBtn 
        direction='up' 
        targetRef={scrollTargetRef}
        visible={scrollBtnVisible}
      />
    </>
  )
}

export const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, { wait: 300 });

  const handleError = ({ error, resetErrorBoundary }: FallbackProps) => {
    if (error instanceof AxiosError) return (
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
      </S.SidebarChatsContainer>
    </S.Sidebar>
  )
}
