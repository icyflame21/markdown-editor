import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import DOMPurify from "dompurify";
import { fontSizes } from '../helpers/fonts';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode } from '../redux/features/markdownSlice';

function Preview({ formattedHtml, isLoading, rawHtml }) {
  const dispatch = useDispatch();
  const { viewMode } = useSelector((state) => state.markdown);

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(formattedHtml),
  });


  return (
    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
      <Tabs
        activeKey={viewMode}
        onSelect={(k) => dispatch(setViewMode(k))}
        fill
        variant='pills'
        className="mb-3"
      >

        <Tab eventKey="preview" disabled={isLoading} title="Preview" className={`${formattedHtml ? "border" : ""} p-3`} style={{ fontSize: fontSizes.bodyText }}>
          {isLoading && (
            <>
              <Skeleton count={3} height={30} />
              <Skeleton count={3} height={30} />
              <Skeleton count={3} height={30} />
            </>
          )}
          {!isLoading && (
            <div
              className="gray1"
              style={{ fontSize: fontSizes.bodyText }}
              dangerouslySetInnerHTML={sanitizedData()}
            />
          )}
        </Tab>
        <Tab eventKey="raw" title="Raw" disabled={isLoading} className={`${rawHtml ? "border" : ""} p-3`}>
          {isLoading && (
            <>
              <Skeleton count={3} height={30} />
              <Skeleton count={3} height={30} />
              <Skeleton count={3} height={30} />
            </>
          )}
          {!isLoading && (
            <pre style={{ fontSize: fontSizes.bodyText }} className='gray1'>
              {rawHtml}
            </pre>
          )}
        </Tab>
      </Tabs>
    </SkeletonTheme>
  );
}

export default Preview;
