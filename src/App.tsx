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
import Tutorial from './pages/user/Tutorial';
import Profile from './pages/user/Profile';
import Tracking from './pages/user/Tracking';
import MerchantTutorial from './pages/merchant/MerchTutorial';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/Login" component={Login} />

          {/* Merchant */}
          <Route exact path="/merchant/tutorial" component={MerchantTutorial} />
          <Route exact path="/Analytics" component={Analytics} />
          <Route exact path="/Scan" component={Scan} />
          <Route exact path="/Shop" component={Shop} />
          <Route exact path="/Recensioni" component={Recensioni} />
              {/* User */}
          <Route exact path="/user/tutorial" component={Tutorial} />
          <Route exact path="/user/profile" component={Profile} />
          <Route exact path="/user/tracking" component={Tracking} />
          <Route exact path="/user/tracking/:orderId" component={Tracking} />
          <Route exact path="/" render={() => <Redirect to="/login" />} />

          

        </IonRouterOutlet>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;