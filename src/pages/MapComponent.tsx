import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";

interface Point {
  deviceId: number;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  lastPoints: Point[];
  flyLocation: any;
}

const MapComponent: React.FC<MapComponentProps> = ({
  flyLocation,
  lastPoints,
}) => {
  const [myLocation, setMyLocation] = useState<any>({});
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);
  useEffect(() => {
    if (mapContainer.current) {
      mapInstance.current = new maplibregl.Map({
        container: mapContainer.current,
        // style: "https://demotiles.maplibre.org/style.json",
        style:
          "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
        center: [7.07, 50.7234],
        zoom: 12,
      });
      if (mapInstance.current && lastPoints.length > 0) {
        lastPoints.forEach((point) => {
          if (mapInstance.current) {
            new maplibregl.Marker()
              .setLngLat([point.lng, point.lat])
              .addTo(mapInstance.current);
          }
        });
      }
      const detectLocationButton = document.createElement("button");
      detectLocationButton.innerHTML = "My Location";
      detectLocationButton.addEventListener("click", getUserLocation);

      // Style the button and position it in the top-right corner.st
      detectLocationButton.style.padding = "2px";
      detectLocationButton.style.position = "absolute";
      detectLocationButton.style.top = "10px";
      detectLocationButton.style.right = "10px";
      detectLocationButton.style.zIndex = "1"; // Ensure it's above the map

      // Add button to the map container
      mapContainer.current.appendChild(detectLocationButton);
      mapInstance.current.addControl(
        new maplibregl.ScaleControl({ maxWidth: 80, unit: "metric" }),
        "top-left"
      );
      mapInstance.current.addControl(
        new maplibregl.NavigationControl(),
        "top-left"
      );
      //   const marker = new maplibregl.Marker()
      //     .setLngLat([50.7234, 7.07])
      //     .addTo(map);
      if (flyLocation && flyLocation.lat && flyLocation.lng) {
        mapInstance.current.flyTo({
          center: [flyLocation.lng, flyLocation.lat],
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
      }

      return () => {
        if (mapInstance.current) {
          mapInstance.current.remove();
        }
      };
    }
  }, [lastPoints, flyLocation]);
  useEffect(() => {
    if (myLocation && myLocation.lat && myLocation.lng && mapInstance.current) {
      mapInstance.current.flyTo({
        center: [myLocation.lng, myLocation.lat],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
      new maplibregl.Marker()
        .setLngLat([myLocation.lng, myLocation.lat])
        .addTo(mapInstance.current);
    }
  }, [myLocation]);

  const getUserLocation = () => {
    console.log("working");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(userLocation);
          setMyLocation({ lat: userLocation.lat, lng: userLocation.lng });
          //   if (mapInstance.current) {
          //     // Add a marker for the user's location
          //     new maplibregl.Marker()
          //       .setLngLat([userLocation.lng, userLocation.lat])
          //       .addTo(mapInstance.current);
          //     mapInstance.current.flyTo({
          //       center: [userLocation.lng, userLocation.lat],
          //       essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          //     });
          //   }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  return <div ref={mapContainer} style={{ height: "100%" }} />;
};

export default MapComponent;
