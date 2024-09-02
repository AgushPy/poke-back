
// Definir un tipo genérico para el mock del repositorio
export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}> | any; // 'any' permite propiedades no mockeadas como 'target'
};