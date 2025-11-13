
import React from 'react';
import { MiaLogo } from '../components/icons';

interface LandingPageProps {
    onLoginClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
    return (
        <div className="bg-background text-foreground min-h-screen font-sans">
            <header className="absolute top-0 left-0 right-0 z-10 p-8">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                         <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                             <MiaLogo className="w-8 h-8 text-white" />
                         </div>
                         <div>
                            <div className="text-2xl font-bold gradient-text">MIA</div>
                            <div className="text-xs text-muted-foreground -mt-1 tracking-wider">Mercato Interim Agency</div>
                         </div>
                    </div>
                    <button onClick={onLoginClick} className="bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-glow">
                        Connexion / Inscription
                    </button>
                </div>
            </header>

            <main>
                <section className="relative pt-48 pb-32 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background opacity-80"></div>
                     <div className="absolute top-0 right-0 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-float"></div>
                     <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl animate-float animation-delay-3000"></div>
                    <div className="relative z-10 text-center px-4">
                        <h1 className="text-7xl font-bold mb-4 animate-fade-in">
                            <span className="gradient-text">MIA</span>
                        </h1>
                         <h2 className="text-3xl font-semibold text-foreground -mt-2 mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            Mercato Interim Agency
                        </h2>
                        <p className="text-2xl text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
                            La transparence au service de l'intérim.
                        </p>
                        <button onClick={onLoginClick} className="mt-8 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-glow animate-fade-in" style={{ animationDelay: '0.6s' }}>
                            Commencer
                        </button>
                    </div>
                </section>

                <section id="problemes" className="py-24 bg-card">
                    <div className="container mx-auto px-8">
                        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Le Problème</h2>
                        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
                            Aujourd'hui, le marché de l'intérim manque de transparence et de confiance, créant de l'incertitude pour les intérimaires et des difficultés d'évaluation pour les entreprises.
                        </p>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card rounded-2xl p-8 border border-border/50">
                                <h3 className="text-2xl font-bold mb-4 text-accent">Pour les Intérimaires</h3>
                                <p className="text-muted-foreground">Incertitude sur les conditions de travail, la rémunération, et le respect des engagements. Difficulté à valoriser ses compétences et sa fiabilité.</p>
                            </div>
                            <div className="glass-card rounded-2xl p-8 border border-border/50">
                                <h3 className="text-2xl font-bold mb-4 text-primary">Pour les Entreprises</h3>
                                <p className="text-muted-foreground">Difficulté à évaluer la fiabilité, l'engagement et les compétences réelles des travailleurs temporaires avant une mission.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="solutions" className="py-24 bg-background">
                    <div className="container mx-auto px-8 text-center">
                        <h2 className="text-4xl font-bold mb-4 gradient-text">Notre Solution</h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
                            MIA est la première plateforme de notation mutuelle qui connecte les intérimaires et les entreprises pour une collaboration juste et transparente.
                        </p>
                         <div className="grid md:grid-cols-3 gap-8">
                            <div className="glass-card rounded-2xl p-8 border border-border/50 hover:shadow-glow-primary transition-shadow duration-300">
                                <h3 className="text-2xl font-bold mb-4">Notation Mutuelle</h3>
                                <p className="text-muted-foreground">Les intérimaires notent les entreprises sur la qualité des missions et l'environnement de travail. Les entreprises notent les intérimaires sur leur professionnalisme.</p>
                            </div>
                             <div className="glass-card rounded-2xl p-8 border border-border/50 hover:shadow-glow-primary transition-shadow duration-300">
                                <h3 className="text-2xl font-bold mb-4">Profils Vérifiés</h3>
                                <p className="text-muted-foreground">Des profils complets avec historique de missions, compétences, et commentaires permettent une évaluation complète et équitable pour tous.</p>
                            </div>
                             <div className="glass-card rounded-2xl p-8 border border-border/50 hover:shadow-glow-primary transition-shadow duration-300">
                                <h3 className="text-2xl font-bold mb-4">Confiance Renforcée</h3>
                                <p className="text-muted-foreground">Ensemble, nous bâtissons un écosystème où le mérite est récompensé et où chacun peut trouver le partenaire de travail qui lui correspond.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            
            <footer className="bg-card border-t border-border/50 py-8">
                <div className="container mx-auto text-center text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} MIA - Mercato Interim Agency. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;