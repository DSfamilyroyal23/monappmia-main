import { Page, Worker, Mission, Notification, PerformanceData, Company, User, Conversation } from './types';

export const LOGGED_IN_COMPANY: User = {
  id: 1,
  name: 'ABOU TRAORÉ',
  role: 'company',
  avatarInitials: 'AT',
  companyName: 'Entreprise Logistique Pro'
};

export const LOGGED_IN_WORKER: User = {
  id: 101,
  name: 'Jean Dupont',
  role: 'worker',
  avatarInitials: 'JD',
  avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/male/1.jpg',
};

export const WORKERS_DATA: Worker[] = [
  {
    id: 1,
    name: 'Sophie Martin',
    role: 'Marketing Digital',
    missions: 5,
    rating: 4.5,
    lastMissionDate: '15 Nov 2025',
    status: 'Active',
    avatarInitials: 'SM',
    avatarBg: 'primary',
    avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/female/1.jpg',
  },
  {
    id: 2,
    name: 'Thomas Leroy',
    role: 'Logistique',
    missions: 8,
    rating: 4.0,
    lastMissionDate: '10 Nov 2025',
    status: 'Active',
    avatarInitials: 'TL',
    avatarBg: 'accent',
    avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/male/2.jpg',
  },
  {
    id: 3,
    name: 'Marie Jacques',
    role: 'Comptabilité',
    missions: 3,
    rating: 5.0,
    lastMissionDate: '08 Nov 2025',
    status: 'Inactive',
    avatarInitials: 'MJ',
    avatarBg: 'secondary',
    avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/female/3.jpg',
  },
];

export const COMPANIES_DATA: Company[] = [
    { id: 1, name: 'Logistique Pro', sector: 'Transport', rating: 4.2, missionsPosted: 25, location: 'Paris' },
    { id: 2, name: 'Innovatech Solutions', sector: 'Technologie', rating: 4.8, missionsPosted: 12, location: 'Lyon' },
    { id: 3, name: 'GastroDélices', sector: 'Restauration', rating: 4.5, missionsPosted: 42, location: 'Marseille' },
];


export const MISSIONS_DATA: Mission[] = [
  { id: '1', name: "Campagne Marketing Q4", companyName: "Innovatech Solutions", rating: 4.8 },
  { id: '2', name: "Inventaire de fin d'année", companyName: "Logistique Pro", rating: 4.2 },
  { id: '3', name: "Support technique", companyName: "Innovatech Solutions", rating: 4.8 },
  { id: '4', name: "Service en salle", companyName: "GastroDélices", rating: 4.5 },
];

export const NOTIFICATIONS_DATA: Notification[] = [
  { id: 1, type: 'evaluation', title: 'Nouvelle évaluation', message: 'Votre évaluation est en attente', time: 'Il y a 5 min', read: false },
  { id: 2, type: 'message', title: 'Nouveau message', message: 'Thomas a répondu à votre message', time: 'Il y a 1 heure', read: false },
  { id: 3, type: 'mission', title: 'Mission mise à jour', message: 'La mission Marketing a été modifiée', time: 'Il y a 2 heures', read: false }
];

export const CONVERSATIONS_DATA: Conversation[] = [
    {
        id: 'conv-1',
        participants: [
            { id: 1, name: 'ABOU TRAORÉ', avatarInitials: 'AT' },
            { id: 2, name: 'Thomas Leroy', avatarInitials: 'TL' },
        ],
        messages: [
            { id: 'msg-1-1', text: 'Bonjour Thomas, êtes-vous disponible pour la mission de logistique la semaine prochaine ?', timestamp: '10:30', senderId: 1 },
            { id: 'msg-1-2', text: 'Bonjour Abou, oui tout à fait. Je suis prêt à commencer dès lundi.', timestamp: '10:32', senderId: 2 },
            { id: 'msg-1-3', text: 'Parfait ! Je vous envoie les détails par email.', timestamp: '10:33', senderId: 1 },
        ],
    },
    {
        id: 'conv-2',
        participants: [
            { id: 1, name: 'ABOU TRAORÉ', avatarInitials: 'AT' },
            { id: 3, name: 'Marie Jacques', avatarInitials: 'MJ' },
        ],
        messages: [
            { id: 'msg-2-1', text: 'Bonjour Marie, juste pour vous confirmer que la mission est bien terminée.', timestamp: 'Hier', senderId: 1 },
        ],
    },
     {
        id: 'conv-3',
        participants: [
            { id: 101, name: 'Jean Dupont', avatarInitials: 'JD' },
            { id: 2, name: 'Innovatech Solutions', avatarInitials: 'IS' },
        ],
        messages: [
            { id: 'msg-3-1', text: 'Bonjour, je suis intéressé par la mission "Support technique".', timestamp: '14:00', senderId: 101 },
            { id: 'msg-3-2', text: 'Bonjour Jean, merci pour votre intérêt. Pouvez-vous nous envoyer votre CV ?', timestamp: '14:05', senderId: 2 },
        ],
    }
];

