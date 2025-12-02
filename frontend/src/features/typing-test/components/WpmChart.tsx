'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { WpmHistoryPoint } from '../store/typingStore';

interface WpmChartProps {
  data: WpmHistoryPoint[];
}

export function WpmChart({ data }: WpmChartProps) {
  if (data.length < 2) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-500">
        Not enough data to display chart
      </div>
    );
  }

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="wpmGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="time"
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => `${value}s`}
          />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff',
            }}
            labelFormatter={(value) => `Time: ${value}s`}
            formatter={(value: number, name: string) => [
              value,
              name === 'wpm' ? 'WPM' : 'Accuracy %',
            ]}
          />
          <Area
            type="monotone"
            dataKey="wpm"
            stroke="#14b8a6"
            strokeWidth={2}
            fill="url(#wpmGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
