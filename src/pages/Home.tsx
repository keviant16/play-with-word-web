import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import { addInfoUser } from '../services/InfoUserService';
import { InfoUser } from '../types/UserInfo';

const infoUser: InfoUser = {
  attemptOne: 0,
  attemptTwo: 0,
  attemptThree: 0,
  attemptFour: 0,
  attemptFive: 0,
  attemptSix: 0,
  words: []
};

const Home: React.FC = () => {

  const handleClick = async () => {
    const response = await addInfoUser(infoUser)
    const userID = response?.data.resourceId

    window.localStorage.setItem("userID", JSON.stringify(userID))
    window.location.reload()
  }

  return (
    <IonPage >
      <IonContent color="dark">
        <IonGrid fixed >
          <IonRow className="ion-justify-content-center ">
            <IonCol size="6">
              <div className="ion-text-center">
                <h1>Wordle</h1>
              </div>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center" >
            <IonCol size="6">
              <div className="ion-text-center">
                <IonButton onClick={handleClick} color={"primary"}>Jouer au jeu</IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage >
  );
};

export default Home;
