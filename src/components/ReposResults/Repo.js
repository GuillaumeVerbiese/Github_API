import PropTypes from 'prop-types';

import { Card, Image } from 'semantic-ui-react';

function Repo({
  name, description, login, image,
}) {
  return (
    <Card>
      <Image src={image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span className="date">{login}</span>
        </Card.Meta>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

Repo.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  login: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

Repo.defaultProps = {
  description: '',
};

export default Repo;
