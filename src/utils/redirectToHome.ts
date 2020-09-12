import urls from '@src/utils/urls';

export const redirectToHome = (logoutTimeStamp?: string) => {
  let href = urls.home.href;
  if (logoutTimeStamp) {
    href = `${href}?logout=${logoutTimeStamp}`;
  }
  window.location.href = href;
};
