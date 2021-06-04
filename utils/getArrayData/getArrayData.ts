export const getArrayData = async (
  data: string[],
  key: string
): Promise<string[]> => {
  if (data.length) {
    const errorMessage = [];

    const nestedData = await Promise.all(
      data.map(async dataURL => {
        const res = await fetch(`${dataURL}`);
        const dataItem = await res.json();

        if (!res.ok) {
          errorMessage.push("Sorry, there's a disturbance on The Force");
          throw new Error(`An error has occured: ${res.status}`);
        } else {
          return dataItem[key];
        }
      })
    );

    return errorMessage.length ? errorMessage : nestedData;
  } else {
    return ["Sorry, this data is unknown!"];
  }
};
