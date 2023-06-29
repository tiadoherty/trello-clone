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
const DELETE_LIST = 'lists/deleteList'
const CREATE_CARD = 'cards/createCard'
const DELETE_CARD = 'cards/deleteCard'
const EDIT_CARD = 'cards/editCard'
const REORDER_CARD = 'cards/reorderCard'
const EDIT_CARD_LIST = 'cards/editCardList'

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

const deleteList = (id) => {
    return {
        type: DELETE_LIST,
        id
    }
}

const createCard = (card, listId) => {
    return {
        type: CREATE_CARD,
        card,
        listId
    }
}

const editCard = (card, cardId, listId) => {
    return {
        type: EDIT_CARD,
        card,
        cardId,
        listId
    }
}

const deleteCard = (cardId, listId) => {
    return {
        type: DELETE_CARD,
        cardId,
        listId
    }
}

export const reorderCard = (listId, originalCardIndex, newCardIndex) => {
    return {
        type: REORDER_CARD,
        listId,
        originalCardIndex,
        newCardIndex
    }
}

const editCardList = (card, sourceListId, destinationListId, index) => {
    return {
        type: EDIT_CARD_LIST,
        card,
        sourceListId,
        destinationListId,
        index
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
        method: "PUT",
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

//delete a list
export const deleteListThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/lists/${id}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(deleteList(id))
        console.log("successfully deleted list from thunk")
    } else {
        const data = await res.json()
        console.log("errors from delete list thunk -->", data)
        return data
    }
}

//create a card in a list
export const createCardThunk = (cardFormData, listId) => async (dispatch) => {
    const res = await fetch('/api/cards/new-card', {
        method: "POST",
        body: cardFormData
    })

    if (res.ok) {
        const { card } = await res.json()
        dispatch(createCard(card, listId))
        return card;
    } else {
        const data = await res.json()
        console.log("errors from create card thunk -->", data)
        return data
    }
}

// Edit a card by passing cardFormData, cardId, and listId
export const editCardThunk = (cardFormData, cardId, listId) => async (dispatch) => {
    console.log("information received from the edit card thunk --->", cardFormData, cardId, listId)
    const res = await fetch(`/api/cards/${cardId}/edit`, {
        method: "PUT",
        body: cardFormData
    })

    if (res.ok) {
        const { card } = await res.json()
        dispatch(editCard(card, cardId, listId))
        return card;
    } else {
        const data = await res.json()
        console.log("errors from edit card thunk -->", data)
        return data
    }
}

// Edit a card by passing cardFormData, cardId, and listId
export const editCardListThunk = (cardFormData, cardId, sourceListId, destinationListId, index) => async (dispatch) => {
    const res = await fetch(`/api/cards/${cardId}/edit`, {
        method: "PUT",
        body: cardFormData
    })

    if (res.ok) {
        const { card } = await res.json()
        dispatch(editCardList(card, sourceListId, destinationListId, index))
        return card;
    } else {
        const data = await res.json()
        console.log("errors from edit card thunk -->", data)
        return data
    }
}

// Delete a card by its ID
export const deleteCardThunk = (cardId, listId) => async (dispatch) => {
    const res = await fetch(`/api/cards/${cardId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(deleteCard(cardId, listId))
        console.log("successfully deleted card from thunk")
    } else {
        const data = await res.json()
        console.log("errors from delete card thunk -->", data)
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
            return { ...state, singleBoard: { ...state.singleBoard, lists: [...state.singleBoard.lists, action.list] } }
        case EDIT_LIST:
            return { ...state, singleBoard: { ...state.singleBoard, lists: [...state.singleBoard.lists.filter(list => list.id !== action.id), action.list] } }
        case DELETE_LIST:
            return { ...state, singleBoard: { ...state.singleBoard, lists: [...state.singleBoard.lists.filter(list => list.id !== action.id)] } }
        case CREATE_CARD: {
            const newState = { ...state, singleBoard: { ...state.singleBoard, lists: [...state.singleBoard.lists] } }
            const listToAdd = newState.singleBoard.lists.find(list => list.id === action.listId)
            listToAdd.cards.push(action.card)
            return newState
        }
        case DELETE_CARD: {
            const newListState = { ...state, singleBoard: { ...state.singleBoard, lists: [...state.singleBoard.lists] } }
            const listToDeleteFrom = newListState.singleBoard.lists.find(list => list.id === action.listId)
            const cardToDeleteIndex = listToDeleteFrom.cards.findIndex((card) => card.id === action.cardId)
            listToDeleteFrom.cards.splice(cardToDeleteIndex, 1)
            return newListState
        }
        case EDIT_CARD: {
            const newListState = { ...state, singleBoard: { ...state.singleBoard, lists: [...state.singleBoard.lists] } }
            const listToEditFrom = newListState.singleBoard.lists.find(list => list.id === action.listId)
            const cardToEditIndex = listToEditFrom.cards.findIndex((card) => card.id === action.cardId)
            listToEditFrom.cards.splice(cardToEditIndex, 1, action.card)
            return newListState
        }
        case REORDER_CARD: {
            // First find the list to update
            const listToChange = Object.assign({}, state.singleBoard.lists.find(list => list.id === action.listId))
            // Get the cards within that list
            const cardsToChange = Array.from(listToChange.cards)
            // Get the card to reorder
            const cardToMove = Object.assign({}, cardsToChange[action.originalCardIndex])
            // Reorder the card to its new position
            cardsToChange.splice(action.originalCardIndex, 1)
            cardsToChange.splice(action.newCardIndex, 0, cardToMove)
            // Update the original list with the newly positioned cards
            listToChange.cards = cardsToChange
            // Update the singleBoard lists property with the new list with new cards
            const singleBoardLists = Array.from(state.singleBoard.lists)
            const listToChangeIndex = state.singleBoard.lists.findIndex(list => list.id === action.listId)
            singleBoardLists.splice(listToChangeIndex, 1)
            singleBoardLists.splice(listToChangeIndex, 0, listToChange)
            return {
                ...state,
                singleBoard: {
                    ...state.singleBoard,
                    lists: [
                        ...singleBoardLists
                    ]
                }
            }
        }
        case EDIT_CARD_LIST: {
            // Splice card out of original list
            const sourceList = Object.assign({}, state.singleBoard.lists.find(list => list.id === action.sourceListId))
            const sourceCardIndex = sourceList.cards.findIndex(card => card.id === action.card.id)
            sourceList.cards.splice(sourceCardIndex, 1)
            // Put it back into new list
            const destinationList = Object.assign({}, state.singleBoard.lists.find(list => list.id === action.destinationListId))
            destinationList.cards.splice(action.index, 0, action.card)
            // Now replace source list with the list missing the card
            const sourceListIndex = state.singleBoard.lists.findIndex(list => list.id === action.sourceListId)
            const singleBoardLists = Array.from(state.singleBoard.lists)
            singleBoardLists.splice(sourceListIndex, 1)
            singleBoardLists.splice(sourceListIndex, 0, sourceList)
            // Also replace destination list with the list that now has the card
            const destinationListIndex = state.singleBoard.lists.findIndex(list => list.id === action.destinationListId)
            singleBoardLists.splice(destinationListIndex, 1)
            singleBoardLists.splice(destinationListIndex, 0, destinationList)
            return {
                ...state,
                singleBoard: {
                    ...state.singleBoard,
                    lists: [
                        ...singleBoardLists
                    ]
                }
            }
        }
        default:
            return state
    }
}

export default boardReducer
