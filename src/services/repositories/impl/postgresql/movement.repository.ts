import postgresConn from '../../../../common/persistence/postgresql.persistence';
import { IMovement } from '../../domain/movement';
import { IMovementRepository } from '../../movement.repository';

export class MovementRepositoryPostgreSQL implements IMovementRepository {
  public async findAll(): Promise<IMovement[]> {
    const { rows } = await postgresConn.query(
      'SELECT * FROM wallet_movement ORDER BY id DESC',
      []
    );

    return rows as IMovement[];
  }

  public async findOne(id: number): Promise<IMovement | null> {
    const {
      rows,
    } = await postgresConn.query(
      'SELECT * FROM wallet_movement WHERE id = $1',
      [id]
    );

    if (rows.length) return rows[0] as IMovement;
    else return null;
  }

  public async create(entry: IMovement): Promise<void> {
    const NOW = new Date();

    await postgresConn.query(
      `INSERT INTO wallet_movement (user_id, type, amount, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [entry.user_id, entry.type, entry.amount, NOW, NOW]
    );
  }

  public async update(entry: IMovement): Promise<void> {
    const NOW = new Date();

    await postgresConn.query(
      `UPDATE wallet_movement SET user_id = $1, type = $2, amount = $3, updated_at = $4
      WHERE id = $5`,
      [entry.user_id, entry.type, entry.amount, NOW, entry.id]
    );
  }

  public async remove(id: number): Promise<void> {
    await postgresConn.query(`DELETE FROM wallet_movement WHERE id = $1`, [id]);
  }
}
