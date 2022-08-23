import { IonList, IonItem, IonLabel } from '@ionic/react';

const StatisticList = () => (
    <IonList>
        <IonItem>
            <IonLabel>Nombre de victoire : </IonLabel>
        </IonItem>
        <IonItem>
            <IonLabel>Nombre de défaite : </IonLabel>
        </IonItem>
        <IonItem>
            <IonLabel>Ration : </IonLabel>
        </IonItem>
    </IonList>
);

export default StatisticList;