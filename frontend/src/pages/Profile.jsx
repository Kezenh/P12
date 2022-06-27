import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Radar, RadarChart, PolarGrid, PolarAngleAxis, PieChart, Pie, Cell } from 'recharts'
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
        averages.map((average, index) => {
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

    function customTooltipDaily({ payload }) {
        if (payload && payload.length) {
            return (
                <div className="customTooltipDaily">
                    <p className="customTooltipTextDaily">{`${payload[0].value}kg`}</p>
                    <p className="customTooltipTextDaily">{`${payload[1].value}Kcal`}</p>
                </div>
            )
        }
    }

    function customTooltipAverage({ payload }) {
        if (payload && payload.length) {
            return (
                <div className="customTooltipAverage">
                    <p className="customTooltipTextAverage">{`${payload[0].value} min`}</p>
                </div>
            )
        }
    }

    function customizedActiveDot(props) {
        const { cx, cy } = props;
        return (
            <svg x={cx - 10} y={cy - 10} className="dot" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9 13.8607C11.2091 13.8607 13 12.0809 13 9.88545C13 7.68999 11.2091 5.91022 9 5.91022C6.79086 5.91022 5 7.68999 5 9.88545C5 12.0809 6.79086 13.8607 9 13.8607Z" fill="white" />
                <path d="M9 16.3607C12.5752 16.3607 15.5 13.4762 15.5 9.88545C15.5 6.29466 12.5752 3.41022 9 3.41022C5.42481 3.41022 2.5 6.29466 2.5 9.88545C2.5 13.4762 5.42481 16.3607 9 16.3607Z" stroke="white" strokeOpacity="0.198345" strokeWidth="5" />
            </svg>

        )
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
                                        <p className="legendText">Calories brûlées (cal)</p>
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
                                <YAxis orientation="right" tickLine={false} axisLine={false} tick={{ fill: '#9B9EAC' }} tickCount={20} />
                                <Tooltip content={customTooltipDaily} />
                                <Bar dataKey="kilogram" fill="#282D30" barSize={7} radius={[3, 3, 0, 0]} />
                                <Bar dataKey="kcal" fill="#E60000" barSize={7} radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </div>
                        <div className="smallGraphs">
                            <div className="sessionAverage">
                                <p className="averageTitle">Durée moyenne des sessions</p>
                                <LineChart
                                    width={231}
                                    height={140}
                                    data={averages}
                                >
                                    <XAxis tickLine={false} axisLine={false} dataKey="day" tick={{ fill: '#FFFFFF' }} />
                                    <Tooltip content={customTooltipAverage} />
                                    <Line strokeWidth={2} type="monotone" dataKey="sessionLength" stroke="#FFFFFF" activeDot={customizedActiveDot} dot={false} />
                                </LineChart>
                            </div>
                            <div className="performance">
                                <RadarChart
                                    startAngle={-150}
                                    endAngle={210}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    data={activities.data}
                                    width={258}
                                    height={225}
                                    margin={{
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0
                                    }}
                                >
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="kind" tick={{ fill: '#FFFFFF', fontSize: 12 }} />
                                    <Radar name={firstName} dataKey="value" fill="#FF0101" fillOpacity={0.7} />
                                </RadarChart>
                            </div>
                            <div className="score">
                                <p className="scoreTitle">Score</p>
                                {score[0] === undefined ?
                                    <p></p> :
                                    <p className="scoreValue">{`${score[0].value * 100}%`}</p>
                                }
                                <p className="scoreText">de votre objectif</p>
                                <PieChart width={300} height={300}>
                                    <Pie dataKey="value" data={score} cx="50%" cy="50%" innerRadius={85} outerRadius={95} startAngle={90} endAngle={450} label={false}>
                                        {score[0] === undefined ?
                                            <p></p> :
                                            score.map((data, index) => (
                                                index === 0 ?
                                                    <Cell key={`cell-${index}`} fill="#FF0000" /> :
                                                    <Cell key={`cell-${index}`} fill="#FBFBFB" />
                                            ))
                                        }
                                    </Pie>
                                </PieChart>
                            </div>
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