cd /usr/app
ls
yarn sequelize db:create
yarn sequelize db:migrate
yarn sequelize db:seed:all
yarn dev
