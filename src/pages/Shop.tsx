import { IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from "../components/NavBar";

const Shop: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    history.replace('/shops');
  }, [history]);

  return (
    <IonPage>
      <NavBar />
    </IonPage>
  );
};

export default Shop;
