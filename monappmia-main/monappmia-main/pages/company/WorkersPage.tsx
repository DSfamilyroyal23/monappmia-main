import React, { useState, useMemo, FormEvent } from 'react';
import { WORKERS_DATA } from '../../constants';
import { Worker } from '../../types';
import { SearchIcon, UsersIcon, MagicIcon } from '../../components/icons';
import { getSearchCriteriaFromQuery } from '../../services/geminiService';

interface WorkersPageProps {
    onViewProfile: (worker: Worker) => void;
}

const WorkerCard: React.FC<{ worker: Worker; onViewProfile: (worker: Worker) => void; }> = ({ worker, onViewProfile }) => (
    <div className="glass-card rounded-2xl p-6 border border-border/50 shadow-card hover:shadow-glow-primary transition-all duration-300 flex flex-col">
        <div className="flex items-start gap-4 mb-4">
            {worker.avatarUrl ? (
                <img src={worker.avatarUrl} alt={worker.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
            ) : (
                <div className={`w-16 h-16 bg-gradient-${worker.avatarBg} rounded-xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0`}>
                    {worker.avatarInitials}
                </div>
            )}
            <div>
                <h3 className="text-xl font-bold text-foreground">{worker.name}</h3>
                <p className="text-muted-foreground">{worker.role}</p>
            </div>
        </div>
        <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
                <span className="text-muted-foreground">Note moyenne:</span>
                <span className="font-semibold text-foreground">{worker.rating.toFixed(1)}/5</span>
            </div>
            <div className="flex justify-between">
                <span className="text-muted-foreground">Missions:</span>
                <span className="font-semibold text-foreground">{worker.missions}</span>
            </div>
             <div className="flex justify-between">
                <span className="text-muted-foreground">Statut:</span>
                <span className={`font-semibold ${worker.status === 'Active' ? 'text-success' : 'text-destructive'}`}>{worker.status}</span>
            </div>
        </div>
        <div className="mt-auto flex gap-2">
            <button onClick={() => onViewProfile(worker)} className="flex-1 bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-secondary/80">
                Voir Profil
            </button>
            <button className="flex-1 bg-gradient-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-glow">
                Évaluer
            </button>
        </div>
    </div>
);

const allWorkersForDemo = [...WORKERS_DATA, ...WORKERS_DATA.map(w => ({...w, id: w.id + 10}))];

const WorkersPage: React.FC<WorkersPageProps> = ({ onViewProfile }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
    const [sortOption, setSortOption] = useState<'name-asc' | 'name-desc' | 'rating-asc' | 'rating-desc'>('name-asc');
    const [isAiSearching, setIsAiSearching] = useState(false);

    const handleSearchSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            // Reset filters if search is cleared
            setSearchTerm('');
            setStatusFilter('All');
            setSortOption('name-asc');
            return;
        }

        setIsAiSearching(true);
        const criteria = await getSearchCriteriaFromQuery(searchQuery);
        setIsAiSearching(false);
        
        if (criteria) {
            setSearchTerm(criteria.searchTerm || '');
            setStatusFilter(criteria.status || 'All');
            const newSortOption = `${criteria.sortBy || 'name'}-${criteria.sortOrder || 'asc'}` as typeof sortOption;
            setSortOption(newSortOption);
        } else {
            // Fallback to simple search if AI fails
            setSearchTerm(searchQuery);
            alert("L'IA n'a pas pu traiter votre demande. Utilisation de la recherche simple.");
        }
    };

    const filteredAndSortedWorkers = useMemo(() => {
        let workers = [...allWorkersForDemo];
        
        // 1. Filter by status
        if (statusFilter !== 'All') {
            workers = workers.filter(worker => worker.status === statusFilter);
        }

        // 2. Filter by search term (name or role)
        if (searchTerm.trim()) {
            const lowercasedTerm = searchTerm.toLowerCase();
            const terms = lowercasedTerm.split(' ').filter(t => t);
            workers = workers.filter(worker => 
                terms.every(term => 
                    worker.name.toLowerCase().includes(term) ||
                    worker.role.toLowerCase().includes(term)
                )
            );
        }

        // 3. Sort
        const [sortBy, sortOrder] = sortOption.split('-');
        workers.sort((a, b) => {
            if (sortBy === 'name') {
                return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }
            if (sortBy === 'rating') {
                return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
            }
            return 0;
        });

        return workers;
    }, [searchTerm, statusFilter, sortOption]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                 <form onSubmit={handleSearchSubmit} className="relative w-full md:w-auto flex items-center gap-2">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                            <MagicIcon className="w-5 h-5"/>
                        </div>
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Recherche IA: 'meilleurs profils marketing actifs'..." 
                            className="bg-card border border-border rounded-xl pl-10 pr-10 py-3 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-primary" 
                        />
                         {isAiSearching && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>}
                    </div>
                     <button type="submit" disabled={isAiSearching} className="bg-gradient-primary text-primary-foreground px-4 h-[50px] rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-glow disabled:opacity-50">
                        <SearchIcon className="w-5 h-5" />
                    </button>
                </form>
                <div className="flex gap-3">
                     <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="All">Tous les statuts</option>
                        <option value="Active">Actifs</option>
                        <option value="Inactive">Inactifs</option>
                     </select>
                     <select value={sortOption} onChange={e => setSortOption(e.target.value as any)} className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-primary">
                         <option value="name-asc">Trier par Nom (A-Z)</option>
                         <option value="name-desc">Trier par Nom (Z-A)</option>
                         <option value="rating-desc">Trier par Note (décroissant)</option>
                         <option value="rating-asc">Trier par Note (croissant)</option>
                     </select>
                </div>
            </div>
            
            {filteredAndSortedWorkers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAndSortedWorkers.map(worker => (
                        <WorkerCard key={worker.id} worker={worker} onViewProfile={onViewProfile} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-card rounded-2xl border border-border/50">
                    <div className="w-16 h-16 bg-secondary mx-auto rounded-full flex items-center justify-center text-muted-foreground"><UsersIcon className="w-8 h-8"/></div>
                    <h3 className="text-xl font-semibold mt-4">Aucun intérimaire trouvé</h3>
                    <p className="text-muted-foreground mt-2">Essayez d'ajuster vos filtres ou votre recherche.</p>
                </div>
            )}
        </div>
    );
};

export default WorkersPage;