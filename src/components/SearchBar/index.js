import PropTypes from 'prop-types';

import { Input, Segment, Form } from 'semantic-ui-react';

function SearchBar({ search, setSearch, getReposFromApi }) {
  return (
    <Segment>
      <Form onSubmit={getReposFromApi}>
        <Input
          icon="search"
          fluid
          placeholder="Merci de saisir votre recherche et valider par entrée..."
          iconPosition="left"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Form>
    </Segment>
  );
}

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  getReposFromApi: PropTypes.func.isRequired,
};

export default SearchBar;
