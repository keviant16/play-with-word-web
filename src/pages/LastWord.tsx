import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuToggle, IonPage, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { menu } from "ionicons/icons";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const LastWord: React.FC = () => {

    const data = useFetch("http://localhost:8080/lastWords")
    const [lastWords, setLastWords] = useState([]);

    useEffect(() => {
        setLastWords(data?._embedded?.lastWords.reverse())
        console.log(lastWords);

    }, [data]);




    // if (!lastwords) return

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
                    <IonTitle>Le jeu mot</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="4">
                            <IonText color="primary">
                                <h1>Dernier mots trouvés</h1>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="4">
                            <IonList color="dark">
                                {lastWords && lastWords.map((word: any, idx: number) =>
                                    <IonItem key={idx}>
                                        <IonLabel>{idx + 1} : {word.value}</IonLabel>
                                    </IonItem>
                                )}
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}
export default LastWord;