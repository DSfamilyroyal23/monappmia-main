import React from 'react';
import { MISSIONS_DATA } from '../../constants';
import { SearchIcon, FilterIcon } from '../../components/icons';
import { Mission } from '../../types';

// FIX: Changed component typing to React.FC to allow for the 'key' prop in map function.
const MissionCard: React.FC<{ mission: Mission }> = ({ mission }) => (
    <div className="glass-card rounded-2xl p-6 border border-border/50 shadow-card flex flex-col">
        <h3 className="text-lg font-bold text-foreground">{mission.name}</h3>
        <p className="text-primary font-semibold text-sm mb-2">{mission.companyName}</p>
        <div className="flex items-center gap-1 text-warning text-sm mb-4">
            {Array(Math.floor(mission.rating)).fill(0).map((_,i) => '★')}
            <span className="ml-1 text-muted-foreground">({mission.rating.toFixed(1)})</span>
        </div>
        <p className="text-muted-foreground text-sm flex-grow">
            Recherche un professionnel pour une mission ponctuelle. Compétences en communication et travail d'équipe requises.
        </p>
        <div className="mt-6">
            <button className="w-full bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-glow">
                Postuler
            </button>
        </div>
    </div>
);

const SearchMissionsPage: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="glass-card rounded-2xl p-6 border border-border/50 shadow-card">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon /></div>
                        <input type="text" placeholder="Poste, compétence, entreprise..." className="bg-card border border-border rounded-xl pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                     <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon /></div>
                        <input type="text" placeholder="Ville, département..." className="bg-card border border-border rounded-xl pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <button className="bg-gradient-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                        <SearchIcon /> Rechercher
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MISSIONS_DATA.map(m => <MissionCard key={m.id} mission={m} />)}
                {MISSIONS_DATA.map(m => <MissionCard key={`${m.id}-2`} mission={{...m, id: m.id + '2'}} />)}
            </div>
        </div>
    );
};

export default SearchMissionsPage;