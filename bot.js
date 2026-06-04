const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => res.end('Bot actif!')).listen(3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'survivalwordforfun.aternos.me',
    port: 25565,
    username: 'garfield',
    version: '1.21.1'
  });

  bot.on('spawn', () => {
    console.log('Bot connecté !');
    bot.chat('Salut tout le monde !');
    startAntiAFK();
  });

  function startAntiAFK() {
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
      bot.look(Math.random() * Math.PI * 2, 0, false);
      console.log('Anti-AFK actif...');
    }, 30000);
  }

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message === '!bonjour') bot.chat(`Bonjour ${username} !`);
    if (message === '!pos') {
      const { x, y, z } = bot.entity.position;
      bot.chat(`X:${Math.floor(x)} Y:${Math.floor(y)} Z:${Math.floor(z)}`);
    }
  });

  bot.on('error', err => console.log('Erreur:', err));
  bot.on('end', () => {
    console.log('Déconnecté, reconnexion dans 5s...');
    setTimeout(createBot, 5000);
  });
}

createBot();
