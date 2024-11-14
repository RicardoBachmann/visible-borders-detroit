import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";

export default function MapboxLayer() {
  const mapRef = useRef(); // presist the map instance throuhout the lifecycle of this component
  const mapContainerRef = useRef(); // exposes the map container and tell Mapbox where to create the map

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-83.0458, 42.3314],
      zoom: 12,
    });
    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <>
      <MapContainer ref={mapContainerRef} />
    </>
  );
}

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: lightgrey;
`;
