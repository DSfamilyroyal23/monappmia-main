import React from 'react';
import ToggleSwitch from '../components/ToggleSwitch';

const activeSessions = [
    { id: 1, device: 'Chrome sur Windows', location: 'Paris, FR', time: 'Actif maintenant', isCurrent: true },
    { id: 2, device: 'iPhone 14 Pro', location: 'Lyon, FR', time: 'Actif il y a 2 heures', isCurrent: false },
];

const securityHistory = [
    { id: 1, action: 'Mot de passe modifié', date: 'Hier à 15:30' },
    { id: 2, action: 'Nouvelle connexion depuis Lyon, FR', date: 'Il y a 2 jours' },
    { id: 3, action: 'A2F activée', date: 'Il y a 1 semaine' },
];

const SecurityPage: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Change Password */}
            <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                <h2 className="text-xl font-bold gradient-text mb-6">Changer le mot de passe</h2>
                <form className="space-y-4 max-w-lg">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-muted-foreground">Ancien mot de passe</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-card border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-muted-foreground">Nouveau mot de passe</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-card border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-muted-foreground">Confirmer le nouveau mot de passe</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-card border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="pt-2">
                        <button type="submit" className="bg-gradient-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-glow">
                            Mettre à jour le mot de passe
                        </button>
                    </div>
                </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                <h2 className="text-xl font-bold gradient-text mb-4">Authentification à deux facteurs (A2F)</h2>
                <div className="flex items-center justify-between max-w-lg">
                    <div>
                        <p className="text-foreground">Protéger votre compte avec une couche de sécurité supplémentaire.</p>
                        <p className="text-muted-foreground text-sm">L'A2F est actuellement <span className="font-semibold text-success">activée</span>.</p>
                    </div>
                    <ToggleSwitch initialChecked={true} />
                </div>
            </div>

            {/* Active Sessions */}
            <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                <h2 className="text-xl font-bold gradient-text mb-6">Sessions Actives</h2>
                <div className="space-y-4">
                    {activeSessions.map(session => (
                        <div key={session.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                            <div>
                                <p className="font-semibold text-foreground">{session.device} {session.isCurrent && <span className="text-xs text-primary ml-2">(Session actuelle)</span>}</p>
                                <p className="text-sm text-muted-foreground">{session.location} - {session.time}</p>
                            </div>
                            {!session.isCurrent && (
                                <button className="text-sm text-destructive hover:underline">Déconnecter</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SecurityPage;
