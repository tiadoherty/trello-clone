import { normalizeObj } from './helpers';

// ------------ TYPE VARIABLES ------------
const GET_COMMENTS = 'comments/getComments'
const CREATE_COMMENT = 'comments/createComment'
const EDIT_COMMENT = 'comments/editComment'
const DELETE_COMMENT = 'comments/deleteComment'

// ---------- ACTION CREATORS ----------
const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}

const createComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

const editComment = (comment, commentId) => {
    return {
        type: EDIT_COMMENT,
        comment,
        commentId
    }
}

const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

// ---------- THUNKS ----------
//get comments by card id
export const getCommentsThunk = (cardId) => async (dispatch) => {
    const res = await fetch(`/api/cards/${cardId}/comments`)
    if (res.ok) {
        const { comments } = await res.json()
        dispatch(getComments(comments))
        return;
    } else {
        const errors = await res.json()
        console.log("errors from get comments thunk -->", errors)
        return errors
    }
}

//add a comment
export const createCommentThunk = (commentFormData) => async (dispatch) => {
    const res = await fetch('/api/comments/new', {
        method: "POST",
        body: commentFormData
    })

    if (res.ok) {
        const { comment } = await res.json()
        dispatch(createComment(comment))
        return comment;
    } else {
        const data = await res.json()
        console.log("errors from create comment thunk -->", data)
        return data
    }
}

//edit an existing comment
export const editCommentThunk = (commentFormData, commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}/update`, {
        method: "PUT",
        body: commentFormData
    })

    if (res.ok) {
        const { comment } = await res.json()
        dispatch(editComment(comment, commentId))
        return comment;
    } else {
        const data = await res.json()
        console.log("errors from edit comment thunk -->", data)
        return data
    }
}

//delete an existing comment by id
export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(deleteComment(commentId))
        console.log("successfully deleted from thunk")
    } else {
        const data = await res.json()
        console.log("errors from delete board thunk -->", data)
        return data
    }
}

// --------- INITIAL STATE -------------
const initialState = { comments: {} }

// ---------- REDUCER ----------
const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS:
            return { ...state, comments: { ...normalizeObj(action.comments) } }
        case CREATE_COMMENT:
            return { ...state, comments: { ...state.comments, [action.comment.id]: action.comment } }
        case EDIT_COMMENT:
            return { ...state, comments: { ...state.comments, [action.commentId]: action.comment } }
        case DELETE_COMMENT: {
            const newComments = { ...state.comments }
            delete newComments[action.commentId]
            return { ...state, comments: { ...newComments } }
        }
        default:
            return state;
    }
}

export default commentsReducer
