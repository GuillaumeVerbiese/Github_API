import { Segment, Header } from 'semantic-ui-react';

function NotFound() {
  return (
    <Segment>
      <Header as="h1">
        404
      </Header>
      <p>oups, vous vous êtes sans doute trompé...</p>
    </Segment>
  );
}

export default NotFound;
