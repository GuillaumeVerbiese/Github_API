// on importe le composant Image de semantic-ui-react
import { Image } from 'semantic-ui-react';

// on importe notre image
import logo from './logo-github.png';

function Logo() {
  return (
    <Image src={logo} centered size="small" />
  );
}

export default Logo;
