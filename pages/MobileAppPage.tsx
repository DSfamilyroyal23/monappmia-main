
import React, { useEffect, useRef, useState } from 'react';
import { MiaLogo } from '../components/icons';
import { useTheme } from '../App';

declare global {
    interface Window {
        QRCode: any;
    }
}

// Script loader singleton
let qrCodeScriptPromise: Promise<void> | null = null;
const loadQRCodeScript = (): Promise<void> => {
    if (qrCodeScriptPromise) {
        return qrCodeScriptPromise;
    }
    qrCodeScriptPromise = new Promise((resolve, reject) => {
        // Check if script is already present
        if (window.QRCode) {
            return resolve();
        }
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js';
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.body.appendChild(script);
    });
    return qrCodeScriptPromise;
};


const MobileAppPage: React.FC = () => {
    const { theme } = useTheme();
    const qrCodeRef = useRef<HTMLDivElement>(null);
    const [qrStatus, setQrStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
    const [directUrl, setDirectUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            // This parameter often tells preview environments to load the app directly
            // and helps ensure the link is unique for QR code generation.
            url.searchParams.set('app_direct', 'true');
            setDirectUrl(url.href);
        }
    }, []);
    
    useEffect(() => {
        let isMounted = true;
        
        const generateQRCode = () => {
             if (!directUrl || !qrCodeRef.current) return;
             
             // Clear previous QR code
             qrCodeRef.current.innerHTML = '';

             // Get theme colors for QR Code
             const primaryColor = `hsl(${getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()})`;
             const backgroundColor = `hsl(${getComputedStyle(document.documentElement).getPropertyValue('--background').trim()})`;

             try {
                new window.QRCode(qrCodeRef.current, {
                    text: directUrl,
                    width: 256,
                    height: 256,
                    colorDark: primaryColor,
                    colorLight: backgroundColor,
                    correctLevel: window.QRCode.CorrectLevel.H,
                });
                if (isMounted) setQrStatus('loaded');
             } catch (error) {
                 console.error("Failed to generate QR code:", error);
                 if (isMounted) setQrStatus('error');
             }
        };

        loadQRCodeScript()
            .then(() => {
                // Delay generation slightly to allow for theme styles to apply
                setTimeout(() => {
                    if (isMounted) generateQRCode();
                }, 100);
            })
            .catch(error => {
                console.error("Failed to load QRCode library script:", error);
                if (isMounted) setQrStatus('error');
            });
            
        return () => { isMounted = false; }

    }, [directUrl, theme]); // Rerun on directUrl change and theme change

    return (
        <div className="bg-card rounded-2xl p-8 border border-border shadow-card w-full animate-fade-in">
            <h2 className="text-2xl font-bold gradient-text mb-6 text-center">Installez MIA sur votre téléphone</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                
                 <div className="text-center">
                     <div className="relative w-[288px] h-[288px] flex items-center justify-center bg-secondary/30 rounded-2xl shadow-sm p-4">
                        {qrStatus === 'loading' && (
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p>Génération du lien direct...</p>
                            </div>
                        )}
                         {qrStatus === 'error' && (
                            <div className="flex flex-col items-center justify-center text-destructive p-4 bg-destructive/10 rounded-xl">
                                <p className="font-semibold">Erreur</p>
                                <p className="text-sm text-center">Impossible de charger le code QR. Veuillez rafraîchir la page.</p>
                            </div>
                        )}
                        <div ref={qrCodeRef} className={`transition-opacity duration-300 ${qrStatus === 'loaded' ? 'opacity-100' : 'opacity-0'}`} />
                        {qrStatus === 'loaded' && (
                             <div className="absolute w-16 h-16 bg-background rounded-2xl p-2 border-4 border-background shadow-lg flex items-center justify-center">
                                <MiaLogo className="w-full h-full text-primary" strokeWidth={2.5}/>
                            </div>
                        )}
                    </div>
                     <div className="mt-4 max-w-xs mx-auto">
                        <p className="text-muted-foreground text-sm">Scannez pour ouvrir sur votre mobile, ou utilisez le lien direct :</p>
                        {directUrl ? (
                            <a href={directUrl} target="_top" rel="noopener noreferrer" className="mt-2 inline-block w-full bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-glow text-center">
                                Ouvrir l'application directement
                            </a>
                        ) : (
                           <div className="mt-2 w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-semibold text-center opacity-50">
                                Chargement...
                           </div>
                        )}
                    </div>
                </div>

                <div className="max-w-md space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                             <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                            Instructions d'installation
                        </h3>
                        <p className="text-muted-foreground">
                            Pour une expérience optimale, ajoutez l'application à votre écran d'accueil.
                        </p>
                    </div>
                    <div className="p-4 bg-secondary rounded-xl">
                        <h4 className="font-semibold text-foreground mb-2">Sur iOS (iPhone) :</h4>
                        <ol className="list-decimal list-inside text-muted-foreground text-sm space-y-1">
                            <li>Ouvrez le site dans <span className="font-semibold text-foreground/80">Safari</span>.</li>
                            <li>Appuyez sur l'icône de Partage (un carré avec une flèche vers le haut).</li>
                            <li>Faites défiler vers le bas et sélectionnez <span className="font-semibold text-foreground/80">"Sur l'écran d'accueil"</span>.</li>
                            <li>Confirmez en appuyant sur "Ajouter".</li>
                        </ol>
                    </div>
                    <div className="p-4 bg-secondary rounded-xl">
                        <h4 className="font-semibold text-foreground mb-2">Sur Android :</h4>
                        <ol className="list-decimal list-inside text-muted-foreground text-sm space-y-1">
                             <li>Ouvrez le site dans <span className="font-semibold text-foreground/80">Chrome</span>.</li>
                             <li>Appuyez sur le menu à trois points en haut à droite.</li>
                             <li>Sélectionnez <span className="font-semibold text-foreground/80">"Installer l'application"</span> ou <span className="font-semibold text-foreground/80">"Ajouter à l'écran d'accueil"</span>.</li>
                             <li>Suivez les instructions pour confirmer.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileAppPage;
