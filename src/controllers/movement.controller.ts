import { GET, POST, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/controllers/base.controller';
import { IMovementCreateDto } from '../dtos/movement.dto';
import { MovementService } from '../services/movement.service';

@route('/movements')
export class MovementController extends BaseController {
  constructor(private readonly movementService: MovementService) {
    super();
  }

  @GET()
  public async findAll(req: Request, res: Response) {
    try {
      res.send(await this.movementService.findAll());
    } catch (err) {
      this.handleException(err, res);
    }
  }

  @route('/:id')
  @GET()
  public async findOne(req: Request, res: Response) {
    try {
      const movement = await this.movementService.findOne(+req.params.id);

      if (movement) res.send(movement);
      else res.status(404).send();
    } catch (err) {
      this.handleException(err, res);
    }
  }

  @POST()
  public async create(req: Request, res: Response) {
    try {
      await this.movementService.create({
        user_id: req.body.user_id,
        type: req.body.type,
        amount: req.body.amount,
      } as IMovementCreateDto);

      res.send();
    } catch (err) {
      this.handleException(err, res);
    }
  }
}
