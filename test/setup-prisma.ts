jest.mock("../src/db", () => {
  return {
    db: jestPrisma.client,
  };
});
