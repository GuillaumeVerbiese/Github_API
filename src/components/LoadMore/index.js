import PropTypes from 'prop-types';

import { Button, Segment } from 'semantic-ui-react';

function LoadMore({ getMoreReposFromApi }) {
  return (
    <Segment>
      <Button fluid onClick={getMoreReposFromApi}>Plus de résultats</Button>
    </Segment>
  );
}

LoadMore.propTypes = {
  getMoreReposFromApi: PropTypes.func.isRequired,
};

export default LoadMore;
