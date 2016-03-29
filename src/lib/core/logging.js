/**
 * Logging and notification handler
 *
 * @author      Daniel J Griffiths <dgriffiths@section214.com>
 * @license     GPL-2.0
 * @since       0.0.1
 */


'use strict';


/**
 * Logging class
 *
 * @since       0.0.1
 */
class logger {


    /**
     * Get things started!
     *
     * @since       0.0.1
     * @access      public
     * @return      {void}
     */
    constructor() {
        let fs      = require('fs');
        let path    = require('path');
        let winston = require('winston');
        let moment  = require('moment');
        let utils   = require(path.join(GLOBAL.sncpath + '/lib/core/utils.js'));

        // Ensure the log directory exists
        if(! utils.fileExists(path.join(GLOBAL.sncpath + '/../logs'), true)) {
            fs.mkdirSync(path.join(GLOBAL.sncpath + '/../logs'));
        }

        // Setup the transport for console (notification) logging
        this._c = new winston.Logger({
            transports: [
                new winston.transports.Console({
                    colorize: true
                })
            ]
        });


        // Setup the transport for file logging
        this._l = new winston.Logger({
            transports: [
                new winston.transports.Console({
                    colorize: true,
                }),
                new winston.transports.File({
                    filename: 'logs/' + moment().format('YYYY-MM-DD') + '.log',
                    json: false,
                    maxsize: 102400000
                })
            ]
        });

        // Setup the transport for debug logging
        this._d = new winston.Logger({
            transports: [
                new winston.transports.File({
                    filename: 'logs/debug-' + moment().format('YYYY-MM-DD') + '.log',
                    json: false,
                    maxsize: 102400000
                })
            ]
        });

        // Error handler
        process.on('uncaughtException', (err) => {
            this._c.log('error', err.message);
            this._d.log('error', err);

            setTimeout(function() {
                process.exit(1);
            }, 300);
        });

        process.on('unhandledRejection', (err) => {
            this._c.log('error', err.message);
            this._d.log('error', err);

            setTimeout(function() {
                process.exit(1);
            }, 300);
        });
    }


    /**
     * Process a console notification
     *
     * @since       0.0.1
     * @access      public
     * @param       {string} type - The type of notification to output
     * @param       {string} message - The message to display
     * @return      {void}
     */
    notify(type, message){
        this._c.log(type, message);
    }


    /**
     * Process a logged notification
     *
     * @since       0.0.1
     * @access      public
     * @param       {string} type - The type of notification to output
     * @param       {string} message - The message to display
     * @return      {void}
     */
    log(type, message) {
        this._l.log(type, message);
    }
}

module.exports = new logger();
