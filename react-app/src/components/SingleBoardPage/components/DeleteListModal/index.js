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
            <p>Confirm you would like to delete this list:</p>
            <div className="button-container">
                <button onClick={closeModal}>Cancel</button>
                <button className="delete-button" onClick={deleteList}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteListModal
