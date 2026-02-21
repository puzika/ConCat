import { useRef, useState } from 'react';
import { ChatItem } from '../../../entities/chatItem';
import { SearchBar } from '../../../features/searchBar';
import { ScrollBtn } from '../../../features/scrollBtn';
import { handleScrollUp } from '../../../shared/lib/utils/handlers';
import * as S from './Sidebar.styles';

export const Sidebar = () => {
  const scrollTargetRef = useRef<HTMLUListElement>(null);
  const [scrollBtnVisible, setScrollBtnVisible] = useState<boolean>(false);

  const chats = [];

  for (let i = 0; i < 50; i++) {
    chats.push(<li key={i}><ChatItem /></li>);
  }

  return (
    <S.Sidebar>
      <S.SidebarHeader>
        <SearchBar />
      </S.SidebarHeader>
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
    </S.Sidebar>
  )
}
