import React from 'react';
import { FileAltIcon } from '../../components/icons';

const reports = [
    { title: "Rapport de performance mensuel", description: "Analyse détaillée des notes moyennes, des missions et de l'activité des intérimaires pour le mois dernier." },
    { title: "Rapport d'activité des intérimaires", description: "Résumé complet des missions, heures travaillées et évaluations pour chaque intérimaire sur une période donnée." },
    { title: "Rapport de satisfaction", description: "Compile les commentaires et les notes pour évaluer la satisfaction globale des intérimaires." },
    { title: "Exportation de toutes les données", description: "Téléchargez un fichier CSV contenant toutes vos données d'évaluation et de mission." },
];

const ReportsPage: React.FC = () => {
    return (
        <div className="space-y-8">
             <div className="text-center">
                 <h2 className="text-2xl font-bold gradient-text">Génération de Rapports</h2>
                 <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
                    Obtenez des informations précieuses en générant des rapports personnalisés sur l'activité et la performance de vos intérimaires.
                 </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reports.map((report, index) => (
                    <div key={index} className="glass-card rounded-2xl p-8 border border-border/50 shadow-card flex flex-col">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                                <FileAltIcon />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-2">{report.title}</h3>
                                <p className="text-muted-foreground text-sm">{report.description}</p>
                            </div>
                        </div>
                        <div className="mt-auto pt-6">
                            <button className="w-full bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-glow">
                                Générer le rapport
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportsPage;
