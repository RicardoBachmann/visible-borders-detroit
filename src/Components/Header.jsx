import { Link, useLocation } from "react-router-dom";
import { theme } from "../theme/theme";
import styled, { ThemeProvider } from "styled-components";

export default function Header() {
  const location = useLocation();

  const visualGuideText = "Learn the story behind this historical practice";
  const mapLayerText = "Today's dynamic interpretation of segregation";

  const isVisualGuide = location.pathname === "/visual-guide"; // Checks if on the visual-guide route

  return (
    <ThemeProvider theme={theme}>
      <HeaderContainer>
        <Title>Modern-day Redlining</Title>
        <NavigationContainer>
          <nav>
            <ul>
              <li>
                <NavigationText>
                  {isVisualGuide ? mapLayerText : visualGuideText}
                </NavigationText>
              </li>
              <li>
                <NavigationLink
                  to={isVisualGuide ? "/" : "/visual-guide"}
                  aria-lable={
                    isVisualGuide
                      ? "Switch to visual guide"
                      : "Switch to map view"
                  }
                >
                  {isVisualGuide ? "MAP VIEW" : "VISUAL GUIDE"}
                </NavigationLink>
              </li>
            </ul>
          </nav>
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
  margin-top: 1rem;
  width: 100%;
  nav {
    ul {
      display: flex;
      align-items: center;
      list-style: none;
      gap: 10px;
      padding: 0;
    }
    li {
      margin: 0 1 rem;
    }
  }
`;

const NavigationText = styled.span`
  font-size: 1rem;
  color: white;
`;

const NavigationLink = styled(Link)`
  text-decoration: none;
  width: 120px;
  height: 50px;
  background-color: red;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
`;
