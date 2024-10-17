import { faker } from '@faker-js/faker';

export const createUser = (options: { name?: string; email?: string; gender?: string; status?: string } = {}) => {
  return {
    name: options.name ?? faker.internet.userName(),
    email: options.email ?? faker.internet.email(),
    gender: options.gender ?? faker.person.sex(),
    status: options.status ?? faker.helpers.arrayElement(['active', 'inactive']),
  };
};
