
import React from 'react';
// FIX: Replaced non-existent StarIcon with FullStarIcon.
import { FullStarIcon, UsersIcon, BriefcaseIcon } from './icons';

const activities = [
    {
        icon: <FullStarIcon />,
        iconBg: 'bg-primary/10 text-primary',
        title: 'Nouvelle évaluation',
        description: 'Sophie Martin a reçu une note de 4.5/5',
        time: 'Il y a 2 heures'
    },
    {
        icon: <UsersIcon />,
        iconBg: 'bg-accent/10 text-accent',
        title: 'Nouvel intérimaire',
        description: 'Thomas Leroy a rejoint votre équipe',
        time: 'Il y a 1 jour'
    },
    {
        icon: <BriefcaseIcon />,
        iconBg: 'bg-warning/10 text-warning',
        title: 'Mission terminée',
        description: 'Mission "Campagne Marketing Q4" est terminée',
        time: 'Il y a 2 jours'
    }
];

const RecentActivity: React.FC = () => {
    return (
        <div className="glass-card rounded-2xl p-6 border border-border/50 shadow-card">
            <h2 className="text-xl font-bold gradient-text mb-6">Activité Récente</h2>
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div key={index} className={`flex gap-4 ${index < activities.length - 1 ? 'pb-4 border-b border-border/30' : ''}`}>
                        <div className={`w-12 h-12 ${activity.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            {activity.icon}
                        </div>
                        <div>
                            <h4 className="font-semibold">{activity.title}</h4>
                            <p className="text-muted-foreground text-sm">{activity.description}</p>
                            <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;