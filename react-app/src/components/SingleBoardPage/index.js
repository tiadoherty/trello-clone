import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import List from './components/List'
import { getSingleBoardThunk } from '../../store/boardReducer'
import './SingleBoardPage.css'

const SingleBoardPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const singleBoard = useSelector(state => state.boards.singleBoard)

    useEffect(() => {
        dispatch(getSingleBoardThunk(id))
    }, [dispatch])

    console.log("Single board", singleBoard)

    if (Object.keys(singleBoard).length === 0) return <h1>Loading board...</h1>

    return (
        <div className="page" style={{ 'background-image': `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${singleBoard.background_image})` }}>
            <div className="board-title">
                <h2>{singleBoard.title}</h2>
            </div>
            <ul className="lists-container">
                {singleBoard.lists.map((list) => <List list={list} />)}
            </ul>
        </div>
    )
}

export default SingleBoardPage
