import { SearchBar } from '../../../features/ui';
import { ChatItem } from '../../../entities/ui';
import * as S from './Sidebar.styles';

export const Sidebar = () => {
  return (
    <S.Sidebar>
      <S.SidebarHeader>
        <SearchBar />
      </S.SidebarHeader>
      <div>
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </div>
    </S.Sidebar>
  )
}
