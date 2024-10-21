// jest.config.ts
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/tests/**/*.test.ts'],  // Sesuaikan dengan struktur direktori Anda
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
  