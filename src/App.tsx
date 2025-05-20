import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Scan from './pages/Scan';
import Shop from './pages/Shop';
import Recensioni from './pages/Recensioni';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Analytics" component={Analytics} />
          <Route exact path="/Scan" component={Scan} />
          <Route exact path="/Shop" component={Shop} />
          <Route exact path="/Recensioni" component={Recensioni} />
          <Route exact path="/" render={() => <Redirect to="/analytics" />} />
        </IonRouterOutlet>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;