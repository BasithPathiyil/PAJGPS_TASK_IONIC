import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
  IonRow,
  IonCol,
  IonGrid,
  IonImg,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAlert,
} from "@ionic/react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import api from "../components/api";
import { handleToken } from "../components/jwt";

interface LoginProps extends RouteComponentProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("password", password);
  const handleLogin = async () => {
    if (!password || !email) {
      setIsOpen(true);
      return;
    }
    // Add your login logic here
    let encodedEmail = encodeURIComponent(email);
    let encodedPassword = encodeURIComponent(password);
    console.log("Logging in with:", {
      email,
      password,
      encodedEmail,
      encodedPassword,
    });
    try {
      const { data } = await api.post(
        `/login?email=${encodedEmail}&password=${encodedPassword}`
      );
      console.log(data);
      if (data?.success?.token) {
        await handleToken(data?.success?.token);
        navigate.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("email ", email);
  const handleChangePassword = (value: any) => {
    console.log(value);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            paddingRight: "16px",
            paddingLeft: "16px",
          }}
        >
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                    debounce={0}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="text"
                    value={password}
                    onIonChange={(e: any) => setPassword(e.detail.value!)}
                    debounce={0}
                  />
                </IonItem>
                <IonButton expand="full" onClick={handleLogin}>
                  Login
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
        <IonAlert
          isOpen={isOpen}
          header="Missing values !"
          //   subHeader=""
          message="All the fields are mandatory."
          buttons={["Ok"]}
          onDidDismiss={() => setIsOpen(false)}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default Login;
