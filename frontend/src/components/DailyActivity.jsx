import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import "../styles/dailyActivity.css"

/**
 * Create the DailyActivity chart using sessions datas
 * @param { Array.<{day: String, kilogram: Number, calories: Number, index: Number}> } sessions 
 * @return { HTMLElement }
 */
function DailyActivity({ sessions }) {

    /**
     * Create the custom tooltip box when hovering DailyActivity chart
     * @param { Array.<{value: Number}> } payload 
     * @return { HTMLElement } 
     */
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

    return (
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
                <Bar dataKey="calories" fill="#E60000" barSize={7} radius={[3, 3, 0, 0]} />
            </BarChart>
        </div>
    )
}

export default DailyActivity