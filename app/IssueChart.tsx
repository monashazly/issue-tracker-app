"use client"

import { Card } from "@radix-ui/themes"
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar  , Cell} from "recharts"

interface Props {
    open: number,
    closed: number,
    inProgress: number
}


const IssueChart = ({ open, closed, inProgress }: Props) => {

    const data = [
        { label: 'Open', value: open , fill : 'rgba(128, 0, 0, 0.5)'},
        { label: 'In Progress', value: inProgress , fill : "rgba(128, 0, 128, 0.6)" },
        { label: 'Closed', value: closed  , fill : "rgba(0, 109, 0, 0.571)"  },
    ];

    return (
        // fill={(barData :string) => barData.fill}
        <Card>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Bar dataKey="value" barSize={60}
                        strokeWidth={1}
                        style={{ fill: 'var(--accent-9)' }}/>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default IssueChart
