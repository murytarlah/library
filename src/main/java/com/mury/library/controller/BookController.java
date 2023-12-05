package com.mury.library.controller;

import com.mury.library.service.BookService;
import org.springframework.web.bind.annotation.*;
import com.mury.library.dto.BookDTO;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/books")
public class BookController {

	private final BookService bookService;

	@PostMapping("/add")
	public Object addBook(@RequestBody BookDTO bookDTO) {
		return bookService.addBook(bookDTO);
	}

	@GetMapping("")
	public Object getAllBooks() {
		return bookService.getAllBooks();
	}

	@GetMapping("/{bookId}")
	public Object getBook(@PathVariable Long bookId) {
		return bookService.getBook(bookId);
	}

	@PutMapping("/update/{bookId}")
	public Object updateBlogPost(@PathVariable Long bookId, @RequestBody BookDTO bookDTO) {
		return bookService.updateBook(bookId, bookDTO);
	}

	@DeleteMapping("/delete/{bookId}")
	public Object deleteBook(@PathVariable Long bookId) {
		return bookService.deleteBook(bookId);
	}
}
