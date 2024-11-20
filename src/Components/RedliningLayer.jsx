import React, { useEffect, useState } from "react";
import geojsonData from "../assets/geojson/Redlining_spatial_data.json";
import styled from "styled-components";

export default function RedliningLayer({ map }) {
  const [gradeFilter, setGradeFilter] = useState([]); // array of selected grades

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

  useEffect(() => {
    if (!map || !map.getLayer("redlining-layer")) return;

    if (gradeFilter.length > 0) {
      map.setFilter("redlining-layer", ["in", "grade", ...gradeFilter]);
    } else {
      map.setFilter("redlining-layer", null);
    }
  }, [map, gradeFilter]);

  const toggleFilter = (grade) => {
    setGradeFilter((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  return (
    <>
      <LegendContainer>
        <h3>Residential Security Map,1939 (LEGEND)</h3>
        <GradeButton
          $isActive={gradeFilter.includes("A")}
          onClick={() => toggleFilter("A")}
        >
          A: Best
        </GradeButton>
        <GradeButton
          $isActive={gradeFilter.includes("B")}
          onClick={() => toggleFilter("B")}
        >
          B: Still Desirable
        </GradeButton>
        <GradeButton
          $isActive={gradeFilter.includes("C")}
          onClick={() => toggleFilter("C")}
        >
          C: Definitly Declining
        </GradeButton>
        <GradeButton
          $isActive={gradeFilter.includes("D")}
          onClick={() => toggleFilter("D")}
        >
          D: Hazardous
        </GradeButton>
      </LegendContainer>
    </>
  );
}

const LegendContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: black;
  border: 1px solid red;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
`;

const GradeButton = styled.button`
  display: flex;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.$isActive ? "red" : "white")};
  color: ${(props) => (props.$isActive ? "white" : "black")};
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 10px;
  &:hover {
    background-color: ${(props) => (props.$isActive ? "darkred" : "#ddd")};
  }
`;
