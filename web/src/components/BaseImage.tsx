import React, { useState, useEffect } from "react";
// import placeholderPng from "assets/images/placeholder.png";
import { useTrackVisibility } from "react-intersection-observer-hook";
import { isOfType } from "utils";
import AspectRatio, { getAspectRatioString } from "./AspectRatio";
import styled from "styled-components";

const ORIGINAL = "original";
const DEFAULT_ALT = "Not Loaded";
const DEFAULT_ASPECT_RATIO = getAspectRatioString(1, 1);

const StyledImg = styled.img`
  display: block;
  object-fit: cover;
`;

interface BaseImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  lazyLoad?: boolean;
}

function BaseImage({
  src /*= placeholderPng*/,
  alt = DEFAULT_ALT,
  aspectRatio = ORIGINAL,
  lazyLoad = true,
}: BaseImageProps) {
  const [imgHeight, setImgHeight] = useState<number>();
  const [imgWidth, setImgWidth] = useState<number>();
  const [ref, { isVisible }] = useTrackVisibility();
  const [lazyLoaded, setLazyLoaded] = useState(isVisible);

  const isOriginalAspectRatio = aspectRatio === ORIGINAL;

  function handleLoad(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    if (isOriginalAspectRatio) {
      const img = e.target;
      if (isOfType<HTMLImageElement>(img, ["naturalHeight", "naturalWidth"])) {
        setImgHeight(img.naturalHeight);
        setImgWidth(img.naturalWidth);
      }
    }
  }

  useEffect(() => {
    if (isVisible) {
      setLazyLoaded(true);
    }
  }, [isVisible]);

  return (
    <AspectRatio
      ref={lazyLoad ? ref : undefined}
      aspectRatio={
        isOriginalAspectRatio
          ? imgWidth && imgHeight
            ? getAspectRatioString(imgWidth, imgHeight)
            : DEFAULT_ASPECT_RATIO
          : aspectRatio
      }
    >
      {lazyLoad && !lazyLoaded ? null : (
        <StyledImg src={src} alt={alt} onLoad={handleLoad} />
      )}
    </AspectRatio>
  );
}

export default BaseImage;
