import React from 'react';
import { MISSIONS_DATA } from '../../constants';
import { FullStarIcon, HalfStarIcon, EmptyStarIcon } from '../../components/icons';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    const empty = 5 - full - (half ? 1 : 0);
    return (
        <div className="flex items-center gap-1">
            {Array(full).fill(0).map((_, i) => <span key={`f-${i}`} className="text-warning"><FullStarIcon/></span>)}
            {half && <span className="text-warning"><HalfStarIcon/></span>}
            {Array(empty).fill(0).map((_, i) => <span key={`e-${i}`} className="text-warning opacity-50"><EmptyStarIcon/></span>)}
             <span className="ml-2 font-semibold text-foreground">{rating.toFixed(1)}</span>
        </div>
    );
};

const evaluations = [
    { mission: MISSIONS_DATA[0], rating: 4.8, comment: "Très proactif et créatif. Excellente contribution à la campagne.", date: "15 Oct 2025" },
    { mission: MISSIONS_DATA[1], rating: 4.2, comment: "Ponctuel et efficace. A bien suivi les instructions.", date: "28 Sep 2025" },
    { mission: MISSIONS_DATA[3], rating: 4.5, comment: "Excellent service client, très apprécié par les clients.", date: "10 Sep 2025" },
];

const WorkerEvaluationsPage: React.FC = () => {
    return (
        <div className="space-y-6">
             {evaluations.map((item, index) => (
                <div key={index} className="glass-card rounded-2xl p-6 border border-border/50 shadow-card">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-foreground">{item.mission.name}</h3>
                            <p className="text-sm font-semibold text-primary">{item.mission.companyName}</p>
                        </div>
                        <div className="flex flex-col items-end">
                             <StarRating rating={item.rating} />
                             <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                        </div>
                    </div>
                     <div className="mt-4 pt-4 border-t border-border/50">
                        <p className="text-muted-foreground italic">"{item.comment}"</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WorkerEvaluationsPage;
