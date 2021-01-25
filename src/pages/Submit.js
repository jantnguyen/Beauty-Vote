import React from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import useFormValidation from "../hooks/useFormValidation";
import validateCreateProduct from "../components/Auth/validateCreateProduct";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";
import SmallHeader from "../components/Header/SmallHeader";
import LargeHeader from "../components/Header/LargeHeader";
import Upload from "../components/Form/Upload";
import { toast } from "../utils/toast";

const INITIAL_STATE = {
  title: "",
  description: "",
  url: "",
};

const Submit = ({ history }) => {
  const { user } = React.useContext(UserContext);
  const [submitting, setSubmitting] = React.useState(false);
  const [thumb, setThumb] = React.useState([]);
  const [photos, setPhotos] = React.useState([]);
  const { handleSubmit, handleChange, values } = useFormValidation(
    INITIAL_STATE,
    validateCreateProduct,
    handleCreate
  );

  async function handleCreate() {
    try {
      if (!user) {
        history.push("/login");
        return;
      }

      setSubmitting(true);

      const {description, } = values;
      const id = firebase.db.collection("products").doc().id;

      await Promise.all([
        ...photos.map((f, index) =>
          firebase.storage
            .ref()
            .child(`products/${id}_photo_${index}.jpg`)
            .put(f)
        ),
      ]);

      const productPhotos = await Promise.all(
        photos.map((f, index) =>
          firebase.storage
            .ref()
            .child(`products/${id}_photo_${index}.jpg`)
            .getDownloadURL()
        )
      );

      const newProduct = {
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName,
        },
        thumbnail: productPhotos[0] || null,
        photos: productPhotos,
        voteCount: 1,
        comments: [],
        votes: [
          {
            votedBy: { id: user.uid, name: user.displayName },
          },
        ],
        created: Date.now(),
      };
      setThumb([]);
      setPhotos([]);
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
      <SmallHeader title="Submit" />
      <IonContent>
        <LargeHeader title="Submit" />
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
            <Upload
              files={photos}
              onChange={setPhotos}
              placeholder="Select Product Photos"
              multiple
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              disabled={submitting}
              onClick={handleSubmit}
            >
              Submit
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Submit;