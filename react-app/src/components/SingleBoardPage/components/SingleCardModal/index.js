import './SingleCard.css'

const dateChanger = (dateString) => {
    return dateString.slice(0, 17)
}

const SingleCardModal = ({ card }) => {
    return (
        <div className="create-card-background">
            <div className="single-card-cover-img-preview" style={{ backgroundColor: card.cover_image }}></div>
            <div className='single-card-container'>
                <h1 className="single-card-title">{card.title}</h1>
                <p className='single-card-list-title'>in list {card.list_title}</p>
                <p className='single-card-date'>Due date: {dateChanger(card.due_date)}</p>
                {card.days_left < 5 && <p className='date-warning'>Almost due! Days remaining: {card.days_left}</p>}
                <p className='single-card-description-header'>Description</p>
                <p className='single-card-description'>{card.description}</p>
            </div>
            <div className='comments-container'>
            <p className='single-card-description-header'>Comments ({card.num_comments})</p>
            <ul>
                
            </ul>
            </div>
        </div>
    )
}

export default SingleCardModal
