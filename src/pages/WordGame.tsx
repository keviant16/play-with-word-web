import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../components/Header';
import Matrice from '../components/Matrice';
import './Home.css';

const WordGame: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <div style={{ padding: "10px", display: "flex", flexDirection: "column", alignItems: 'center' }}>
                    <div style={{ padding: "10px", display: "flex", flexDirection: "column", alignItems: 'center' }}>
                        <Matrice />
                    </div>

                    <div style={{ padding: "10px", display: "flex", flexDirection: "column", alignItems: 'center' }}>
                        Keyboard
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default WordGame;
