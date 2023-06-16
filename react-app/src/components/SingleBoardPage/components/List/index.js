import Card from '../Card'
import './List.css'
import OpenModalButton from '../../../OpenModalButton';
import DeleteListModal from '../DeleteListModal';
import EditListModal from '../EditListModal';
import CreateCardModal from '../CreateCardModal';

const List = ({ list }) => {
    console.log("List", list)
    return (
        <li className="list-container">
            <div>
                <div className='list-header-container'>
                    <h4>{list.title}</h4>
                    <div className='list-icon-container'>
                        <OpenModalButton
                            buttonText={<i className="list-icon fas fa-pen" />}
                            modalComponent={<EditListModal list={list} />}
                            className="modal-button"
                        />
                        <OpenModalButton
                            buttonText={<i className="list-icon fas fa-trash" />}
                            modalComponent={<DeleteListModal list={list} />}
                            className="modal-button"
                        />
                    </div>
                </div>
                {list.cards.map((card) => <Card card={card} />)}
            </div>
            <OpenModalButton
                buttonText={<><i className="fas fa-plus" /> Add a card</>}
                modalComponent={<CreateCardModal listId={list.id} />}
                className="add-card"
            />
        </li>
    )
}

export default List
