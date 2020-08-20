module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'positions',
      [
        {
          position: 'Developer',
          level: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
