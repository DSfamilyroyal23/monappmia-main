import React, { useState, useEffect, useMemo } from 'react';
import { Worker, Mission, Company } from '../types';
import { MISSIONS_DATA } from '../constants';
import { generateEvaluationComment } from '../services/geminiService';
import { WandIcon, CloseIcon } from './icons';

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    target: Worker | Company | null;
    targetType: 'worker' | 'company';
}

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, target, targetType }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [missionId, setMissionId] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showFeedbackPrompt, setShowFeedbackPrompt] = useState(false);
    const [aiGeneratedCommentId, setAiGeneratedCommentId] = useState<string | null>(null);

    const missionsForDropdown = useMemo(() => {
        if (!isOpen || !target) return [];
        if (targetType === 'company') {
            // When a worker rates a company, show only missions from that specific company
            return MISSIONS_DATA.filter(m => m.companyName === target.name);
        }
        // When a company rates a worker, show all missions for simplicity
        return MISSIONS_DATA;
    }, [isOpen, target, targetType]);

    useEffect(() => {
        if (!isOpen) {
            setRating(0);
            setComment('');
            setMissionId('');
            setIsSubmitting(false);
            setShowFeedbackPrompt(false);
            setAiGeneratedCommentId(null);
        }
    }, [isOpen]);

    useEffect(() => {
        // When the target changes (e.g., user clicks to rate a different company while modal is somehow open)
        // reset the mission selection to avoid inconsistency.
        if (isOpen) {
          setMissionId('');
        }
    }, [target]);

    const handleStarClick = (rate: number) => setRating(rate);

    const handleGenerateComment = async () => {
        if (!target || !missionId || rating === 0 || targetType !== 'worker') {
            alert("Veuillez sélectionner une mission et une note pour générer un commentaire pour un intérimaire.");
            return;
        }
        setIsGenerating(true);
        const mission = MISSIONS_DATA.find(m => m.id === missionId);
        const commentId = `ai-comment-${Date.now()}`;
        const generatedComment = await generateEvaluationComment(target.name, mission?.name || '', rating);
        setComment(generatedComment);
        setAiGeneratedCommentId(commentId);
        setIsGenerating(false);
    };
    
    const handleFeedback = (feedback: 'yes' | 'no') => {
        if (!aiGeneratedCommentId) return;
    
        try {
            const existingFeedback = JSON.parse(localStorage.getItem('mia-ai-feedback') || '[]');
            existingFeedback.push({
                id: aiGeneratedCommentId,
                comment: comment,
                feedback: feedback,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('mia-ai-feedback', JSON.stringify(existingFeedback));
            console.log("Feedback saved:", existingFeedback);
        } catch (error) {
            console.error("Failed to save feedback to localStorage:", error);
        }
        
        onClose();
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const mission = MISSIONS_DATA.find(m => m.id === missionId);

        console.log({
            targetId: target?.id,
            targetName: target?.name,
            targetType,
            rating,
            missionId,
            missionName: mission?.name,
            comment,
        });

        // If a worker is rating a company, save it to localStorage to be displayed on the new page
        if (targetType === 'company' && target && mission) {
            const newEvaluation = {
                id: `eval-given-${Date.now()}`,
                targetId: target.id,
                targetName: target.name,
                rating,
                missionName: mission.name,
                comment,
                date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
            };

            try {
                const existingEvals = JSON.parse(localStorage.getItem('mia-given-evals') || '[]');
                existingEvals.unshift(newEvaluation); // Add to the top
                localStorage.setItem('mia-given-evals', JSON.stringify(existingEvals));
            } catch (error) {
                console.error("Failed to save evaluation to localStorage:", error);
            }
        }

        alert("Évaluation soumise avec succès !");

        if (aiGeneratedCommentId) {
            setShowFeedbackPrompt(true);
        } else {
            onClose();
        }
    };

    if (!isOpen) return null;

    const ratingTexts = ['Sélectionnez une note', 'Médiocre', 'Passable', 'Bien', 'Très bien', 'Excellent'];
    const title = targetType === 'worker' ? `Évaluer ${target?.name}` : `Évaluer ${target?.name}`;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
            <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold gradient-text">{title}</h2>
                    <button className="text-muted-foreground hover:text-foreground text-xl" onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                {!showFeedbackPrompt && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2">Mission concernée</label>
                            <select value={missionId} onChange={e => setMissionId(e.target.value)} className="w-full bg-card border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200">
                                <option value="">Sélectionnez une mission</option>
                                {missionsForDropdown.map(mission => <option key={mission.id} value={mission.id}>{mission.name}</option>)}
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2">Note globale</label>
                            <div className="flex justify-center gap-2 mb-4">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <i key={star} onClick={() => handleStarClick(star)} className={`cursor-pointer text-2xl text-warning transition-all duration-200 hover:scale-110 ${star <= rating ? 'fas fa-star' : 'far fa-star'}`}></i>
                                ))}
                            </div>
                            <div className="text-center text-sm text-muted-foreground">{ratingTexts[rating]}</div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                               <label className="block text-sm font-semibold">Commentaire</label>
                               {targetType === 'worker' && (
                                 <button type="button" onClick={handleGenerateComment} disabled={isGenerating} className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/30 transition-colors">
                                    {isGenerating ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div> : <><WandIcon /> Générer</>}
                                </button>
                               )}
                            </div>
                            <textarea value={comment} onChange={e => setComment(e.target.value)} className="w-full bg-card border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200" rows={4} placeholder="Décrivez votre expérience..."></textarea>
                        </div>
                        <div className="flex gap-3">
                            <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 bg-secondary text-secondary-foreground px-4 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-secondary/80 disabled:opacity-50">
                                Annuler
                            </button>
                            <button type="submit" disabled={isSubmitting} className="flex-1 bg-gradient-primary text-primary-foreground px-4 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-glow disabled:opacity-50">
                                Soumettre
                            </button>
                        </div>
                    </form>
                )}
                {showFeedbackPrompt && (
                    <div className="mt-6 pt-4 border-t border-border/50 text-center animate-fade-in">
                        <h4 className="font-semibold text-foreground mb-2">Le commentaire généré par l'IA était-il utile ?</h4>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => handleFeedback('yes')}
                                className="bg-success/20 text-success px-6 py-2 rounded-lg font-semibold transition-colors hover:bg-success/30"
                            >
                                Oui
                            </button>
                            <button
                                onClick={() => handleFeedback('no')}
                                className="bg-destructive/20 text-destructive px-6 py-2 rounded-lg font-semibold transition-colors hover:bg-destructive/30"
                            >
                                Non
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RatingModal;