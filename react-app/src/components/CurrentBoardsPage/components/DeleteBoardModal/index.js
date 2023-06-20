import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { deleteBoardThunk } from "../../../../store/boardReducer";
import './DeleteModal.css'

const DeleteBoardModal = ({ boardId }) => {
    console.log("Board id prop?", boardId)
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    const deleteProject = (e) => {
        dispatch(deleteBoardThunk(boardId))
            .then(closeModal)
    }

    return (
        <div className="delete-modal-container">
            <div className="delete-modal-inner-container">
                <p className='confirm-delete'>Confirm you would like to delete this board:</p>
                <div className="delete-button-container">
                    <button onClick={closeModal} className="cancel-delete-button">Cancel</button>
                    <button className="delete-button" onClick={deleteProject}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteBoardModal
