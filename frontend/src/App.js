import React, { useCallback, useEffect } from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { Slide, toast } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';

import Editor from './components/Editor';
import Preview from './components/Preview';
import Navbar from './components/Navbar';
import { setMarkdown } from './redux/features/markdownSlice';
import { useConvertMarkdownQuery, useConvertToRawQuery } from './redux/features/markDownApi';

import 'react-toastify/dist/ReactToastify.css';
import FallbackComponent from './components/Fallback';

function App() {
  const dispatch = useDispatch();
  const { markdown, viewMode } = useSelector(state => state.markdown);

  const { data: formattedHtml, isLoading: isLoadingFormatted, isError: isErrorFormatted, error: errorFormatted } = useConvertMarkdownQuery(markdown);
  const { data: rawHtml, isLoading: isLoadingRaw, isError: isErrorRaw, error: errorRaw } = useConvertToRawQuery(markdown);

  const debouncedMarkdownConversion = useCallback(debounce((value) => {
    dispatch(setMarkdown(value));
  }, 300), [dispatch]);

  const handleMarkdownChange = (event) => {
    debouncedMarkdownConversion(event.target.value);
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
    if (isErrorFormatted) {
      showToast(errorFormatted?.error || errorFormatted?.data?.error || 'Error in formatted HTML');
    } else if (isErrorRaw) {
      showToast(errorRaw?.error || errorRaw?.data?.error || 'Error in raw HTML');
    }
  }, [isErrorFormatted, errorFormatted, isErrorRaw, errorRaw]);

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
                <Preview isLoadingFormatted={isLoadingFormatted} isLoadingRaw={isLoadingRaw} html={viewMode === 'preview' ? isErrorFormatted ? '' : formattedHtml?.html : isErrorRaw ? '' : rawHtml?.html || ''} />
              </div>
            </Col>
          </Row>
        </Container>
      </ErrorBoundary>
    </div>
  );
}

export default App;
