import React, { useState } from 'react';
import { PlusIcon } from '../../components/icons';

interface Mission {
    id: number;
    title: string;
    applicants: number;
    status: 'Actif' | 'À venir' | 'Terminé';
}

const missions: Record<'active' | 'upcoming' | 'completed', Mission[]> = {
    active: [
        { id: 1, title: 'Inventaire Entrepôt Est', applicants: 5, status: 'Actif' },
        { id: 2, title: 'Campagne Marketing Digital', applicants: 12, status: 'Actif' },
    ],
    upcoming: [
        { id: 3, title: 'Renfort Service Client Noël', applicants: 2, status: 'À venir' },
    ],
    completed: [
        { id: 4, title: 'Audit Comptable T3', applicants: 1, status: 'Terminé' },
        { id: 5, title: 'Événementiel Salon Tech', applicants: 8, status: 'Terminé' },
    ]
};

// FIX: Improved card layout for consistency and added type safety. The status badge is now always clearly visible and buttons are aligned at the bottom.
const MissionCard: React.FC<{ mission: Mission }> = ({ mission }) => {
    const statusClasses: Record<Mission['status'], string> = {
        'Actif': 'bg-success/10 text-success',
        'À venir': 'bg-warning/10 text-warning',
        'Terminé': 'bg-muted-foreground/20 text-muted-foreground',
    };

    return (
        <div className="glass-card rounded-2xl p-6 border border-border/50 shadow-card flex flex-col">
            <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-foreground pr-2">{mission.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusClasses[mission.status]}`}>
                        {mission.status}
                    </span>
                </div>
                <p className="text-muted-foreground text-sm">
                    {mission.applicants} candidat(s)
                </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/30 flex gap-2">
                 <button className="flex-1 bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-secondary/80">
                    Détails
                </button>
                 <button className="flex-1 bg-gradient-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-glow">
                    Gérer
                </button>
            </div>
        </div>
    );
}


const MissionsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'completed'>('active');

    const tabs = [
        { id: 'active' as const, label: 'Actives' },
        { id: 'upcoming' as const, label: 'À venir' },
        { id: 'completed' as const, label: 'Terminées' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 p-2 bg-secondary/50 rounded-xl">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === tab.id ? 'bg-primary text-primary-foreground shadow-glow' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <button className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 hover:shadow-glow">
                    <PlusIcon /> Créer une mission
                </button>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {missions[activeTab].map(mission => (
                    <MissionCard key={mission.id} mission={mission} />
                ))}
            </div>
        </div>
    );
};

export default MissionsPage;