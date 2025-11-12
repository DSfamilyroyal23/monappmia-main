import React from 'react';
import { CloseIcon } from './icons';

interface AnalysisModalProps {
    isOpen: boolean;
    onClose: () => void;
    analysisText: string;
    isLoading: boolean;
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose, analysisText, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
            <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card w-full max-w-2xl mx-4" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold gradient-text">Analyse de Performance IA</h2>
                    <button className="text-muted-foreground hover:text-foreground text-xl" onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto pr-4 text-muted-foreground space-y-4">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-40">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p>Analyse en cours...</p>
                        </div>
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: analysisText.replace(/\n/g, '<br />') }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalysisModal;