/**
 * UI handler
 *
 * @author      Daniel J Griffiths <dgriffiths@section214.com>
 * @license     GPL-2.0
 * @since       0.0.1
 */


'use strict';


const config = require(GLOBAL.sncpath + '/lib/core/config.js');


/**
 * UI class
 *
 * @since       0.0.1
 */
class ui {


    /**
     * Get things started!
     *
     * @since       0.0.1
     * @access      public
     * @return      {void}
     */
    constructor() {
        let blessed = require('blessed');

        let screen = blessed.screen({
            smartCSR: true,
            title: 'Slack'
        });
        let container = blessed.box({
            width: '100%',
            height: '100%'
        });
        let titleBar = blessed.box({
            width: '100%',
            height: '0%+1',
            style: {
                bg: config.get('colors', 'titleBar:bg', '#0000ff'),
                fg: config.get('colors', 'titleBar:fg', '#0000ff')
            },
            tags: true
        });
        let mainWindow = blessed.box({
            width: '100%',
            height: '100%-2',
            top: '0%+1',
            style: {
                bg: config.get('colors', 'mainWindow:bg', '#000000')
            }
        });
        let teamBar = blessed.box({
            width: '100%',
            height: '0%+1',
            bottom: '0',
            style: {
                bg: config.get('colors', 'teamBar:bg', '#0000ff'),
                fg: config.get('colors', 'teamBar:fg', '#0000ff')
            }
        });

        titleBar.setContent('{center}SlackNC v' + GLOBAL.sncversion + '{/center}');
        teamBar.setContent('*[0] Console');
        container.append(titleBar);
        container.append(mainWindow);
        container.append(teamBar);
        screen.append(container);
        screen.render();
    }


    /**
     * Define key bindings
     *
     * @since       0.0.1
     * @access      public
     * @param       ch
     * @param       string key Key code
     * @return      {void}
     */
    keyBindings(ch, key) {
        switch(key.full) {
            case 'escape':
                process.exit(0);
                break;
        }
        return;
    }
}

module.exports = {
    ui: new ui(),
    titleBar: ui.titleBar,
    teamBar: ui.teamBar
};
