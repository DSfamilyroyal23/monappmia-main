import React from 'react';
import { WORKERS_DATA } from '../../constants';
import { SearchIcon, FilterIcon } from '../../components/icons';
import { FullStarIcon, HalfStarIcon, EmptyStarIcon } from '../../components/icons';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-1">
            {Array(fullStars).fill(0).map((_, i) => <span key={`f-${i}`} className="text-warning"><FullStarIcon/></span>)}
            {halfStar && <span className="text-warning"><HalfStarIcon/></span>}
            {Array(emptyStars).fill(0).map((_, i) => <span key={`e-${i}`} className="text-warning opacity-50"><EmptyStarIcon/></span>)}
        </div>
    );
};

const evaluations = [
    { worker: WORKERS_DATA[0], mission: "Campagne Marketing Q4", date: "20 Nov 2025", comment: "Excellente initiative et autonomie. Sophie a été un atout majeur pour l'équipe."},
    { worker: WORKERS_DATA[1], mission: "Inventaire de fin d'année", date: "12 Nov 2025", comment: "Très efficace et organisé. A terminé ses tâches en avance."},
    { worker: WORKERS_DATA[2], mission: "Clôture comptable", date: "10 Nov 2025", comment: "Travail impeccable, grande rigueur et professionnalisme. Je recommande vivement."},
    { worker: WORKERS_DATA[0], mission: "Lancement produit", date: "05 Oct 2025", comment: "Bonnes compétences en communication, mais peut améliorer la gestion du temps."},
];

const EvaluationsPage: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                 <h2 className="text-2xl font-bold gradient-text">Historique des évaluations</h2>
                 <div className="flex gap-3">
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon /></div>
                        <input type="text" placeholder="Rechercher..." className="bg-card border border-border rounded-xl pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                     <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-semibold flex items-center gap-2"><FilterIcon /> Filtrer</button>
                </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-border/50 shadow-card">
                 <div className="space-y-4">
                    {evaluations.map((evalItem, index) => (
                        <div key={index} className="p-4 bg-secondary/50 rounded-xl">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                                <div className="flex items-center gap-3">
                                    {evalItem.worker.avatarUrl ? (
                                        <img src={evalItem.worker.avatarUrl} alt={evalItem.worker.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                                    ) : (
                                        <div className={`w-12 h-12 bg-gradient-${evalItem.worker.avatarBg} rounded-xl flex items-center justify-center text-white font-semibold flex-shrink-0`}>
                                            {evalItem.worker.avatarInitials}
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-bold text-foreground">{evalItem.worker.name}</p>
                                        <p className="text-sm text-muted-foreground">Mission : {evalItem.mission}</p>
                                    </div>
                                </div>
                                <div className="mt-2 md:mt-0 flex flex-col items-start md:items-end">
                                    <StarRating rating={evalItem.worker.rating} />
                                    <p className="text-xs text-muted-foreground mt-1">{evalItem.date}</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground pl-16 text-sm italic">"{evalItem.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EvaluationsPage;