import React from 'react';
import { User } from '../../types';

interface MyProfilePageProps {
    user: User;
}

const skills = ["Marketing Digital", "SEO", "Gestion de projet", "Communication", "Suite Adobe", "Analyse de données"];

const MyProfilePage: React.FC<MyProfilePageProps> = ({ user }) => {
    return (
        <div className="space-y-8">
            <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-4xl flex-shrink-0 overflow-hidden">
                        {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            user.avatarInitials
                        )}
                    </div>
                    <div className="flex-grow text-center md:text-left">
                        <h2 className="text-3xl font-bold text-foreground">{user.name}</h2>
                        <p className="text-muted-foreground">Développeur Web Full-Stack</p>
                    </div>
                    <button className="bg-gradient-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-glow">
                        Modifier le profil
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                     {/* About Me */}
                    <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                        <h3 className="text-xl font-bold gradient-text mb-4">À propos de moi</h3>
                        <p className="text-muted-foreground">
                            Passionné par le développement et les nouvelles technologies, je suis un professionnel motivé et adaptable, toujours prêt à relever de nouveaux défis. J'ai 5 ans d'expérience dans la création d'applications web robustes et performantes.
                        </p>
                    </div>
                     {/* Skills */}
                     <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                        <h3 className="text-xl font-bold gradient-text mb-4">Compétences</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(skill => (
                                <span key={skill} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Contact & CV */}
                <div className="space-y-8">
                    <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                         <h3 className="text-xl font-bold gradient-text mb-4">Informations</h3>
                         <div className="space-y-2 text-sm">
                             <p><span className="font-semibold text-muted-foreground">Email:</span> jean.dupont@email.com</p>
                             <p><span className="font-semibold text-muted-foreground">Téléphone:</span> 06 12 34 56 78</p>
                             <p><span className="font-semibold text-muted-foreground">Localisation:</span> Paris, France</p>
                             <p><span className="font-semibold text-muted-foreground">Disponibilité:</span> Immédiate</p>
                         </div>
                    </div>
                     <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                         <h3 className="text-xl font-bold gradient-text mb-4">Curriculum Vitae</h3>
                         <button className="w-full bg-secondary text-secondary-foreground px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-secondary/80">
                            Télécharger mon CV
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;