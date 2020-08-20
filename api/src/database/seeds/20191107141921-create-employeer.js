module.exports = {
  up: (QueryInterface) => {
    return QueryInterface.bulkInsert(
      'employeers',
      [
        {
          corporate_name: 'Intranet',
          fantasy_name: 'Intranet Tech',
          address: 'Alfredo da Costa Figo, 736',
          email: 'intranet@intranet.com.br',
          zipcode: '13145820',
          cnpj: '12345678910111',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
