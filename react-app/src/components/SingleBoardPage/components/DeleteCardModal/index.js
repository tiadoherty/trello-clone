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
        <div>
            <h3>Are you sure you want to delete this card?</h3>
            <button onClick={() => handleCancel()}>
                No
            </button>
            <button onClick={() => handleConfirm()}>
                Yes
            </button>
        </div>
    )
}

export default DeleteCardModal;
