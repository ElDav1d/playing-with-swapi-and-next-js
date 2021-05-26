import CharacterDetailsItem from "../../atoms/CharacterDetailsItem/CharacterDetailsItem";

const CharacterDetailsList = ({ details }) => {
  const detailKeys = Object.keys(details).slice(1);
  return (
    <ul>
      {detailKeys.map((detailKey, index) => (
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
