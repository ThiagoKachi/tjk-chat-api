export function transformStringToBoolean(value: string): boolean | undefined {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }
  return undefined;
}
