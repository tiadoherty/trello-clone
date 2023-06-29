import Card from '../Card'
import './List.css'
import { Droppable } from 'react-beautiful-dnd'
import OpenModalButton from '../../../OpenModalButton';
import DeleteListModal from '../DeleteListModal';
import EditListModal from '../EditListModal';
import CreateCardModal from '../CreateCardModal';

const List = ({ list }) => {

    return (
        <li className="list-container">
            <div className='height-100'>
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
                <Droppable droppableId={list.id.toString()}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className='height-100'
                        >
                            {list.cards.map((card, index) => <Card key={card.id} card={card} listId={list.id} index={index} />)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
            <OpenModalButton
                buttonText={<><i className="fas fa-plus" /> Add a card</>}
                modalComponent={<CreateCardModal listId={list.id} listTitle={list.title} />}
                className="add-card"
            />
        </li>
    )
}

export default List
