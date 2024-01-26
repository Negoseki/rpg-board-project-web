export const mapListToKeyValue = <T extends object>(list: T[], key: keyof T): Record<string, T> => {
  return list.reduce((obj, cur) => ({ ...obj, [String(cur[key])]: cur }), {});
};
