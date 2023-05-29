import { Book, BookStore } from '../models/book';

const store = new BookStore();

describe('Book Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.index).toBeDefined();
  });

  it('create method should add a book', async () => {
    // @ts-ignore
    const result = await store.create({
      title: 'Bridge to Terabithia',
      author: 'Katherine Paterson',
      total_pages: 250,
      summary: 'Childrens',
    });

    console.log(`result at CREATE METHOD: ${JSON.stringify(result)}`);
    expect(result).toEqual({
      id: result.id,
      title: 'Bridge to Terabithia',
      author: 'Katherine Paterson',
      total_pages: 250,
      summary: 'Childrens',
    });
  });

  it('index method should return a list of books', async () => {
    const result = await store.index();
    console.log(`result index: ${JSON.stringify(result)}`);
    expect(result).toEqual([
      {
        id: 1,
        title: 'Bridge to Terabithia',
        total_pages: 250,
        author: 'Katherine Paterson',
        summary: 'Childrens',
      },
    ]);
  });

  it('show method should return the correct book', async () => {
    const result = await store.show('1');
    console.log(`result return the correct book: ${JSON.stringify(result)}`);

    expect(result).toEqual({
      id: 1,
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      summary: 'Childrens',
    });
  });

  it('delete method should remove the book', async () => {
    store.delete('1');
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
