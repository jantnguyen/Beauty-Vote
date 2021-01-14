import React from 'react';
import {
  IonPage,
  IonContent
} from '@ionic/react';
import LargeHeader from '../components/Header/LargeHeader';
import SmallHeader from '../components/Header/SmallHeader';

const Home = () => {
  return (
    <IonPage>
      <SmallHeader title ="Beauty Vote" />
      <IonContent>
        <LargeHeader title ="Beauty Vote" />
      </IonContent>
    </IonPage>
  )
}

export default Home;