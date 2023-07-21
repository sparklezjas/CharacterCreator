import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import axios from 'axios'
import Character from "../components/Character"

const Home = () => {
    const {user} = useAuthContext()
    const [allCharacters, setAllCharacters] = useState([]);
    const [sortOrder, setSortOrder] = useState();
    

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/characters/all')
            .then((res) => {
                console.log(res);
                setAllCharacters(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const characterOrder = [...allCharacters].sort((first, last) => {
            const oldest = new Date(first.createdAt);
            const newest = new Date(last.createdAt);
            if (sortOrder === 'oldest') {
                return oldest - newest
            }  else {
                return newest - oldest;
            }
        });
        setAllCharacters(characterOrder);
    }, [sortOrder]);

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

          })
          .catch((err) => {
            console.log(err);
          });
      };

      useEffect(() => {
        axios.get(`http://localhost:4000/api/characters/all`)
        .then((res) => {
            setAllCharacters(res.data)
        })
        .catch((err) => console.log(err))
      }, [deleteHandler])
return (
    <div className="home">
        <div className="characters">
                <button onClick={sortByNewest}>Newest</button>
                <button onClick={sortByOldest}>Oldest</button>
                {allCharacters && allCharacters.map((character) => (
                    <Character key={character._id} 
                    character = {character}
                    onDelete={() => deleteHandler(character._id)}
                    />
                    
                ))}
        </div>
    </div>
    )
}

export default Home