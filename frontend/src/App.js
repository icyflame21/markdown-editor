import React, { useEffect } from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Slide, toast } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';

import Editor from './components/Editor';
import Preview from './components/Preview';
import Navbar from './components/Navbar';
import { setMarkdown } from './redux/features/markdownSlice';
import { useConvertMarkdownQuery } from './redux/features/markDownApi';

import 'react-toastify/dist/ReactToastify.css';
import FallbackComponent from './components/Fallback';

function App() {
  const dispatch = useDispatch();
  const { markdown, viewMode } = useSelector(state => state.markdown);

  const { data: html_data, isLoading, isError, error } = useConvertMarkdownQuery(markdown);

  const handleMarkdownChange = (event) => {
    dispatch(setMarkdown(event.target.value))
  };

  const showToast = (message) => {
    if (message !== "Markdown content is required") {
      toast.error(message, {
        theme: 'colored',
        transition: Slide,
        className: 'gap-3',
        toastId: 1
      });
    }
  };

  useEffect(() => {
    if (isError) {
      showToast(error?.error || error?.data?.error || 'Error in formatted HTML');
    }
  }, [isError, error]);

  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <Navbar />
        <Container fluid>
          <Row className="g-3">
            <Col md={6}>
              <Editor markdown={markdown} onChange={handleMarkdownChange} />
            </Col>
            <Col md={6}>
              <div className="preview-container textarea border-0 shadow rounded p-3">
                <Preview isLoading={isLoading} formattedHtml={viewMode === 'preview' ? isError ? '' : html_data?.formatted : ''} rawHtml={viewMode === 'raw' ? isError ? '' : html_data?.raw : ''} />
              </div>
            </Col>
          </Row>
        </Container>
      </ErrorBoundary>
    </div>
  );
}

export default App;
