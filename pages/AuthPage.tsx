
import React from 'react';
import { UserRole } from '../types';
import { BriefcaseIcon, UsersIcon } from '../components/icons';

interface AuthPageProps {
    onLogin: (role: UserRole) => void;
    onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onBack }) => {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
             <div className="absolute top-8 left-8">
                <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Retour
                </button>
            </div>
            <div className="text-center mb-12">
                 <h1 className="text-5xl font-bold mb-4">
                    <span className="gradient-text">Bienvenue sur MIA</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                    Connectez-vous pour continuer.
                </p>
            </div>

            <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card w-full max-w-4xl mx-4">
                <h2 className="text-2xl font-bold text-center mb-8 text-foreground">Je me connecte en tant que...</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* Company Card */}
                    <div onClick={() => onLogin('company')} className="group p-8 bg-card/50 rounded-2xl border border-border/50 hover:border-primary/50 hover:shadow-glow-primary transition-all duration-300 cursor-pointer text-center">
                        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110">
                            <BriefcaseIcon />
                        </div>
                        <h3 className="text-2xl font-bold text-primary mb-2">Entreprise</h3>
                        <p className="text-muted-foreground">Je souhaite recruter, gérer et noter des intérimaires.</p>
                    </div>

                    {/* Worker Card */}
                    <div onClick={() => onLogin('worker')} className="group p-8 bg-card/50 rounded-2xl border border-border/50 hover:border-accent/50 hover:shadow-glow-accent transition-all duration-300 cursor-pointer text-center">
                         <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110">
                            <UsersIcon />
                        </div>
                        <h3 className="text-2xl font-bold text-accent mb-2">Intérimaire</h3>
                        <p className="text-muted-foreground">Je souhaite trouver des missions et noter des entreprises.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AuthPage;