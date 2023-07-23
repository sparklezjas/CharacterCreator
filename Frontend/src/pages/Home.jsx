import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Character from "../components/Character"

const Home = () => {

    const { user } = useAuthContext()
    const [allCharacters, setAllCharacters] = useState([])
    const [sortedCharacters, setSortedCharacters] = useState([])
    const [sortOrder, setSortOrder] = useState()
    const navigate = useNavigate()


    useEffect(() => {
        axios
        .get('http://localhost:4000/api/characters/all')
        .then((res) => {
        console.log(res)
        setAllCharacters(res.data)
        setSortedCharacters(res.data)
        })
        .catch((err) => {
        console.log(err)
    })
}, [])

    useEffect(() => {
        if (sortOrder === 'oldest') {
            setSortedCharacters([...allCharacters].sort((first, last) => {
            const oldest = new Date(first.createdAt)
            const newest = new Date(last.createdAt)
            return oldest - newest
        }))
        } else {
            setSortedCharacters([...allCharacters].sort((first, last) => {
            const oldest = new Date(first.createdAt)
            const newest = new Date(last.createdAt)
            return newest - oldest
        }))
        }
    }, [sortOrder, allCharacters])

    const sortByOldest = () => {
    setSortOrder('oldest')
}

    const sortByNewest = () => {
    setSortOrder('newest')
    }

    const deleteHandler = (id) => {

        axios
        .delete(`http://localhost:4000/api/characters/delete/${id}`)
        .then((res) => {
            setAllCharacters(allCharacters.filter(character => character._id !== id))
            setSortedCharacters(sortedCharacters.filter(character => character._id !== id))
        })
        .catch((err) => {
            console.log(err)
        })
}

      const editPage = (id) => {
        navigate(`/characters/edit/${id}`);
      };
      
      
      

    return (
        <div className="home">
            <button onClick={sortByNewest}>Newest</button>
            <button onClick={sortByOldest}>Oldest</button>
            <div className="characters-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {sortedCharacters && sortedCharacters.map((character) => (
                    <Character key={character._id}
                        character={character}
                        onDelete={() => deleteHandler(character._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home