import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenuToggle, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { menu } from 'ionicons/icons';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatisticService from '../services/LastWordService';
import '../style/style.css';

const Home: React.FC = () => {

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
                <IonButton routerLink='/game' color={"primary"}>Jouer au jeu</IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent >
    </IonPage >
  );
};

export default Home;
