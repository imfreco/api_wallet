import { ApplicationException } from '../common/exceptions/application.exception';
import {
  ISubscriptionCreateDto,
  ISubscriptionUpdateDto,
} from '../dtos/subscription.dto';
import { ISubscription } from './repositories/domain/subscription';
import { ISubscriptionRepository } from './repositories/subscription.repository';

export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository
  ) {}

  public async findAll(): Promise<ISubscription[]> {
    return await this.subscriptionRepository.findAll();
  }

  public async findOne(id: number): Promise<ISubscription | null> {
    return await this.subscriptionRepository.findOne(id);
  }

  public async create(entry: ISubscriptionCreateDto): Promise<void> {
    const originalEntry = await this.subscriptionRepository.findByUserAndCode(
      entry.user_id,
      entry.code
    );

    if (!originalEntry)
      await this.subscriptionRepository.create(entry as ISubscription);
    else throw new ApplicationException('User subscription already exist!');
  }

  public async update(
    id: number,
    entry: ISubscriptionUpdateDto
  ): Promise<void> {
    const originalEntry = await this.subscriptionRepository.findOne(id);

    if (originalEntry) {
      originalEntry.code = entry.code;
      originalEntry.amount = entry.amount;
      originalEntry.cron = entry.cron;
      await this.subscriptionRepository.update(originalEntry);
    } else throw new ApplicationException('Subscription not found!');
  }

  public async remove(id: number): Promise<void> {
    return await this.subscriptionRepository.remove(id);
  }
}
