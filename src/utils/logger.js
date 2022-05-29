const chalk = require('chalk');

class Logger{
    
    constructor(prefix){
        this.logger = console.log;
        this.prefix = prefix;
    }

    /**
     * @param {string} level 
     * @param {string} message 
     */
    log(level = 'log', message){
        switch(level){
            case 'log':
                this.logger(chalk.white(this.prefix, '[log]', message));
                break;
            case 'info':
                this.logger(chalk.blue(this.prefix, '[info]', message));
                break;
            case 'success':
                this.logger(chalk.green(this.prefix, '[success]', message));
                break;
            case 'error':
                this.logger(chalk.red(this.prefix, '[error]', message));
                break;
            case 'warning':
                this.logger(chalk.orange(this.prefix, '[warning]', message));
                break;
            default:
                this.logger(message);
        }
    }
}
const logger = new Logger('api');

module.exports = logger;