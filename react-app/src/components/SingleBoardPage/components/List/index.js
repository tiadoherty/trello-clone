import Card from '../Card'
import './List.css'

const List = ({ list }) => {
    console.log("List", list)
    return (
        <li className="list-container">
            <div>
                <h4>{list.title}</h4>
                {list.cards.map((card) => <Card card={card} />)}
            </div>
            <div className='add-card'><i className="fas fa-plus" /> Add a card</div>
        </li>
    )
}

export default List
