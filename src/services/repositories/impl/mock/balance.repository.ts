import db from '../../../../common/persistence/mock.persistence';
import { IBalanceRepository } from '../../balance.repository';
import { IBalance } from '../../domain/balance';

export class BalanceRepositoryMock implements IBalanceRepository {
  public async findAll(): Promise<IBalance[]> {
    const result = (db.balances as unknown) as IBalance[];

    return [...result] as IBalance[];
  }

  public async findOne(id: number): Promise<IBalance | null> {
    const table = (db.balances as unknown) as IBalance[];
    const result = table.find((b) => b.id === id);

    if (result) return { ...result };
    else return null;
  }

  public async findByUser(userId: number): Promise<IBalance | null> {
    const table = db.balances as IBalance[];
    const result = table.find((b) => b.user_id === userId);

    if (result) return { ...result };
    else return null;
  }

  public async create(entry: IBalance): Promise<void> {
    const NOW = new Date();

    const table = db.balances as IBalance[];

    db._balanceId++;

    table.push({
      id: db._balanceId,
      user_id: entry.user_id,
      amount: entry.amount,
      created_at: NOW,
      updated_at: NOW,
    } as IBalance);
  }

  public async update(entry: IBalance): Promise<void> {
    const NOW = new Date();
    const table = db.balances as IBalance[];

    const originalEntry = table.find((b) => b.id === entry.id);

    if (originalEntry) {
      originalEntry.user_id = entry.id;
      originalEntry.amount = entry.amount;
      originalEntry.updated_at = NOW;
    }
  }

  public async remove(id: number): Promise<void> {
    let table = db.balances as IBalance[];

    table = table.filter((b) => b.id !== id);
  }
}
