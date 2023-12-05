package com.mury.library.service;

import com.mury.library.dto.BookDTO;
import com.mury.library.model.Book;
import com.mury.library.repository.BookRepository;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BookService {

	private final BookRepository bookRepository;


	public Object getAllBooks() {
		// Return the Book objects
		return bookRepository.findAll();
	}

	public Object addBook(BookDTO bookDTO) {
		// Create a new Book object
		// Book blog = new BookDTO(null, null)
		Book book = new Book();
		book.setTitle(bookDTO.getTitle());
		book.setAuthor(bookDTO.getAuthor());

		// Save the Book object to the database and return it
		return bookRepository.save(book);
	}

	public Object getBook(Long bookId) {
		// Get the Book object from the database
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book with id " + bookId + " not found"));

		// Return the Book object
		return book;
	}

	public Object updateBook(Long bookId, BookDTO bookDTO) {
		// Get the Book object from the database
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book with id " + bookId + " not found"));

		// Update the Book object
		book.setTitle(bookDTO.getTitle());
		book.setAuthor(bookDTO.getAuthor());

		// Save the Book object to the database and return it
		return bookRepository.save(book);
	}

	public Object deleteBook(Long bookId) {
		// Get the Book object from the database
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book with id " + bookId + " not found"));

		// Delete the Book object from the database
		bookRepository.delete(book);

		// Return message to the user
		return "Book deleted successfully";
	}

}
