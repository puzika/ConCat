import { useRef, useState, useEffect } from 'react';
import { SearchBar } from '../../../features/ui';
import { ChatItem } from '../../../entities/ui';
import { ScrollBtn } from '../../../features/ui';
import * as S from './Sidebar.styles';

export const Sidebar = () => {
  const scrollTargetRef = useRef<HTMLUListElement>(null);
  const [scrollTarget, setScrollTarget] = useState<HTMLUListElement | null>(null);

  useEffect(() => {
    setScrollTarget(scrollTargetRef.current);
  }, []);

  const chats = [];

  for (let i = 0; i < 100; i++) {
    chats.push(<li key={i}><ChatItem /></li>);
  }

  return (
    <S.Sidebar>
      <S.SidebarHeader>
        <SearchBar />
      </S.SidebarHeader>
      <S.SidebarChats ref={scrollTargetRef}>
        { chats }
      </S.SidebarChats>
      <ScrollBtn target={scrollTarget} direction='up' />
    </S.Sidebar>
  )
}
