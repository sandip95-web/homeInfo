import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Dropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('rentandsale');
  const [amenities, setAmenities] = useState([]);
  const [sortOption, setSortOption] = useState('');

  const handleSearch = () => {
    // Handle search functionality here
    console.log("Search Term:", searchTerm);
    console.log("Search Type:", searchType);
    console.log("Amenities:", amenities);
    console.log("Sort Option:", sortOption);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter(item => item !== value));
    }
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col xs={12} md={4}>
          <div className="filter-container border rounded p-4">
            <h4 className="mb-4 text-center">Search</h4>
            <Form>
              <Form.Group>
                <Form.Label>Search Term</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter search term"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Search Type</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="Rent and Sale"
                    value="rentandsale"
                    checked={searchType === 'rentandsale'}
                    onChange={() => setSearchType('rentandsale')}
                  />
                  <Form.Check
                    type="radio"
                    label="Rent"
                    value="rent"
                    checked={searchType === 'rent'}
                    onChange={() => setSearchType('rent')}
                  />
                  <Form.Check
                    type="radio"
                    label="Sale"
                    value="sale"
                    checked={searchType === 'sale'}
                    onChange={() => setSearchType('sale')}
                  />
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label>Amenities</Form.Label>
                <div>
                  <Form.Check
                    type="checkbox"
                    label="Parking"
                    value="parking"
                    onChange={handleCheckboxChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Furnished"
                    value="furnished"
                    onChange={handleCheckboxChange}
                  />
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label>Sort by</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="sortDropdown">
                    {sortOption ? sortOption : "Select"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleSortChange('priceHighToLow')}>Price: High to Low</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('priceLowToHigh')}>Price: Low to High</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('latest')}>Latest</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('oldest')}>Oldest</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
              <br />
              <Button variant="primary" onClick={handleSearch} className="w-100"><FaSearch /> Search</Button>
            </Form>
          </div>
        </Col>
        <Col xs={12} md={8}>
          <div className="search-results-container border rounded p-4">
            <h4 className="mb-4">Search Results</h4>
            {/* Display search items here */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
