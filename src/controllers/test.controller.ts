import { Request, Response } from 'express';
import { GET, route } from 'awilix-express';

@route('/')
export class TestController {
  @GET()
  public index(req: Request, res: Response): void {
    res.send('running...');
  }
}
