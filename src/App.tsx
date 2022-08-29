import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonText, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
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

import '../src/style/style.css'

import Game from './pages/WordGame';
import Statistic from './pages/Statistic';
import LastWord from './pages/LastWord';
import { gameController, save, statsChart } from 'ionicons/icons';
import Home from './pages/Home';



setupIonicReact();

const App: React.FC = () => {

  return (
    <IonApp>
      <IonMenu contentId='main' >
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink="/game">
              <IonIcon slot="start" icon={gameController}></IonIcon>
              <IonLabel>
                Lancer une nouvelle partie
              </IonLabel>
            </IonItem>
            <IonItem button routerLink="/last-word">
              <IonIcon slot="start" icon={save}></IonIcon>
              <IonLabel>
                Accéder aux derniers mots
              </IonLabel>
            </IonItem>
            <IonItem button routerLink="/stats">
              <IonIcon slot="start" icon={statsChart}></IonIcon>
              <IonLabel>
                Visualiser des stats
              </IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonContent>
      </IonMenu>

      <IonRouterOutlet id='main'>
        <IonReactRouter>
          <Route path="/home" component={Home} />
          <Route path="/game" component={Game} />
          <Route path="/last-word" component={LastWord} />
          <Route path="/stats" component={Statistic} />
          {/* <Route render={() => <Redirect exact from="/" to="/game" />} /> */}
        </IonReactRouter>
      </IonRouterOutlet>
    </IonApp >
  );

}

export default App;
