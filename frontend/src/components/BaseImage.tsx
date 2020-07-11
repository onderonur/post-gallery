import React, { useState, useEffect } from "react";
// import placeholderPng from "assets/images/placeholder.png";
import { useTrackVisibility } from "react-intersection-observer-hook";
import AspectRatio from "./AspectRatio";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { makeStyles, Theme } from "@material-ui/core";

const defaultAlt = "Not Loaded";

interface ImgStyleProps {
  objectFit: CSSProperties["objectFit"];
}

const useStyles = makeStyles<Theme, ImgStyleProps>((theme) => ({
  img: {
    width: "100%",
    display: "block",
    objectFit: ({ objectFit }) => objectFit,
  },
}));

interface BaseImageProps {
  src: string;
  alt: string;
  aspectRatio?: string | null;
  lazyLoad?: boolean;
  objectFit?: ImgStyleProps["objectFit"];
}

const BaseImage: React.FC<BaseImageProps> = ({
  src /*= placeholderPng*/,
  alt = defaultAlt,
  aspectRatio,
  lazyLoad = true,
  objectFit = "cover",
}) => {
  const classes = useStyles({ objectFit });
  const [ref, { isVisible }] = useTrackVisibility();
  const [lazyLoaded, setLazyLoaded] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setLazyLoaded(true);
    }
  }, [isVisible]);

  const image =
    lazyLoad && !lazyLoaded ? null : (
      <img className={classes.img} src={src} alt={alt} />
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
