import * as React from 'react';

interface Props {
  onFilter: (v: string) => void;
}

const ServiceListFilter: React.FC<Props> = ({ onFilter }) => {
  const [nameFilter, setNameFilter] = React.useState("");

  return (
    <div className="filter">
      <div className="filter__title">Filter</div>
      <div className="filter__fields">
        <div className="filter__fields__field">
          <input type="text" value={nameFilter} placeholder="Starts with..." onChange={e => {
            setNameFilter(e.target.value);
            onFilter(e.target.value);
          }} />
        </div>
        <div className="filter__fields__field">
          <button type="button" onClick={() => {
            setNameFilter("");
            onFilter("");
          }}> Reset </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceListFilter;
