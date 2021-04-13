export const APP_TITLE = 'Post Gallery';

export const isServer = () => typeof window === 'undefined';

export const DATE_TIME_FORMAT = 'DD-MM-YYYY HH:mm';

export function shouldForwardProp<Props>(invalidPropNames: Array<keyof Props>) {
  return function (propName: string) {
    return !invalidPropNames.includes(propName as never);
  };
}
