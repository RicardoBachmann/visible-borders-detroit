import { useState } from "react";
import styled from "styled-components";

export default function Header() {
  const visualGuideText = "TO LEARN MORE ABOUT THE HISTORICAL PRACTICE USE";
  const mapLayerText = "EXPLORE THE TODAYS INTERPRETATION OF";

  const [navigationDescription, setNavigationDescription] =
    useState(visualGuideText);

  function toggleNavigationDescription() {
    setNavigationDescription((prev) =>
      prev === visualGuideText ? mapLayerText : visualGuideText
    );
  }

  return (
    <>
      <HeaderContainer>
        <Title>Modern-day Redlining</Title>
        <NavigationContainer>
          <h2>{navigationDescription}</h2>
          <NavigationButton onClick={toggleNavigationDescription}>
            {navigationDescription === visualGuideText
              ? "VISUAL GUIDE"
              : "MAP VIEW"}
          </NavigationButton>
        </NavigationContainer>
      </HeaderContainer>
    </>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: black;
`;

const Title = styled.h1`
  color: red;
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: black;
`;

const NavigationButton = styled.button`
  padding: 15px 20px;
  background-color: red;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
`;
