import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuToggle, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { menu } from "ionicons/icons";
import useFetch from "../hooks/useFetch";

const Loading: React.FC = () => {


    // if (!Loadings) return

    return (
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
                <p>Loading.</p>
            </IonContent>
        </IonPage>
    );
}
export default Loading;