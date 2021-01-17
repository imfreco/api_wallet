import { ISubscription } from './domain/subscription';

export interface ISubscriptionRepository {
  findAll(): Promise<ISubscription[]>;
  findOne(id: number): Promise<ISubscription | null>;
  findByUserAndCode(
    user_id: number,
    code: string
  ): Promise<ISubscription | null>;
  create(entry: ISubscription): Promise<void>;
  update(entry: ISubscription): Promise<void>;
  remove(id: number): Promise<void>;
}
