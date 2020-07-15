# Purple Bookshelf

A React application to share books with friends.

## Technologies

Built with create-react-app using React-Router and custom hooks. Python to scrape data and JavaScript for data migrations. Automatic deployment through GitHub pages.

## Potential Enhancements

- **Animations when book covers load** - Not possible in the way that I want with the current implementation of the masonry grid. Because the grid is constructed with columns as `<div>`s, React considers components moved to a new column (ex: after clicking shuffle) to be unmounted and remounted while covers staying in the same column do not change. This causes some of the covers to remount while others do not.

- **Popovers for ratings stars** - When a user mouses over the stars of a rating, it would be nice for a popover to explain the rating system.

- **Gradient across active filters** - Fancier styling for filters, perhaps using something like `multiple.js`