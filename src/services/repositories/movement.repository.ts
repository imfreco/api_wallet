import { IMovement } from './domain/movement';

export interface IMovementRepository {
  findAll(): Promise<IMovement[]>;
  findOne(id: number): Promise<IMovement | null>;
  create(entry: IMovement): Promise<void>;
  update(entry: IMovement): Promise<void>;
  remove(id: number): Promise<void>;
}
