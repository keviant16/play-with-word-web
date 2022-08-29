import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuToggle, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { menu } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import useFetch from '../hooks/useFetch';


const statInit = {
    code: "",
    oneTry: 0,
    twoTry: 0,
    threeTry: 0,
    fourTry: 0,
    fiveTry: 0,
    sixTry: 0,
}

const Statistic: React.FC = () => {

    const code = window.localStorage.getItem("code")
    const data = useFetch("http://localhost:8080/statistics/search/findByCode?code=" + code)
    const [statistic, setstatistic] = useState(statInit);

    useEffect(() => {
        setstatistic(data)
        console.log(data);

    }, [data]);

    return (
        <IonPage>
            <Header />
            <IonContent color="dark">
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="4">
                            <IonText color="primary">
                                <h1>Statisique</h1>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="4">
                            {statistic &&
                                <IonList>
                                    <IonItem >
                                        <IonLabel> Trouver un mot en 1 tentative : {statistic.oneTry}</IonLabel>
                                    </IonItem>
                                    <IonItem >
                                        <IonLabel> Trouver un mot en 2 tentative : : {statistic.twoTry}</IonLabel>
                                    </IonItem>
                                    <IonItem >
                                        <IonLabel> Trouver un mot en 3 tentative : : {statistic.threeTry}</IonLabel>
                                    </IonItem>
                                    <IonItem >
                                        <IonLabel> Trouver un mot en 4 tentative : : {statistic.fourTry}</IonLabel>
                                    </IonItem>
                                    <IonItem >
                                        <IonLabel> Trouver un mot en 5 tentative : : {statistic.fiveTry}</IonLabel>
                                    </IonItem>
                                    <IonItem >
                                        <IonLabel> Trouver un mot en 6 tentative : : {statistic.sixTry}</IonLabel>
                                    </IonItem>
                                </IonList>
                            }
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    );
};


export default Statistic