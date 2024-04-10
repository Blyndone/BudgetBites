//users.test.js

const request = require('supertest');
const app = require('.././server.js');

const mysql = require('mysql2');

jest.mock('mysql2', () => ({
  createConnection: () => ({
    connect: () => undefined,
    query: mockQuery,
  }),
}));
test('returns a list of users', async () => {
  const response = await request(app).get('/testusers');
  expect(response.status).toBe(200);
  expect(response.body).toEqual([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);
});
