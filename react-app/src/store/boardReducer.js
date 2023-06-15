import { normalizeObj } from './helpers';

// ------------ TYPE VARIABLES ------------
const GET_USER_BOARDS = 'boards/getUserBoards'
const GET_COLLAB_BOARDS = 'boards/getCollabBoards'
const GET_SINGLE_BOARD = 'boards/getSingleBoard'
const CREATE_BOARD = 'boards/createBoard'

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
    const res = await fetch(`/api/boards/current`, {
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
        default:
            return state
    }
}

export default boardReducer
