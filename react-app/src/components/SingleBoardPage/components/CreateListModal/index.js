import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { createListThunk } from "../../../../store/boardReducer";
import './CreateListModal.css'

function removeSpaces(str) {
    return str.replaceAll(' ', '').length
}

const CreateListModal = ({ boardId }) => {
    console.log("projectId prop from parent -->", boardId)
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();

    useEffect(() => {
        const errors = {};

        if (removeSpaces(title) === 0) errors["title"] = "❗Characters are required in the title"
        if (!title.length) errors["title"] = "👋 List title is required"
        setErrors(errors)
    }, [title])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(errors).length) return

        const formData = new FormData()
        formData.append('title', title)
        formData.append('board_id', boardId)

        console.log("Form Data gathered from create list form:")
        for (let key of formData.entries()) {
            console.log(key[0] + ' ----> ' + key[1])
        }

        const data = await dispatch(createListThunk(formData))
        console.log("response from thunk in front end list form --->", data)
        // if there are backend errors, set those errors otherwise redirect to the newly created board
        if ('errors' in data) {
            console.log('The backend returned validation errors when creating a new list -->', data)
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
                        Enter list title...
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
                    <button type="submit" className='create-button'>Add List</button>
                </form>
            </div>
        </div>
    )
}

export default CreateListModal
