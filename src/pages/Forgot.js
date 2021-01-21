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
  IonLoading,
} from '@ionic/react';
import NavHeader from '../components/Header/NavHeader';
import {toast} from '../utils/toast';
import useFormValidation from '../hooks/useFormValidation';
import validatePasswordReset from '../components/Auth/validatePasswordReset';
import firebase from '../firebase'

const INITIAL_STATE = {
  email:""
};

const Forgot = (props) => {
  const {
    handleSubmit,
    handleChange,
    values,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validatePasswordReset, handleResetPassword)
  const [busy, setBusy] = React.useState(false);

  async function handleResetPassword() {
    setBusy(true);
    const{email} = values;
    try {
      await firebase.resetPassword(email);
      toast("Check your email to reset the password")
      props.history.push("/login")
    } catch (err){
      console.error("Password reset error", err)
      toast(err.message)
    }
    setBusy(false)
  }
  return (
    <IonPage>
      <NavHeader title="Forgot" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput name="email" value={values.email} onIonChange={handleChange} type="text" required></IonInput>
        </IonItem>

        <IonRow>
          <IonCol>
            <IonButton type="submit" color="primary" onClick={handleSubmit} expand="block" disabled={isSubmitting}>
              Get reset link
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  )
}

export default Forgot;