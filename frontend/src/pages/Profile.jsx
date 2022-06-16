import { useState, useEffect } from "react"
import fetchUserDatas from "../services/user"
import fetchActivityDatas from "../services/activity"
import fetchAverageSessionsDatas from "../services/average"
import fetchPerformanceDatas from "../services/performance"
import "../styles/profile.css"
import Vertical from "../components/Vertical"
import fire from "../assets/fire.png"
import chicken from "../assets/chicken.png"
import apple from "../assets/apple.png"
import burger from "../assets/burger.png"

function Profile() {
    const userId = 18
    const [firstName, setFirstName] = useState("")
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
                <div className="welcome">
                    <div className="helloFirstName">
                        <p className="hello">Bonjour</p>
                        <p className="firstName">{firstName}</p>
                    </div>
                    <p className="congratulation">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                </div>
                <div className="datas">
                    <div className="graphs">
                        <div className="dailyActivity">
                            {sessions.map((session, index) => {
                                return (
                                    <div key={index}>
                                        <p>{`Session ${index + 1} :`}</p>
                                        <p>{`Day : ${session.day}`}</p>
                                        <p>{`Kilogrammes : ${session.kilogram}`}</p>
                                        <p>{`Calories : ${session.calories}`}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="smallGraphs">
                            <div className="sessionAverage">
                                {averages.map((average, index) => {
                                    return (
                                        <div key={index}>
                                            <p>{`Session average ${index + 1} :`}</p>
                                            <p>{`Day : ${average.day}`}</p>
                                            <p>{`Session length : ${average.sessionLength}`}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="performance">
                                {activitiesValues.map((activity, index) => {
                                    return (
                                        <div key={index}>
                                            <p>{`Activity ${index + 1} : ${activitiesKind[index + 1]}`}</p>
                                            <p>{`Value : ${activity.value}`}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="score">{`Score : ${score}`}</div>
                        </div>
                    </div>
                    <div className="nutrients">
                        <div className="nutrient">
                            <img className="nutrientImg" src={fire} alt="fire" />
                            <div className="nutrientDetails">
                                <p className="nutrientQuantity">{`${(calorieCount / 1000).toFixed(3).replace(".", ',')}kCal`}</p>
                                <p className="nutrientName">Calories</p>
                            </div>
                        </div>
                        <div className="nutrient">
                            <img className="nutrientImg" src={chicken} alt="chicken" />
                            <div className="nutrientDetails">
                                <p className="nutrientQuantity">{`${proteinCount}g`}</p>
                                <p className="nutrientName">Proteines</p>
                            </div>
                        </div>
                        <div className="nutrient">
                            <img className="nutrientImg" src={apple} alt="apple" />
                            <div className="nutrientDetails">
                                <p className="nutrientQuantity">{`${carbohydrateCount}g`}</p>
                                <p className="nutrientName">Glucides</p>
                            </div>
                        </div>
                        <div className="nutrient">
                            <img className="nutrientImg" src={burger} alt="burger" />
                            <div className="nutrientDetails">
                                <p className="nutrientQuantity">{`${lipidCount}g`}</p>
                                <p className="nutrientName">Calories</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile