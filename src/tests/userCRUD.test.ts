import { apiClient } from '../utils/apiClient';

describe('GoRest User CRUD Operations', () => {
  let userId: number;

  it('should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: `john.doe${Math.random() * 1_000_000}@mail.com`,
      gender: 'male',
      status: 'active',
    };

    const response = await apiClient.post('/users', userData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    userId = response.body.id;
  });

  it('should retrieve user details', async () => {});

  it('should update the user details', async () => {});

  it('should delete the user', async () => {});
});
