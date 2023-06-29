import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { DragDropContext } from 'react-beautiful-dnd'
import List from './components/List'
import { getSingleBoardThunk, reorderCard, editCardListThunk } from '../../store/boardReducer'
import OpenModalButton from "../OpenModalButton";
import CreateListModal from "./components/CreateListModal";
import './SingleBoardPage.css'

// returns numColumns iterations of '1fr' joined by spaces
// getCssGridColumns(3) -> '1fr 1fr 1fr'
const getCssGridColumns = (numColumns) => {
    const col = []
    for (let i = 0; i < numColumns; i++) {
        col.push('1fr')
    }

    return col.join(' ')
}

const formatDate = (dateString) => {
    if (!dateString) return;
    const date = new Date(dateString)
    return date.toISOString().split('T')[0];
}

const SingleBoardPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const singleBoard = useSelector(state => state.boards.singleBoard)

    const onDragEnd = async result => {
        //TODO: reorder our list
        console.log("from the onDragEnd function", result)
        const { destination, source } = result
        if (!destination) {
            return; // destination is null when the user drops outside of a list - so do nothing
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return; // The user dropped the item back in the same place it came from - so do nothing
        }

        if (destination.droppableId === source.droppableId) {
            // Destination and source list are the same - so just reorder
            dispatch(reorderCard(parseInt(destination.droppableId), source.index, destination.index))
        }

        if (destination.droppableId !== source.droppableId) {
            // User dropped the card into a new list, so dispatch edit thunk
            const destinationListId = parseInt(destination.droppableId)
            const sourceListId = parseInt(source.droppableId)
            const sourceList = singleBoard.lists.find(list => list.id === sourceListId)
            const card = sourceList.cards.find((card) => card.id === parseInt(result.draggableId))

            const formData = new FormData()
            formData.append('title', card.title)
            formData.append('list_id', destinationListId) // use new list id
            formData.append('description', card.description)
            formData.append('due_date', formatDate(card.due_date))
            formData.append('cover_image', card.cover_image)

            await dispatch(editCardListThunk(formData, card.id, sourceListId, destinationListId, destination.index))
        }
    }
    useEffect(() => {
        dispatch(getSingleBoardThunk(id))
    }, [dispatch, id])

    console.log("Single board", singleBoard)

    if (Object.keys(singleBoard).length === 0) return <h1>Loading board...</h1>

    return (
        <div className="page" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${singleBoard.background_image})` }}>
            <div className="board-title">
                <h2>{singleBoard.title}</h2>
            </div>
            <ul className="lists-container" style={{ gridTemplateColumns: getCssGridColumns(singleBoard.lists.length + 1) }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {singleBoard.lists.map((list) => <List key={list.id} list={list} />)}
                </DragDropContext>
                <OpenModalButton
                    buttonText={<><i className="fas fa-plus" /> Add a list</>}
                    modalComponent={<CreateListModal boardId={id} />}
                    className="add-list"
                />
            </ul>
        </div>
    )
}

export default SingleBoardPage
