import { apiClient } from '../utils/apiClient';

describe('GoRest User CRUD Operations', () => {
  const userData = {
    name: 'John Doe',
    email: `john.doe${Math.random() * 1_000_000}@mail.com`,
    gender: 'male',
    status: 'active',
  };
  let id: number;

  it('should create a new user', async () => {
    await apiClient
      .post('/users', userData)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toMatchObject(userData);
        id = response.body.id;
      });
  });

  it('should retrieve user details', async () => {
    await apiClient
      .get(`/users/${id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual({ ...userData, id });
      });
  });

  it('should update the user details', async () => {
    const updatedData = {
      name: 'John Doe Updated',
      status: 'inactive',
    };

    await apiClient
      .put(`/users/${id}`, updatedData)
      .expect(200)
      .then((response) => expect(response.body).toStrictEqual({ ...userData, ...updatedData, id }));
  });

  it('should delete the user', async () => {
    await apiClient.delete(`/users/${id}`).expect(204);
  });
});
