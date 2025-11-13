
import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, CloseIcon, BriefcaseIcon, UsersIcon, BuildingIcon } from './icons';
import { MISSIONS_DATA, WORKERS_DATA, COMPANIES_DATA } from '../constants';

interface GlobalSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Auto-focus the input when the modal opens
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            // Reset search term when modal closes
            setSearchTerm('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredMissions = searchTerm ? MISSIONS_DATA.filter(m => m.name.toLowerCase().includes(lowerCaseSearchTerm) || m.companyName.toLowerCase().includes(lowerCaseSearchTerm)) : [];
    const filteredWorkers = searchTerm ? WORKERS_DATA.filter(w => w.name.toLowerCase().includes(lowerCaseSearchTerm) || w.role.toLowerCase().includes(lowerCaseSearchTerm)) : [];
    const filteredCompanies = searchTerm ? COMPANIES_DATA.filter(c => c.name.toLowerCase().includes(lowerCaseSearchTerm) || c.sector.toLowerCase().includes(lowerCaseSearchTerm)) : [];
    
    const hasResults = filteredMissions.length > 0 || filteredWorkers.length > 0 || filteredCompanies.length > 0;

    return (
        <div 
            className="fixed inset-0 bg-black/70 flex justify-center z-[100] animate-fade-in" 
            onClick={onClose}
        >
            <div 
                className="bg-card rounded-2xl border border-border/50 shadow-card w-full max-w-2xl mx-4 mt-20 h-fit max-h-[70vh] flex flex-col" 
                onClick={e => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="p-4 border-b border-border/50 flex items-center gap-4">
                    <SearchIcon />
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Rechercher des missions, intérimaires, entreprises..."
                        className="w-full bg-transparent text-lg focus:outline-none text-foreground placeholder-muted-foreground"
                    />
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                        <CloseIcon />
                    </button>
                </div>

                {/* Search Results */}
                <div className="flex-1 overflow-y-auto p-6">
                    {searchTerm && hasResults && (
                         <div className="space-y-6">
                            {filteredMissions.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Missions</h3>
                                    <div className="space-y-2">
                                        {filteredMissions.map(item => (
                                            <a href="#" key={`mission-${item.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary">
                                                <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0"><BriefcaseIcon /></div>
                                                <span className="font-semibold text-foreground">{item.name}</span>
                                                <span className="text-sm text-muted-foreground ml-auto text-right">{item.companyName}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                             {filteredWorkers.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Intérimaires</h3>
                                    <div className="space-y-2">
                                        {filteredWorkers.map(item => (
                                            <a href="#" key={`worker-${item.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary">
                                                <div className="w-8 h-8 bg-accent/10 text-accent rounded-lg flex items-center justify-center flex-shrink-0"><UsersIcon /></div>
                                                <span className="font-semibold text-foreground">{item.name}</span>
                                                <span className="text-sm text-muted-foreground ml-auto text-right">{item.role}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                             {filteredCompanies.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Entreprises</h3>
                                    <div className="space-y-2">
                                        {filteredCompanies.map(item => (
                                            <a href="#" key={`company-${item.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary">
                                                <div className="w-8 h-8 bg-warning/10 text-warning rounded-lg flex items-center justify-center flex-shrink-0"><BuildingIcon /></div>
                                                <span className="font-semibold text-foreground">{item.name}</span>
                                                <span className="text-sm text-muted-foreground ml-auto text-right">{item.sector}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                         </div>
                    )}
                    {searchTerm && !hasResults && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Aucun résultat pour "{searchTerm}"</p>
                        </div>
                    )}
                     {!searchTerm && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Commencez à taper pour rechercher.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GlobalSearchModal;
