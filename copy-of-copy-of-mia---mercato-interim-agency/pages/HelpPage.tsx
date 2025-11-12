import React from 'react';
import Accordion from '../components/Accordion';

const faqItems = [
    {
        question: "Comment puis-je évaluer un intérimaire ?",
        answer: "Depuis votre tableau de bord, dans la section 'Derniers Intérimaires Évalués', cliquez sur le bouton 'Noter' à côté du nom de l'intérimaire. Vous pourrez alors sélectionner une mission, attribuer une note et laisser un commentaire."
    },
    {
        question: "Où puis-je voir les évaluations que j'ai reçues ?",
        answer: "Si vous êtes un intérimaire, vous pouvez consulter toutes vos évaluations en allant sur la page 'Mes Évaluations' depuis le menu de navigation principal."
    },
    {
        question: "Comment puis-je modifier mon mot de passe ?",
        answer: "Accédez à la page 'Sécurité' depuis le menu de votre compte. Vous y trouverez une section pour changer votre mot de passe en toute sécurité."
    },
];

const HelpPage: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* FAQ */}
            <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                <h2 className="text-xl font-bold gradient-text mb-6">Questions Fréquemment Posées (FAQ)</h2>
                <div className="space-y-4">
                    {faqItems.map((item, index) => (
                        <Accordion key={index} title={item.question}>
                            <p className="text-muted-foreground pt-2">{item.answer}</p>
                        </Accordion>
                    ))}
                </div>
            </div>

            {/* Contact Support */}
            <div className="glass-card rounded-2xl p-8 border border-border/50 shadow-card">
                <h2 className="text-xl font-bold gradient-text mb-6">Contacter le Support</h2>
                <p className="text-muted-foreground mb-6 max-w-xl">
                    Vous ne trouvez pas la réponse à votre question ? Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les plus brefs délais.
                </p>
                <form className="space-y-4 max-w-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-muted-foreground">Votre nom</label>
                            <input type="text" placeholder="Ex: Jean Dupont" className="w-full bg-card border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-muted-foreground">Votre e-mail</label>
                            <input type="email" placeholder="Ex: jean.dupont@email.com" className="w-full bg-card border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-semibold mb-2 text-muted-foreground">Sujet</label>
                        <input type="text" placeholder="Décrivez brièvement votre problème" className="w-full bg-card border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-muted-foreground">Message</label>
                        <textarea rows={5} placeholder="Décrivez votre problème en détail..." className="w-full bg-card border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                    </div>
                    <div className="pt-2">
                        <button type="submit" className="bg-gradient-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-glow">
                            Envoyer le message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HelpPage;
