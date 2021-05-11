import { useState, useEffect } from "react";

type incomingEvent = any;

type Props = {
  legendText: string;
  incomingValue: string;
  placeholderText: string;
  onChange: (event: incomingEvent) => void;
};

const SearchInput = ({
  incomingValue,
  legendText,
  placeholderText,
  onChange,
}: Props) => {
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    setInputValue(incomingValue);
  }, [incomingValue]);

  return (
    <fieldset>
      <legend>{legendText}</legend>
      <input
        type="text"
        value={inputValue}
        placeholder={placeholderText}
        onChange={onChange}
      />
    </fieldset>
  );
};

export default SearchInput;
