const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1280px",
  large: "1920px",
};

export const theme = {
  breakpoints,
  devices: {
    mobile: `(max-width: ${breakpoints.mobile})`, // Bis 480px
    tablet: `(min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.laptop})`, // 768px bis 1023px
    laptop: `(min-width: ${breakpoints.laptop}) and (max-width: ${breakpoints.desktop})`, // 1024px bis 1279px
    desktop: `(min-width: ${breakpoints.desktop}) and (max-width: ${breakpoints.large})`, // 1280px bis 1919px
    large: `(min-width: ${breakpoints.large})`, // Ab 1920px
  },
};
