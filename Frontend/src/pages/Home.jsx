import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"


const Home = () => {
    const {user} = useAuthContext()

return (
    <div className="home">
        <div className="characters">
Hello
        </div>

    </div>
    )
}

export default Home