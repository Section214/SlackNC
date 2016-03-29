/**
 * Utilities
 *
 * @author      Daniel J Griffiths <dgriffiths@section214.com>
 * @license     GPL-2.0
 * @since       0.0.1
 */


'use strict';


/**
 * Check if a file exists
 *
 * @since       0.0.1
 * @param       {string} filepath The path to check
 * @param       {bool} isdir True to treat as directory
 * @return      {bool} exists True if exists, false otherwise
 */
function fileExists(filepath, isdir) {
    let fs     = require('fs');
    let exists = false;

    if(filepath) {
        if(isdir) {
            try {
                exists = fs.statSync(filepath).isDirectory();
            } catch (e) {}
        } else {
            try {
                exists = fs.statSync(filepath).isFile();
            } catch (e) {}
        }
    }

    return exists;
}


module.exports = {
    fileExists:      fileExists
};
