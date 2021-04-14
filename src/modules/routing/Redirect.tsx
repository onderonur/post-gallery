import React, { useEffect } from 'react';
import { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface RedirectProps {
  href: LinkProps['href'];
  replace?: boolean;
}

const Redirect: React.FC<RedirectProps> = ({ href, replace }) => {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(href);
    } else {
      router.push(href);
    }
  }, [href, replace, router]);

  return <>{null}</>;
};

export default Redirect;
