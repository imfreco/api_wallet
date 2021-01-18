import express from 'express';
import { scopePerRequest } from 'awilix-express';
import { asClass, createContainer } from 'awilix';
// import { SubscriptionRepositoryMySQL } from './services/repositories/impl/mysql/subscription.repository';
// import { MovementRepositoryMySQL } from './services/repositories/impl/mysql/movement.repository';
// import { BalanceRepositoryMySQL } from './services/repositories/impl/mysql/balance.repository';
import { SubscriptionService } from './services/subscription.service';
import { MovementService } from './services/movement.service';
import { SubscriptionRepositoryPostgreSQL } from './services/repositories/impl/postgresql/subscription.repository';
import { MovementRepositoryPostgreSQL } from './services/repositories/impl/postgresql/movement.repository';
import { BalanceRepositoryPostgreSQL } from './services/repositories/impl/postgresql/balance.repository';
import { BalanceService } from './services/balance.service';

export default (app: express.Application) => {
  const container = createContainer({ injectionMode: 'CLASSIC' });

  container.register({
    subscriptionRepository: asClass(SubscriptionRepositoryPostgreSQL).scoped(),
    movementRepository: asClass(MovementRepositoryPostgreSQL).scoped(),
    balanceRepository: asClass(BalanceRepositoryPostgreSQL).scoped(),
    // subscriptionRepository: asClass(SubscriptionRepositoryMySQL).scoped(),
    // movementRepository: asClass(MovementRepositoryMySQL).scoped(),
    // balanceRepository: asClass(BalanceRepositoryMySQL).scoped(),

    subscriptionService: asClass(SubscriptionService).scoped(),
    movementService: asClass(MovementService).scoped(),
    balanceService: asClass(BalanceService).scoped(),
  });

  app.use(scopePerRequest(container));
};
