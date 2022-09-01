import { IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonProgressBar, IonRow, IonText } from '@ionic/react';
import { setUncaughtExceptionCaptureCallback } from 'process';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import useFetch from '../hooks/useFetch';


const userAttemptInit = {
    attemptOne: 0,
    attemptTwo: 0,
    attemptThree: 0,
    attemptFour: 0,
    attemptFive: 0,
    attemptSix: 0,
}

const Statistic: React.FC = () => {

    const userID = window.localStorage.getItem("userID")
    const infoUser: any = useFetch("http://localhost:8080/infoUsers/" + userID)
    const [attempts, setAttempts] = useState(userAttemptInit);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const attempts = {
            attemptOne: infoUser?.attemptOne,
            attemptTwo: infoUser?.attemptTwo,
            attemptThree: infoUser?.attemptThree,
            attemptFour: infoUser?.attemptFour,
            attemptFive: infoUser?.attemptFive,
            attemptSix: infoUser?.attemptSix,
        }
        const total: number = infoUser?.attemptOne + infoUser?.attemptTwo + infoUser?.attemptThree + infoUser?.attemptFour + infoUser?.attemptFive + infoUser?.attemptSix
        setTotal(total)
        setAttempts(attempts)
    }, [infoUser]);


    return (
        <IonPage>
            <Header />
            <IonContent color="dark">
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="6">
                            <IonText color="primary">
                                <h1>Statisique</h1>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="8">
                            <IonList color="medium">
                                <IonListHeader>
                                    <IonLabel>Tentative(s) par mot trouver :</IonLabel>
                                </IonListHeader>
                                <IonItem >
                                    <IonLabel>1 : {attempts.attemptOne} / {total}
                                        <IonProgressBar value={attempts.attemptOne / total} />
                                    </IonLabel>
                                </IonItem>
                                <IonItem >
                                    <IonLabel>2 : {attempts.attemptTwo} / {total}
                                        <IonProgressBar value={attempts.attemptTwo / total} />
                                    </IonLabel>
                                </IonItem>
                                <IonItem >
                                    <IonLabel>3 : {attempts.attemptThree} / {total} :
                                        <IonProgressBar value={attempts.attemptThree / total} />
                                    </IonLabel>
                                </IonItem>
                                <IonItem >
                                    <IonLabel>4 : {attempts.attemptFour} / {total}
                                        <IonProgressBar value={attempts.attemptFour / total} /></IonLabel>
                                </IonItem>
                                <IonItem >
                                    <IonLabel>5 : {attempts.attemptFive} / {total}
                                        <IonProgressBar value={attempts.attemptFive / total} />
                                    </IonLabel>
                                </IonItem>
                                <IonItem >
                                    <IonLabel>6 : {attempts.attemptSix} / {total}
                                        <IonProgressBar value={attempts.attemptSix / total} />
                                    </IonLabel>
                                </IonItem>
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    );
};


export default Statistic