import React from 'react';
import PerformanceChart from '../../components/PerformanceChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '../../App';

const dataByRole = [
  { name: 'Logistique', note: 4.1 },
  { name: 'Marketing', note: 4.8 },
  { name: 'Comptabilité', note: 4.5 },
  { name: 'Vente', note: 4.3 },
];

const completionData = [
    { name: 'Terminées', value: 85 },
    { name: 'Annulées', value: 15 },
];

const lightPieColors = ['hsl(142 70% 45%)', 'hsl(0 84% 60%)'];
const darkPieColors = ['hsl(142 70% 50%)', 'hsl(0 84% 60%)'];


const PerformancePage: React.FC = () => {
    const { theme } = useTheme();
    const gridColor = theme === 'dark' ? 'hsl(var(--border))' : 'hsl(var(--border))';
    const axisColor = theme === 'dark' ? 'hsl(var(--muted-foreground))' : 'hsl(var(--muted-foreground))';
    const barColor = theme === 'dark' ? 'hsl(200 95% 60%)' : 'hsl(200 95% 55%)';
    const pieColors = theme === 'dark' ? darkPieColors : lightPieColors;

    return (
        <div className="space-y-8">
            {/* Main Performance Chart */}
            <div className="relative">
                 <PerformanceChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Ratings by Role */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                     <h2 className="text-xl font-bold gradient-text mb-6">Note moyenne par secteur</h2>
                     <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataByRole} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.5} />
                                <XAxis type="number" domain={[0, 5]} stroke={axisColor} />
                                <YAxis type="category" dataKey="name" stroke={axisColor} width={80} tick={{ fill: axisColor }} />
                                <Tooltip cursor={{ fill: 'hsl(var(--secondary))' }} contentStyle={{ backgroundColor: 'hsl(var(--card) / 0.8)', border: '1px solid hsl(var(--border))', borderRadius: '1rem', backdropFilter: 'blur(4px)' }} />
                                <Bar dataKey="note" fill={barColor} background={{ fill: 'hsl(var(--secondary))' }} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                 {/* Mission Completion Rate */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                     <h2 className="text-xl font-bold gradient-text mb-6">Taux de complétion des missions</h2>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={completionData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {completionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card) / 0.8)', border: '1px solid hsl(var(--border))', borderRadius: '1rem', backdropFilter: 'blur(4px)' }}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformancePage;