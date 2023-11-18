import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import api from "../../components/api";
import MapComponent from "../MapComponent";

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allDevices, setAllDevices] = useState([]);
  const [lastPointsAll, setLastPointsAll] = useState([]);
  const [flyLocation, setFlyLocation] = useState({});
  useEffect(() => {
    const fetchDevices = async () => {
      setIsLoading(true);
      const { data } = await api.get("/device");
      console.log(data);
      setAllDevices(data.success);
      setIsLoading(false);
    };
    fetchDevices();
  }, []);
  useEffect(() => {
    const fetchLastPoints = async (id: any) => {
      try {
        const { data } = await api.get(
          `https://connect.paj-gps.de/api/trackerdata/${id}/last_points?lastPoints=${1}`
        );
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    if (allDevices.length > 0) {
      const fetchData = async () => {
        setIsLoading(true);
        let lastPoints: any = [];
        const fetchPromises = allDevices.map(async (device: any) => {
          let response = await fetchLastPoints(device?.id);
          console.log("response", response);
          return {
            deviceId: response.success[0].iddevice,
            lat: response.success[0].lat,
            lng: response.success[0].lng,
          };
        });

        lastPoints = await Promise.all(fetchPromises);
        setLastPointsAll(lastPoints);
        setIsLoading(false);
      };

      fetchData();
    }
  }, [allDevices]);

  const handleClickCard = (id: any) => {
    console.log(id);
    console.log(lastPointsAll);
    const loc: any = lastPointsAll?.find((point: any) => point.deviceId === id);
    console.log(loc);
    setFlyLocation(loc);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading
        isOpen={isLoading}
        className="custom-loading"
        message="Loading"
      />
      <IonContent>
        <div style={{ height: "60%", position: "relative" }}>
          <MapComponent lastPoints={lastPointsAll} flyLocation={flyLocation} />
        </div>
        <div
          style={{
            paddingTop: "5px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h3>My Devices</h3>
          {/* Other content goes here */}
        </div>
        <div style={{ overflowY: "auto" }}>
          {allDevices?.map((device: any) => (
            <IonCard
              key={device?.id}
              onClick={() => handleClickCard(device?.id)}
            >
              <IonCardHeader>
                <IonCardTitle>{device?.name}</IonCardTitle>
                <IonCardSubtitle>{device?.route_profile[0]}</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
