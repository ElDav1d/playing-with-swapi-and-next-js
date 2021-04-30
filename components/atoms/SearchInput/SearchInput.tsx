type incomingEvent = any;

type Props = {
  placeholder: string;
  onChange: (event: incomingEvent) => void;
};

const SearchInput = ({ placeholder, onChange }: Props) => {
  return (
    <div>
      <input placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default SearchInput;
