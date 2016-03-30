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
            dockBorders: true,
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
        let channelBar = blessed.box({
            width: '0%+25',
            height: '100%',
            left: '0',
            border: {
                type: 'line'
            },
            style: {
                bg: config.get('colors', 'channelBar:bg', '#000000'),
                fg: config.get('colors', 'channelBar:fg', '#ffffff'),
                border: {
                    fg: config.get('colors', 'frameBorders', '#ffffff')
                }
            }
        });
        let chatWindow = blessed.box({
            width: '100%-25',
            height: '100%',
            top: '0',
            right: '0',
            border: {
                type: 'line'
            },
            style: {
                bg: config.get('colors', 'chatWindow:bg', '#000000'),
                fg: config.get('colors', 'chatWindow:fg', '#ffffff'),
                border: {
                    fg: config.get('colors', 'frameBorders', '#ffffff')
                }
            }
        });
        let chatBox = blessed.box({
            width: '100%-25',
            height: '0%+3',
            top: '100%-3',
            right: '0',
            border: {
                type: 'line'
            },
            style: {
                bg: config.get('colors', 'chatBox:bg', '#000000'),
                fg: config.get('colors', 'chatBox:fg', '#ffffff'),
                border: {
                    fg: config.get('colors', 'frameBorders', '#ffffff')
                }
            }
        });

        titleBar.setContent('{center}SlackNC v' + GLOBAL.sncversion + '{/center}');
        teamBar.setContent('*[0] Console');

        mainWindow.append(channelBar);
        mainWindow.append(chatWindow);
        mainWindow.append(chatBox);
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
