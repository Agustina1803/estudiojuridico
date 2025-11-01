import  { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('');
  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <Form className="d-flex mb-2" onSubmit={handleSearchChange}>
      <FormControl
        type="search"
        placeholder="Buscar cliente..."
        className="me-2"
        aria-label="Search"
        value={search}
        onChange={handleSearchChange}
      />
    </Form>
  );
}

export default SearchBar;