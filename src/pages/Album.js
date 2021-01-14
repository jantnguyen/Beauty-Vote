import React from 'react';
import {
  IonPage,
  IonContent
} from '@ionic/react';
import LargeHeader from '../components/Header/LargeHeader';
import SmallHeader from '../components/Header/SmallHeader';

const Album = () => {
  return (
    <IonPage>
      <SmallHeader title ="Album" />
      <IonContent>
        <LargeHeader title ="Album" />
      </IonContent>
    </IonPage>
  )
}

export default Album;