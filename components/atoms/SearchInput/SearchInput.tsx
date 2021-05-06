type incomingEvent = any;

type Props = {
  placeholder: string;
  onChange: (event: incomingEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

const SearchInput = ({ placeholder, onChange, inputRef }: Props) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        onChange={onChange}
        ref={inputRef}
        type="text"
      />
    </div>
  );
};

export default SearchInput;
