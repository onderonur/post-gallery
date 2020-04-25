import React from "react";
import gql from "graphql-tag";
import { NextSeo } from "next-seo";
import { PostSeo_PostFragment } from "@/generated/graphql";

export const PostSeoFragments = {
  post: gql`
    fragment PostSeo_post on Post {
      id
      title
    }
  `,
};

interface PostSeoProps {
  post: PostSeo_PostFragment;
}

const PostSeo = React.memo<PostSeoProps>(({ post }) => {
  return <NextSeo title={post.title} />;
});

export default PostSeo;
