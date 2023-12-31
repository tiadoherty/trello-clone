import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { editListThunk } from '../../../../store/boardReducer';

function removeSpaces(str) {
    return str.replaceAll(' ', '').length
}

const EditListModal = ({ list }) => {
    const dispatch = useDispatch()

    const listToEdit = useSelector(state => state.boards.singleBoard.lists.find(element => element.id === list.id))
    const boardId = useSelector(state => state.boards.singleBoard.id)
    console.log("should be the correct list -->", listToEdit)
    console.log("should be the correct board id --->", boardId)

    const [title, setTitle] = useState(listToEdit.title)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    useEffect(() => {
        const errors = {}

        if (removeSpaces(title) === 0) errors["title"] = "❗Characters are required in the title"
        if (!title.length) errors["title"] = "👋 List title is required"
        if (title.length > 80) errors["title"] = "❗Title must be less than 80 characters"
        setErrors(errors)
    }, [title])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(errors).length) return

        const formData = new FormData()
        formData.append('title', title)
        formData.append('board_id', boardId)

        console.log("Form Data gathered from edit list form:")
        for (let key of formData.entries()) {
            console.log(key[0] + ' ----> ' + key[1])
        }

        const data = await dispatch(editListThunk(list.id, formData))
        console.log("response from thunk in front end list form --->", data)
        // if there are backend errors, set those errors otherwise redirect to the newly created board
        if ('errors' in data) {
            console.log('The backend returned validation errors when editing a list -->', data)
            setErrors(data.errors)
        } else {
            closeModal()
        }
    }

    return (
        <div className="create-list-container">
            <div className="create-list-inner-container">
                <form onSubmit={handleSubmit} className='list-form'>
                    <label className='list-title-field'>
                        Update list title...
                        <input
                            className="list-input-text"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={errors.title && { boxShadow: 'rgb(239, 92, 72) 0px 0px 0px 2px inset' }}
                        />
                        <span className='error-field'>{errors.title}</span>
                    </label>
                    <button type="submit" className='create-button'>Update List</button>
                </form>
            </div>
        </div>
    )
}

export default EditListModal
