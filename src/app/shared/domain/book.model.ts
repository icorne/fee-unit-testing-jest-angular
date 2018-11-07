export interface Book {
  id: number;
  title: string;
  description: string;
  author: string;
  isbn: string;
  amountOfPages: number;
  releaseDate: Date;
  borrowed: boolean;
}
