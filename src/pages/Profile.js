import React from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
  IonLabel,
  IonRow,
  IonList,
  IonCol,
  IonButton,
  IonItem,
  IonGrid
} from '@ionic/react';
import {personCircleOutline, mailOpenOutline, pencilOutline} from 'ionicons/icons';
import UserContext from '../contexts/UserContext';
import firebase from '../firebase';
import { toast } from "../utils/toast";
import LargeHeader from '../components/Header/LargeHeader';
import SmallHeader from '../components/Header/SmallHeader';

const Profile = (props) => {
  const {user} = React.useContext(UserContext);
  async function logoutUser() {
    try {
      await firebase.logout();
      props.history.push("/");
      toast("You have logged out successfully.")
    } catch (err) {
      console.error("Logout Error", err);
      toast(err.message)
    }
  }
  return (
    <IonPage>
      <SmallHeader title ="Profile" />
      <IonContent>
        <LargeHeader title ="Profile" />
        {user ? (
          <>
            <IonCard>
              <IonCardContent>
                <IonList lines="none">
                  <IonItem>
                    <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
                    <IonLabel>
                      <p>Username</p>
                      <strong>{user.displayName}</strong>
                    </IonLabel>
                    <IonButton fill="clear" size="medium" routerLink={`/edit-profile`}>
                      <IonIcon
                         icon={pencilOutline} slot="end">
                      </IonIcon>
                    </IonButton>

                  </IonItem>

                  <IonItem>
                    <IonIcon icon={mailOpenOutline} slot="start"></IonIcon>
                    <IonLabel>
                      <p>Email</p>
                      <strong>{user.email}</strong>
                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
            <IonRow>
              <IonCol>
                <IonButton shape="round" expand="block" routerLink={`/edit-profile`} color="primary" fill="outline">
                  Change Password
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton shape ="round" expand="block" color="primary" fill="outline" onClick={logoutUser}>
                  Log out
                </IonButton>
              </IonCol>
            </IonRow>
          </>
        ): (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton  expand="block" routerLink={`/signup`} color="primary" fill="outline" shape ="round">
                  Sign up
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton expand="block" routerLink={`/login`} color="primary" fill="outline" shape ="round">
                  Log in
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Profile;