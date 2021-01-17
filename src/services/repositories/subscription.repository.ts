import { ISubscription } from './domain/subscription';

export interface SubscriptionRepository {
  findOne(id: number): Promise<ISubscription | null>;
  create(entry: ISubscription): Promise<void>;
  update(entry: ISubscription): Promise<void>;
  remove(id: number): Promise<void>;
  findAll(): Promise<ISubscription[]>;
}
