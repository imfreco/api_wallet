import { DELETE, GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';
import { SubscriptionService } from '../services/subscription.service';

@route('/subscriptions')
export class SubcriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @GET()
  public async findAll(req: Request, res: Response) {
    res.send(await this.subscriptionService.findAll());
  }

  @route(':id')
  @GET()
  public async findOne(req: Request, res: Response) {
    res.send(await this.subscriptionService.findOne(+req.params.id));
  }

  @POST()
  public async create(req: Request, res: Response) {
    await this.subscriptionService.create({
      user_id: req.body.user_id,
      code: req.body.code,
      amount: req.body.amount,
      cron: req.body.cron,
    } as ISubscriptionCreateDto);

    res.send();
  }

  @route(':id')
  @PUT()
  public async update(req: Request, res: Response) {
    await this.subscriptionService.update(+req.params.id, {
      code: req.body.code,
      amount: req.body.amount,
      cron: req.body.cron,
    } as ISubscriptionUpdateDto);

    res.send();
  }

  @route(':id')
  @DELETE()
  public async remove(req: Request, res: Response) {
    await this.subscriptionService.remove(+req.params.id);

    res.send();
  }
}
