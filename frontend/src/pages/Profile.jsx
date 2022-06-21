import { useState, useEffect, PureComponent } from "react"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
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
        let sessions = await fetchActivityDatas(userId)
        sessions.map((session, index) => {
            session.kcal = session.calories / 10
            session.index = index + 1
        })
        setSessions(sessions)
    }

    async function setAverageSessions() {
        setAverages(await fetchAverageSessionsDatas(userId))
    }

    async function setPerformance() {
        const performanceDatas = await fetchPerformanceDatas(userId)
        setActivitiesKind(performanceDatas.kind)
        setActivitiesValues(performanceDatas.data)
    }

    function customTooltip({ payload }) {
        if (payload && payload.length) {
            return (
                <div className="customTooltip">
                    <p className="customTooltipText">{`${payload[0].value}kg`}</p>
                    <p className="customTooltipText">{`${payload[1].value}Kcal`}</p>
                </div>
            )
        }
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
                            <div className="dailyActivityLegend">
                                <p>Activité quotidienne</p>
                                <ul>
                                    <li className="legend">
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4 8C6.20914 8 8 6.20914 8 4C8 1.79086 6.20914 0 4 0C1.79086 0 0 1.79086 0 4C0 6.20914 1.79086 8 4 8Z" fill="#282D30" />
                                        </svg>
                                        <p className="legendText">Poids (kg)</p>
                                    </li>
                                    <li className="legend">
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4 8C6.20914 8 8 6.20914 8 4C8 1.79086 6.20914 0 4 0C1.79086 0 0 1.79086 0 4C0 6.20914 1.79086 8 4 8Z" fill="#E60000" />
                                        </svg>
                                        <p className="legendText">Calories brûlées (kCal)</p>
                                    </li>
                                </ul>
                            </div>
                            <BarChart
                                width={835}
                                height={202}
                                data={sessions}
                                barGap={8}
                            >
                                <CartesianGrid strokeDasharray="2" vertical={false} />
                                <XAxis dataKey="index" tickLine={false} tickMargin={16} tick={{ fill: '#9B9EAC' }} axisLine={false} />
                                <YAxis orientation="right" domain={['dataMin - 2', 'dataMax + 2']} tickLine={false} axisLine={false} tick={{ fill: '#9B9EAC' }} />
                                <Tooltip content={customTooltip} />
                                <Bar dataKey="kilogram" fill="#282D30" barSize={7} radius={[3, 3, 0, 0]} />
                                <Bar dataKey="kcal" fill="#E60000" barSize={7} radius={[3, 3, 0, 0]} />
                            </BarChart>
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