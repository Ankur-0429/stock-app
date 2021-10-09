/**
 *  # ToggleSwitch.tsx
 *  This program defines the theme toggle switch. So the user can change between light and dark mode
 *  
 *  ## Authors
 *  - Ankur Ahir
 *  
 */

import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.30s linear;
  }
  
  
  `