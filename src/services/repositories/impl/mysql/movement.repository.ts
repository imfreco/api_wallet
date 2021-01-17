import mysqlConn from '../../../../common/persistence/mysql.persistence';
import { IMovement } from '../../domain/movement';
import { IMovementRepository } from '../../movement.repository';

export class MovementRepositoryMySQL implements IMovementRepository {
  public async findAll(): Promise<IMovement[]> {
    const [rows] = await mysqlConn.execute(
      'SELECT * FROM wallet_movement ORDER BY id DESC'
    );

    return rows as IMovement[];
  }

  public async findOne(id: number): Promise<IMovement | null> {
    const [
      rows,
    ]: any[] = await mysqlConn.execute(
      'SELECT * FROM wallet_movement WHERE id = ?',
      [id]
    );

    if (rows.length) return rows[0] as IMovement;
    else return null;
  }

  public async create(entry: IMovement): Promise<void> {
    const NOW = new Date();

    await mysqlConn.execute(
      `INSERT INTO wallet_movement (user_id, type, amount, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?)`,
      [entry.user_id, entry.type, entry.amount, NOW, NOW]
    );
  }

  public async update(entry: IMovement): Promise<void> {
    const NOW = new Date();

    await mysqlConn.execute(
      `UPDATE wallet_movement SET user_id = ?, type = ?, amount = ?, updated_at = ?
      WHERE id = ?`,
      [entry.user_id, entry.type, entry.amount, NOW, entry.id]
    );
  }

  public async remove(id: number): Promise<void> {
    await mysqlConn.execute(`DELETE FROM wallet_movement WHERE id = ?`, [id]);
  }
}
