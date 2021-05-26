import { CharacterDetailItem } from "../../../interfaces";

const CharacterDetailsItem = ({
  detailTitle,
  detailContent,
}: CharacterDetailItem) => {
  const removeUnderscore = (name: string) =>
    name.includes("_") ? name.replace("_", " ") : name;

  const formatTitle = (name: string) => {
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

  const isNotArray = (content: string | string[]) =>
    typeof content === "string" || content.length === 1;

  return (
    <li>
      <h2>{formatTitle(detailTitle)}</h2>
      {isNotArray(detailContent) ? (
        <p>{detailContent}</p>
      ) : (
        <ListedContent content={detailContent} />
      )}
    </li>
  );
};

export default CharacterDetailsItem;
