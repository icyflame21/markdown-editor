import React from 'react';
import { Form } from 'react-bootstrap';
import { fontSizes } from '../helpers/fonts';

function Editor({ markdown, onChange }) {

  return (
    <div className="editor-container">
      <Form.Control
        as="textarea"
        value={markdown}
        onChange={onChange}
        style={{ fontSize: fontSizes.bodyText }}
        placeholder="Enter your markdown here..."
        className="textarea border-0 shadow rounded"
      />
    </div>
  );
}

export default Editor;
