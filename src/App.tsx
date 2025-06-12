import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Analytics from './pages/Analytics';
import Landing from './pages/Landing';
import Scan from './pages/Scan';
import Shop from './pages/Shop';
import Recensioni from './pages/Recensioni';
import ShopList from './pages/ShopList';
import ShopDetail from './pages/ShopDetail';
import ShopReviews from './pages/ShopReviews';

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
import Login from './pages/Login';
import Inventory from './pages/Inventory';
import InputLogin from './pages/InputLogin';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>        <IonRouterOutlet>
          <Route exact path="/landing" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/Inputlogin" component={InputLogin} />

          {/* Merchant */}
          <Route exact path="/merchant/tutorial" component={MerchantTutorial} />
          <Route exact path="/Analytics" component={Analytics} />
          <Route exact path="/Scan" component={Scan} />
          <Route exact path="/Shop" component={Shop} />
          <Route exact path="/Recensioni" component={Recensioni} />
          <Route exact path="/Inventory" component={Inventory} />
          
          {/* Shops */}
          <Route exact path="/shops" component={ShopList} />
          <Route exact path="/shop/:id" component={ShopDetail} />
          <Route exact path="/shop/:id/reviews" component={ShopReviews} />
          
          {/* User */}
          <Route exact path="/user/tutorial" component={Tutorial} />
          <Route exact path="/user/profile" component={Profile} />
          <Route exact path="/user/tracking" component={Tracking} />
          <Route exact path="/user/tracking/:orderId" component={Tracking} />
          <Route exact path="/" render={() => <Redirect to="/login" />} />

        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;