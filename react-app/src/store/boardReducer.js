import { normalizeObj } from './helpers';

// ------------ TYPE VARIABLES ------------
const GET_USER_BOARDS = 'boards/getUserBoards'
const GET_COLLAB_BOARDS = 'boards/getCollabBoards'
const GET_SINGLE_BOARD = 'boards/getSingleBoard'
const CREATE_BOARD = 'boards/createBoard'
const EDIT_BOARD = 'board/editBoard'
const DELETE_BOARD = 'boards/deleteBoard'
const CREATE_LIST = 'lists/createList'
const EDIT_LIST = 'lists/editList'

// ---------- ACTION CREATORS ----------
const getUserBoards = (boards) => {
    return {
        type: GET_USER_BOARDS,
        boards
    }
}

const getCollabBoards = (collaborator_boards) => {
    return {
        type: GET_COLLAB_BOARDS,
        collaborator_boards
    }
}

const getSingleBoard = (board) => {
    return {
        type: GET_SINGLE_BOARD,
        board
    }
}

const createBoard = (board) => {
    return {
        type: CREATE_BOARD,
        board
    }
}

const editBoard = (board, id) => {
    return {
        type: EDIT_BOARD,
        board,
        id
    }
}

const deleteBoard = (id) => {
    return {
        type: DELETE_BOARD,
        id
    }
}

const createList = (list) => {
    return {
        type: CREATE_LIST,
        list
    }
}

const editList = (list, id) => {
    return {
        type: EDIT_LIST,
        list,
        id
    }
}

// ---------- THUNKS ----------

//get boards owned by current user
export const getUserBoardsThunk = () => async (dispatch) => {
    const res = await fetch('/api/boards/current')
    if (res.ok) {
        const { boards } = await res.json()
        dispatch(getUserBoards(boards))
        return
    } else {
        console.log("Problem with loading current user's boards")
    }
}

//get boards that you are a collaborator of, but don't own
export const getCollabBoardsThunk = () => async (dispatch) => {
    const res = await fetch('/api/boards/collab')
    if (res.ok) {
        const { collaborator_boards } = await res.json()
        dispatch(getCollabBoards(collaborator_boards))
        return
    } else {
        console.log("Problem with loading collab boards")
    }
}

//get single board by id
export const getSingleBoardThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/boards/${id}`)
    if (res.ok) {
        const { single_board } = await res.json()
        dispatch(getSingleBoard(single_board))
        return
    } else {
        const errors = await res.json()
        console.log("errors from get single board thunk -->", errors)
        return errors
    }
}

// create a board
export const createBoardThunk = (boardFormData) => async (dispatch) => {
    const res = await fetch('/api/boards/current', {
        method: "POST",
        body: boardFormData
    })

    if (res.ok) {
        const { board } = await res.json()
        dispatch(createBoard(board))
        return board;
    } else {
        const data = await res.json()
        console.log("errors from create board thunk -->", data)
        return data
    }
}

//edit an existing board
export const editBoardThunk = (id, newBoardData) => async (dispatch) => {
    const res = await fetch(`/api/boards/${id}/edit`, {
        method: "PUT",
        body: newBoardData
    })

    if (res.ok) {
        const { board } = await res.json()
        dispatch(editBoard(board, id))
        return board;
    } else {
        const data = await res.json()
        console.log("errors from edit board thunk -->", data)
        return data
    }
}

//delete a board
export const deleteBoardThunk = (id) => async dispatch => {
    console.log("id received by thunk -->", id)
    const res = await fetch(`/api/boards/${id}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(deleteBoard(id))
        console.log("successfully deleted from thunk")
    } else {
        const data = await res.json()
        console.log("errors from delete board thunk -->", data)
        return data
    }
}

//create a list in a board
export const createListThunk = (listFormData) => async (dispatch) => {
    const res = await fetch('/api/lists/new-list', {
        method: "POST",
        body: listFormData
    })

    if (res.ok) {
        const { list } = await res.json()
        dispatch(createList(list))
        return list;
    } else {
        const data = await res.json()
        console.log("errors from create list thunk -->", data)
        return data
    }
}

//edit a list
export const editListThunk = (id, listFormData) => async (dispatch) => {
    const res = await fetch(`/api/lists/${id}/edit`, {
        method: "POST",
        body: listFormData
    })

    if (res.ok) {
        const { list } = await res.json()
        dispatch(editList(list, id))
        return list;
    } else {
        const data = await res.json()
        console.log("errors from create list thunk -->", data)
        return data
    }
}


// --------- INITIAL STATE -------------
const initialState = { userBoards: {}, collabBoards: {}, singleBoard: {} }

// ---------- REDUCER ----------
const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_BOARDS:
            return { ...state, userBoards: { ...normalizeObj(action.boards) } }
        case GET_COLLAB_BOARDS:
            return { ...state, collabBoards: { ...normalizeObj(action.collaborator_boards) } }
        case GET_SINGLE_BOARD:
            return { ...state, singleBoard: { ...action.board } }
        case CREATE_BOARD:
            return { ...state, userBoards: { ...state.userBoards, [action.board.id]: action.board } }
        case EDIT_BOARD:
            return { ...state, userBoards: { ...state.userBoards, [action.id]: action.board } }
        case DELETE_BOARD:
            const newState = Object.assign({}, state)
            delete newState.userBoards[action.id]
            return { ...state, userBoards: { ...newState.userBoards } }
        case CREATE_LIST:
            return {...state, singleBoard: {...state.singleBoard, lists: [...state.singleBoard.lists, action.list]}}
        default:
            return state
    }
}

export default boardReducer
