import { SearchBar } from '../../../features/ui';
import { ChatItem } from '../../../entities/ui';
import { ScrollBtn } from '../../../features/ui';
import * as S from './Sidebar.styles';

export const Sidebar = () => {
  const chats = [];

  for (let i = 0; i < 100; i++) {
    chats.push(<li><ChatItem /></li>);
  }

  return (
    <S.Sidebar>
      <S.SidebarHeader>
        <SearchBar />
      </S.SidebarHeader>
      <S.SidebarChats>
        { chats }
      </S.SidebarChats>
      <ScrollBtn direction='up' />
    </S.Sidebar>
  )
}
