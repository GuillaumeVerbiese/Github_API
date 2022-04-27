import PropTypes from 'prop-types';

import { Card } from 'semantic-ui-react';

import Repo from './Repo';

import './style.scss';

function ReposResults({ repos }) {
  return (
    <Card.Group itemsPerRow={3} stackable>
      {
        repos.map(
          (repo) => <Repo key={repo.id} {...repo} />,
        )
      }
    </Card.Group>
  );
}

ReposResults.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default ReposResults;
