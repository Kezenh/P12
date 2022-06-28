import { useState, useEffect } from "react"
import fetchUserDatas from "../services/user"
import fetchActivityDatas from "../services/activity"
import fetchAverageSessionsDatas from "../services/average"
import fetchPerformanceDatas from "../services/performance"
import "../styles/profile.css"
import Vertical from "../components/Vertical"
import Nutrient from "../components/Nutrient"
import DailyActivity from "../components/DailyActivity"
import SessionAverage from "../components/SessionAverage"
import Performance from "../components/Performance"
import Score from "../components/Score"

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
    const [activities, setActivities] = useState([])

    async function setUser() {
        const userDatas = await fetchUserDatas(18)
        setFirstName(userDatas.userInfos.firstName)
        let score = [{ value: userDatas.score }, { value: 1 - userDatas.score }]
        setScore(score)
        setCalorieCount(userDatas.keyData.calorieCount)
        setProteinCount(userDatas.keyData.proteinCount)
        setcarbohydrateCount(userDatas.keyData.carbohydrateCount)
        setLipidCount(userDatas.keyData.lipidCount)
    }

    async function setActivity() {
        let sessions = await fetchActivityDatas(userId)
        sessions.map((session, index) => {
            session.kcal = session.calories
            session.index = index + 1
        })
        setSessions(sessions)
    }

    async function setAverageSessions() {
        let averages = await await fetchAverageSessionsDatas(userId)
        averages.map((average) => {
            switch (average.day) {
                case 1:
                    average.day = "L"
                    break
                case 2:
                    average.day = "M"
                    break
                case 3:
                    average.day = "M"
                    break
                case 4:
                    average.day = "J"
                    break
                case 5:
                    average.day = "V"
                    break
                case 6:
                    average.day = "S"
                    break
                case 7:
                    average.day = "D"
                    break
                default:
                    average.day = "?"
                    break
            }
        })
        setAverages(averages)
    }

    async function setPerformance() {
        let activities = await fetchPerformanceDatas(userId)
        activities.data.map((data, index) => {
            switch (data.kind) {
                case 1:
                    data.kind = "Cardio"
                    break
                case 2:
                    data.kind = "Energie"
                    break
                case 3:
                    data.kind = "Endurance"
                    break
                case 4:
                    data.kind = "Force"
                    break
                case 5:
                    data.kind = "Vitesse"
                    break
                case 6:
                    data.kind = "Intensité"
                    break
                default:
                    data.kind = "?"
                    break
            }
        })
        setActivities(activities)
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
            <div className="profileBody">
                <div className="welcome">
                    <div className="helloFirstName">
                        <p className="hello">Bonjour</p>
                        <p className="firstName">{firstName}</p>
                    </div>
                    <p className="congratulation">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                </div>
                <div className="datas">
                    <div className="graphs">
                        <DailyActivity sessions={sessions} />
                        <div className="smallGraphs">
                            <SessionAverage averages={averages} />
                            <Performance activities={activities} firstName={firstName} />
                            <Score score={score} />
                        </div>
                    </div>
                    <div className="nutrients">
                        <Nutrient src={require("../assets/fire.png")} name="Calories" quantity={`${(calorieCount / 1000).toFixed(3).replace(".", ',')}kCal`} />
                        <Nutrient src={require("../assets/chicken.png")} name="Proteines" quantity={`${proteinCount}g`} />
                        <Nutrient src={require("../assets/apple.png")} name="Glucides" quantity={`${carbohydrateCount}g`} />
                        <Nutrient src={require("../assets/burger.png")} name="Lipides" quantity={`${lipidCount}g`} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile