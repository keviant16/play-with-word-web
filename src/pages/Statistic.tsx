import { IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonProgressBar, IonRow, IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { getInfoUser } from '../services/InfoUserService';


const userAttemptInit = {
    attemptOne: 0,
    attemptTwo: 0,
    attemptThree: 0,
    attemptFour: 0,
    attemptFive: 0,
    attemptSix: 0,
}

const Statistic: React.FC = () => {

    const userID: any = window.localStorage.getItem("userID")
    const [attempts, setAttempts] = useState(userAttemptInit);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        iniInfoUserAttempt()
    }, []);

    const iniInfoUserAttempt = async () => {
        let infoUser = await getInfoUser(userID)
        const total: number = infoUser?.attemptOne + infoUser?.attemptTwo + infoUser?.attemptThree + infoUser?.attemptFour + infoUser?.attemptFive + infoUser?.attemptSix

        const attempts = {
            attemptOne: infoUser?.attemptOne,
            attemptTwo: infoUser?.attemptTwo,
            attemptThree: infoUser?.attemptThree,
            attemptFour: infoUser?.attemptFour,
            attemptFive: infoUser?.attemptFive,
            attemptSix: infoUser?.attemptSix,
        }

        setAttempts(attempts)
        setTotal(total)
    }


    return (
        <IonPage>
            <Header />
            <IonContent color="dark">
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="10">
                            <IonText color="primary">
                                <h1>Statisique</h1>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="10">
                            <IonList color="dark">
                                <IonListHeader color="dark">
                                    <IonLabel>
                                        <div>Nombre total de mot trouver : {total}</div>
                                        <div>Tentative(s) par mot trouver :</div>
                                    </IonLabel>

                                </IonListHeader>
                                <IonItem color="dark">
                                    <IonLabel>1 : {attempts.attemptOne}
                                        <IonProgressBar color="secondary" value={attempts.attemptOne / total} />
                                    </IonLabel>
                                </IonItem>
                                <IonItem color="dark">
                                    <IonLabel >2 : {attempts.attemptTwo}
                                        <IonProgressBar color="secondary" value={attempts.attemptTwo / total} />
                                    </IonLabel>
                                </IonItem>
                                <IonItem color="dark">
                                    <IonLabel >3 : {attempts.attemptThree}  :
                                        <IonProgressBar color="secondary" value={attempts.attemptThree / total} />
                                    </IonLabel>
                                </IonItem>
                                <IonItem color="dark">
                                    <IonLabel>4 : {attempts.attemptFour}
                                        <IonProgressBar color="secondary" value={attempts.attemptFour / total} /></IonLabel>
                                </IonItem>
                                <IonItem color="dark">
                                    <IonLabel>5 : {attempts.attemptFive}
                                        <IonProgressBar color="secondary" value={attempts.attemptFive / total} />
                                    </IonLabel>
                                </IonItem>
                                <IonItem color="dark">
                                    <IonLabel>6 : {attempts.attemptSix}
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