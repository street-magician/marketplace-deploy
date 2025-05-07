const request = require('supertest');
const app = require('../index'); // This should now work since you're using CommonJS
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.listing.deleteMany(); // delete child table first
  await prisma.user.deleteMany();    // then parent table
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Auth endpoints', () => {
  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'secret123' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('userId');
  });

  it('should log in the user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'secret123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
