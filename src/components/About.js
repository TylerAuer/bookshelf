import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import makeListFromArray from '../functions/makeListFromArray';
import './About.css';

const About = ({ books }) => {
  const location = useLocation();

  // Books to add once I've reviewed them
  /*
  - Recursion
  - Limits of the Known
  - Born a Crime
  - Homo Deus
  - The Name of the Wind
  - Everybody Lies
  - The World as it is
  - Rendezvous with Rama
  - The Golden Compass
  - Blankets
  - Stiches
  - In the Heart of the Sea
  - iRobot
  */
  const idsOfFavoriteBooks = [18, 9, 31, 32, 33, 34, 35];
  const listOfFavorites = idsOfFavoriteBooks.map((id) => {
    const book = books[id];
    return (
      <li className="about__fav" key={book.id}>
        <Link
          to={{
            pathname: `/single/${id}`,
            search: location.search,
          }}
        >
          <img
            alt={`Cover of ${book.title}`}
            src={require(`../covers/${book.coverImgFileName}`)}
            className="about__fav-cover"
          />
        </Link>
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
      <h2 className="about__title">Hi Friends!</h2>
      <p>
        I'm a former math teacher turned developer who loves to read and share
        books. My reading tastes lean towards Science Fiction, Fantasy, Graphic
        Novels, Math, Science, and Adventure, though I like to dip my toes in a
        number of different genres. I'm a sucker for high concepts and big
        ideas.
      </p>
      <p>
        I read 50 to 60 books a year, so I have a lot of favorites. In no
        particular order:
      </p>
      <ul>{listOfFavorites}</ul>
      <h2 className="about__title">How I Read</h2>
      <p>
        I didn't become an avid reader until I finished college. It took a few
        years to learn how to choose books I was likely to enjoy and then a few
        more to learn how to make space in my life to actually read them.
      </p>
      <p>
        Having kids has made carving out time for reading extra challenging. I
        make a conscious effort to prioritize reading books over surfing the
        internet and social media. Twenty extra minutes a day spent reading
        books translates into a lot of extra books read in a year (somewhere
        around 20 +/- 5).
      </p>
      <p>
        Most of my reading is done on a Kindle Paperwhite which lets my wife
        sleep with the light out while I read in bed. The Kindle is also easier
        to hold with one hand than a book. Aesthetically, I prefer paperback
        books (not trade paperbacks though). But the convenience of the Kindle
        helps me read more than I might otherwise.
      </p>
      <p>
        I've also become a big fan of audiobooks. I tend to only listen to
        Nonfiction audiobooks, but love that mundane tasks like dishes can also
        be a time to "read". My personal opinion is that you can claim to have
        "read" a book if you listened to it but that listening to a book isn't
        "reading" it. That may be illogical, but it makes sense to me.
      </p>
      <h2 className="about__title">Inspiration</h2>
      <p>
        This site was heavily influenced by the amazing{' '}
        <a href="https://apps.npr.org/best-books/index.html#view=covers&year=2019">
          NPR Book Concierge
        </a>
        . The great{' '}
        <a href="https://tksstgiftguide.tumblr.com/">TKSST Gift Guide</a> was
        inspiration for the navigation styles.
      </p>
      <p>
        Hire me! I built this site with React as part of my{' '}
        <a href="https://tylerauer.com">portfolio</a> along with other
        full-stack applications. I work hard and like fun!
      </p>
    </div>
  );
};

export default About;
