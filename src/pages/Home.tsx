import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../style/style.css';

const baseURL = "http://localhost:8080/infoUsers"

const userInfo = {
  attemptOne: 0,
  attemptTwo: 0,
  attemptThree: 0,
  attemptFour: 0,
  attemptFive: 0,
  attemptSix: 0,
  words: []
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const history = useHistory()

  const addUserInfo = () => {
    setLoading(true)
    axios
      .post(baseURL, userInfo)
      .then((response) => {

        const userID = response.data.resourceID
        window.localStorage.setItem("userID", JSON.stringify(userID))
        setLoading(false)
      }).catch((error) => error);
    history.push('/game');
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
                <IonButton onClick={addUserInfo} color={"primary"}>Jouer au jeu</IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent >
    </IonPage >
  );
};

export default Home;
