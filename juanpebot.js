/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
          \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
           \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Reply to messages
* Use the conversation system to ask questions
* Use the built in storage system to store and retrieve information
  for a user.

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    token=<MY TOKEN> node bot.js

# USE THE BOT:

  Find your bot inside Slack to send it a direct message.

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "who are you?"

  The bot will tell you its name, where it running, and for how long.

  Say: "Call me <nickname>"

  Tell the bot your nickname. Now you are friends.

  Say: "who am I?"

  The bot will tell you your nickname, if it knows one for you.

  Say: "shutdown"

  The bot will ask if you are sure, and then shut itself down.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit is has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


var Botkit = require('./lib/Botkit.js')
var os = require('os');

var controller = Botkit.slackbot({
  debug: false,
});

var bot = controller.spawn(
  {
    token:process.env.token
  }
).startRTM();

controller.hears(['hello','hi', 'hola', 'buenas', 'saludos', 'buenos dias'],'direct_message,direct_mention,mention',function(bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'juanpe',
    },function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(',err);
        }
    });


    controller.storage.users.get(message.user,function(err, user) {
        if (user && user.name) {
            bot.reply(message, user.name + ' eres un momias!!');
        } else {
            bot.reply(message,'que dices momias?.');
        }
    });
});


controller.hears(['slack', 'Slack', 'chats'], 'direct_message,direct_mention,ambient', function(bot, message){
    bot.reply(message,'yo paso de slack *atómicamente*');
});

controller.hears(['aquaponic', 'arduino', 'raspberry', 'sensor', 'plantas'], 'direct_message,direct_mention,ambient', function(bot, message){
    bot.reply(message,'yo estoy de un frikismo bruto bruto');
});

controller.hears(['Juanma', 'juanma', 'juan ma', 'dominio', 'bitcoin'], 'direct_message,direct_mention,ambient', function(bot, message){
    bot.reply(message,'Juanma es el hombre dominios y bitcoins...esas son sus debilidades');
});

controller.hears(['e?s[kq](ui|y)pe'], 'direct_message,direct_mention,ambient', function(bot, message){
   // start a conversation to handle this response.
   bot.startConversation(message,function(err,convo) {
      convo.ask("Cabroooooooones", function(response, convo) {
          convo.say("me teneis abandonado");
	  convo.next();
      })
  }) 
});

controller.hears(['hab(e|é)is visto', 'os parece', ], 'direct_message,direct_mention,ambient', function(bot, message){
    bot.reply(message,'Diossssssssssss esta guapísimo!!');
});


controller.hears(['PP', 'pp', 'corruptos', 'no pago', ], 'direct_message,direct_mention,ambient', function(bot, message){
    bot.reply(message,'Que cojones');
});

controller.hears(['fiesta', 'party', 'cerveza', 'pelotazo', ], 'direct_message,direct_mention,ambient', function(bot, message){
    bot.reply(message,'Eiihhh se anima esto!');
});

controller.hears(['meme', 'giphy', 'gif', ], 'direct_message,direct_mention,ambient', function(bot, message){
    bot.reply(message,'Esto no pasaría en skype');
});

controller.hears(['chiste', 'gracia', 'me parto', 'risa', ], 'direct_message,direct_mention,ambient', function(bot, message){
    setTimeout(function(){ 
        bot.reply(message,'jajaja');
    }, 1000);
});

controller.hears(['nazi', '[A|a]dolf', '[H|h]itler'], 'ambient', function(bot, message){
    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'digital-nazi',
    },function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(',err);
        }
    });
});

controller.hears(['momi'], 'ambient', function(bot, message){
    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'juanpe',
    },function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(',err);
        }
    });
});

