import { useRef, useState } from 'react';
import { SearchBar } from '../../../features/ui';
import { ChatItem } from '../../../entities/ui';
import { ScrollBtn } from '../../../features/ui';
import * as S from './Sidebar.styles';

export const Sidebar = () => {
  console.log('re-rendered sidebar');

  const scrollTargetRef = useRef<HTMLUListElement>(null);
  const [scrollBtnVisible, setScrollBtnVisible] = useState<boolean>(false);

  const handleScroll = () => {
    const target = scrollTargetRef.current;

    if (!target) return;

    const height = target.offsetHeight;
    const scrolled = target.scrollTop;
    const shouldBeVisible = scrolled > height / 2;

    setScrollBtnVisible(shouldBeVisible);
  }

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
        onScroll={handleScroll}
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
