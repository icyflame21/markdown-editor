import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import DOMPurify from "dompurify";
import { fontSizes } from '../helpers/fonts';
import SkeletonLoader from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode } from '../redux/features/markdownSlice';

function Preview({ html, isLoadingFormatted, isLoadingRaw }) {
  const dispatch = useDispatch();
  const { viewMode } = useSelector((state) => state.markdown);

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(html),
  });

  return (
    <Tabs
      activeKey={viewMode}
      onSelect={(k) => dispatch(setViewMode(k))}
      justify
      variant='pills'
      className="mb-3"
    >
      <Tab eventKey="preview" title="Preview" disabled={isLoadingFormatted} className={`${html ? "border" : ""} p-3`} style={{ fontSize: fontSizes.bodyText }}>
        {isLoadingFormatted ? <SkeletonLoader count={10} /> : <div
          className="gray1"
          style={{ fontSize: fontSizes.bodyText }}
          dangerouslySetInnerHTML={sanitizedData()}
        />}
      </Tab>
      <Tab eventKey="raw" title="Raw" disabled={isLoadingRaw} className={`${html ? "border" : ""} p-3`}>
        {isLoadingRaw ? <SkeletonLoader count={10} /> : <pre style={{ fontSize: fontSizes.bodyText }} className='gray1'>
          {html}
        </pre>}
      </Tab>
    </Tabs>
  );
}

export default Preview;
