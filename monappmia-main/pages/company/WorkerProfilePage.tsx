import React from 'react';
import { Worker } from '../../types';
import { FullStarIcon, HalfStarIcon, EmptyStarIcon, BriefcaseIcon, UsersIcon } from '../../components/icons';

interface WorkerProfilePageProps {
    worker: Worker;
    onBack: () => void;
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


const WorkerProfilePage: React.FC<WorkerProfilePageProps> = ({ worker, onBack }) => {
    const skills = ["Logistique", "Gestion de stock", "Conduite de chariot", "Travail d'équipe"]; // Mock skills based on role

    return (
        <div className="space-y-8 animate-fade-in">
             <div className="flex justify-start mb-4">
                <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Retour à la liste
                </button>
            </div>
            <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-4xl flex-shrink-0 overflow-hidden">
                        {worker.avatarUrl ? (
                            <img src={worker.avatarUrl} alt={worker.name} className="w-full h-full object-cover" />
                        ) : (
                            worker.avatarInitials
                        )}
                    </div>
                    <div className="flex-grow text-center md:text-left">
                        <h2 className="text-3xl font-bold text-foreground">{worker.name}</h2>
                        <p className="text-muted-foreground">{worker.role}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-gradient-accent text-accent-foreground px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-glow-accent">
                            Contacter
                        </button>
                        <button className="bg-gradient-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-glow">
                            Évaluer
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                     {/* About Me */}
                    <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                        <h3 className="text-xl font-bold gradient-text mb-4">Résumé</h3>
                        <p className="text-muted-foreground">
                           Professionnel de la {worker.role} avec une expérience significative en entrepôt. Reconnu pour sa fiabilité, son efficacité et son esprit d'équipe.
                        </p>
                    </div>
                     {/* Skills */}
                     <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                        <h3 className="text-xl font-bold gradient-text mb-4">Compétences Clés</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(skill => (
                                <span key={skill} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                     {/* Mission History */}
                     <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                        <h3 className="text-xl font-bold gradient-text mb-4">Historique des Missions</h3>
                         <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                                <div>
                                    <p className="font-semibold">Inventaire de fin d'année</p>
                                    <p className="text-sm text-muted-foreground">Logistique Pro - {worker.lastMissionDate}</p>
                                </div>
                                <StarRating rating={4.0} />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                                <div>
                                    <p className="font-semibold">Préparation de Commandes</p>
                                    <p className="text-sm text-muted-foreground">Logistique Pro - 05 Oct 2025</p>
                                </div>
                                <StarRating rating={4.3} />
                            </div>
                         </div>
                    </div>
                </div>
                {/* Stats & Contact */}
                <div className="space-y-8">
                    <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                         <h3 className="text-xl font-bold gradient-text mb-4">Statistiques</h3>
                         <div className="space-y-3 text-sm">
                             <div className="flex justify-between items-center">
                                <span className="font-semibold text-muted-foreground flex items-center gap-2"><FullStarIcon /> Note moyenne:</span>
                                <span className="font-bold text-lg text-foreground">{worker.rating.toFixed(1)}/5</span>
                             </div>
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-muted-foreground flex items-center gap-2"><BriefcaseIcon/> Missions:</span>
                                <span className="font-bold text-lg text-foreground">{worker.missions}</span>
                             </div>
                             <div className="flex justify-between items-center">
                                <span className="font-semibold text-muted-foreground flex items-center gap-2"><UsersIcon /> Statut:</span>
                                <span className={`font-semibold px-2 py-1 rounded-md text-xs ${worker.status === 'Active' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>{worker.status}</span>
                             </div>
                         </div>
                    </div>
                     <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                         <h3 className="text-xl font-bold gradient-text mb-4">Informations de Contact</h3>
                         <div className="space-y-2 text-sm">
                             <p><span className="font-semibold text-muted-foreground">Email:</span> {worker.name.toLowerCase().replace(' ', '.')}@mia.com</p>
                             <p><span className="font-semibold text-muted-foreground">Téléphone:</span> 06 XX XX XX XX</p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerProfilePage;