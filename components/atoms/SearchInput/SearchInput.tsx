import { useState, useEffect } from "react";

type incomingEvent = any;

type Props = {
  incomingValue: string;
  placeholder: string;
  onChange: (event: incomingEvent) => void;
};

const SearchInput = ({ incomingValue, placeholder, onChange }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    setInputValue(incomingValue);
  }, [incomingValue]);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
