import { VisitedPage } from "../../interfaces";

export const createPayload = (name: string, path: string): VisitedPage => {
  return {
    name: name,
    path: path,
  };
};
