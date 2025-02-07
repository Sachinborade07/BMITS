// Task: Create an object bookLibrary to manage a collection of books.
// The object should have the following properties and methods:
// books: An array of book objects (each book has title, author, and yearPublished).
// addBook(book): Adds a new book to the collection.
// getBooksByAuthor(author): Returns all books by a given author.
// removeBookByTitle(title): Removes a book by Title.
// removeBookByAuthor(Author): Removes a book by Author.
// Add a method getAllBooks to return a list of all book titles.

const bookLibrary = {
    books: [],

    addBook(book) {
        this.books.push(book);
    },

    getBooksByAuthor(author) {
        return this.books.filter(book => book.author === author);
    },

    removeBookByTitle(title) {
        const a = this.books = this.books.filter(book => book.title !== title);
        return a;
    },
    removeBookByAuthor(author) {
        const b = this.books = this.books.filter(book => book.author !== author);
        return b;
    },

    getAllBooks() {
        return this.books.map(book => book.title);
    }
};


bookLibrary.addBook({ title: "Book1", author: "ABC" });
bookLibrary.addBook({ title: "Book2", author: "ABC" });
bookLibrary.addBook({ title: "Book3", author: "CDE" });
bookLibrary.addBook({ title: "Book4", author: "FEC" });


console.log(bookLibrary.getAllBooks());
console.log(bookLibrary.getBooksByAuthor("ABC"));

const a = bookLibrary.removeBookByTitle("Book4");
console.log("The removed BOOK is ", a);
console.log(bookLibrary.getAllBooks());

const b = [bookLibrary.removeBookByAuthor("ABC")];
console.log("The removed Books are", b);

console.log(bookLibrary.getAllBooks());


/* Output:- 

[ 'Book1', 'Book2', 'Book3', 'Book4' ]
[
  { title: 'Book1', author: 'ABC' },
  { title: 'Book2', author: 'ABC' }
]
The removed BOOK is  [
  { title: 'Book1', author: 'ABC' },
  { title: 'Book2', author: 'ABC' },
  { title: 'Book3', author: 'CDE' }
]
[ 'Book1', 'Book2', 'Book3' ]
The removed Books are [ [ { title: 'Book3', author: 'CDE' } ] ]
[ 'Book3' ]

*/
