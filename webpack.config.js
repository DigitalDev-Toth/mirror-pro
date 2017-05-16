switch (process.env.BUNDLE_TASK) {
  case 'dll':
    module.exports = require('./config/webpack.dll');
    break;
  case 'wds':
    module.exports = require('./config/webpack.wds');
    break;
  case 'test':
    module.exports = require('./config/webpack.test');
    break;
  case 'prod':
    module.exports = require('./config/webpack.prod');
    break;
  case 'dev':
  default:
    module.exports = require('./config/webpack.dev');
}
