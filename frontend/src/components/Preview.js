import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import DOMPurify from "dompurify";
import { fontSizes } from '../helpers/fonts';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode } from '../redux/features/markdownSlice';

function Preview({ html, isLoadingFormatted, isLoadingRaw }) {
  const dispatch = useDispatch();
  const { viewMode } = useSelector((state) => state.markdown);

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(html),
  });

  return (
    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
      <Tabs
        activeKey={viewMode}
        onSelect={(k) => dispatch(setViewMode(k))}
        justify
        variant='pills'
        className="mb-3"
      >
        <Tab eventKey="preview" title="Preview" className={`${html ? "border" : ""} p-3`} style={{ fontSize: fontSizes.bodyText }}>
          {isLoadingFormatted && (
            <>
              <Skeleton count={3} height={30} />
              <Skeleton count={3} height={30} />
              <Skeleton count={3} height={30} />
            </>
          )}
          {!isLoadingFormatted && (
            <div
              className="gray1"
              style={{ fontSize: fontSizes.bodyText }}
              dangerouslySetInnerHTML={sanitizedData()}
            />
          )}
        </Tab>
        <Tab eventKey="raw" title="Raw" className={`${html ? "border" : ""} p-3`}>
          {isLoadingRaw && (
            <>
              <Skeleton count={3} height={30} />
              <Skeleton count={3} height={30} />
              <Skeleton count={3} height={30} />
            </>
          )}
          {!isLoadingRaw && (
            <pre style={{ fontSize: fontSizes.bodyText }} className='gray1'>
              {html}
            </pre>
          )}
        </Tab>
      </Tabs>
    </SkeletonTheme>
  );
}

export default Preview;
