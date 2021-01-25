import React from 'react';
import {
  IonPage,
  IonContent
} from '@ionic/react';
import ProductList from '../components/Product/ProductList'
import LargeHeader from '../components/Header/LargeHeader';
import SmallHeader from '../components/Header/SmallHeader';

const Home = (props) => {
  return (
    <IonPage>
      <SmallHeader title ="Beauty Vote" />
      <IonContent color="medium" fullscreen>
        <LargeHeader title ="Beauty Vote" />
        <br></br>
        <ProductList location={props.location} />
      </IonContent>
    </IonPage>
  )
}

export default Home;