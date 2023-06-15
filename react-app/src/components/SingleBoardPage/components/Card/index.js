import './Card.css'

const Card = ({ card }) => {
    console.log("Card", card)
    return (
        <div className="card">
            <div className='card-top'>
                <p className='card-title'>{card.title}</p>
                <div className='card-icon-container'>
                    <span className='card-icon'><i className="fas fa-pen" /></span>
                    <span className='card-icon'><i className="fas fa-trash" /></span>
                </div>
            </div>
            <div>
                <span className='card-comment'><i className='fas fa-comment' />{card.num_comments}</span>
            </div>
        </div>
    )
}

export default Card;
