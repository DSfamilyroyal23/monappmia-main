
import React from 'react';

interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease';
    icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, changeType, icon }) => {
    const isIncrease = changeType === 'increase';
    const changeColor = isIncrease ? 'text-success' : 'text-destructive';
    
    return (
        <div className="glass-card rounded-2xl p-6 border border-border/50 shadow-card hover:shadow-glow-primary transition-all duration-300 animate-fade-in">
            <div className="flex justify-between items-start mb-4">
                <div className="text-muted-foreground font-semibold text-sm uppercase tracking-wide">{title}</div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    {icon}
                </div>
            </div>
            <div className="text-3xl font-bold mb-2">{value}</div>
            <div className={`flex items-center ${changeColor} text-sm font-semibold`}>
                {isIncrease ? (
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                ) : (
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                )}
                <span>{change}</span>
            </div>
        </div>
    );
};

export default StatsCard;
