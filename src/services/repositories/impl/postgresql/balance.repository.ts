import postgresConn from '../../../../common/persistence/postgresql.persistence';
import { IBalanceRepository } from '../../balance.repository';
import { IBalance } from '../../domain/balance';

export class BalanceRepositoryPostgreSQL implements IBalanceRepository {
  public async findAll(): Promise<IBalance[]> {
    const { rows } = await postgresConn.query(
      'SELECT * FROM wallet_balance ORDER BY id DESC',
      []
    );

    return rows as IBalance[];
  }

  public async findOne(id: number): Promise<IBalance | null> {
    const {
      rows,
    } = await postgresConn.query('SELECT * FROM wallet_balance WHERE id = $1', [
      id,
    ]);

    if (rows.length) return rows[0] as IBalance;
    else return null;
  }

  public async findByUser(userId: number): Promise<IBalance | null> {
    const {
      rows,
    } = await postgresConn.query(
      'SELECT * FROM wallet_balance WHERE user_id = $1',
      [userId]
    );

    if (rows.length) return rows[0] as IBalance;
    else return null;
  }

  public async create(entry: IBalance): Promise<void> {
    const NOW = new Date();

    await postgresConn.query(
      `INSERT INTO wallet_balance (user_id, amount, created_at, updated_at)
          VALUES ($1, $2, $3, $4)`,
      [entry.user_id, entry.amount, NOW, NOW]
    );
  }

  public async update(entry: IBalance): Promise<void> {
    const NOW = new Date();

    await postgresConn.query(
      `UPDATE wallet_balance SET user_id = $1, amount = $2, updated_at = $3
          WHERE id = $4`,
      [entry.user_id, entry.amount, NOW, entry.id]
    );
  }

  public async remove(id: number): Promise<void> {
    await postgresConn.query(`DELETE FROM wallet_balance WHERE id = $1`, [id]);
  }
}
