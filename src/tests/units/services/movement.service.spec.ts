import assert from 'assert';
import { MovementType } from '../../../common/enums/movement-type';
import { IMovementCreateDto } from '../../../dtos/movement.dto';
import { MovementService } from '../../../services/movement.service';
import { BalanceRepositoryMock } from '../../../services/repositories/impl/mock/balance.repository';
import { MovementRepositoryMock } from '../../../services/repositories/impl/mock/movement.repository';

const movementService = new MovementService(
  new MovementRepositoryMock(),
  new BalanceRepositoryMock()
);

describe('Movement Service', () => {
  describe('Create Method', () => {
    it('tries to create an income movement', async () => {
      await movementService.create({
        user_id: 1,
        type: MovementType.INCOME,
        amount: 200,
      } as IMovementCreateDto);
    });

    it('tries to create an outcome movement', async () => {
      await movementService.create({
        user_id: 1,
        type: MovementType.OUTCOME,
        amount: 200,
      } as IMovementCreateDto);
    });

    it('tries to create an outcome movement with insufficient balance', async () => {
      try {
        await movementService.create({
          user_id: 1,
          type: MovementType.INCOME,
          amount: 200000,
        } as IMovementCreateDto);
      } catch (error) {
        assert.strictEqual(error.message, 'User does not have enough balance');
      }
    });

    it('tries to create an unexpected movement', async () => {
      try {
        await movementService.create({
          user_id: 1,
          type: 5,
          amount: 200,
        } as IMovementCreateDto);
      } catch (error) {
        assert.strictEqual(error.message, 'Invalid movement type supplied');
      }
    });
  });
});
