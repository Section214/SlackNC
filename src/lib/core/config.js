/**
 * Handles working with configuration files
 *
 * @author      Daniel J Griffiths <dgriffiths@section214.com>
 * @license     GPL-2.0
 * @since       0.0.1
 */

'use strict';

const path         = require('path');
const nconf        = require('nconf');
const logger       = require(path.join(GLOBAL.sncpath + '/lib/core/logging.js'));
const core_configs = path.join(GLOBAL.sncpath, '../config/');

// Define the available config files
const configs = {
    'colors':  core_configs + 'colors.json',
    'config':  core_configs + 'config.json',
    'servers': core_configs + 'servers.json'
};


/**
 * Config class
 *
 * @since       0.0.1
 */
class config {


    /**
     * Get things started!
     *
     * @since       0.0.1
     * @access      public
     * @return      {void}
     */
    constructor() {
        Object.keys(configs).forEach(function(key) {
            GLOBAL.sncconfigs[key] = new nconf.Provider();
            GLOBAL.sncconfigs[key].file(key, {
                file: configs[key]
            });
        });
    }


    /**
     * Get a config value with an optional fallback
     *
     * @since       0.0.1
     * @access      public
     * @param       {string} key - The key to retrieve
     * @param       {*} fallback - An optional fallback value
     * @return      {*} val - The value of the retrieved key
     */
    get(store, key, fallback) {
        let val = GLOBAL.sncconfigs[store].get(key);

        if(! val) {
            val = fallback;
        }

        return val;
    }


    /**
     * Set (or update) a config value
     *
     * @since       0.0.1
     * @access      public
     * @param       {string} key - The key to set
     * @param       {*} value - The value to set
     * @return      {bool} True if set succeeded, false otherwise
     */
    set(store, key, value) {
        return GLOBAL.sncconfigs[store].set(key, value);
    }


    /**
     * Reloads the config file
     *
     * @since       0.0.1
     * @access      public
     * @param       {bool} save - Whether or not to save before reloading
     * @return      {bool} True if reload succeeded, false otherwise
     */
    reload(store, save) {
        if(save) {
            this.save(store);
        }

        return nconf.reset();
    }


    /**
     * Saves a config file to disk
     *
     * @since       0.0.1
     * @access      public
     * @param       string handle The handle of a specific config file to save
     * @return      {void}
     */
    save(handle) {
        if(handle) {
            if(configs.hasOwnProperty(handle)) {
                GLOBAL.sncconfigs[handle].save();
                logger.notify('info', 'Configuration saved successfully.');
            } else {
                logger.log('error', 'Config file ' + configs[handle] + ' not found!');
                return;
            }
        } else {
            logger.log('silly', 'No config file specified!');
            return;
        }
    }


    /**
     * Saves ALL config files... you probably don't want this!
     * This function ONLY exists for doing a sanity check when SlackNC quits
     *
     * @since       0.0.1
     * @access      public
     * @return      {void}
     */
    save_all() {
        Object.keys(configs).forEach(function(key) {
            this.save(key);
        });
    }
}

module.exports = new config();
