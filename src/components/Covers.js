import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
//import { useTransition, a } from 'react-spring';
//import shuffle from '../functions/shuffleList';
import useResponsiveDimensions from '../hooks/useResponsiveDimensions';

function Covers({ activeBooks }) {
  const location = useLocation();
  // Detects dimensions of the masonry container
  const componentRef = useRef();
  const { width, height } = useResponsiveDimensions(componentRef);

  return (
    <div
      ref={componentRef}
      id="covers__container"
      style={{ border: 'red 1px solid' }}
    >
      <div
        style={{
          padding: '10px',
        }}
      >
        <p>Ref width: {width}</p>
        <p>Ref height: {height}</p>
      </div>
    </div>
  );
}
//   let coverArr = activeBooks.map((book) => {
//     return (
//       <Link
//         key={book.id}
//         to={{
//           pathname: `/single/${book.id}`,
//           search: location.search,
//         }}
//       >
//         <img
//           key={book.id}
//           className="covers__cover"
//           alt={book.title}
//           src={require(`../covers/${book.coverImgFileName}`)}
//         />
//       </Link>
//     );
//   });

//   return (
//     // add max-width (2400px) and auto side margins with media query
//     <div style={{ position: 'relative' }}>
//       <div style={{ margin: '10px 5px' }}>
//         <Masonry
//           breakpointCols={breakpointColumnsObj}
//           className="my-masonry-grid"
//           columnClassName="my-masonry-grid_column"
//         >
//           {coverArr}
//         </Masonry>
//       </div>
//     </div>
//   );

export default Covers;
