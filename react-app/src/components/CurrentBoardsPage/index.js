import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBoardsThunk } from "../../store/boardReducer"

import BoardCard from "./components/BoardCard";
import './CurrentBoardsPage.css'
import OpenModalButton from "../OpenModalButton";

const CurrentBoardsPage = () => {
    //get boards of current user?
    const userBoards = useSelector(state => state.boards.userBoards)
    const userBoardsArray = Object.values(userBoards)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserBoardsThunk())
    }, [dispatch])

    console.log("Boards", userBoardsArray)

    if (!userBoards) return <h3>Boards are loading...</h3>

    return (
        <div className="page">
            <h2 className="page-title">My Boards</h2>
            <ul className="board-card-container">
                <OpenModalButton
                    buttonText="Create new board"
                    modalComponent={<h1>Create board</h1>}
                    className="create-new-board-button"
                />
                {userBoardsArray.map((board) => <BoardCard board={board} />)}
            </ul>
        </div>
    )
}

export default CurrentBoardsPage