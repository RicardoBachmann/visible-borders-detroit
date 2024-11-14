import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";

export default function MapboxLayer() {
  return (
    <>
      <MapContainer />
    </>
  );
}

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: lightgrey;
`;
