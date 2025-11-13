
import React from 'react';
import { Page } from '../types';

interface HeaderProps {
    currentPage: Page;
    pageConfig: Record<Page, { title: string; description: string }>;
    onToggleSidebar: () => void;
    onToggleNotifications: () => void;
    onSearchClick: () => void;
    notificationCount: number;
}

const Header: React.FC<HeaderProps> = ({ currentPage, pageConfig, onToggleSidebar, onToggleNotifications, onSearchClick, notificationCount }) => {
    const { title, description } = pageConfig[currentPage] || { title: 'MIA', description: '' };

    return (
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-border/50">
            <div>
                <button className="md:hidden text-2xl mr-4 text-foreground" onClick={onToggleSidebar}>
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
                <h1 className="text-3xl font-bold gradient-text flex items-center gap-3">
                    {title}
                </h1>
                <p className="text-muted-foreground mt-2">{description}</p>
            </div>

            <div className="flex items-center gap-4">
                <button 
                    onClick={onSearchClick} 
                    className="bg-card border border-border rounded-xl px-4 py-3 w-80 flex items-center text-left text-muted-foreground hover:border-primary/50 transition-colors duration-200"
                >
                    <svg className="w-5 h-5 mr-3 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    Rechercher...
                </button>

                <div className="relative">
                    <button onClick={onToggleNotifications} className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-glow transition-all duration-200">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                    </button>
                    {notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                            {notificationCount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;