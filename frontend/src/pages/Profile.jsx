import { useState, useEffect } from "react"
import fetchUserDatas from "../services/user"
import fetchActivityDatas from "../services/activity"
import fetchAverageSessionsDatas from "../services/average"
import fetchPerformanceDatas from "../services/performance"
import "../styles/profile.css"
import Vertical from "../components/Vertical"

function Profile() {
    const userId = 18
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [score, setScore] = useState("")
    const [calorieCount, setCalorieCount] = useState("")
    const [proteinCount, setProteinCount] = useState("")
    const [carbohydrateCount, setcarbohydrateCount] = useState("")
    const [lipidCount, setLipidCount] = useState("")
    const [sessions, setSessions] = useState([])
    const [averages, setAverages] = useState([])
    const [activitiesKind, setActivitiesKind] = useState([])
    const [activitiesValues, setActivitiesValues] = useState([])

    async function setUser() {
        const userDatas = await fetchUserDatas(18)
        setFirstName(userDatas.userInfos.firstName)
        setLastName(userDatas.userInfos.lastName)
        setAge(userDatas.userInfos.age)
        setScore(userDatas.score)
        setCalorieCount(userDatas.keyData.calorieCount)
        setProteinCount(userDatas.keyData.proteinCount)
        setcarbohydrateCount(userDatas.keyData.carbohydrateCount)
        setLipidCount(userDatas.keyData.lipidCount)
    }

    async function setActivity() {
        setSessions(await fetchActivityDatas(userId))
    }

    async function setAverageSessions() {
        setAverages(await fetchAverageSessionsDatas(userId))
    }

    async function setPerformance() {
        const performanceDatas = await fetchPerformanceDatas(userId)
        setActivitiesKind(performanceDatas.kind)
        setActivitiesValues(performanceDatas.data)
    }

    useEffect(() => {
        setUser()
        setActivity()
        setAverageSessions()
        setPerformance()
    }, [])

    return (
        <div className="profile">
            <Vertical />
            <div>
                <section>
                    <h2>Infos utilisateurs :</h2>
                    <div>{`Prénom : ${firstName}`}</div>
                    <div>{`Nom : ${lastName}`}</div>
                    <div>{`Age : ${age}`}</div>
                    <div>{`Score : ${score}`}</div>
                    <div>{`Calories : ${calorieCount}`}</div>
                    <div>{`Proteines : ${proteinCount}`}</div>
                    <div>{`Carbohydrates : ${carbohydrateCount}`}</div>
                    <div>{`Lipides : ${lipidCount}`}</div>
                </section>
                <section className="grey">
                    <h2>Activité quotidienne :</h2>
                    {sessions.map((session, index) => {
                        return (
                            <div key={index} className="session">
                                <p>{`Session ${index + 1} :`}</p>
                                <p className="sessionDetail">{`Day : ${session.day}`}</p>
                                <p className="sessionDetail">{`Kilogrammes : ${session.kilogram}`}</p>
                                <p className="sessionDetail">{`Calories : ${session.calories}`}</p>
                            </div>
                        )
                    })}
                </section>
                <section>
                    <h2>Durée sessions :</h2>
                    {averages.map((average, index) => {
                        return (
                            <div key={index} className="session">
                                <p>{`Session average ${index + 1} :`}</p>
                                <p className="sessionDetail">{`Day : ${average.day}`}</p>
                                <p className="sessionDetail">{`Session length : ${average.sessionLength}`}</p>
                            </div>
                        )
                    })}
                </section>
                <section className="grey">
                    <h2>Performance :</h2>
                    {activitiesValues.map((activity, index) => {
                        return (
                            <div key={index} className="session">
                                <p>{`Activity ${index + 1} : ${activitiesKind[index + 1]}`}</p>
                                <p>{`Value : ${activity.value}`}</p>
                            </div>
                        )
                    })}
                </section>
            </div>
        </div>
    )
}

export default Profile