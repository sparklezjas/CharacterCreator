import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import '../CSS/Home.css'
import Character from "../components/Character"
import newest from "../images/buttons/newest.png"
import oldest from '../images/buttons/oldest.png'
import frameAll from '../images/frameAll.png'
import dungeon from '../images/dungeon.jpg'
import welcome from '../images/keyboard.png'
import create from '../images/buttons/create.png'


const Home = () => {

    const navigate = useNavigate()
    const { user } = useAuthContext()
    const [allCharacters, setAllCharacters] = useState([])
    const [sortedCharacters, setSortedCharacters] = useState([])
    const [sortOrder, setSortOrder] = useState()


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
    <div>
        <img className='welcomeGraphic' src={welcome} alt="welcome keyboard screen" />
        <p className="sortTitle">SORT CHAMPS BY</p>
        <div className="sortButtons">
            <button onClick={sortByNewest}
            className="newestButton"
            style={{backgroundImage:`url(${newest})`}}
            ></button>

            <button onClick={sortByOldest}
            className="oldestButton"
            style={{backgroundImage:`url(${oldest})`}}
            ></button>
        </div>

        <div className="home" style={{backgroundImage:`url(${dungeon})`}}>
            <div className="characterContainer">
                {sortedCharacters && sortedCharacters.map((character) => (
                <div className="characterFrame">
                    <div key={character._id} className="characters">
                    <Character
                        character={character}
                        onDelete={() => deleteHandler(character._id)}
                        onEdit={() => editPage(character._id)}
                    />
                    </div>
                </div>
                ))}
            </div>
        </div>
    <div>
        <h2 className="pickHeroTitle">Choose your hero or create a new one!</h2>
        <Link to='/characters/new'>
            <button className='lgCreateButton'
                type='button'
                style={{backgroundImage:`url(${create})`}}/>
        </Link>
        </div>
    </div>
    )
}

export default Home