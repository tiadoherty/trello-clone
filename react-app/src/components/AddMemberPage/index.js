import { useParams } from "react-router-dom"

const AddMemberPage = () => {
    const {id} = useParams()
    return(
        <h1>Add Members to Board {id}</h1>
    )
}

export default AddMemberPage
