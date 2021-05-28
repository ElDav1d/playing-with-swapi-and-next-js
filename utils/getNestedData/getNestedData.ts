import { getStringData } from "../getStringData";
import { getArrayData } from "../getArrayData";

export const getNestedData = async (
  data: string | string[],
  key: string
): Promise<string[] | string> => {
  if (typeof data === "string") {
    return getStringData(data, key);
  } else {
    return getArrayData(data, key);
  }
};
