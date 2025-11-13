
import React from 'react';
import StatsCard from '../components/StatsCard';
import { Company, Mission } from '../types';
// FIX: Removed non-existent StarIcon and corrected icon usage.
import { BriefcaseIcon, BuildingIcon, FullStarIcon, HalfStarIcon, EmptyStarIcon } from '../components/icons';
import { MISSIONS_DATA } from '../constants';

interface WorkerDashboardProps {
    onRateCompany: (company: Company) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const starArray = [];

    for(let i = 0; i < fullStars; i++) starArray.push(<span key={`full-${i}`} className="text-warning"><FullStarIcon /></span>);
    if(halfStar) starArray.push(<span key="half" className="text-warning"><HalfStarIcon /></span>);
    // FIX: Use EmptyStarIcon for empty stars instead of a transparent FullStarIcon.
    for(let i = 0; i < emptyStars; i++) starArray.push(<span key={`empty-${i}`} className="text-warning opacity-50"><EmptyStarIcon /></span>);

    return (
        <div className="flex items-center gap-1">
            {starArray}
            <span className="ml-2 font-semibold">{rating.toFixed(1)}</span>
        </div>
    );
};

const WorkerDashboard: React.FC<WorkerDashboardProps> = ({ onRateCompany }) => {
    
    // Mock data lookup for companies
    const findCompanyByName = (name: string) => {
        // A real app would have a more robust data structure
        const companies: Record<string, Company> = {
            "Innovatech Solutions": { id: 2, name: 'Innovatech Solutions', sector: 'Technologie', rating: 4.8, missionsPosted: 12, location: 'Lyon' },
            "Logistique Pro": { id: 1, name: 'Logistique Pro', sector: 'Transport', rating: 4.2, missionsPosted: 25, location: 'Paris' },
            "GastroDélices": { id: 3, name: 'GastroDélices', sector: 'Restauration', rating: 4.5, missionsPosted: 42, location: 'Marseille' },
        };
        return companies[name];
    }

    return (
        <div className="animate-fade-in space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatsCard title="Ma Note Moyenne" value="4.6/5" change="0.1 ce mois" changeType="increase" icon={<FullStarIcon />} />
                <StatsCard title="Missions Réalisées" value="14" change="2 nouvelles" changeType="increase" icon={<BriefcaseIcon />} />
                <StatsCard title="Entreprises Évaluées" value="8" change="1 nouvelle" changeType="increase" icon={<BuildingIcon />} />
            </div>

            <div className="glass-card rounded-2xl p-6 border border-border/50 shadow-card">
                <h2 className="text-xl font-bold gradient-text mb-6">Mon Historique de Missions</h2>
                 <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border/50">
                                <th className="text-left py-4 px-4 text-muted-foreground font-semibold text-sm uppercase">Mission</th>
                                <th className="text-left py-4 px-4 text-muted-foreground font-semibold text-sm uppercase">Entreprise</th>
                                <th className="text-left py-4 px-4 text-muted-foreground font-semibold text-sm uppercase">Note Entreprise</th>
                                <th className="text-left py-4 px-4 text-muted-foreground font-semibold text-sm uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MISSIONS_DATA.map((mission, index) => (
                                <tr key={mission.id} className={`${index < MISSIONS_DATA.length - 1 ? 'border-b border-border/30' : ''} hover:bg-secondary/30 transition-colors duration-200`}>
                                    <td className="py-4 px-4 font-semibold">{mission.name}</td>
                                    <td className="py-4 px-4 text-muted-foreground">{mission.companyName}</td>
                                    <td className="py-4 px-4"><StarRating rating={mission.rating} /></td>
                                    <td className="py-4 px-4">
                                        <button 
                                            onClick={() => {
                                                const company = findCompanyByName(mission.companyName);
                                                if(company) onRateCompany(company);
                                            }}
                                            className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-glow">
                                            Évaluer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WorkerDashboard;