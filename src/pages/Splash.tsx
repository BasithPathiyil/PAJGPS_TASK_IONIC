import React, { useEffect } from "react";
import { IonPage, IonContent } from "@ionic/react";

const Splash: React.FC = () => {
  useEffect(() => {
    // Simulate a delay (e.g., 3 seconds) for the splash screen
    const timeout = setTimeout(() => {
      // Navigate to the main content page after the delay
      window.location.href = "/login";
    }, 1500);

    // Clear the timeout when the component is unmounted
    return () => clearTimeout(timeout);
  }, []);

  return (
    <IonPage>
      <IonContent>
        {/* You can customize the splash screen content here */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <img src="/logo.png" alt="Logo" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
