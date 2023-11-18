import React from "react";
import {
  IonPage,
  IonContent,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
// import SettingsPage from './SettingsPage';
// import ProfilePage from './ProfilePage';
import HomePage from "./HomePage";

const DashboardPage = () => {
  return (
    <IonPage>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/dashboard" to="/dashboard/home" />
          <Route path="/dashboard/home" component={HomePage} />
          {/* <Route path="/dashboard/settings" component={SettingsPage} />
          <Route path="/dashboard/profile" component={ProfilePage} /> */}
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/dashboard/home">
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="settings" href="/dashboard/settings">
            <IonLabel>Settings</IonLabel>
          </IonTabButton>

          <IonTabButton tab="profile" href="/dashboard/profile">
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default DashboardPage;
