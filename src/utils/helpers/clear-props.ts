interface Helper extends Record<string, Helper | unknown> {}

export const clearExtraProps = <T extends object>(obj: T, ...props: string[]): T => {
  const newObj = { ...obj } as Helper;
  for (const prop of props) {
    delete newObj[prop];
  }

  return newObj as T;
};
