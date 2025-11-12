import React from 'react';
import { User } from '../types';
import ToggleSwitch from '../components/ToggleSwitch';
import { useTheme } from '../App';

interface SettingsPageProps {
    user: User;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ user }) => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="space-y-8">
            {/* Profile Settings */}
            <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                <h2 className="text-xl font-bold gradient-text mb-6">Paramètres du profil</h2>
                <form className="space-y-4 max-w-lg">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-muted-foreground">Nom complet</label>
                        <input type="text" defaultValue={user.name} className="w-full bg-card border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-muted-foreground">Adresse e-mail</label>
                        <input type="email" defaultValue={`${user.name.toLowerCase().replace(' ', '.')}@example.com`} className="w-full bg-card border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    {user.role === 'company' && (
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-muted-foreground">Nom de l'entreprise</label>
                            <input type="text" defaultValue={user.companyName} className="w-full bg-card border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                    )}
                    <div className="pt-2">
                        <button type="submit" className="bg-gradient-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-glow">
                            Enregistrer les modifications
                        </button>
                    </div>
                </form>
            </div>

            {/* Notification Preferences */}
            <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                <h2 className="text-xl font-bold gradient-text mb-6">Préférences de notification</h2>
                <div className="space-y-4 max-w-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-foreground">Nouveau message</p>
                            <p className="text-sm text-muted-foreground">Recevoir une notification pour chaque nouveau message.</p>
                        </div>
                        <ToggleSwitch initialChecked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-foreground">Nouvelle évaluation</p>
                            <p className="text-sm text-muted-foreground">Être notifié lorsqu'une nouvelle évaluation est publiée.</p>
                        </div>
                        <ToggleSwitch initialChecked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-foreground">Mise à jour de mission</p>
                            <p className="text-sm text-muted-foreground">Recevoir des alertes sur les changements de statut de mission.</p>
                        </div>
                        <ToggleSwitch initialChecked={false} />
                    </div>
                </div>
            </div>

             {/* Appearance */}
            <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                <h2 className="text-xl font-bold gradient-text mb-6">Apparence</h2>
                <div className="max-w-lg">
                    <label className="block text-sm font-semibold mb-2 text-muted-foreground">Thème</label>
                    <p className="text-sm text-muted-foreground mb-4">Choisissez comment l'application s'affiche.</p>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setTheme('dark')}
                            className={`flex-1 p-4 bg-secondary rounded-xl border-2 text-center transition-colors ${theme === 'dark' ? 'border-primary' : 'border-transparent'}`}
                        >
                            <p className="font-semibold">Sombre</p>
                        </button>
                         <button 
                            onClick={() => setTheme('light')}
                            className={`flex-1 p-4 bg-secondary rounded-xl border-2 text-center transition-colors ${theme === 'light' ? 'border-primary' : 'border-transparent'}`}
                        >
                            <p className="font-semibold">Clair</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;