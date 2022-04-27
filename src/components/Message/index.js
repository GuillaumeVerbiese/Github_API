import { useEffect } from 'react';

// validation des props
// 1 - on importe PropTypes
import PropTypes from 'prop-types';

import { Message as SemanticMessage } from 'semantic-ui-react';

function Message({ content, isError, hideMessage }) {
  // on prévoit la disparition après le premier rendu
  useEffect(
    () => {
      console.log('je veux programmer la disparition');
      const timer = setTimeout(
        () => {
          console.log('ça doit disparaitre !');
          hideMessage();
        },
        7000,
      );

      return () => {
        // cette fonction permet de nettoyer l'effet précédemment appliqué
        console.log('je nettoie');
        clearTimeout(timer);
      };
    },
    [content],
  );

  return (
    <SemanticMessage negative={isError}>{content}</SemanticMessage>
  );
}

Message.propTypes = {
  content: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  hideMessage: PropTypes.func.isRequired,
};

Message.defaultProps = {
  isError: false,
};

export default Message;
