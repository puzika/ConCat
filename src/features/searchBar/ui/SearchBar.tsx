import { RxCross2 } from 'react-icons/rx';
import * as S from './SearchBar.styles';

export const SearchBar = () => {
  return (
    <S.SearchForm>
      <S.SearchBar type="text" placeholder="Search" />
      <S.SearchClearBtn aria-label='clear-field button' type="button">
        <RxCross2 />
      </S.SearchClearBtn>
    </S.SearchForm>
  )
}