module.exports = {
  dialect: 'postgres',
  host: 'intranet_postgres',
  username: 'postgres',
  password: 'docker',
  database: 'Intranet',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
