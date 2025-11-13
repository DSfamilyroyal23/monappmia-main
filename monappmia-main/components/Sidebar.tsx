
import React from 'react';
import { Page, User } from '../types';
// FIX: Removed unused 'StarIcon' which was causing an error.
import { LogoutIcon, MiaLogo } from './icons';

interface NavItem {
  id: Page;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  isSidebarOpen: boolean;
  navItems: {
    section: string;
    items: NavItem[];
  }[];
  user: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, isSidebarOpen, navItems, user, onLogout }) => {

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
    e.preventDefault();
    onPageChange(page);
  };

  return (
    <div className={`w-80 bg-gradient-to-b from-background to-card fixed h-full z-50 transition-transform duration-300 shadow-2xl sidebar-glow md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-8 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
             <MiaLogo className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold gradient-text">MIA</div>
            <div className="text-xs text-muted-foreground -mt-1 tracking-wider">Mercato Interim Agency</div>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto h-[calc(100%-16rem)]">
        {navItems.map(section => (
          <div key={section.section} className="mb-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold px-4 mb-3">{section.section}</div>
            {section.items.map(item => (
              <a 
                key={item.id} 
                href="#" 
                onClick={(e) => handleLinkClick(e, item.id as Page)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${currentPage === item.id ? 'bg-primary/10 text-primary border border-primary/20 hover:shadow-glow' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
                <span className="w-5 text-center">{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">{item.badge}</span>}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t border-border/50 bg-card">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-semibold shadow-glow">
            {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover rounded-xl" />
            ) : (
                user.avatarInitials
            )}
          </div>
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.role === 'company' ? user.companyName : 'Intérimaire'}</div>
          </div>
           <button onClick={onLogout} className="ml-auto text-muted-foreground hover:text-primary transition-colors" title="Déconnexion">
               <LogoutIcon />
           </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;