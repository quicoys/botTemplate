const mineflayer = require('mineflayer');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const greetings = ['Hello', 'Hi', 'Yo', 'Wazzup', 'Howdy', 'Hola'];

console.log('-----------------------------------------');
console.log('-             quicbot systems           -');
console.log('-----------------------------------------');

const botArgs = {
    host: '5b5t.org', // server
    username: '',  //email
    password: '',  //password  
    auth: 'microsoft',  //authentication 
    version: '1.12.2'
};

const initBot = () => {
    let bot = mineflayer.createBot(botArgs);

    const prefix = '!';
    const adminPrefix = '$';

    bot.once('spawn', () => {
        bot.chat(`${bot.username} joined!`);
    });

    bot.on('login', () => {
        let botSocket = bot._client.socket;
        console.log(`Logged in to ${botSocket.server ? botSocket.server : botSocket._host}`);
    });

    bot.on('end', (reason) => {
        let botSocket = bot._client.socket;
        console.log(`[${bot.username}] Disconnected from ${botSocket.server || botSocket._host} reason ${reason}`);
        setTimeout(theBot, 5000);
    });

    bot.on('chat', async (username, message) => {
        console.log(`<${username}> ${message}`);
        if (username === bot.username) return;
        if (username === 'enter' || username === 'adminuser' && message.startsWith(adminPrefix)) {
            console.log(`admincommand executed ${message} `);
            const msg = message.slice(1);
            const args = msg.split(' ');
            if (args[0].toLowerCase().startsWith('coord') || args[0].toLowerCase().startsWith('pos')) {
                const position = bot.entity.position;
                const roundedPosition = {
                    x: parseFloat(position.x.toFixed(2)),
                    y: parseFloat(position.y.toFixed(2)),
                    z: parseFloat(position.z.toFixed(2))
                };
                console.log(`x ${roundedPosition.x}, y ${roundedPosition.y}, z ${roundedPosition.z}`); // sends coords to console
                bot.chat(`/msg ${username} x ${roundedPosition.x}, y ${roundedPosition.y}, z ${roundedPosition.z}`); // whispers the bot's current coords to the admin user 
            }
        }
    });

    bot.on('kicked', (reason) => {
        let botSocket = bot._client.socket;
        console.log(`[${bot.username}] Kicked from ${botSocket.server || botSocket._host} reason ${reason}`);
    });

    bot.on('spawn', async () => {
        console.log(`Spawned`);
    });

    bot.on('death', () => {
        console.log(`Died`);
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log(`Failed to connect to ${err.address}:${err.port}`);
        } else {
            console.log(`Unhandled error ${err}`);
        }
    });
};

const theBot = () => {
    if (jsonMsg.startsWith(prefix)) {
        const msg = jsonMsg.slice(1);
        const args = msg.split(' ');

        if (!args[0]) return;

        if (args[0].toLowerCase().startsWith('ping')) {
            if (args.length < 2) {
                bot.chat(`${username}'s ping is ${bot.players[username].ping}`);
            }

            if (args.length >= 2) {
                if (args[1] === '') {
                    bot.chat(`${username}'s ping is ${bot.players[username].ping}`);
                }
                if (args[1] in bot.players) {
                    bot.chat(`${args[1]}'s ping is ${bot.players[args[1]].ping}ms`);
                } else {
                    bot.chat(`${args[1]} is not online!`);
                }
            }
        }

        // Coords
        if (args[0].toLowerCase() === 'coords') {
            let min = -30000000;
            let max = 30000000;

            bot.chat(`Coords x ${Math.floor(Math.random() * (1 + max - min)) + min} z ${Math.floor(Math.random() * (1 + max - min)) + min}`);
        }

        // Dox or Doxx
        if (args[0].toLowerCase() === 'dox') {
            let min = 0;
            let max = 255;

            if (!args[0]) {
                bot.chat(`${username}'s ip ${Math.floor(Math.random() * (1 + max - min)) + min}.${Math.floor(Math.random() * (1 + max - min)) + min}.${Math.floor(Math.random() * (1 + max - min)) + min}.${Math.floor(Math.random() * (1 + max - min)) + min} ez!`);
            } else if (args[1]) {
                bot.chat(`${args[1]}'s ip ${Math.floor(Math.random() * (1 + max - min)) + min}.${Math.floor(Math.random() * (1 + max - min)) + min}.${Math.floor(Math.random() * (1 + max - min)) + min}.${Math.floor(Math.random() * (1 + max - min)) + min} ez!`);
            }
        }

        if (args[0].toLowerCase() === 'no') {
            bot.chat('NO');
        }

        if (args[0].toLowerCase() === 'yes') {
            bot.chat('YES');
        }

        if (args[0].toLowerCase() === 'hello') {
            bot.chat(greetings[getRandomInt(greetings.length)] + `, ${username} !`);
        }

        if (args[0].toLowerCase().startsWith('gay')) {
            let min = 0;
            let max = 100;

            if (!args[0]) {
                bot.chat(`${username} is ${Math.floor(Math.random() * (1 + max - min)) + min}.${Math.floor(Math.random() * (1 + max - min)) + min}% gay`);
            } else if (args[1]) {
                bot.chat(`${args[1]} is ${Math.floor(Math.random() * (1 + max - min)) + min}.${Math.floor(Math.random() * (1 + max - min)) + min}% gay`);
            }
        }

        if (args[0].toLowerCase() === 'kit') {
            if (!args[0]) {
                bot.chat(`${username} just received the kit called ${args[1]}`);
            }
        }
        bot.on('error', (err) => {
            if (err.code === 'ECONNREFUSED') {
                console.log(`Failed to connect to ${err.address}${err.port}`);
            }
            else {
                console.log(`Unhandled error ${err}`);
            }
    
        });

    }

};

initBot();




        
    



