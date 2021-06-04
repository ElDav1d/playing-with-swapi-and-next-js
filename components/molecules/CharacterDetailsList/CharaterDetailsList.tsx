import CharacterDetailsItem from "../../atoms/CharacterDetailsItem/CharacterDetailsItem";

const CharacterDetailsList = ({ details }) => {
  const displayedDetailsKeys = (props: object): string[] =>
    Object.keys(props).slice(1);
  return (
    <ul>
      {displayedDetailsKeys(details).map((detailKey, index) => (
        <CharacterDetailsItem
          detailTitle={detailKey}
          detailContent={details[detailKey]}
          key={index}
        />
      ))}
    </ul>
  );
};

export default CharacterDetailsList;
