import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { deleteListThunk } from "../../../../store/boardReducer";

const DeleteListModal = ({ list }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const listToDelete = useSelector(state => state.boards.singleBoard.lists.find(element => element.id === list.id))

    const deleteList = () => {
        dispatch(deleteListThunk(listToDelete.id))
            .then(closeModal)
    }

    return (
        <div className="delete-modal-container">
            <div className="delete-modal-inner-container">
                <p className='confirm-delete'>Confirm you would like to delete this list:</p>
                <div className="delete-button-container">
                    <button onClick={closeModal} className="cancel-delete-button">Cancel</button>
                    <button className="delete-button" onClick={deleteList}>Delete</button>
                </div>
            </div>
        </div >
    )
}

export default DeleteListModal
