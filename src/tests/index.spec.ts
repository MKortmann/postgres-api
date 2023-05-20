import { Request, Response } from 'express';

describe('Example test', () => {
  it('should return a 200 status code', () => {
    const req: Request = {} as Request;
    const res: Response = {} as Response;

    expect(200).toBe(200);
  });
});
