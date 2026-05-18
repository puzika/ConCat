import { 
  RiReplyLine, 
  RiDeleteBin6Line,
  RiEditLine
} from "react-icons/ri";
import { type ReactNode } from "react";
import { MdContentCopy } from "react-icons/md";

type MessageAction = {
  description: string,
  img: ReactNode,
  action?: () => void
}

export const actions: MessageAction[] = [
  {
    description: "Reply",
    img: <RiReplyLine />,
  },
  {
    description: "Edit",
    img: <RiEditLine />,
  },
  {
    description: "Copy",
    img: <MdContentCopy />
  },
  {
    description: "Delete",
    img: <RiDeleteBin6Line />
  }
]