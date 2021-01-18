import { IBalanceRepository } from './repositories/balance.repository';
import { IBalance } from './repositories/domain/balance';

export class BalanceService {
  constructor(private readonly balanceRepository: IBalanceRepository) {}

  public async findAll(): Promise<IBalance[]> {
    return await this.balanceRepository.findAll();
  }

  public async findOne(id: number): Promise<IBalance | null> {
    return await this.balanceRepository.findOne(id);
  }
}
