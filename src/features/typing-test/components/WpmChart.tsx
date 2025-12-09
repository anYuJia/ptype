'use client';

import { useMemo } from 'react';
import {
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
  unit?: string;
}

export function WpmChart({ data, unit = 'WPM' }: WpmChartProps) {
  // Process data: use index as X-axis to avoid duplicate time issues
  // Each point gets a unique position, and we show the original time in tooltip
  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      index, // Use index as X position - guarantees unique values
      time: item.time, // Keep original time for tooltip display
      wpm: Number.isFinite(item.wpm) ? Math.max(0, item.wpm) : 0,
      accuracy: item.accuracy,
    }));
  }, [data]);

  if (chartData.length < 2) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-500">
        Not enough data to display chart
      </div>
    );
  }

  // Calculate Y domain with padding
  const maxWpm = Math.max(...chartData.map(d => d.wpm));
  const yMax = Math.ceil(Math.max(maxWpm, 50) * 1.15);

  return (
    <div className="h-48 w-full min-h-[192px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
          <defs>
            <linearGradient id="wpmGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="index"
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => `${chartData[value]?.time ?? value}s`}
          />
          <YAxis
            stroke="#6b7280"
            fontSize={12}
            width={45}
            domain={[0, yMax]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff',
            }}
            labelFormatter={(index) => `Time: ${chartData[index]?.time ?? index}s`}
            formatter={(value: number, name: string) => [
              Math.round(value),
              name === 'wpm' ? unit : name,
            ]}
          />
          <Area
            type="monotone"
            dataKey="wpm"
            stroke="#14b8a6"
            strokeWidth={2}
            fill="url(#wpmGradient)"
            dot={false}
            activeDot={{ r: 5, fill: '#fff', stroke: '#14b8a6', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
