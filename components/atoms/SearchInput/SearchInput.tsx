const SearchInput = ({ placeholder, onChange }) => {
  return (
    <div>
      <input placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default SearchInput;
