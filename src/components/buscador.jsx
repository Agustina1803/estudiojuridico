import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

function SearchBar() {
  console.log('SearchBar component rendered');
  
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log('Searching for:', searchTerm);
    // Here you would typically trigger a search function or API call
  };

  return (
    <Form className="d-flex" onSubmit={handleSearchSubmit}>
      <FormControl
        type="search"
        placeholder="Buscar..."
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Button variant="outline-success" type="submit">Buscar</Button>
    </Form>
  );
}

export default SearchBar;