import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../components/Header';
import './Home.css';

const WordGame: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">wordGame</IonTitle>
                    </IonToolbar>
                </IonHeader>
                Game
            </IonContent>
        </IonPage>
    );
};

export default WordGame;
