import db from '../../../../common/persistence/mock.persistence';
import { ISubscription } from '../../domain/subscription';
import { ISubscriptionRepository } from '../../subscription.repository';

export class SubscriptionRepositoryMock implements ISubscriptionRepository {
  public async findAll(): Promise<ISubscription[]> {
    const result = db.subscriptions as ISubscription[];

    return [...result] as ISubscription[];
  }

  public async findOne(id: number): Promise<ISubscription | null> {
    const table = db.subscriptions as ISubscription[];
    const result = table.find((s) => s.id === id);

    if (result) return { ...result };
    else return null;
  }

  public async findByUserAndCode(
    userId: number,
    code: string
  ): Promise<ISubscription | null> {
    const table = db.subscriptions as ISubscription[];
    const result = table.find((s) => s.user_id === userId && s.code === code);

    if (result) return { ...result };
    else return null;
  }

  public async create(entry: ISubscription): Promise<void> {
    const NOW = new Date();
    const table = db.subscriptions as ISubscription[];

    db._subscriptionId++;

    table.push({
      id: db._subscriptionId,
      code: entry.code,
      user_id: entry.user_id,
      amount: entry.amount,
      cron: entry.cron,
      created_at: NOW,
      updated_at: NOW,
    } as ISubscription);
  }

  public async update(entry: ISubscription): Promise<void> {
    const NOW = new Date();
    const table = db.subscriptions as ISubscription[];

    const originalEntry = table.find((s) => s.id === entry.id);

    if (originalEntry) {
      originalEntry.user_id = entry.id;
      originalEntry.code = entry.code;
      originalEntry.amount = entry.amount;
      originalEntry.cron = entry.cron;
      originalEntry.updated_at = NOW;
    }
  }

  public async remove(id: number): Promise<void> {
    let table = db.subscriptions as ISubscription[];

    table = table.filter((s) => s.id !== id);
  }
}
