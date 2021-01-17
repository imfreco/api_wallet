import express from 'express';
import { scopePerRequest } from 'awilix-express';
import { asClass, createContainer } from 'awilix';
import { TestService } from './services/test.service';
import { SubscriptionRepositoryMySQL } from './services/repositories/impl/mysql/subscription.repository';

export default (app: express.Application) => {
  const container = createContainer({ injectionMode: 'CLASSIC' });

  container.register({
    subscriptionRepository: asClass(SubscriptionRepositoryMySQL).scoped(),

    testService: asClass(TestService).scoped(),
  });

  app.use(scopePerRequest(container));
};
