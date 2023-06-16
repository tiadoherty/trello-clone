import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import List from './components/List'
import { getSingleBoardThunk } from '../../store/boardReducer'
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

const SingleBoardPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const singleBoard = useSelector(state => state.boards.singleBoard)

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
                {singleBoard.lists.map((list) => <List list={list} />)}
                <OpenModalButton
                    buttonText={<><i className="fas fa-plus" /> Add another list</>}
                    modalComponent={<CreateListModal boardId={id}/>}
                    className="add-list"
                />
            </ul>
        </div>
    )
}

export default SingleBoardPage
