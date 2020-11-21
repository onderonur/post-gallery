import React from 'react';
import AspectRatio from './AspectRatio';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import styled from '@emotion/styled';
import Image from 'next/image';
import { shouldForwardProp } from '@src/utils/shouldForwardProp';

interface ImgStyleProps {
  objectFit?: CSSProperties['objectFit'];
  aspectRatio?: string | null;
}

const Img = styled(Image, {
  shouldForwardProp: shouldForwardProp<ImgStyleProps>([
    'objectFit',
    'aspectRatio',
  ]),
})<ImgStyleProps>`
  width: 100%;
  display: block;
  object-fit: ${({ objectFit }) => objectFit};
  // To make next/image work with AspectRatio
  position: ${({ aspectRatio }) => (aspectRatio ? 'absolute' : 'initial')};
`;

type BaseImageProps = ImgStyleProps & {
  src: string;
  alt: string;
};

const BaseImage: React.FC<BaseImageProps> = ({
  src,
  alt,
  aspectRatio,
  objectFit = 'cover',
}) => {
  const image = (
    <Img
      aspectRatio={aspectRatio}
      objectFit={objectFit}
      src={src || `/placeholder.png`}
      alt={alt}
      layout="fill"
    />
  );

  if (aspectRatio) {
    return <AspectRatio aspectRatio={aspectRatio}>{image}</AspectRatio>;
  }

  return image;
};

export default BaseImage;
