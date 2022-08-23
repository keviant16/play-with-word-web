import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../components/Header';
import InfoList from '../components/StatisticList';

import './Home.css';

const Statistic: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Logo</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div style={{ padding: "10px", display: "flex", flexDirection: "column", alignItems: 'center' }}>
                    <div style={{ padding: "10px", display: "flex", flexDirection: "column", alignItems: 'center' }}>
                        <IonText color="secondary">
                            <h1>Statistique</h1>
                        </IonText>
                    </div>
                    <div style={{ padding: "10px", display: "flex", flexDirection: "column", alignItems: 'center' }}>
                        <InfoList />
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Statistic;
