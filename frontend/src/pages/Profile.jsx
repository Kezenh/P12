import { useState, useEffect } from "react"

function Profile() {

    const [firstName, setFirstName] = useState("")

    useEffect(() => {
        fetchUserFirstName()
    }, [])

    async function fetchUserFirstName() {
        try {
            const response = await fetch("http://localhost:4000/user/18")
            const user = await response.json()
            setFirstName(user.data.userInfos.firstName)
        } catch (err) {
            console.log("Error :", err)
        }
    }

    return (
        <div>{`Prénom : ${firstName}`}</div>
    )
}

export default Profile