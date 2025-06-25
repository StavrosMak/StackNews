interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search news..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
}; 