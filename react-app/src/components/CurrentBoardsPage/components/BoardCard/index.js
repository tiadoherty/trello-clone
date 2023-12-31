import { Link } from 'react-router-dom'
import EditBoardModal from '../EditBoardModal'

import OpenModalButton from '../../../OpenModalButton'
// import EditBoardModal from '../../../EditBoardModal'
import DeleteBoardModal from '../DeleteBoardModal'
import './BoardCard.css'

const BoardCard = ({ board }) => {
    return (
        <div className="board-card" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${board.background_image})` }}>
            <Link to={`/boards/${board.id}`} className="no-underline"><h4 className='board-card-title'>{board.title}</h4></Link>
            <ul className='board-card-icon-container'>
                {/* <Link to={`/boards/${board.id}/add-member`}><li className='board-card-icon'><i className="fas fa-user-plus" /></li></Link> */}
                <OpenModalButton
                    buttonText={<i className="fas fa-pen board-card-icon" />}
                    modalComponent={<EditBoardModal boardId={board.id} />}
                    className="modal-button"
                />
                <OpenModalButton
                    buttonText={<i className="fas fa-trash board-card-icon" />}
                    modalComponent={<DeleteBoardModal boardId={board.id} />}
                    className="modal-button"
                />
            </ul>

        </div>
    )
}

export default BoardCard
