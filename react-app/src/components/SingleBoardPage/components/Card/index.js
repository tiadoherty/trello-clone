import EditCardModal from '../EditCardModal'
import DeleteCardModal from '../DeleteCardModal'
import SingleCardModal from '../SingleCardModal'
import OpenModalButton from '../../../OpenModalButton'
import './Card.css'

const Card = ({ card, listId }) => {
    console.log("Card", card)
    return (
        <div className="card">
            <div className="card-color" style={{ backgroundColor: card.cover_image }}></div>
            <div className='card-top'>
                <OpenModalButton
                        buttonText={card.title}
                        modalComponent={<SingleCardModal card={card} />}
                        className="card-title"></OpenModalButton>
                <div className='card-icon-container'>
                    <OpenModalButton
                        buttonText={<i className="fas fa-pen" />}
                        modalComponent={<EditCardModal card={card} listId={listId} />}
                        className="card-icon"></OpenModalButton>
                    <OpenModalButton
                        buttonText={<i className="fas fa-trash" />}
                        modalComponent={<DeleteCardModal cardId={card.id} listId={listId}/>}
                        className="card-icon"></OpenModalButton>
                </div>
            </div>
            <div>
                <span className='card-comment'><i className='fas fa-comment' />{card.num_comments}</span>
            </div>
        </div>
    )
}

export default Card;
