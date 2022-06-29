import { PieChart, Pie, Cell } from 'recharts'
import "../styles/score.css"

/**
 * Create score chart
 * @param { Array.<{value: Number}> } score 
 * @return { HTMLElement }
 */
function Score({ score }) {
    return (
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
    )
}

export default Score