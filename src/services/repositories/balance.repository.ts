import { IBalance } from './domain/balance';

export interface IBalanceRepository {
  findAll(): Promise<IBalance[]>;
  findOne(id: number): Promise<IBalance | null>;
  findByUser(userId: number): Promise<IBalance | null>;
  create(entry: IBalance): Promise<void>;
  update(entry: IBalance): Promise<void>;
  remove(id: number): Promise<void>;
}
