import React, { useState, useEffect } from 'react';
import {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonButton
} from '@ionic/react';

interface TutorialItem {
    svgPath: string;
    title: string;
    description: string;
}

const tutorialData: TutorialItem[] = [
    {
        svgPath: "tutorial/tut_img_1.svg",
        title: "Search The Shop",
        description: "Find the shop you like, that sell what you want."
    },
    {
        svgPath: "tutorial/tut_img_2.svg",
        title: "Go To The Shop",
        description: "Reach the shop using the map!"
    },
    {
        svgPath: "tutorial/tut_img_3.svg",
        title: "Find The Product",
        description: "Choose the product you want to buy in the shop!"
    },
    {
        svgPath: "tutorial/tut_img_4.svg",
        title: "Scan the QR Code",
        description: "Scan the QR Code that you will find near the shop checkout!"
    },
    {
        svgPath: "tutorial/tut_img_5.svg",
        title: "Ship It",
        description: "Let the seller pack your item and ship it to your address!"
    },
];

const styles = {
    skipButton: {
        position: 'fixed' as const,
        top: '20px',
        right: '20px',
        zIndex: 1000,
        color: '#7A7A7A',
        fontWeight: 300,
        fontSize: '1rem',
        cursor: 'pointer'
    },
    card: {
        boxShadow: 'none',
        fontFamily: 'Gotham, sans-serif'
    },
    cardHeader: {
        padding: 0
    },
    image: {
        width: '100%', 
        height: '50vh'
    },
    cardContent: {
        marginTop: '24px'
    },
    title: {
        marginBottom: '20px', 
        fontSize: '1.8rem',
        fontWeight: 500
    },
    description: {
        width: '70%', 
        margin: '0 auto', 
        whiteSpace: 'normal' as const,
        fontSize: '1.2rem',
        fontWeight: 300,
        lineHeight: '1'
    },
    buttonContainer: {
        position: 'fixed' as const,
        bottom: '5%',
        left: '0',
        right: '0',
        textAlign: 'center' as const,
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        '--background': '#00C493',
        '--background-activated': '#009C76',
        '--border-radius': '100px',
        '--box-shadow': '0 4px 4px rgba(0, 0, 0, 0.25)',
        '--font-size': '1.2rem',
        '--font-family': 'Gotham, sans-serif',
        '--font-weight': '500',
        width: '70vw',
        height: 'calc(70vw / 5)',
    },
    loadingContainer: {
        display: 'flex', 
        flexDirection: 'column' as const, 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%',
        fontFamily: 'Gotham, sans-serif'
    },
    spinner: {
        width: '50px', 
        height: '50px', 
        borderRadius: '50%', 
        border: '5px solid #f3f3f3', 
        borderTop: '5px solid #00C493', 
        animation: 'spin 1s linear infinite'
    }
};

const ProgressIndicator: React.FC<{ currentSlide: number, totalSlides: number }> = ({ currentSlide, totalSlides }) => (
    <div className="ion-padding-vertical ion-text-center">
        {[...Array(totalSlides)].map((_, index) => (
            <span key={index} 
                style={{
                    display: 'inline-block',
                    width: index === currentSlide ? '30px' : '10px',
                    height: '10px',
                    borderRadius: '10px',
                    margin: '0 5px',
                    backgroundColor: index === currentSlide ? '#00C493' : '#80E1C9',
                    opacity: index === currentSlide ? 1 : 0.5,
                }}
            />
        ))}
    </div>
);

const LoadingSpinner: React.FC = () => (
    <IonPage>
        <IonContent className="ion-padding ion-text-center">
            <div style={styles.loadingContainer}>
                <div style={{ marginBottom: '20px' }}>Caricamento...</div>
                <div style={styles.spinner}></div>
                <style>
                    {`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}
                </style>
            </div>
        </IonContent>
    </IonPage>
);

const Tutorial: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = tutorialData.length;
    const [isAnimating, setIsAnimating] = useState(false);
    const [imagesPreloaded, setImagesPreloaded] = useState(false);

    useEffect(() => {
        const preloadImages = async () => {
            const imagePromises = tutorialData.map((item) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = item.svgPath;
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            });
            
            await Promise.all(imagePromises);
            setImagesPreloaded(true);
        };
        
        preloadImages();
    }, []);

    const handleNextSlide = () => {
        if (isAnimating || !imagesPreloaded) return;
        
        if (currentSlide < totalSlides - 1) {
            setIsAnimating(true);
            
            const card = document.querySelector('ion-card');
            if (card) {
                // Animate out
                card.style.transition = 'transform 300ms, opacity 300ms';
                card.style.transform = 'translateX(-100%)';
                card.style.opacity = '0';
                
                setTimeout(() => {
                    // Change slide
                    setCurrentSlide(currentSlide + 1);
                    
                    // Prepare for animate in
                    card.style.transition = 'none';
                    card.style.transform = 'translateX(100%)';
                    card.offsetWidth; // Force reflow
                    
                    // Animate in
                    card.style.transition = 'transform 300ms, opacity 300ms';
                    card.style.transform = 'translateX(0)';
                    card.style.opacity = '1';
                    
                    setTimeout(() => setIsAnimating(false), 300);
                }, 300);
            } else {
                setCurrentSlide(currentSlide + 1);
                setIsAnimating(false);
            }
        } else {
            console.log('Tutorial completed');
        }
    };

    const handleSkip = () => {
        console.log('Tutorial skipped');
    };

    if (!imagesPreloaded) {
        return <LoadingSpinner />;
    }

    const currentTutorial = tutorialData[currentSlide];

    return (
        <IonPage>
            <IonContent>
                <div style={styles.skipButton} onClick={handleSkip}>Skip</div>
                    
                <IonCard style={styles.card}>
                    <IonCardHeader style={styles.cardHeader}>
                        <div className="ion-text-center">
                            <img 
                                src={currentTutorial.svgPath} 
                                alt={currentTutorial.title}
                                style={styles.image} 
                            />
                        </div>
                    </IonCardHeader>
                    
                    <IonCardContent className="ion-text-center" style={styles.cardContent}>
                        <IonCardTitle style={styles.title}>
                            {currentTutorial.title}
                        </IonCardTitle>
                        <IonCardSubtitle className="ion-padding-bottom" style={styles.description}>
                            {currentTutorial.description}
                        </IonCardSubtitle>
                        
                        <ProgressIndicator currentSlide={currentSlide} totalSlides={totalSlides} />
                    </IonCardContent>
                </IonCard>
                
                <div style={styles.buttonContainer}>
                    <IonButton onClick={handleNextSlide} style={styles.button}>
                        Next
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Tutorial;