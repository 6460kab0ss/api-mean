import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import this!
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true, // Ensure it's standalone
  imports: [CommonModule], // Add CommonModule for *ngFor, *ngIf, etc.
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'booksapp';
  readonly APIUrl = "http://localhost:5038/api/books/";

  constructor(private http: HttpClient) {}

  books: any = [];

  refreshBooks() {
    this.http.get(this.APIUrl + 'GetBooks').subscribe(data => {
      this.books = data;
    });
  }

  ngOnInit() {
    this.refreshBooks();
  }

  addBook() {
    const newBook = (document.getElementById("newBook") as HTMLInputElement).value;
    const newDesc = (document.getElementById("newDesc") as HTMLInputElement).value;
    const newPrice = (document.getElementById("newPrice") as HTMLInputElement).value;
    
    const formData = new FormData();
    formData.append("title", newBook);
    formData.append("description", newDesc);
    formData.append("price", newPrice.toString());

    this.http.post(this.APIUrl + 'AddBook', formData).subscribe(data => {
      alert(data);
      this.refreshBooks();
    });
  }

  deleteBook(id: any) {
    this.http.delete(this.APIUrl + 'DeleteBook?id=' + id).subscribe(data => {
      alert(data);
      this.refreshBooks();
    });
  }
}
