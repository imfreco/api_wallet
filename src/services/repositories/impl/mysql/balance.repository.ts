import mysqlConn from '../../../../common/persistence/mysql.persistence';
import { IBalanceRepository } from '../../balance.repository';
import { IBalance } from '../../domain/balance';

export class BalanceRepositoryMySQL implements IBalanceRepository {
  public async findAll(): Promise<IBalance[]> {
    const [rows] = await mysqlConn.execute(
      'SELECT * FROM wallet_balance ORDER BY id DESC'
    );

    return rows as IBalance[];
  }

  public async findOne(id: number): Promise<IBalance | null> {
    const [
      rows,
    ]: any[] = await mysqlConn.execute(
      'SELECT * FROM wallet_balance WHERE id = ?',
      [id]
    );

    if (rows.length) return rows[0] as IBalance;
    else return null;
  }

  public async findByUser(userId: number): Promise<IBalance | null> {
    const [
      rows,
    ]: any[] = await mysqlConn.execute(
      'SELECT * FROM wallet_balance WHERE user_id = ?',
      [userId]
    );

    if (rows.length) return rows[0] as IBalance;
    else return null;
  }

  public async create(entry: IBalance): Promise<void> {
    const NOW = new Date();

    await mysqlConn.execute(
      `INSERT INTO wallet_balance (user_id, amount, created_at, updated_at)
           VALUES (?, ?, ?, ?)`,
      [entry.user_id, entry.amount, NOW, NOW]
    );
  }

  public async update(entry: IBalance): Promise<void> {
    const NOW = new Date();

    await mysqlConn.execute(
      `UPDATE wallet_balance SET user_id = ?, amount = ?, updated_at = ?
          WHERE id = ?`,
      [entry.user_id, entry.amount, NOW, entry.id]
    );
  }

  public async remove(id: number): Promise<void> {
    await mysqlConn.execute(`DELETE FROM wallet_balance WHERE id = ?`, [id]);
  }
}
