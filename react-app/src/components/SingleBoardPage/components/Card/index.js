import EditCardModal from '../EditCardModal'
import DeleteCardModal from '../DeleteCardModal'
import SingleCardModal from '../SingleCardModal'
import OpenModalButton from '../../../OpenModalButton'
import { Draggable } from 'react-beautiful-dnd'
import './Card.css'

const Card = ({ card, listId, index }) => {

    return (
        <Draggable draggableId={card.id.toString()} index={index} key={card.id}>
            {(provided) => (
                <div
                    className="card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="card-color" style={{ backgroundColor: card.cover_image }}></div>
                    <div className='card-top'>
                        <OpenModalButton
                            buttonText={card.title}
                            modalComponent={<SingleCardModal card={card} />}
                            className="card-title"></OpenModalButton>
                        <div className='card-icon-container'>
                            <OpenModalButton
                                buttonText={<i className="fas fa-pen card-icon" />}
                                modalComponent={<EditCardModal card={card} listId={listId} />}
                                className="card-icon"></OpenModalButton>
                            <OpenModalButton
                                buttonText={<i className="fas fa-trash card-icon" />}
                                modalComponent={<DeleteCardModal cardId={card.id} listId={listId} />}
                                className="card-icon"></OpenModalButton>
                        </div>
                    </div>
                    <div>
                        <span className='card-comment'><i className='fas fa-comment' />{card.num_comments}</span>
                    </div>
                </div>
            )}

        </Draggable>
    )
}

export default Card;
