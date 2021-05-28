import { CharacterDetailItem } from "../../../interfaces";

const CharacterDetailsItem = ({
  detailTitle,
  detailContent,
}: CharacterDetailItem) => {
  const removeUnderscore = (name: string): string =>
    name.includes("_") ? name.replace("_", " ") : name;

  const formatTitle = (name: string): string => {
    return removeUnderscore(name.toUpperCase());
  };

  const ListedContent = ({ content }) => {
    return (
      <ul>
        {content.map((item: string, index: number) => (
          <li key={index}>
            <p>{item}</p>
          </li>
        ))}
      </ul>
    );
  };

  const isSingleString = (content: string | string[]): boolean =>
    typeof content === "string" || content.length === 1;

  return (
    <li>
      <h2>{formatTitle(detailTitle)}</h2>
      {isSingleString(detailContent) ? (
        <p>{detailContent}</p>
      ) : (
        <ListedContent content={detailContent} />
      )}
    </li>
  );
};

export default CharacterDetailsItem;
