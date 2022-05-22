
bin=./node_modules/.bin
$bin/webpack --mode development &&
$bin/cross-env NODE_ENV=development $bin/nodemon ./app/index.ts

