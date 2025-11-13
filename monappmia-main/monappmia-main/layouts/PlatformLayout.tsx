
import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CompanyDashboard from '../pages/CompanyDashboard';
import WorkerDashboard from '../pages/WorkerDashboard';
import MessagesPage from '../pages/MessagesPage';
import MobileAppPage from '../pages/MobileAppPage';
import SecurityPage from '../pages/SecurityPage';
import SettingsPage from '../pages/SettingsPage';
import HelpPage from '../pages/HelpPage';
// Company Pages
import WorkersPage from '../pages/company/WorkersPage';
import MissionsPage from '../pages/company/MissionsPage';
import WorkerProfilePage from '../pages/company/WorkerProfilePage';
import PerformancePage from '../pages/company/PerformancePage';
import EvaluationsPage from '../pages/company/EvaluationsPage';
import ReportsPage from '../pages/company/ReportsPage';
// Worker Pages
import SearchMissionsPage from '../pages/worker/SearchMissionsPage';
import SearchCompaniesPage from '../pages/worker/SearchCompaniesPage';
import WorkerEvaluationsPage from '../pages/worker/WorkerEvaluationsPage';
import GivenEvaluationsPage from '../pages/worker/GivenEvaluationsPage';
import MyProfilePage from '../pages/worker/MyProfilePage';

import RatingModal from '../components/RatingModal';
import NotificationPanel from '../components/NotificationPanel';
import GlobalSearchModal from '../components/GlobalSearchModal';
import { Page, User, Worker, Company, Notification, UserRole } from '../types';
import { NOTIFICATIONS_DATA, COMPANY_PAGE_CONFIG, WORKER_PAGE_CONFIG } from '../constants';
import { 
    DashboardIcon, UsersIcon, BriefcaseIcon, ChartBarIcon, FullStarIcon, FileAltIcon, 
    CogIcon, ShieldIcon, QuestionIcon, SearchIcon, BuildingIcon, UserCircleIcon, MessageIcon, MobileIcon
} from '../components/icons';

interface PlatformLayoutProps {
    user: User;
    onLogout: () => void;
}

