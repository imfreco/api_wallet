import { DELETE, GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/controllers/base.controller';
import { SubscriptionService } from '../services/subscription.service';

@route('/subscriptions')
export class SubcriptionController extends BaseController {
  constructor(private readonly subscriptionService: SubscriptionService) {
    super();
  }

  @GET()
  public async findAll(req: Request, res: Response) {
    try {
      res.send(await this.subscriptionService.findAll());
    } catch (err) {
      this.handleException(err, res);
    }
  }

  @route('/:id')
  @GET()
  public async findOne(req: Request, res: Response) {
    try {
      const subscription = await this.subscriptionService.findOne(
        +req.params.id
      );

      if (subscription) res.send(subscription);
      else res.status(404).send();
    } catch (err) {
      this.handleException(err, res);
    }
  }

  @POST()
  public async create(req: Request, res: Response) {
    try {
      await this.subscriptionService.create({
        user_id: req.body.user_id,
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron,
      } as ISubscriptionCreateDto);

      res.send();
    } catch (err) {
      this.handleException(err, res);
    }
  }

  @route('/:id')
  @PUT()
  public async update(req: Request, res: Response) {
    try {
      await this.subscriptionService.update(+req.params.id, {
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron,
      } as ISubscriptionUpdateDto);

      res.send();
    } catch (err) {
      this.handleException(err, res);
    }
  }

  @route('/:id')
  @DELETE()
  public async remove(req: Request, res: Response) {
    try {
      const id = +req.params.id;
      const subscription = await this.subscriptionService.findOne(id);

      if (subscription) res.send(await this.subscriptionService.remove(id));
      else res.status(404).send();
    } catch (err) {
      this.handleException(err, res);
    }
  }
}
