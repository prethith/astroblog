export interface Book {
    title: string;
    author: string;
    /** ISBN-13 or ISBN-10 — used to pull the cover from Open Library. */
    isbn: string;
    status: 'reading' | 'read';
    /** Optional: override the cover URL if Open Library has no good image. */
    cover?: string;
}

/* Edit this list to update the /reading page.
   Covers are fetched by ISBN from Open Library — no API key needed.
   Find an ISBN on the book's Open Library / Amazon page. */
export const books: Book[] = [
    { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', isbn: '9780140449136', status: 'reading' },
    { title: 'The Master and Margarita', author: 'Mikhail Bulgakov', isbn: '9780141180144', status: 'reading' },
    { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', status: 'read' },
    { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', isbn: '9780374533557', status: 'read' },
    { title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', isbn: '9780374528379', status: 'read' },
];

/** Open Library cover URL by ISBN. size: S | M | L */
export function coverUrl(book: Book, size: 'S' | 'M' | 'L' = 'L'): string {
    return book.cover ?? `https://covers.openlibrary.org/b/isbn/${book.isbn}-${size}.jpg`;
}
