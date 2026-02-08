import { useRef, useState } from 'react';
import { SearchBar } from '../../../features/ui';
import { ChatItem } from '../../../entities/ui';
import { ScrollBtn } from '../../../features/ui';
import { handleScrollUp } from '../../../shared/lib/utils/handlers';
import * as S from './Sidebar.styles';

export const Sidebar = () => {
  const scrollTargetRef = useRef<HTMLUListElement>(null);
  const [scrollBtnVisible, setScrollBtnVisible] = useState<boolean>(false);

  const chats = [];

  for (let i = 0; i < 100; i++) {
    chats.push(<li key={i}><ChatItem /></li>);
  }

  return (
    <S.Sidebar>
      <S.SidebarHeader>
        <SearchBar />
      </S.SidebarHeader>
      <S.SidebarChats 
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
