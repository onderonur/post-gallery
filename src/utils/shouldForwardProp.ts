export function shouldForwardProp<Props>(invalidPropNames: Array<keyof Props>) {
  return function (propName: string) {
    return !invalidPropNames.includes(propName as never);
  };
}
