import React from "react";
import { ButtonProps } from "@material-ui/core";
import styled, { CSSProperties } from "styled-components";
import BaseButton from "components/BaseButton";

interface StyledButtonProps {
  backgroundColor: CSSProperties["backgroundColor"];
  activeBackgroundColor: CSSProperties["backgroundColor"];
  fontColor: CSSProperties["color"];
}

const StyledButton = styled(
  ({
    backgroundColor,
    activeBackgroundColor,
    fontColor,
    ...rest
  }: ButtonProps & StyledButtonProps) => <BaseButton {...rest} />,
)`
  cursor: pointer;
  height: 40px;
  border-width: 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ fontColor }) => fontColor};
  border-radius: 5px;
  white-space: nowrap;
  box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.05);
  transition-property: background-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  padding: 0;
  text-align: left;
  &:hover,
  &:focus {
    box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1);
  }
  &:active {
    background-color: ${props => props.activeBackgroundColor};
    box-shadow: none;
    transition-duration: 10ms;
  }
`;

const StyledIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin: 8px 0 8px 8px;
  width: 18px;
  height: 18px;
  box-sizing: border-box;
`;

const StyledText = styled.span`
  display: inline-block;
  vertical-align: middle;
  padding: 0 24px;
  font-size: 14px;
  font-weight: bold;

  width: 100%;
  text-align: center;
`;

type SocialLoginButtonProps = StyledButtonProps & {
  icon: React.ReactNode;
  providerName: string;
  href: ButtonProps["href"];
};

// Thanks to: https://codepen.io/slukas23/pen/qwMevr
const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  icon,
  backgroundColor,
  fontColor,
  activeBackgroundColor,
  providerName,
  href,
}) => {
  return true ? (
    <StyledButton
      href={href}
      backgroundColor={backgroundColor}
      fontColor={fontColor}
      activeBackgroundColor={activeBackgroundColor}
    >
      <StyledIcon>{icon}</StyledIcon>
      <StyledText>Log in with {providerName}</StyledText>
    </StyledButton>
  ) : null;
};

export default SocialLoginButton;
