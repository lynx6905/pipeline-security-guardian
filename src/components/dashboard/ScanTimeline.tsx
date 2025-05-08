
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ScanData {
  date: string;
  vulnerabilities: number;
}

interface ScanTimelineProps {
  data: ScanData[];
}

const ScanTimeline = ({ data }: ScanTimelineProps) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis 
            dataKey="date" 
            tickLine={false} 
            axisLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
          />
          <YAxis 
            tickLine={false} 
            axisLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              borderColor: "#334155",
              borderRadius: "0.375rem",
              color: "#f8fafc",
            }}
            labelStyle={{ color: "#f8fafc" }}
          />
          <Line
            type="monotone"
            dataKey="vulnerabilities"
            stroke="#0ea5e9"
            strokeWidth={2}
            activeDot={{ r: 6, fill: "#0ea5e9" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScanTimeline;
