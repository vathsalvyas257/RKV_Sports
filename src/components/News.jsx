import React from 'react';
import NewsItem from './NewsItem';

export default function News() {
  return (
    <div className="container my-5">
      <h2>Cricket</h2>
      <div className="row mb-4"> {/* Added margin bottom for spacing */}
        <div className="col-md-6 mb-4"> {/* Each NewsItem takes half the width */}
          <NewsItem />
        </div>
        <div className="col-md-6 mb-4">
          <NewsItem />
        </div>
      </div>
      <div className="row mb-4"> {/* Another row for additional NewsItems */}
        <div className="col-md-6 mb-4">
          <NewsItem />
        </div>
        <div className="col-md-6 mb-4">
          <NewsItem />
        </div>
      </div>
      <h2>Hockey</h2>
      {/* Add more Hockey NewsItems here similarly */}
      <div className="row mb-4">
        <div className="col-md-6 mb-4">
          <NewsItem />
        </div>
        <div className="col-md-6 mb-4">
          <NewsItem />
        </div>
      </div>
    </div>
  );
}
