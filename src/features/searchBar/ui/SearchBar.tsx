import { type SetStateAction, type Dispatch } from 'react';
import { RxCross2 } from 'react-icons/rx';
import * as S from './SearchBar.styles';

type SearchBarProps = {
  searchTerm: string,
  searchTermSetter: Dispatch<SetStateAction<string>>
}

export const SearchBar = ({ searchTerm, searchTermSetter }: SearchBarProps) => {
  return (
    <S.SearchForm>
      <S.SearchBar
        value={searchTerm}
        onChange={e => searchTermSetter(e.target.value)}
        type="text" 
        placeholder="Search"
      />
      <S.SearchClearBtn aria-label='clear-field button' type="button">
        <RxCross2 />
      </S.SearchClearBtn>
    </S.SearchForm>
  )
}