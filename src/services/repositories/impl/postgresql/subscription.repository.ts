import postgresConn from '../../../../common/persistence/postgresql.persistence';
import { ISubscription } from '../../domain/subscription';
import { ISubscriptionRepository } from '../../subscription.repository';

export class SubscriptionRepositoryPostgreSQL
  implements ISubscriptionRepository {
  public async findAll(): Promise<ISubscription[]> {
    const { rows } = await postgresConn.query(
      'SELECT * FROM wallet_subscription ORDER BY id DESC',
      []
    );

    return rows as ISubscription[];
  }

  public async findOne(id: number): Promise<ISubscription | null> {
    const {
      rows,
    } = await postgresConn.query(
      'SELECT * FROM wallet_subscription WHERE id = $1',
      [id]
    );

    if (rows.length) return rows[0] as ISubscription;
    else return null;
  }

  public async findByUserAndCode(
    user_id: number,
    code: string
  ): Promise<ISubscription | null> {
    const {
      rows,
    } = await postgresConn.query(
      'SELECT * FROM wallet_subscription WHERE user_id = $1 AND code = $2',
      [user_id, code]
    );

    if (rows.length) return rows[0] as ISubscription;
    else return null;
  }

  public async create(entry: ISubscription): Promise<void> {
    const NOW = new Date();

    await postgresConn.query(
      `INSERT INTO wallet_subscription (user_id, code, amount, cron, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [entry.user_id, entry.code, entry.amount, entry.cron, NOW, NOW]
    );
  }

  public async update(entry: ISubscription): Promise<void> {
    const NOW = new Date();

    await postgresConn.query(
      `UPDATE wallet_subscription SET user_id = $1, code = $2, amount = $3, cron = $4, updated_at = $5
      WHERE id = $6`,
      [entry.user_id, entry.code, entry.amount, entry.cron, NOW, entry.id]
    );
  }

  public async remove(id: number): Promise<void> {
    await postgresConn.query(`DELETE FROM wallet_subscription WHERE id = $1`, [
      id,
    ]);
  }
}
