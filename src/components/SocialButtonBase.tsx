import React from 'react';
import { emphasize } from '@material-ui/core';
import BaseButton, { BaseButtonProps } from '@src/components/BaseButton';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Maybe } from '@src/generated/graphql';
import AlertError from '@src/components/AlertError';
import styled from '@emotion/styled';
import { shouldForwardProp } from '@src/utils/shouldForwardProp';
import { Bold } from './Utils';

interface StyleProps {
  backgroundColor: NonNullable<CSSProperties['backgroundColor']>;
  fontColor: CSSProperties['color'];
}

const StyledButton = styled(BaseButton, {
  // To fix "react does not recognize the prop on a dom element" warnings
  shouldForwardProp: shouldForwardProp<StyleProps>([
    'backgroundColor',
    'fontColor',
  ]),
})<StyleProps>`
  color: ${({ fontColor }) => fontColor};
  background-color: ${({ backgroundColor }) => backgroundColor};
  &:hover {
    background-color: ${({ backgroundColor }) =>
      emphasize(backgroundColor, 0.1)};
  }
`;

const ButtonText = styled.span`
  width: 100%;
`;

export type SocialButtonBaseProps = StyleProps &
  React.PropsWithChildren<{
    icon: React.ReactNode;
    disabled?: BaseButtonProps['disabled'];
    loading?: BaseButtonProps['loading'];
    error?: Maybe<Error>;
    onClick: BaseButtonProps['onClick'];
  }>;

// Thanks to: https://codepen.io/slukas23/pen/qwMevr
function SocialButtonBase({
  children,
  icon,
  backgroundColor,
  fontColor,
  loading,
  disabled,
  error,
  onClick,
}: SocialButtonBaseProps) {
  return (
    <div>
      <AlertError error={error} />
      <StyledButton
        fullWidth
        loading={loading}
        disabled={disabled}
        onClick={onClick}
        startIcon={icon}
        fontColor={fontColor}
        backgroundColor={backgroundColor}
        variant="outlined"
      >
        <ButtonText>
          <Bold>{children}</Bold>
        </ButtonText>
      </StyledButton>
    </div>
  );
}

export default SocialButtonBase;
