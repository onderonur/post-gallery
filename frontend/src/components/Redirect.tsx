import React, { useEffect } from "react";
import { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface RedirectProps {
  href: LinkProps["href"];
  hrefAs?: LinkProps["as"];
  replace?: boolean;
}

const Redirect: React.FC<RedirectProps> = ({ href, hrefAs, replace }) => {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(href, hrefAs);
    } else {
      router.push(href, hrefAs);
    }
  }, [href, hrefAs, replace, router]);

  return <>{null}</>;
};

export default Redirect;
