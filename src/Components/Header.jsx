import { useNavigate, useLocation } from "react-router-dom";
import { theme } from "../theme/theme";
import styled, { ThemeProvider } from "styled-components";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const visualGuideText = "Learn the story behind this historical practice";
  const mapLayerText = "Today's dynamic interpretation of segregation";

  const isVisualGuide = location.pathname === "/visual-guide"; // Checks if on the visual-guide route

  // Handle the page toggle
  const toggleNavigation = () => {
    navigate(isVisualGuide ? "/" : "/visual-guide");
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderContainer>
        <Title>Modern-day Redlining</Title>
        <NavigationContainer>
          <SubTitle>{isVisualGuide ? mapLayerText : visualGuideText}</SubTitle>
          <NavigationButton
            onClick={toggleNavigation}
            aria-lable={
              isVisualGuide ? "Switch to visual guide" : "Switch to map view"
            }
          >
            {isVisualGuide ? "MAP VIEW" : "VISUAL GUIDE"}
          </NavigationButton>
        </NavigationContainer>
      </HeaderContainer>
    </ThemeProvider>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: black;

  @media ${({ theme }) => theme.devices.mobile} {
    flex-direction: row;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: red;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 2.5rem;
  }

  @media ${({ theme }) => theme.devices.desktop} {
    font-size: 3rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 1.25rem;

  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 1.5rem;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: black;
`;

const NavigationButton = styled.button`
  width: 120px;
  height: 50px;
  background-color: red;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
`;
