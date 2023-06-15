import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteBoardThunk } from "../../store/boardReducer";

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
            <p>Confirm you would like to delete this board:</p>
            <div className="button-container">
                <button onClick={closeModal}>Cancel</button>
                <button className="delete-button" onClick={deleteProject}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteBoardModal
