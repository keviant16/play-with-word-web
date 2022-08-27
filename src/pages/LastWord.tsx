import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuToggle, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { menu } from "ionicons/icons";

const LastWord: React.FC = () => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuToggle>
                        <IonButton>
                            <IonIcon slot="icon-only" icon={menu}></IonIcon>
                        </IonButton>
                    </IonMenuToggle>
                </IonButtons>
                <IonTitle>Header</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <h1>Main Content</h1>
            <p>Click the icon in the top left to toggle the menu.</p>
        </IonContent>
    </IonPage>

);

export default LastWord;