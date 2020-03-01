import React, { useState, useEffect } from "react";
// import placeholderPng from "assets/images/placeholder.png";
import { useTrackVisibility } from "react-intersection-observer-hook";
import AspectRatio from "./AspectRatio";
import styled, { CSSProperties } from "styled-components";

const DEFAULT_ALT = "Not Loaded";

interface StyledImgStyleProps {
  objectFit: CSSProperties["objectFit"];
}

const StyledImg = styled.img<StyledImgStyleProps>`
  display: block;
  object-fit: ${({ objectFit }) => objectFit};
  width: 100%;
`;

interface BaseImageProps {
  src: string;
  alt: string;
  aspectRatio?: string | null;
  lazyLoad?: boolean;
  objectFit?: StyledImgStyleProps["objectFit"];
}

const BaseImage: React.FC<BaseImageProps> = ({
  src /*= placeholderPng*/,
  alt = DEFAULT_ALT,
  aspectRatio,
  lazyLoad = true,
  objectFit = "cover",
}) => {
  const [ref, { isVisible }] = useTrackVisibility();
  const [lazyLoaded, setLazyLoaded] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setLazyLoaded(true);
    }
  }, [isVisible]);

  const image =
    lazyLoad && !lazyLoaded ? null : (
      <StyledImg src={src} alt={alt} objectFit={objectFit} />
    );

  if (aspectRatio) {
    return (
      <AspectRatio ref={lazyLoad ? ref : undefined} aspectRatio={aspectRatio}>
        {image}
      </AspectRatio>
    );
  }

  return image;
};

export default BaseImage;