export const PERFORMANCE_CHART_DATA: PerformanceData[] = [
  { name: 'Jan', 'Note moyenne': 3.8 },
  { name: 'Fév', 'Note moyenne': 4.0 },
  { name: 'Mar', 'Note moyenne': 4.2 },
  { name: 'Avr', 'Note moyenne': 4.1 },
  { name: 'Mai', 'Note moyenne': 4.3 },
  { name: 'Juin', 'Note moyenne': 4.4 },
  { name: 'Juil', 'Note moyenne': 4.2 },
  { name: 'Août', 'Note moyenne': 4.5 },
  { name: 'Sep', 'Note moyenne': 4.3 },
  { name: 'Oct', 'Note moyenne': 4.4 },
  { name: 'Nov', 'Note moyenne': 4.2 },
];

// FIX: Corrected syntax errors and ensured all keys from the 'Page' type are present.
export const COMPANY_PAGE_CONFIG: Record<Page, { title: string; description: string }> = {
    'dashboard': { title: 'Tableau de bord Entreprise', description: 'Gérez vos missions et évaluez vos intérimaires' },
    'workers': { title: 'Gestion des Intérimaires', description: 'Consultez et gérez vos intérimaires' },
    'missions': { title: 'Missions Actives', description: 'Suivez et planifiez vos missions' },
    'performance': { title: 'Analytique des Performances', description: 'Analysez les performances de vos équipes' },
    'evaluations': { title: 'Évaluations et Notes', description: 'Consultez et créez des évaluations' },
    'reports': { title: 'Rapports et Statistiques', description: 'Générez des rapports détaillés' },
    'settings': { title: 'Paramètres', description: 'Personnalisez votre expérience' },
    'my-profile': { title: 'Mon Profil Entreprise', description: 'Gérez les informations de votre entreprise' },
    'search-missions': { title: '', description: ''},
    'search-companies': { title: '', description: ''},
    'security': { title: 'Sécurité', description: 'Gérez la sécurité de votre compte' },
    'help': { title: 'Aide & Support', description: 'Obtenez de l\'aide et du support' },
    'messages': { title: 'Messagerie', description: 'Communiquez avec vos intérimaires et partenaires' },
    'mobile-app': { title: 'Application Mobile', description: 'Accédez à MIA sur votre téléphone' },
    'worker-profile': { title: 'Profil de l\'Intérimaire', description: 'Consultez les détails et l\'historique de l\'intérimaire' },
    'given-evaluations': { title: '', description: ''},
};

// FIX: Corrected syntax errors and ensured all keys from the 'Page' type are present.
export const WORKER_PAGE_CONFIG: Record<Page, { title: string; description: string }> = {
    'dashboard': { title: 'Mon Tableau de bord', description: 'Suivez vos missions et vos évaluations' },
    'workers': { title: '', description: ''},
    'missions': { title: '', description: ''},
    'performance': { title: '', description: ''},
    'reports': { title: '', description: ''},
    'settings': { title: 'Paramètres', description: 'Personnalisez votre expérience' },
    'my-profile': { title: 'Mon Profil', description: 'Gérez vos compétences et votre CV' },
    'search-missions': { title: 'Rechercher une Mission', description: 'Trouvez votre prochaine opportunité' },
    'search-companies': { title: 'Rechercher une Entreprise', description: 'Découvrez et évaluez des entreprises' },
    'evaluations': { title: 'Mes Évaluations Reçues', description: 'Consultez les notes que les entreprises vous ont attribuées' },
    'given-evaluations': { title: 'Mes Évaluations Données', description: 'Consultez les notes que vous avez attribuées aux entreprises' },
    'security': { title: 'Sécurité', description: 'Gérez la sécurité de votre compte' },
    'help': { title: 'Aide & Support', description: 'Obtenez de l\'aide et du support' },
    'messages': { title: 'Messagerie', description: 'Communiquez avec les entreprises' },
    'mobile-app': { title: 'Application Mobile', description: 'Accédez à MIA sur votre téléphone' },
    'worker-profile': { title: '', description: ''},
};