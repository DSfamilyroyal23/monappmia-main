import React, { useState, useEffect } from 'react';
import { FullStarIcon, HalfStarIcon, EmptyStarIcon, BuildingIcon } from '../../components/icons';

interface GivenEvaluation {
    id: string;
    targetId: number;
    targetName: string;
    rating: number;
    missionName: string;
    comment: string;
    date: string;
}

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

const GivenEvaluationsPage: React.FC = () => {
    const [evaluations, setEvaluations] = useState<GivenEvaluation[]>([]);

    useEffect(() => {
        try {
            const storedEvals = localStorage.getItem('mia-given-evals');
            if (storedEvals) {
                setEvaluations(JSON.parse(storedEvals));
            }
        } catch (error) {
            console.error("Failed to load given evaluations from localStorage:", error);
            setEvaluations([]);
        }
    }, []);

    if (evaluations.length === 0) {
        return (
            <div className="text-center py-16 bg-card rounded-2xl border border-border/50">
                <div className="w-16 h-16 bg-secondary mx-auto rounded-full flex items-center justify-center text-muted-foreground"><BuildingIcon className="w-8 h-8"/></div>
                <h3 className="text-xl font-semibold mt-4">Aucune évaluation donnée</h3>
                <p className="text-muted-foreground mt-2">Vous n'avez pas encore évalué d'entreprise. Vos évaluations apparaîtront ici.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
             {evaluations.map((item) => (
                <div key={item.id} className="glass-card rounded-2xl p-6 border border-border/50 shadow-card">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-foreground">{item.targetName}</h3>
                            <p className="text-sm font-semibold text-primary">Mission : {item.missionName}</p>
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

export default GivenEvaluationsPage;