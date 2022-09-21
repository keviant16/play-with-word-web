import { IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonPage, IonRow, IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { getInfoUserWords } from "../services/InfoUserService";

const LastWord: React.FC = () => {

    const userID: any = window.localStorage.getItem("userID")
    const [lastWords, setLastWords] = useState([]);

    useEffect(() => {
        const initWordList = async () => {
            let words = await getInfoUserWords(userID)
            setLastWords(words?.reverse())
        }
        initWordList()
    }, [userID]);



    return (
        <IonPage>
            <Header />
            <IonContent className="ion-padding" color="dark">
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="10">
                            <IonText color="primary">
                                <h2>Dernier mots trouvés</h2>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="10">
                            <IonList color="dark">
                                {lastWords && lastWords.map((word: string, idx: number) =>
                                    <IonItem key={idx} color="dark">
                                        <IonLabel color="secondary">{idx + 1} : {word}</IonLabel>
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