const PlatformLayout: React.FC<PlatformLayoutProps> = ({ user, onLogout }) => {
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isRatingModalOpen, setRatingModalOpen] = useState(false);
    const [ratingTarget, setRatingTarget] = useState<{ target: Worker | Company | null, type: UserRole | null }>({ target: null, type: null });
    const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS_DATA);
    const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

    const handlePageChange = useCallback((page: Page) => {
        setCurrentPage(page);
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    }, []);

    const handleRateWorker = useCallback((worker: Worker) => {
        setRatingTarget({ target: worker, type: 'worker' });
        setRatingModalOpen(true);
    }, []);

    const handleRateCompany = useCallback((company: Company) => {
        setRatingTarget({ target: company, type: 'company' });
        setRatingModalOpen(true);
    }, []);

    const handleCloseRatingModal = useCallback(() => {
        setRatingModalOpen(false);
        setRatingTarget({ target: null, type: null });
    }, []);

    const handleViewWorkerProfile = useCallback((worker: Worker) => {
        setSelectedWorker(worker);
        handlePageChange('worker-profile' as Page);
    }, [handlePageChange]);

    const handleBackToWorkersList = useCallback(() => {
        setSelectedWorker(null);
        handlePageChange('workers' as Page);
    }, [handlePageChange]);

    const handleToggleNotifications = useCallback(() => {
        setNotificationPanelOpen(prev => !prev);
        if (!isNotificationPanelOpen) {
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        }
    }, [isNotificationPanelOpen]);

    const handleOpenSearchModal = useCallback(() => setSearchModalOpen(true), []);
    const handleCloseSearchModal = useCallback(() => setSearchModalOpen(false), []);

    const handleLogoutConfirmation = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            onLogout();
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const companyNav = [
        { section: 'Principal', items: [
            { id: 'dashboard' as Page, icon: <DashboardIcon />, label: 'Tableau de bord' },
            { id: 'workers' as Page, icon: <UsersIcon />, label: 'Intérimaires', badge: 12 },
            { id: 'missions' as Page, icon: <BriefcaseIcon />, label: 'Missions', badge: 5 },
            { id: 'messages' as Page, icon: <MessageIcon />, label: 'Messages', badge: 1 },
        ]},
        { section: 'Analytique', items: [
            { id: 'performance' as Page, icon: <ChartBarIcon />, label: 'Performances' },
            { id: 'evaluations' as Page, icon: <FullStarIcon />, label: 'Évaluations' },
            { id: 'reports' as Page, icon: <FileAltIcon />, label: 'Rapports' },
        ]},
        { section: 'Compte', items: [
             { id: 'settings' as Page, icon: <CogIcon />, label: 'Paramètres' },
             { id: 'mobile-app' as Page, icon: <MobileIcon />, label: 'Application Mobile' },
             { id: 'security' as Page, icon: <ShieldIcon />, label: 'Sécurité' },
             { id: 'help' as Page, icon: <QuestionIcon />, label: 'Aide & Support' },
        ]}
    ];
    
    const workerNav = [
         { section: 'Principal', items: [
            { id: 'dashboard' as Page, icon: <DashboardIcon />, label: 'Tableau de bord' },
            { id: 'search-missions' as Page, icon: <SearchIcon />, label: 'Rechercher Missions' },
            { id: 'evaluations' as Page, icon: <FullStarIcon />, label: 'Évaluations Reçues' },
            { id: 'given-evaluations' as Page, icon: <FileAltIcon />, label: 'Évaluations Données' },
            { id: 'messages' as Page, icon: <MessageIcon />, label: 'Messages', badge: 2 },
        ]},
        { section: 'Découverte', items: [
             { id: 'search-companies' as Page, icon: <BuildingIcon />, label: 'Rechercher Entreprises' },
        ]},
        { section: 'Compte', items: [
             { id: 'my-profile' as Page, icon: <UserCircleIcon />, label: 'Mon Profil' },
             { id: 'settings' as Page, icon: <CogIcon />, label: 'Paramètres' },
             { id: 'mobile-app' as Page, icon: <MobileIcon />, label: 'Application Mobile' },
             { id: 'help' as Page, icon: <QuestionIcon />, label: 'Aide & Support' },
        ]}
    ];
    
    const navConfig = user.role === 'company' ? companyNav : workerNav;
    const pageConfig = user.role === 'company' ? COMPANY_PAGE_CONFIG : WORKER_PAGE_CONFIG;

    const renderPage = () => {
        // Common pages for both roles
        const commonPages: { [key in Page]?: React.ReactNode } = {
            'messages': <MessagesPage user={user} />,
            'mobile-app': <MobileAppPage />,
            'security': <SecurityPage />,
            'settings': <SettingsPage user={user} />,
            'help': <HelpPage />,
        };

        if (currentPage in commonPages) {
            return commonPages[currentPage];
        }

        // Role-specific pages
        if (user.role === 'company') {
            const companyPages: { [key in Page]?: React.ReactNode } = {
                'dashboard': <CompanyDashboard onRateWorker={handleRateWorker} />,
                'workers': <WorkersPage onViewProfile={handleViewWorkerProfile} />,
                'missions': <MissionsPage />,
                'performance': <PerformancePage />,
                'evaluations': <EvaluationsPage />,
                'reports': <ReportsPage />,
                'worker-profile': selectedWorker ? <WorkerProfilePage worker={selectedWorker} onBack={handleBackToWorkersList} /> : null,
            };
            return companyPages[currentPage] || <CompanyDashboard onRateWorker={handleRateWorker} />;
        } else { // Worker role
             const workerPages: { [key in Page]?: React.ReactNode } = {
                'dashboard': <WorkerDashboard onRateCompany={handleRateCompany} />,
                'search-missions': <SearchMissionsPage />,
                'search-companies': <SearchCompaniesPage onRateCompany={handleRateCompany} />,
                'evaluations': <WorkerEvaluationsPage />,
                'given-evaluations': <GivenEvaluationsPage />,
                'my-profile': <MyProfilePage user={user} />,
             };
             return workerPages[currentPage] || <WorkerDashboard onRateCompany={handleRateCompany} />;
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar 
                currentPage={currentPage} 
                onPageChange={handlePageChange} 
                isSidebarOpen={isSidebarOpen}
                navItems={navConfig}
                user={user}
                onLogout={handleLogoutConfirmation}
            />
            <main className="flex-1 md:ml-80 p-8 transition-all duration-300">
                <Header
                    currentPage={currentPage}
                    pageConfig={pageConfig}
                    onToggleSidebar={() => setSidebarOpen(prev => !prev)}
                    onToggleNotifications={handleToggleNotifications}
                    onSearchClick={handleOpenSearchModal}
                    notificationCount={unreadCount}
                />
                <div className="animate-fade-in">
                  {renderPage()}
                </div>
            </main>
            <RatingModal 
                isOpen={isRatingModalOpen} 
                onClose={handleCloseRatingModal} 
                target={ratingTarget.target}
                targetType={ratingTarget.type as UserRole}
            />
            <NotificationPanel isOpen={isNotificationPanelOpen} onClose={() => setNotificationPanelOpen(false)} notifications={notifications} />
            <GlobalSearchModal
                isOpen={isSearchModalOpen}
                onClose={handleCloseSearchModal}
            />
        </div>
    );
};

export default PlatformLayout;