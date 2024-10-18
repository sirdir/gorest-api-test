import { apiClient } from '../utils';
import { createPost } from '../utils';
import { createUser } from '../utils';

describe('/posts CRUD Operations', () => {
  let userPost: any;
  let userId: number;
  let id: number;

  beforeAll(async () => {
    const response = await apiClient.post('/users', createUser()).expect(201);
    userId = response.body.id;
    userPost = createPost(userId);
  });

  afterAll(async () => {
    if (userId !== undefined) {
      await apiClient.delete(`/users/${userId}`).expect(204);
    }
  });

  it('should create a new post', async () => {
    await apiClient
      .post('/posts', userPost)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toMatchObject(userPost);
        id = response.body.id;
      });
  });

  it('should retrieve post details', async () => {
    await apiClient
      .get(`/posts/${id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual({ ...userPost, id });
      });
  });

  it('should update the post details', async () => {
    const updatedPost = createPost(userPost.user_id);

    await apiClient
      .put(`/posts/${id}`, updatedPost)
      .expect(200)
      .then((response) => expect(response.body).toStrictEqual({ ...userPost, ...updatedPost, id }));
  });

  it('should delete the post', async () => {
    await apiClient.delete(`/posts/${id}`).expect(204);
  });
});
