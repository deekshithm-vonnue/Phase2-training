import type { ChangeEvent } from "react";

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterProps {
  type: string;
  options: FilterOption[];
  selectedValue: string;
  handleFilter: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Filter({
  type,
  options,
  selectedValue,
  handleFilter,
}: FilterProps) {
  const uniqueId = `filter-${type.toLowerCase()}`;

  return (
    <div className="filter-wrapper">
      <label className="filter-label" htmlFor={uniqueId}>
        {type}{" "}
      </label>

      <select
        id={uniqueId}
        name={`filter-${type.toLowerCase()}`}
        className="filter-select"
        value={selectedValue}
        onChange={handleFilter}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
