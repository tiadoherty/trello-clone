import { useModal } from "../../../../context/Modal";
import { deleteCardThunk } from '../../../../store/boardReducer'
import { useDispatch } from "react-redux";

const DeleteCardModal = ({ cardId, listId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleCancel = () => {
        closeModal()
    }

    const handleConfirm = async () => {
        await dispatch(deleteCardThunk(cardId, listId))
        closeModal()
    }

    return (
        <div className="delete-modal-container">
            <div className="delete-modal-inner-container">
                <p className='confirm-delete'>Are you sure you want to delete this card?</p>
                <div className="delete-button-container">
                    <button onClick={() => handleCancel()} className="cancel-delete-button">
                        Cancel
                    </button>
                    <button onClick={() => handleConfirm()} className="delete-button">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCardModal;
