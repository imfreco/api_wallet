import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/controllers/base.controller';
import { BalanceService } from '../services/balance.service';

@route('/balances')
export class BalanceController extends BaseController {
  constructor(private readonly balanceService: BalanceService) {
    super();
  }

  @GET()
  public async findAll(req: Request, res: Response) {
    try {
      res.send(await this.balanceService.findAll());
    } catch (err) {
      this.handleException(err, res);
    }
  }

  @route('/:id')
  @GET()
  public async findOne(req: Request, res: Response) {
    try {
      const movement = await this.balanceService.findOne(+req.params.id);

      if (movement) res.send(movement);
      else res.status(404).send();
    } catch (err) {
      this.handleException(err, res);
    }
  }
}
