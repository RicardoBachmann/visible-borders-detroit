import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import RedliningLayer from "./RedliningLayer";

import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";

export default function MapboxLayer() {
  const mapRef = useRef(null); // presist the map instance throuhout the lifecycle of this component
  const mapContainerRef = useRef(null); // exposes the map container and tell Mapbox where to create the map
  const [mapInstance, setMapInstance] = useState(null); // Map status

  useEffect(() => {
    // Prevent reinitialization if the map already exisit
    if (mapRef.current) {
      return;
    }
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-83.0458, 42.3314],
      zoom: 12,
    });

    mapRef.current = map;

    map.on("load", () => {
      setMapInstance(true);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <MapContainer ref={mapContainerRef} />
      {mapInstance && <RedliningLayer map={mapRef.current} />}
    </>
  );
}

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`;
