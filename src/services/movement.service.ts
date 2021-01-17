import { MovementType } from '../common/enums/movement-type';
import { ApplicationException } from '../common/exceptions/application.exception';
import { IMovementCreateDto } from '../dtos/movement.dto';
import { IBalanceRepository } from './repositories/balance.repository';
import { IBalance } from './repositories/domain/balance';
import { IMovement } from './repositories/domain/movement';
import { IMovementRepository } from './repositories/movement.repository';

export class MovementService {
  constructor(
    private readonly movementRepository: IMovementRepository,
    private readonly balanceRepository: IBalanceRepository
  ) {}

  public async findAll(): Promise<IMovement[]> {
    return await this.movementRepository.findAll();
  }

  public async findOne(id: number): Promise<IMovement | null> {
    return await this.movementRepository.findOne(id);
  }

  public async create(entry: IMovementCreateDto): Promise<void> {
    const balance = await this.balanceRepository.findByUser(entry.user_id);

    switch (entry.type) {
      case MovementType.INCOME:
        await this.income(entry, balance);
        break;
      case MovementType.OUTCOME:
        await this.outcome(entry, balance);
        break;
      default:
        throw new ApplicationException('Invalid movement type supplied');
    }
    // return await this.movementRepository.create();
  }

  private async income(entry: IMovementCreateDto, balance: IBalance | null) {
    if (!balance) {
      await this.balanceRepository.create({
        amount: entry.amount,
        user_id: entry.user_id,
      } as IBalance);
    } else {
      balance.amount += entry.amount;
      await this.balanceRepository.update(balance);
    }

    await this.movementRepository.create(entry as IMovement);
  }

  private async outcome(entry: IMovementCreateDto, balance: IBalance | null) {
    if (!balance || balance.amount < entry.amount) {
      throw new ApplicationException('User does not have enough balance');
    } else {
      balance.amount -= entry.amount;
      await this.balanceRepository.update(balance);
    }

    await this.movementRepository.create(entry as IMovement);
  }
}
