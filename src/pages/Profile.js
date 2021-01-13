import React from 'react';
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/react';

const Profile = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  )
}

export default Profile;