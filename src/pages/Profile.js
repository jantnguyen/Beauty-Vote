import React from 'react';
import {
  IonPage,
  IonContent
} from '@ionic/react';
import LargeHeader from '../components/Header/LargeHeader';
import SmallHeader from '../components/Header/SmallHeader';

const Profile = () => {
  return (
    <IonPage>
      <SmallHeader title ="Profile" />
      <IonContent>
        <LargeHeader title ="Profile" />
      </IonContent>
    </IonPage>
  )
}

export default Profile;