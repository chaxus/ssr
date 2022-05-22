bin=./node_modules/.bin
$bin/webpack --mode production &&
$bin/cross-env NODE_ENV=production $bin/nodemon ./app/index.ts