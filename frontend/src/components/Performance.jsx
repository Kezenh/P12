import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts'
import "../styles/performance.css"

function Performance({ activities, firstName }) {
    return (
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
    )
}

export default Performance