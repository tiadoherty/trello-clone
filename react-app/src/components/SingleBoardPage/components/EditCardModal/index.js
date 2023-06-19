import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { editCardThunk } from "../../../../store/boardReducer";

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

const formatDate = (dateString) => {
    if (!dateString) return;
    const date = new Date(dateString)
    return date.toISOString().split('T')[0];
}

const EditCardModal = ({ card, listId }) => {
    console.log("card has list title??", card)
    const dispatch = useDispatch();
    const [title, setTitle] = useState(card.title)
    const [errors, setErrors] = useState({})
    const [description, setDescription] = useState(card.description)
    const [dueDate, setDueDate] = useState(formatDate(card.due_date))
    const [coverImage, setCoverImage] = useState(card.cover_image)
    const { closeModal } = useModal();

    useEffect(() => {
        const errors = {};

        if (removeSpaces(title) === 0) errors["title"] = "❗Characters are required in the title"
        if (!title.length) errors["title"] = "👋 Card title is required"
        if (removeSpaces(description) === 0) errors["description"] = "❗Characters are required in the description"
        if (!description.length) errors["description"] = "👋 Description is required"
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

        console.log("Form Data gathered from edit card form:")
        for (let key of formData.entries()) {
            console.log(key[0] + ' ----> ' + key[1])
        }

        const data = await dispatch(editCardThunk(formData, card.id, listId))
        console.log("return from thunk in the frontend component --->", data)
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
                <p>Edit card details:</p>
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
                <p>In list: {card.list_title}</p>
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
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={errors.description && { boxShadow: 'rgb(239, 92, 72) 0px 0px 0px 2px inset' }}
                    />
                    <span className='error-field'>{errors.description}</span>
                </label>
                <button type="submit" className='create-button'>Update</button>
            </form>
        </div>
    )
}


export default EditCardModal
