import React from 'react';
import { gql } from '@apollo/client';
import { NextSeo } from 'next-seo';
import { PostSeo_PostFragment } from '@src/generated/graphql';
import { OpenGraphImages } from 'next-seo/lib/types';
import { APP_TITLE } from '@src/modules/shared/SharedUtils';

export const PostSeoFragments = {
  post: gql`
    fragment PostSeo_post on Post {
      id
      title
      media {
        id
        smallImage {
          height
          width
          url
        }
        standardImage {
          height
          width
          url
        }
      }
    }
  `,
};

interface PostSeoProps {
  post: PostSeo_PostFragment;
}

const PostSeo = React.memo<PostSeoProps>(function PostSeo({ post }) {
  const smallImage = post.media?.smallImage;
  const standardImage = post.media?.standardImage;
  const images: OpenGraphImages[] = [];
  if (smallImage) {
    images.push({
      url: smallImage.url,
      alt: post.title,
      width: smallImage.width,
      height: smallImage.height,
    });
  }
  if (standardImage) {
    images.push({
      url: standardImage.url,
      alt: post.title,
      width: standardImage.width,
      height: standardImage.height,
    });
  }

  return (
    <NextSeo
      title={post.title}
      description={`${post.title} - Post page of ${APP_TITLE}`}
      openGraph={{
        images,
      }}
    />
  );
});

export default PostSeo;
