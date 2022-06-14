import { useState, useEffect } from "react"
import fetchUserDatas from "../services/user"

function Profile() {

    const [firstName, setFirstName] = useState("")

    useEffect(() => {
        async function truc() {
            if (!firstName) {
                const toto = await fetchUserDatas()
                console.log(toto)
                setFirstName(toto)
            }
        }
        truc()
        // eslint-disable-next-line
    }, [])

    return (
        <div>{`Prénom : ${firstName}`}</div>
    )
}

export default Profile