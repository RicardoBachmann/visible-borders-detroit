import React, { useEffect, useState } from "react";
import geojsonData from "../assets/geojson/Redlining_spatial_data.json";
import styled from "styled-components";

const GRADES = [
  {
    id: "A",
    label: "A: Best",
    color: "#76a865",
    description:
      "These represented the most desirable neighborhoods, predominantly inhabited by affluent white families. They were considered low-risk and highly creditworthy, receiving the most favorable lending and investment opportunities.",
  },
  {
    id: "B",
    label: "B: Still Desirable",
    color: "#2b49e0",
    description:
      "These were stable, middle-class neighborhoods, often with slightly more diversity. While still seen as good investments, they were considered less ideal than green areas.",
  },
  {
    id: "C",
    label: "C: Definitely Declining",
    color: "#f2d233",
    description:
      "Marked as declining or risky, these neighborhoods typically included working-class families and were often ethnically or economically mixed. They received limited financial support or investment.",
  },
  {
    id: "D",
    label: "D: Hazardous",
    color: "#e63946",
    description:
      "These were labeled as `hazardous` and predominantly comprised minority populations, especially Black communities. These areas were systematically denied loans and investments, reinforcing segregation and economic inequality.",
  },
];

export default function RedliningLayer({ map }) {
  // State to manage the currently selected grade filters
  const [selectedGrades, setSelectedGrades] = useState([]);

  const [layerAdded, setLayerAdded] = useState(false);

  // Function to add the GeoJSON layer to the map
  const addRedliningLayer = () => {
    if (layerAdded || !map) return;

    // Add GeoJSON data as a source to the map
    if (!map.getSource("redlining")) {
      map.addSource("redlining", {
        type: "geojson",
        data: geojsonData, // Data imported from file
      });
    }

    // Add a fill layer to visualize areas on the map
    if (!map.getLayer("redlining-layer")) {
      map.addLayer({
        id: "redlining-layer", // Unique ID for the layer
        type: "fill", // Visualization type: Fill polygons
        source: "redlining",
        paint: {
          // Set fill color based on the "grade" property
          "fill-color": [
            "match",
            ["get", "grade"], // Get the "grade" property from GeoJSON data
            ...GRADES.flatMap(({ id, color }) => [id, color]), // Map grade IDs to colors
            "#cccccc", // Default color if no match is found
          ],
          "fill-opacity": 0.7,
        },
      });
    }
    setLayerAdded(true);
  };

  // 1. useEffect: Initialize the map and add the layer
  useEffect(() => {
    if (!map) return; // Skip if the map object is not available
    // Check if the map is already loaded, then add the map

    const handleMapLoad = () => {
      addRedliningLayer();
    };

    if (map.loaded()) {
      handleMapLoad();
    } else {
      // If the map is not loaded, wait for the "load" event to add the layer
      map.once("load", handleMapLoad);
    }

    // Cleanup function: Remove the layer and source when the component unmounts
    return () => {
      if (map && layerAdded) {
        if (map.getLayer("redlining-layer")) {
          map.removeLayer("redlining-layer");
        }
        if (map.getSource("redlining")) {
          map.removeSource("redlining");
        }
        setLayerAdded(false);
      }
    };
  }, [map]); // Trigger this effect whenever the "map" object changes

  // 2. useEffekt: Update the map filter based on the selected grades
  useEffect(() => {
    if (!map || !map.getLayer("redlining-layer")) return; // Skip if the layer doesn't exist

    const filter = selectedGrades.length
      ? ["in", "grade", ...selectedGrades] // Show only selected grades
      : null; // Show all areas if no grades are selected
    map.setFilter("redlining-layer", filter); // Update the filter on the map layer
  }, [map, selectedGrades]); // Re-run this effect when "map" or "selectedGrades" changes

  // Function to toggle the selection of grade (add/remove from "selectedGrades")
  const toggleGrade = (id) => {
    setSelectedGrades(
      (prev) =>
        prev.includes(id) // If the grade is already selected:
          ? prev.filter((grade) => grade !== id) // Remove it from the selection
          : [...prev, id] // Otherwise, add it to the selection
    );
  };

  return (
    <>
      <LegendContainer>
        <h3>Residential Security Map, 1939</h3>
        {GRADES.map(({ id, label, description }) => (
          <GradeButton
            key={id} // Unique key for each button
            $isActive={selectedGrades.includes(id)} // Determine if the button is active
            onClick={() => toggleGrade(id)} // Toggle the grade on click
          >
            {label}
            {selectedGrades.includes(id) ? <p>{description}</p> : null}
          </GradeButton>
        ))}
      </LegendContainer>
    </>
  );
}

const LegendContainer = styled.div`
  position: absolute;
  bottom: 250px;
  right: 15px;
  background-color: black;
  border: 1px solid red;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;

  // Mobile
  @media ${({ theme }) => theme.devices.mobile} {
    background-color: #74b1b1;
  }

  // Tablet
  @media ${({ theme }) => theme.devices.tablet} {
    background-color: green;
  }

  // Laptop
  @media ${({ theme }) => theme.devices.laptop} {
    background-color: brown;
  }

  // Desktop
  @media ${({ theme }) => theme.devices.desktop} {
    background-color: #d1c718;
  }

  // Large
  @media ${({ theme }) => theme.devices.large} {
    background-color: #ff0000;
  }
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
