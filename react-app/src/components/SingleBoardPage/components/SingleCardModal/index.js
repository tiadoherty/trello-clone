import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleBoardThunk } from '../../../../store/boardReducer'
import { getCommentsThunk, createCommentThunk } from '../../../../store/commentsReducer'
import Comment from './components/Comment'
import './SingleCard.css'

const dateChanger = (dateString) => {
    return dateString.slice(0, 17)
}

function removeSpaces(str) {
    return str.replaceAll(' ', '').length
}

const SingleCardModal = ({ card }) => {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comments.comments)
    const boardId = useSelector(state => state.boards.singleBoard.id)
    const commentsArray = Object.values(comments)
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        dispatch(getCommentsThunk(card.id))
    }, [dispatch])

    useEffect(() => {
        const errors = {};
        if (removeSpaces(comment) === 0) errors["comment"] = "❗Characters are required"
        if (!comment.length) errors["comment"] = "👋 Comment text required"
        setErrors(errors)
    }, [comment])

    const handleClick = async () => {
        setHasSubmitted(true);
        if (Object.values(errors).length) return;
        const formData = new FormData()
        formData.append('comment', comment)
        formData.append('card_id', card.id)

        console.log("Form Data gathered from create comment")
        for (let key of formData.entries()) {
            console.log(key[0] + ' ----> ' + key[1])
        }

        const data = await dispatch(createCommentThunk(formData))
        if ('errors' in data) {
            setErrors(data.errors)
        } else {
            setComment('')
            setHasSubmitted(false)
            // Refetch single board state so comment counts are updated
            dispatch(getSingleBoardThunk(boardId))
        }
    }

    console.log("Comments", commentsArray, errors)

    return (
        <div className="single-card-background">
            <div className="single-card-cover-img-preview" style={{ backgroundColor: card.cover_image }}></div>
            <div className='single-card-container'>
                <h1 className="single-card-title">{card.title}</h1>
                <p className='single-card-list-title'>in list {card.list_title}</p>
                <p className='single-card-date'>Due date: {dateChanger(card.due_date)}</p>
                {card.days_left < 5 && <p className='date-warning'>Almost due! Days remaining: {card.days_left}</p>}
                <p className='single-card-description-header'>Description</p>
                <p className='single-card-description'>{card.description}</p>
            </div>
            <div className='comments-container'>
                <p className='single-card-comment-header'>Comments ({commentsArray.length})</p>
                <ul className='comments-container'>
                    {commentsArray?.map(comment =>
                        <Comment comment={comment} cardId={card.id} />
                    )}
                </ul>
            </div>
            <div className='write-comment-container'>
                <textarea className='comment-text-area' value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Add comment here...'></textarea>
                {hasSubmitted && !!Object.values(errors).length && <p className='single-card-error'>{errors.comment}</p>}
                <button className='add-comment-button' onClick={() => handleClick()}>Add comment</button>
            </div>
        </div>
    )
}

export default SingleCardModal
