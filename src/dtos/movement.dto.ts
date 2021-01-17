import { MovementType } from '../common/enums/movement-type';

interface IMovementCreateDto {
  user_id: number;
  type: MovementType;
  amount: number;
}

export { IMovementCreateDto };
