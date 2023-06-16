import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { createCardThunk } from "../../../../store/boardReducer";

function removeSpaces(str) {
    return str.replaceAll(' ', '').length
}

const coverImageOptions = [
    '#A1BDD914',
    'red',
    'blue',
    'yellow',
    'green',
    'white'
]

const CreateCardModal = ({ listId }) => {
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
        if (!title.length) errors["title"] = "👋 List title is required"
        if (removeSpaces(description) === 0) errors["description"] = "❗Characters are required in the description"
        if (!description.length) errors["description"] = "👋 Description is required"
        if (dueDate === "YYYY-MM-DD") errors['dueDate'] = "❗Card due date is required!"
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

        //TO DO: need to dispatch thunk and make the form elements in the return 
    }

    return (
        <h1>Create Card here: </h1>
    )
}

export default CreateCardModal
