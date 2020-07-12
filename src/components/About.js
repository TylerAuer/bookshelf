import React from 'react';
import data from '../data.json';
import makeListFromArray from '../functions/makeListFromArray';
import './About.css';

const About = (props) => {
  //
  const idsOfFavoriteBooks = [18, 9, 31];
  const listOfFavorites = idsOfFavoriteBooks.map((bookID) => {
    const book = data.books.find((elem) => elem.id === bookID);
    return (
      <li className="about__fav" key={book.id}>
        <img
          alt={`Cover of ${book.title}`}
          src={require(`../covers/${book.coverImgFileName}`)}
          className="about__fav-cover"
        />
        <div className="about__fav-details">
          <div className="about__fav-title">{book.title}</div>
          <div className="about__fav-authors">
            {makeListFromArray(book.authors)}
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="about container">
      <h2 className="about__title">Me</h2>
      <p>
        I'm a former math teacher turned developer who loves to read and share
        books. My reading tastes lean towards Science Fiction, Fantasy, Graphic
        Novels, and sciency Nonfiction, though I like to dip my toes in a number
        of different genres. I'm a sucker for high concepts and big ideas.
      </p>
      <p>
        I read 50 to 60 books a year, so I have a lot of favorites. In no
        particular order:
      </p>
      <ul>{listOfFavorites}</ul>
      <p>
        Hire me! I built this site with React as part of my{' '}
        <a href="https://tylerauer.com">portfolio</a> along with other
        full-stack applications. I work hard and like fun!
      </p>
      <h2 className="about__title">Inspiration</h2>
      <p>
        This site was inspired by the amazing{' '}
        <a href="https://apps.npr.org/best-books/index.html#view=covers&year=2019">
          NPR Book Concierge
        </a>
        . The great{' '}
        <a href="https://tksstgiftguide.tumblr.com/">TKSST Gift Guide</a> was
        inspiration for the navigation styles.
      </p>
    </div>
  );
};

export default About;
