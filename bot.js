const mineflayer = require('mineflayer');
//const axios = require('axios'); //
const { number } = require('yargs');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getAllArgs(args) {
    return getArgs(args, 1);
}


function getArgs(args, startIndex) {


    output = '';
    for (let index = startIndex; index < args.length; ++index) {
        output += args[index];
        if (index+1 < args.length) output += ' ';
    }
    return output;
}

const greetings = ["Hello", "Hi", "Yo", "Wazzup", "Howdy", "Hola"];


console.log('--------------------------------------------------------------------');
console.log('-                    quicbot systems: bot template.                -');
console.log('--------------------------------------------------------------------');

const botArgs = {
    host: '',
    username: '<EMAIL (if microsoft auth)>',
    password: '',
    auth: '',
    version: '' //blank for auto
};

const initBot = () => {
  let bot = mineflayer.createBot(botArgs);

  const prefix = '!';
  const masterPrefix = '$';
  const admin = 'quicoys' //you can replace "quicoys" with your username

  bot.on('end', (reason) => {
      console.log(`[${bot.username}] Disconnected. Reason: ${reason}`);
      setTimeout(initBot, 5000); //reconnect.
  });

  bot.on('login', () => {
      let botSocket = bot._client.socket;
      console.log(`Logged in to ${botSocket.server ? botSocket.server : botSocket._host}`);
  });

  bot.on('chat', async (username, message) => {
      const currentDate = new Date().toLocaleString();

      const msg = message.slice(1);
      const args = msg.split(' ');
    if (username === admin ) {

        if (args[0].toLowerCase() === 'repeat') {
            if (args[1]) {
                output = getAllArgs(args);
                bot.chat(`> ${output}`);
            }
        }
      }

      if (message.startsWith(prefix)) {
          if (!args[0]) return;


          if (args[0].toLowerCase().startsWith('mindreader')) {
            if (args.length < 2) {
                bot.chat(`this is a super advanced program that can read your mind. Please use ${prefix}mindreader <number 1-10> to experience this advanced application.`)
                return;
            } if (isNaN(args[1]) || Number(args[1]*(-1) <= 0) || Number(args[1]) > 1 || Number(args[1]) < 10) {
                bot.chat(`are you dumb? input a NUMBER, 1-10.`)
                return;
            }
            bot.chat(`Thinking... Analysing... Reasoning... This may take a few seconds.`)

            setTimeout(() => {
                bot.chat(`${username}; was your number ${args[1]}?`)
            }, Math.random() * 1000);
        

         }

          if (args[0].toLowerCase().startsWith('test')) {
            if (args.length < 2) {
                bot.chat('Hey! this is an example command. It can do anything you want!')
                console.log(Math.random())
                console.log('')
                console.log('Online players on:' + botArgs['host'])
                setTimeout(() => {
                    bot.chat(`my admin is: ${admin}, you are ${username}, the time in unix timestamp is: ${Date.now()} and I am: ${bot.username}`)
                }, 2000 + Math.random() * 100); //two seconds + a number from 1 to 0 times 100 (+-50ms)
                for (const userId in bot.players) {
                        console.log(userId);
                }
            } else {
                bot.chat('ooh, arguments! here you can handle what should happen if someone provides more input!')
                setTimeout(() => {
                    if (!isNaN(args[1])) {
                        bot.chat('you provided a number.')
                    }
                }, 2000);
            }
        }
      }
  });

  bot.on('kicked', (reason) => {
      let botSocket = bot._client.socket;
      console.log(`[${bot.username}] Kicked from ${botSocket.server ? botSocket.server : botSocket._host}. Reason: ${reason}`);
  });

  bot.on('spawn', () => {
      console.log(`Spawned`);
  });

  bot.on('death', () => {
      console.log(`Died`);
  });

  bot.on('error', (err) => {
      if (err.code === 'ECONNREFUSED') {
          console.log(`Failed to connect to ${err.address}:${err.port}`);
      } else {
          console.log(`Unhandled error: ${err}`);
      }
  });
};

initBot();
