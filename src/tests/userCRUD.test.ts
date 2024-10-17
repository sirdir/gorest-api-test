import { apiClient } from '../utils';
import { createUser } from '../utils';

describe('GoRest User CRUD Operations', () => {
  const userData = createUser({ status: 'active' });
  let id: number;
  console.log(userData);

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
    const updatedData = createUser({ status: 'inactive' });

    await apiClient
      .put(`/users/${id}`, updatedData)
      .expect(200)
      .then((response) => expect(response.body).toStrictEqual({ ...userData, ...updatedData, id }));
  });

  it('should delete the user', async () => {
    await apiClient.delete(`/users/${id}`).expect(204);
  });
});
