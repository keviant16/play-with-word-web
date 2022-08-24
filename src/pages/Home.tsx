import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../components/Header';
import '../style/style.css';

const Home: React.FC = () => {
  return (
    <IonPage >
      <Header />
      <IonContent fullscreen>
        <div style={{ padding: "10px", display: "flex", flexDirection: "column", alignItems: 'center' }}>
          <div style={{ padding: "10px", display: "flex", flexDirection: "column", alignItems: 'center' }}>
            <IonText color="secondary">
              <h1>Wordle Game</h1>
            </IonText>
            <p style={{ maxWidth: "40%" }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est voluptate fugiat labore temporibus quisquam repudiandae hic quasi tempore provident blanditiis et dolorum praesentium id, a veritatis, quis magnam ratione enim?</p>
            <div>
              <IonButton color="primary" href={"/game"}>Jouer</IonButton>
            </div>
          </div>

          <div style={{ padding: "10px", display: "flex", flexDirection: "column", alignItems: 'center' }}>

            <IonText color="secondary">
              <h2>Comment Jouer ?</h2>
            </IonText>
            <p style={{ maxWidth: "40%" }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est voluptate fugiat labore temporibus quisquam repudiandae hic quasi tempore provident blanditiis et dolorum praesentium id, a veritatis, quis magnam ratione enim?</p>
            <p style={{ maxWidth: "40%" }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est voluptate fugiat labore temporibus quisquam repudiandae hic quasi tempore provident blanditiis et dolorum praesentium id, a veritatis, quis magnam ratione enim?</p>
          </div>
        </div>

      </IonContent>
    </IonPage >
  );
};

export default Home;
