import express from 'express';
import { scopePerRequest } from 'awilix-express';
import { asClass, createContainer } from 'awilix';
import { TestService } from './services/test.service';
import { SubscriptionRepositoryMySQL } from './services/repositories/impl/mysql/subscription.repository';
import { MovementRepositoryMySQL } from './services/repositories/impl/mysql/movement.repository';
import { BalanceRepositoryMySQL } from './services/repositories/impl/mysql/balance.repository';
import { SubscriptionService } from './services/subscription.service';
import { MovementService } from './services/movement.service';

export default (app: express.Application) => {
  const container = createContainer({ injectionMode: 'CLASSIC' });

  container.register({
    subscriptionRepository: asClass(SubscriptionRepositoryMySQL).scoped(),
    movementRepository: asClass(MovementRepositoryMySQL).scoped(),
    balanceRepository: asClass(BalanceRepositoryMySQL).scoped(),

    testService: asClass(TestService).scoped(),
    subscriptionService: asClass(SubscriptionService).scoped(),
    movementService: asClass(MovementService).scoped(),
  });

  app.use(scopePerRequest(container));
};
