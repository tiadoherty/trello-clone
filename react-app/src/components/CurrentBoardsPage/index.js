import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBoardsThunk } from "../../store/boardReducer"

import BoardCard from "./components/BoardCard";
import './CurrentBoardsPage.css'
import Footer from "../Footer";
import OpenModalButton from "../OpenModalButton";
import CreateBoardModal from "../CreateBoardModal";

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
        <>
            <div className="page">
                <h2 className="page-title">My Boards</h2>
                <ul className="board-card-container">
                    <OpenModalButton
                        buttonText="Create new board"
                        modalComponent={<CreateBoardModal />}
                        className="create-new-board-button"
                    />
                    {userBoardsArray.map((board) => <BoardCard board={board} key={board.id} />)}
                </ul>
            </div>
            <Footer />
        </>
    )
}

export default CurrentBoardsPage
