import React from 'react';
import useFormValidation from '../hooks/useFormValidation';
import validateCreateProduct from '../components/Auth/validateCreateProduct'
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton
} from '@ionic/react';
import LargeHeader from '../components/Header/LargeHeader';
import SmallHeader from '../components/Header/SmallHeader';
import UserContext from '../contexts/UserContext';
import { toast } from '../utils/toast';
import firebase from '../firebase'

const INITIAL_STATE = {
  title: "",
  description: "",
  url: "",
};

const Submit = ({history}) => {
  const {user} = React.useContext(UserContext);
  const [submitting, setSubmitting] = React.useState(false);
  const {handleSubmit, handleChange, values} = useFormValidation(
    INITIAL_STATE,
    validateCreateProduct,
    handleCreate,

  );

  async function handleCreate() {
    try {
      if (!user) {
        history.push("/login");
        return;
      }

      setSubmitting(true);

      const { url, description, title } = values;
      // eslint-disable-next-line no-undef
      const id = firebase.db.collection("product").doc().id;

      const newProduct = {
        title,
        url,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName,
        },
        voteCount: 1,
        comments: [],
        votes: [
          {
            votedBy: { id: user.uid, name: user.displayName}
          },
        ],
        created: Date.now(),
      };
      // eslint-disable-next-line no-undef
      await firebase.db.collection("products").doc(id).set(newProduct);
      history.push("/");
    } catch (e) {
      console.error(e);
      toast(e.message);
      setSubmitting(false);
    }
  }
  return (
    <IonPage>
      <SmallHeader title ="Submit" />
      <IonContent>
        <LargeHeader title ="Submit" />
        <IonItem lines="full">
          <IonLabel position="floating">Title</IonLabel>
          <IonInput
              name="title"
              value={values.title}
              type="text"
              onIonChange={handleChange}
              required
          ></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">URL</IonLabel>
          <IonInput
              name="url"
              value={values.url}
              type="text"
              onIonChange={handleChange}
              required
          ></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Description</IonLabel>
          <IonInput
              name="description"
              value={values.description}
              type="text"
              onIonChange={handleChange}
              required
          ></IonInput>
        </IonItem>

        <IonRow>
          <IonCol>
            <IonButton
            type="submit"
            color="primary"
            expand="block"
            disabled={submitting}
            onClick={handleSubmit}
            >Submit</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  )
}
export default Submit;