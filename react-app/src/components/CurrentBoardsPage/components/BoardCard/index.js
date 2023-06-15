import { Link } from 'react-router-dom'

import './BoardCard.css'

const BoardCard = ({ board }) => {
    return (
        <Link to={`/boards/${board.id}`} className="no-underline">
            <div className="board-card" style={{ 'background-image': `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${board.background_image})` }}>
                <h4 className='board-card-title'>{board.title}</h4>
                <ul className='board-card-icon-container'>
                    <li className='board-card-icon'><i className="fas fa-user-plus" /></li>
                    <li className='board-card-icon'><i className="fas fa-pen" /></li>
                    <li className='board-card-icon'><i className="fas fa-trash" /></li>
                </ul>

            </div>
        </Link>
    )
}

export default BoardCard
