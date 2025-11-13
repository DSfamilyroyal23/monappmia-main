import React from 'react';
import { COMPANIES_DATA } from '../../constants';
import { Company } from '../../types';
import { SearchIcon } from '../../components/icons';
import { FullStarIcon } from '../../components/icons';

interface SearchCompaniesPageProps {
    onRateCompany: (company: Company) => void;
}

// FIX: Changed component typing to React.FC to allow for the 'key' prop in map function.
const CompanyCard: React.FC<{ company: Company, onRateCompany: (c: Company) => void }> = ({ company, onRateCompany }) => (
    <div className="glass-card rounded-2xl p-6 border border-border/50 shadow-card flex flex-col text-center">
        <h3 className="text-xl font-bold text-foreground">{company.name}</h3>
        <p className="text-muted-foreground text-sm mb-3">{company.sector}</p>
        <div className="flex items-center justify-center gap-1 text-warning text-sm mb-4">
            <FullStarIcon/>
            <span className="ml-1 font-bold text-foreground">{company.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({company.missionsPosted} missions)</span>
        </div>
         <p className="text-muted-foreground text-sm mb-6">{company.location}</p>
        <div className="mt-auto flex gap-2">
            <button className="flex-1 bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-sm font-semibold hover:bg-secondary/80">
                Profil
            </button>
            <button onClick={() => onRateCompany(company)} className="flex-1 bg-gradient-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-semibold hover:shadow-glow">
                Évaluer
            </button>
        </div>
    </div>
);

const SearchCompaniesPage: React.FC<SearchCompaniesPageProps> = ({ onRateCompany }) => {
    return (
        <div className="space-y-8">
            <div className="glass-card rounded-2xl p-6 border border-border/50 shadow-card">
                 <div className="relative flex-grow max-w-lg mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon /></div>
                    <input type="text" placeholder="Rechercher une entreprise par nom ou secteur..." className="bg-card border border-border rounded-xl pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {COMPANIES_DATA.map(c => <CompanyCard key={c.id} company={c} onRateCompany={onRateCompany} />)}
                 {COMPANIES_DATA.map(c => <CompanyCard key={`${c.id}-2`} company={{...c, id: c.id+10}} onRateCompany={onRateCompany} />)}
                  {COMPANIES_DATA.map(c => <CompanyCard key={`${c.id}-3`} company={{...c, id: c.id+20}} onRateCompany={onRateCompany} />)}
            </div>
        </div>
    );
};

export default SearchCompaniesPage;