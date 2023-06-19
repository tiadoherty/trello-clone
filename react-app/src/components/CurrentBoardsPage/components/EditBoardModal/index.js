import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { useHistory } from "react-router-dom";
import { editBoardThunk } from "../../../../store/boardReducer";
// import TrelloOverlay from '../../CreateBoardModal/trello_overlay.svg'
import TrelloOverlay from '../../../CreateBoardModal/trello_overlay.svg'

const image_urls = [
    "https://kickstarterclonebucket.s3.us-west-1.amazonaws.com/background_dolpin.jpg",
    "https://kickstarterclonebucket.s3.us-west-1.amazonaws.com/background_forest.jpg",
    "https://kickstarterclonebucket.s3.us-west-1.amazonaws.com/background_mountain.jpg",
    "https://kickstarterclonebucket.s3.us-west-1.amazonaws.com/background_plant.jpg",
    "https://kickstarterclonebucket.s3.us-west-1.amazonaws.com/background_dark_blue.jpg",
    "https://kickstarterclonebucket.s3.us-west-1.amazonaws.com/background_white.jpg",
    "https://kickstarterclonebucket.s3.us-west-1.amazonaws.com/background_orange.jpg",
    "https://kickstarterclonebucket.s3.us-west-1.amazonaws.com/background_purple.jpg"
]

function removeSpaces(str) {
    return str.replaceAll(' ', '').length
}

const EditBoardModal = ({ boardId }) => {
    console.log("Board id prop?", boardId)
    const dispatch = useDispatch()
    const history = useHistory()

    const boardToEdit = useSelector(state => state.boards.userBoards[boardId])
    console.log("this should be the correct board: ", boardToEdit.title)

    const [selectedImageUrl, setSelectedImageUrl] = useState(boardToEdit.background_image)
    const [title, setTitle] = useState(boardToEdit.title)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    useEffect(() => {
        const errors = {}

        if (removeSpaces(title) === 0) errors["title"] = "❗Characters are required in the title"
        if (!title.length) errors["title"] = "👋 Board title is required"
        setErrors(errors)
    }, [title])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(errors).length) return

        const formData = new FormData()
        formData.append('title', title)
        formData.append('background_image', selectedImageUrl)

        console.log("Form Data gathered from edit board form:")
        for (let key of formData.entries()) {
            console.log(key[0] + ' ----> ' + key[1])
        }

        const data = await dispatch(editBoardThunk(boardId, formData))
        console.log("response from thunk in front end form --->", data)
        // if there are backend errors, set those errors otherwise redirect to the newly created board
        if ('errors' in data) {
            console.log('The backend returned validation errors when creating a new board -->', data)
            setErrors(data.errors)
        } else {
            // history.push(`/boards/${data.id}`)
            history.push('/boards/current')
            closeModal()
        }
    }

    return (
        <div className="create-board-container">
        <div className="inner-board-container">
            <p className="create-board-title">Edit board below:</p>
            <div className='trello-card-img-container'>
                <div className="trello-card-img" style={{ backgroundImage: `url(${selectedImageUrl})` }}>
                    <img src={TrelloOverlay} alt="" className="mock-trello-card" />
                </div>
            </div>
            <p>Background</p>
            <div className="thumbnail-container">
                {image_urls.map((url) => {
                    return <button onClick={() => setSelectedImageUrl(url)} className="background_thumbnail" style={{ 'background-image': `url(${url})`, 'objectFit': 'contain' }}></button>
                })}
            </div>
            <form onSubmit={handleSubmit} className='board-form'>
                <label className='board-title-field'>
                    Board title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={errors.title && { boxShadow: 'rgb(239, 92, 72) 0px 0px 0px 2px inset' }}
                    />
                    <span className='error-field'>{errors.title}</span>
                </label>
                <button type="submit" className='create-button'>Update</button>
            </form>
        </div>
    </div>
    )
}

export default EditBoardModal
