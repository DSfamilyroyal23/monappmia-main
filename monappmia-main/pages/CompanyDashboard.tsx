
import React, { useState } from 'react';
import StatsCard from '../components/StatsCard';
import PerformanceChart from '../components/PerformanceChart';
import RecentActivity from '../components/RecentActivity';
import WorkersTable from '../components/WorkersTable';
import { Worker } from '../types';
// FIX: Replaced non-existent StarIcon with FullStarIcon.
import { FullStarIcon, BriefcaseIcon, UsersIcon, ChartBarIcon, MagicIcon } from '../components/icons';
import { analyzePerformanceData } from '../services/geminiService';
import { PERFORMANCE_CHART_DATA } from '../constants';
import AnalysisModal from '../components/AnalysisModal';

interface CompanyDashboardProps {
    onRateWorker: (worker: Worker) => void;
}

const CompanyDashboard: React.FC<CompanyDashboardProps> = ({ onRateWorker }) => {
    const [isAnalysisModalOpen, setAnalysisModalOpen] = useState(false);
    const [analysisText, setAnalysisText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = async () => {
        setAnalysisModalOpen(true);
        setIsAnalyzing(true);
        const result = await analyzePerformanceData(PERFORMANCE_CHART_DATA);
        setAnalysisText(result);
        setIsAnalyzing(false);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard title="Total Évaluations" value="156" change="12% ce mois" changeType="increase" icon={<FullStarIcon />} />
                <StatsCard title="Missions Actives" value="12" change="3 nouvelles missions" changeType="increase" icon={<BriefcaseIcon />} />
                <StatsCard title="Intérimaires Notés" value="84" change="8% ce mois" changeType="increase" icon={<UsersIcon />} />
                <StatsCard title="Note Moyenne" value="4.2/5" change="0.2 baisse" changeType="decrease" icon={<ChartBarIcon />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 relative">
                    <PerformanceChart />
                    <button 
                        onClick={handleAnalyze} 
                        className="absolute top-6 right-6 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:shadow-glow"
                    >
                       <MagicIcon /> Analyser avec l'IA
                    </button>
                </div>
                <RecentActivity />
            </div>

            <WorkersTable onRateWorker={onRateWorker} />

            <AnalysisModal 
                isOpen={isAnalysisModalOpen} 
                onClose={() => setAnalysisModalOpen(false)}
                analysisText={analysisText}
                isLoading={isAnalyzing}
            />
        </>
    );
};

export default CompanyDashboard;