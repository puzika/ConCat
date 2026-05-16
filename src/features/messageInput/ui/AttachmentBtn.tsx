import { GrAttachment as AttachmentIcon } from 'react-icons/gr';
import * as S from './AttachmentBtn.styles';

export const AttachmentBtn = () => {
  return (
    <S.AttachmentBtn
      type="button"
      aria-label='attachment button'
    >
      <AttachmentIcon />
    </S.AttachmentBtn>
  )
}