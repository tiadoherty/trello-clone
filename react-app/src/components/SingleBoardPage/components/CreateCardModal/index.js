import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { createCardThunk } from "../../../../store/boardReducer";
import './CreateCardModal.css'

function removeSpaces(str) {
    return str.replaceAll(' ', '').length
}

const coverImageOptions = [
    '#A1BDD914',
    '#E74C3C',
    '#2874A6',
    '#F4D03F',
    '#27AE60',
    '#AF7AC5'
]

const CreateCardModal = ({ listId, listTitle }) => {
    console.log("is this the correct list id --->", listId)
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [errors, setErrors] = useState({})
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [coverImage, setCoverImage] = useState('#A1BDD914')
    const { closeModal } = useModal();

    useEffect(() => {
        const errors = {};

        if (removeSpaces(title) === 0) errors["title"] = "❗Characters are required in the title"
        if (!title.length) errors["title"] = "👋 Card title is required"
        if (title.length > 80) errors["title"] = "❗Title must be less than 80 characters"
        if (removeSpaces(description) === 0) errors["description"] = "❗Characters are required in the description"
        if (!description.length) errors["description"] = "👋 Description is required"
        if (description.length > 300) errors["description"] = "❗Description must be less than 300 characters"
        if (dueDate === "YYYY-MM-DD") errors['dueDate'] = "❗Card due date is required!"
        if (new Date(dueDate) < Date.now()) errors['dueDate'] = "❗Due date must be in the future!"
        setErrors(errors)
    }, [title, description, dueDate])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(errors).length) return

        const formData = new FormData()
        formData.append('title', title)
        formData.append('list_id', listId)
        formData.append('description', description)
        formData.append('due_date', dueDate)
        formData.append('cover_image', coverImage)

        console.log("Form Data gathered from create card form:")
        for (let key of formData.entries()) {
            console.log(key[0] + ' ----> ' + key[1])
        }

        const data = await dispatch(createCardThunk(formData, listId))
        if ('errors' in data) {
            setErrors(data.errors)
        } else {
            closeModal()
        }
    }

    return (
        <div className="create-card-background">
            <div className="cover-img-preview" style={{ backgroundColor: coverImage }}></div>
            <form onSubmit={handleSubmit} className='card-form'>
                <label className='card-title-field'>
                    Card title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={errors.title && { boxShadow: 'rgb(239, 92, 72) 0px 0px 0px 2px inset' }}
                    />
                    <span className='error-field'>{errors.title}</span>
                </label>
                <p>In list: {listTitle}</p>
                <label className='card-title-field'>
                    Cover color
                    <ul className="cover-image-container">
                        {coverImageOptions.map(option => <div className="cover-image-option" key={option} style={{ backgroundColor: option }} onClick={() => setCoverImage(option)}></div>)}
                    </ul>
                </label>
                <label className='card-title-field'>
                    Due date
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        style={errors.dueDate && { boxShadow: 'rgb(239, 92, 72) 0px 0px 0px 2px inset' }}
                    />
                    <span className='error-field'>{errors.dueDate}</span>
                </label>
                <label className='card-title-field'>
                    Description
                    <textarea onChange={(e) => setDescription(e.target.value)} style={errors.description && { boxShadow: 'rgb(239, 92, 72) 0px 0px 0px 2px inset' }} />
                    <span className='error-field'>{errors.description}</span>
                </label>
                <button type="submit" className='create-button'>Create</button>
            </form>
        </div>
    )
}

export default CreateCardModal
