import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const SmallHeader = ({ title }) => {
  return (
    <IonHeader>
      <IonToolbar style={{ background: "#df539e" }} color="primary">
        <IonTitle>{ title }</IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}
export default SmallHeader