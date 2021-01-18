const db = {
  balances: [
    {
      id: 1,
      user_id: 1,
      amount: 930,
    },
    {
      id: 2,
      user_id: 2,
      amount: 230,
    },
    {
      id: 3,
      user_id: 3,
      amount: 630,
    },
  ],
  movements: [],
  subscriptions: [],
  _balanceId: 0,
  _movementId: 0,
  _subscriptionId: 0,
};

db._balanceId = db.balances.length;

export default db;
