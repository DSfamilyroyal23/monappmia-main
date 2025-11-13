
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PERFORMANCE_CHART_DATA } from '../constants';
import { useTheme } from '../App';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-border/50 shadow-card">
        <p className="label text-muted-foreground">{`${label}`}</p>
        <p className="intro text-primary font-bold">{`Note : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};


const PerformanceChart: React.FC = () => {
    const { theme } = useTheme();
    const [period, setPeriod] = useState('monthly');
    const periodButtons = [
        { id: 'monthly', label: 'Mensuel' },
        { id: 'quarterly', label: 'Trimestriel' },
        { id: 'yearly', label: 'Annuel' },
    ];

    const gridColor = theme === 'dark' ? 'hsl(var(--border))' : 'hsl(var(--border))';
    const axisColor = theme === 'dark' ? 'hsl(var(--muted-foreground))' : 'hsl(var(--muted-foreground))';
    const lineColor = theme === 'dark' ? 'hsl(var(--primary))' : 'hsl(var(--primary))';
    const dotFillColor = theme === 'dark' ? 'hsl(var(--primary))' : 'hsl(var(--primary))';
    const dotStrokeColor = theme === 'dark' ? 'hsl(var(--card))' : 'hsl(var(--background))';


    return (
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-card">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold gradient-text">Performance des Intérimaires</h2>
                <div className="flex gap-2">
                    {periodButtons.map(btn => (
                        <button 
                            key={btn.id}
                            onClick={() => setPeriod(btn.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${period === btn.id ? 'bg-primary text-primary-foreground hover:shadow-glow' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={PERFORMANCE_CHART_DATA} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.5} />
                        <XAxis dataKey="name" stroke={axisColor} />
                        <YAxis domain={[3.5, 5]} stroke={axisColor} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line 
                            type="monotone" 
                            dataKey="Note moyenne" 
                            stroke={lineColor} 
                            strokeWidth={3} 
                            dot={{ fill: dotFillColor, stroke: dotStrokeColor, strokeWidth: 2, r: 5 }}
                            activeDot={{ r: 7, stroke: dotStrokeColor, strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PerformanceChart;