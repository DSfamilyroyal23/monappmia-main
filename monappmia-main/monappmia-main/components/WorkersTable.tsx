import React from 'react';
import { Worker } from '../types';
import { WORKERS_DATA } from '../constants';
import { FullStarIcon, HalfStarIcon, EmptyStarIcon, FilterIcon, PlusIcon } from './icons';

interface WorkersTableProps {
    onRateWorker: (worker: Worker) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const starArray = [];

    for(let i = 0; i < fullStars; i++) starArray.push(<span key={`full-${i}`} className="text-warning"><FullStarIcon /></span>);
    if(halfStar) starArray.push(<span key="half" className="text-warning"><HalfStarIcon /></span>);
    for(let i = 0; i < emptyStars; i++) starArray.push(<span key={`empty-${i}`} className="text-warning"><EmptyStarIcon /></span>);

    return (
        <div className="flex items-center gap-1">
            {starArray}
            <span className="ml-2 font-semibold">{rating.toFixed(1)}</span>
        </div>
    );
};


const WorkersTable: React.FC<WorkersTableProps> = ({ onRateWorker }) => {
    return (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold gradient-text">Derniers Intérimaires Évalués</h2>
                <div className="flex gap-3">
                    <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 hover:bg-secondary/80">
                        <FilterIcon />
                        Filtrer
                    </button>
                    <button className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 hover:shadow-glow">
                        <PlusIcon />
                        Nouvelle évaluation
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-4 px-4 text-muted-foreground font-semibold text-sm uppercase">Intérimaire</th>
                            <th className="text-left py-4 px-4 text-muted-foreground font-semibold text-sm uppercase">Missions</th>
                            <th className="text-left py-4 px-4 text-muted-foreground font-semibold text-sm uppercase">Note</th>
                            <th className="text-left py-4 px-4 text-muted-foreground font-semibold text-sm uppercase">Dernière mission</th>
                            <th className="text-left py-4 px-4 text-muted-foreground font-semibold text-sm uppercase">Statut</th>
                            <th className="text-left py-4 px-4 text-muted-foreground font-semibold text-sm uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {WORKERS_DATA.map((worker, index) => (
                            <tr key={worker.id} className={`${index < WORKERS_DATA.length - 1 ? 'border-b border-border' : ''} hover:bg-secondary transition-colors duration-200`}>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        {worker.avatarUrl ? (
                                            <img src={worker.avatarUrl} alt={worker.name} className="w-12 h-12 rounded-xl object-cover" />
                                        ) : (
                                            <div className={`w-12 h-12 bg-gradient-${worker.avatarBg} rounded-xl flex items-center justify-center text-white font-semibold`}>
                                                {worker.avatarInitials}
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-semibold text-foreground">{worker.name}</div>
                                            <div className="text-sm text-muted-foreground">{worker.role}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-muted-foreground">{worker.missions}</td>
                                <td className="py-4 px-4"><StarRating rating={worker.rating} /></td>
                                <td className="py-4 px-4 text-muted-foreground">{worker.lastMissionDate}</td>
                                <td className="py-4 px-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${worker.status === 'Active' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                                        {worker.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex gap-2">
                                        <button onClick={() => onRateWorker(worker)} className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-glow">
                                            Noter
                                        </button>
                                        <button className="bg-secondary text-secondary-foreground px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-secondary/80">
                                            Profil
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkersTable;