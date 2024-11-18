import React, { useEffect } from "react";
import geojsonData from "../assets/geojson/Redlining_spatial_data.json";

export default function RedliningLayer({ map }) {
  useEffect(() => {
    if (!map) return;

    const addLayer = () => {
      if (!map.getSource("redlining")) {
        map.addSource("redlining", {
          type: "geojson",
          data: geojsonData,
        });

        map.addLayer({
          id: "redlining-layer",
          type: "fill",
          source: "redlining",
          paint: {
            "fill-color": [
              "match",
              ["get", "grade"],
              "A",
              "#76a865",
              "B",
              "#2b49e0",
              "C",
              "#f2d233",
              "D",
              "#e63946",
              "#cccccc",
            ],
            "fill-opacity": 0.7,
          },
        });
      }
    };

    if (map.loaded()) {
      addLayer();
    } else {
      map.on("load", addLayer);
    }

    return () => {
      if (map.getLayer("redlining-layer")) {
        map.removeLayer("redlining-layer");
      }
      if (map.getSource("redlining")) {
        map.removeSource("redlining");
      }
    };
  }, [map]);
}
