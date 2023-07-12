import { Comment } from '@prisma/client'
import { FC } from 'react'

interface CommentItemProps {
	comment: Comment
}

const CommentItem: FC<CommentItemProps> = ({ comment }) => {
	return <div>{comment.content}</div>
}

export default CommentItem
