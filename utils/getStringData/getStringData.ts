export const getStringData = async (
  data: string,
  key: string
): Promise<string> => {
  const res = await fetch(`${data}`);
  const dataItem = await res.json();

  return dataItem[key];
};
