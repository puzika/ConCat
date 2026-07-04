import { css } from "styled-components";
import type { RuleSet } from "styled-components";

export const sizes = {
  mbmin: 450,   // for small screen mobile
  mb: 600,   // for mobile screen 
  tbmin: 750, //for small tablets
  tb: 900,   // for tablets
  lp: 1280,  // for laptops
  dt: 1920, // for desktop
} as const;

type Devices = keyof typeof sizes;
type Responsive = {
  [key in Devices]: (...args: Parameters<typeof css>) => RuleSet<object>;
}

export const responsive: Responsive = (Object.keys(sizes) as Devices[]).reduce(
  (accumulator, currSize) => {
    accumulator[currSize] = (...args) => css`
      @media only screen and (max-width: ${sizes[currSize]}px) {
        ${css(...args)};
      }
    `;

    return accumulator;
  },
  {} as Responsive,
);