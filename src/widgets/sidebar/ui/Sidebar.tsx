import { useRef, useState, Suspense } from 'react';
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { ChatItem } from '../../../entities/chatItem';
import { SearchBar } from '../../../features/searchBar';
import { ScrollBtn } from '../../../features/scrollBtn';
import { Spinner } from '../../../shared/ui/spinner/Spinner';
import { ErrorMessage } from '../../../shared/ui/errorMessage/ErrorMessage';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { handleScrollUp } from '../../../shared/lib/utils/handlers';
import { useUsers } from '../../../shared/api/queries/users.query';
import { AxiosError } from 'axios';
import * as S from './Sidebar.styles';

const Chats = () => {
  const { data } = useUsers();
  const scrollTargetRef = useRef<HTMLUListElement>(null);
  const [scrollBtnVisible, setScrollBtnVisible] = useState<boolean>(false);

  const chats = data.map(user => (
    <li key={user.id}>
      <ChatItem
        chatname={ user.username }
        mostRecentMsg='Most recent message in the chat'
      />
    </li>
  ));

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
        <SearchBar />
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
