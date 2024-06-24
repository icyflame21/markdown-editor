import React, { useCallback, useEffect } from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { useDispatch, useSelector } from 'react-redux';
import { setMarkdown } from './redux/features/markdownSlice';
import 'react-loading-skeleton/dist/skeleton.css';
import { ErrorBoundary } from 'react-error-boundary';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, toast } from 'react-toastify';
import Navbar from './components/Navbar';
import { useConvertMarkdownQuery, useConvertToRawQuery } from './redux/features/apiSlice';
import { debounce } from 'lodash';

function App() {
  const dispatch = useDispatch();
  const { markdown, viewMode } = useSelector(state => state.markdown);

  const { data: formattedHtml, isLoading: isLoadingFormatted, isError: isErrorFormatted, error: ErrorFormatted } = useConvertMarkdownQuery(markdown);
  const { data: rawHtml, isLoading: isLoadingRaw, isError: isErrorRaw, error: ErrorRaw } = useConvertToRawQuery(markdown);


  const debouncedMarkdownConversion = useCallback(debounce((value) => {
    dispatch(setMarkdown(value));
  }, 100), [dispatch]);

  const handleMarkdownChange = (event) => {
    debouncedMarkdownConversion(event.target.value);
  };


  const downloadMarkdownFile = () => {
    const markdownContent = markdown;
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-file.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const showToast = (message) => {
    toast.error(message, {
      theme: 'colored',
      transition: Slide,
      className: 'gap-3',
      toastId: 1
    });
  }
  useEffect(() => {
    if (isErrorFormatted) {
      showToast(ErrorFormatted.error || ErrorFormatted.data.error || '')
    } else if (isErrorRaw) {
      showToast(ErrorRaw.error || ErrorRaw.data.error || '')
    }
  }, [isErrorFormatted, isErrorRaw]);

  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={() => <div>Something went wrong.</div>}>
        <Navbar />
        <Container fluid>
          <Row className='g-3'>
            <Col md={6}>
              <Editor markdown={markdown} onChange={handleMarkdownChange} />
            </Col>
            <Col md={6}>
              <div className="preview-container textarea border-0 shadow rounded p-3">
                <Preview isLoadingFormatted={isLoadingFormatted} isLoadingRaw={isLoadingRaw} html={viewMode === 'preview' ? formattedHtml?.html : rawHtml ? rawHtml?.html : ''} />
              </div>
            </Col>
          </Row>
        </Container>
      </ErrorBoundary>
    </div>
  );
}

export default App;