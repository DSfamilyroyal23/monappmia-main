
import React from 'react';
import { Notification } from '../types';
// FIX: Replaced non-existent StarIcon with FullStarIcon.
import { FullStarIcon, UsersIcon, BriefcaseIcon, CloseIcon } from './icons';

interface NotificationPanelProps {
    isOpen: boolean;
    onClose: () => void;
    notifications: Notification[];
}

const iconMap = {
    evaluation: { icon: <FullStarIcon />, bg: 'bg-primary/10 text-primary' },
    message: { icon: <UsersIcon />, bg: 'bg-accent/10 text-accent' },
    mission: { icon: <BriefcaseIcon />, bg: 'bg-warning/10 text-warning' },
};

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose, notifications }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-20 right-8 glass-card rounded-2xl p-6 border border-border/50 shadow-card w-80 z-40 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Notifications</h3>
                <button className="text-muted-foreground hover:text-foreground" onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>
            <div className="space-y-4 max-h-80 overflow-y-auto">
                {notifications.map((notification, index) => (
                    <div key={notification.id} className={`flex gap-3 ${index < notifications.length - 1 ? 'pb-3 border-b border-border/30' : ''}`}>
                        <div className={`w-10 h-10 ${iconMap[notification.type].bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            {iconMap[notification.type].icon}
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm">{notification.title}</h4>
                            <p className="text-muted-foreground text-xs">{notification.message}</p>
                            <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationPanel;