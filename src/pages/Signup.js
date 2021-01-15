import React from 'react';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonLoading
} from '@ionic/react';
import NavHeader from '../components/Header/NavHeader';
import {toast} from '../utils/toast';
import useFormValidation from '../hooks/useFormValidation';
import validateSignup from '../components/Auth/validateSignup';
import firebase from '../firebase'

const INITIAL_STATE = {
  name: "",
  email:"",
  password:"",
};

const Signup = (props) => {
  const {
    handleSubmit,
    handleChange,
    values,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateSignup, authenticateUser)
  const [busy, setBusy] = React.useState(false);

  async function authenticateUser() {
    setBusy(true);
    const{name, email, password} = values;
    try {
      await firebase.register(name, email, password);
      toast("You have signed up successfully!")
      props.history.push("/")
    } catch (err){
      console.error("Authentication Error", err)
      toast(err.message)
    }
    setBusy(false)
  }
  return (
    <IonPage>
      <NavHeader title="Sign up" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Username</IonLabel>
          <IonInput name="name" value={values.name} onIonChange={handleChange} type="text" required></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput name="email" type="text" value={values.email} onIonChange={handleChange} required></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput name="password" type="password" value={values.password} onIonChange={handleChange} required></IonInput>
        </IonItem>

        <IonRow>
          <IonCol>
            <IonButton type="submit" color="primary" expand="block" onClick={handleSubmit} disabled={isSubmitting}>
              Sign up
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  )
}

export default Signup;