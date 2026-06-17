import { type SetStateAction, type Dispatch, useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useAppDispatch } from '../../../shared/lib/store';
import { setIsActive } from '../../../widgets/sidebar/model/search.slice';
import * as S from './SearchBar.styles';

type SearchBarProps = {
  searchTerm: string,
  searchTermSetter: Dispatch<SetStateAction<string>>
}

export const SearchBar = ({ searchTerm, searchTermSetter }: SearchBarProps) => {
  const dispatch = useAppDispatch();
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleFocus = () => {
    dispatch(setIsActive(true));
  }

  const handleBlur = () => {
    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) dispatch(setIsActive(false));
  }

  const handleClear = () => {
    searchTermSetter('');
    searchRef.current?.blur();
    dispatch(setIsActive(false));
  }

  return (
    <S.SearchForm>
      <S.SearchBar
        value={searchTerm}
        onChange={e => searchTermSetter(e.target.value)}
        type="text" 
        placeholder="Search"
        ref={searchRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <S.SearchClearBtn
        aria-label='clear-field button'
        type="button"
        onClick={handleClear}
      >
        <RxCross2 />
      </S.SearchClearBtn>
    </S.SearchForm>
  )
}