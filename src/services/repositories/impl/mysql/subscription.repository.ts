import mysqlConn from '../../../../common/persistence/mysql.persistence';
import { ISubscription } from '../../domain/subscription';

export class SubscriptionRepository {
  public async findAll(): Promise<ISubscription[]> {
    const [rows] = await mysqlConn.execute(
      'SELECT * FROM wallet_subscription ORDER BY id DESC'
    );

    return rows as ISubscription[];
  }

  public async findOne(id: number): Promise<ISubscription | null> {
    const [
      rows,
    ]: any[] = await mysqlConn.execute(
      'SELECT * FROM wallet_subscription WHERE id = ?',
      [id]
    );

    if (rows.length) return rows[0] as ISubscription;
    else return null;
  }

  public async create(entry: ISubscription): Promise<void> {
    const NOW = new Date();

    await mysqlConn.execute(
      `INSERT INTO wallet_subscription (user_id, code, amount, cron, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [entry.user_id, entry.code, entry.amount, entry.cron, NOW, NOW]
    );
  }

  public async update(entry: ISubscription): Promise<void> {
    const NOW = new Date();

    await mysqlConn.execute(
      `UPDATE wallet_subscription SET user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ?
      WHERE id = ?`,
      [entry.user_id, entry.code, entry.amount, entry.cron, NOW, entry.id]
    );
  }

  public async remove(id: number): Promise<void> {
    await mysqlConn.execute(`DELETE FROM wallet_subscription WHERE id = ?`, [
      id,
    ]);
  }
}
