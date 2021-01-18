import db from '../../../../common/persistence/mock.persistence';
import { IMovement } from '../../domain/movement';
import { IMovementRepository } from '../../movement.repository';

export class MovementRepositoryMock implements IMovementRepository {
  public async findAll(): Promise<IMovement[]> {
    const result = db.movements as IMovement[];

    return [...result] as IMovement[];
  }

  public async findOne(id: number): Promise<IMovement | null> {
    const table = db.movements as IMovement[];
    const result = table.find((m) => m.id === id);

    if (result) return { ...result };
    else return null;
  }

  public async create(entry: IMovement): Promise<void> {
    const NOW = new Date();
    const table = db.movements as IMovement[];

    db._movementId++;

    table.push({
      id: db._movementId,
      user_id: entry.user_id,
      type: entry.type,
      amount: entry.amount,
      created_at: NOW,
      updated_at: NOW,
    } as IMovement);
  }

  public async update(entry: IMovement): Promise<void> {
    const NOW = new Date();
    const table = db.movements as IMovement[];

    const originalEntry = table.find((m) => m.id === entry.id);

    if (originalEntry) {
      originalEntry.user_id = entry.id;
      originalEntry.type = entry.type;
      originalEntry.amount = entry.amount;
      originalEntry.updated_at = NOW;
    }
  }

  public async remove(id: number): Promise<void> {
    let table = db.movements as IMovement[];

    table = table.filter((m) => m.id !== id);
  }
}
