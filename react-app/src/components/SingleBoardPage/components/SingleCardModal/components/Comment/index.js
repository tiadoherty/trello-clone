import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleBoardThunk } from '../../../../../../store/boardReducer'
import { editCommentThunk, deleteCommentThunk } from '../../../../../../store/commentsReducer'
import './Comment.css'

function removeSpaces(str) {
    return str.replaceAll(' ', '').length
}

const Comment = ({ comment, cardId }) => {
    const dispatch = useDispatch()
    const boardId = useSelector(state => state.boards.singleBoard.id)
    const [isEditing, setIsEditing] = useState(false)
    const [editInput, setEditInput] = useState(comment.comment)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const errors = {};
        if (removeSpaces(editInput) === 0) errors["comment"] = "❗Characters are required"
        if (!editInput.length) errors["comment"] = "👋 Comment text required"
        setErrors(errors)
    }, [editInput])

    const handleEdit = async () => {
        if (Object.values(errors).length) return;
        const formData = new FormData()
        formData.append('comment', editInput)
        formData.append('card_id', cardId)

        console.log("Form Data gathered from create comment")
        for (let key of formData.entries()) {
            console.log(key[0] + ' ----> ' + key[1])
        }

        //TODO: no error handling yet
        await dispatch(editCommentThunk(formData, comment.id))
        setIsEditing(false)
    }

    const enableEditing = () => {
        setIsEditing(true)
    }

    const disableEditing = () => {
        setIsEditing(false)
        setEditInput(comment.comment)
    }

    const handleDelete = async () => {
        await dispatch(deleteCommentThunk(comment.id))
        // Refetch single board state so comment counts are updated
        dispatch(getSingleBoardThunk(boardId))
    }


    if (isEditing) {
        return (
            <div className='edit-comment'>
                <p className='edit-comment-header'>Edit comment below:</p>
                <input type='text' value={editInput} onChange={(e) => setEditInput(e.target.value)} className='comment-text-area' />
                {errors.comment && <p>{errors.comment}</p>}
                <div className='comment-buttons'>
                    <button className='comment-single-button' onClick={() => handleEdit()}>Update</button>
                    <button className='comment-single-button' onClick={() => disableEditing()}>Cancel</button>
                </div>
            </div>
        )
    }
    //TODO: number of comments is not updating on the single board page until refresh
    return (
        <div className='comment'>
            <p className='comment-author'>{comment.author.first_name}</p>
            <p className='comment-text' key={comment.id}>{comment.comment}</p>
            <div className='comment-buttons'>
                <button className='comment-single-button' onClick={() => enableEditing()}>Edit</button>
                <button className='comment-single-button' onClick={() => handleDelete()}>Delete</button>
            </div>
        </div>
    )
}

export default Comment
