import { Route } from 'react-router-dom';
import { IonApp, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenu, IonMenuToggle, IonRouterOutlet, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Game from './pages/WordGame';
import Statistic from './pages/Statistic';
import LastWord from './pages/LastWord';
import { gameController, save, statsChart } from 'ionicons/icons';
import Home from './pages/Home';
import { useEffect, useState } from 'react';

setupIonicReact();

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState("");

  useEffect(() => {
    const userID = window.localStorage.getItem("userID")
    setIsAuth(userID && userID !== 'undefined' ? userID : "")
  }, []);

  return (
    <IonApp>
      <IonMenu contentId='main'>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent color="dark">
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink="/" color={"dark"}>
              <IonIcon slot="start" icon={gameController}></IonIcon>
              <IonLabel>
                Lancer une nouvelle partie
              </IonLabel>
            </IonItem>
            <IonItem button routerLink="/lastword" color={"dark"}>
              <IonIcon slot="start" icon={save}></IonIcon>
              <IonLabel>
                Acc??der aux derniers mots
              </IonLabel>
            </IonItem>
            <IonItem button routerLink="/stats" color={"dark"}>
              <IonIcon slot="start" icon={statsChart}></IonIcon>
              <IonLabel>
                Visualiser des stats
              </IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonContent>
      </IonMenu>

      <IonReactRouter>
        <IonRouterOutlet id='main'>
          <Route exact path="/" render={() => isAuth ? <Game /> : <Home />} />
          <Route path="/lastword" component={LastWord} />
          <Route path="/stats" component={Statistic} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp >
  );

}

export default App;
