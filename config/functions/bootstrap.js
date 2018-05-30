'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */
//
// module.exports = cb => {
//   cb();
// };
//
module.exports = cb => {
  var io = require('socket.io')(strapi.server);
  // var users = [];
  io.on('connection',  function (socket) {
    socket.emit('hello', JSON.stringify({message: 'Hello World'}));
    // socket.user_id = (Math.random() * 100000000000000); // not so secure
    // users.push(socket); // save the socket to use it later
    socket.on('disconnect', () => {
      console.log('exittttttttttttttttttttttttttttttttt')

      // on DISCONNECT remove viewing
      var disconnectUrl = socket.handshake.headers.referer
      if(disconnectUrl.includes("wallets")){
        // get walletid
        var id = disconnectUrl.split("/").pop()
        // emit disconnect
        io.sockets.emit('wallet_view',[id,  "false"]);
        // set db
        return strapi.services.productview.edit({'viewingid':id}, {"viewing":false});
      }

      // users.forEach((user, i) => {
      //   // delete saved user when they disconnect
      //   if(user.user_id === socket.user_id) users.splice(i, 1);
      // });
    });
  });
  strapi.io = io;
  // send to all users connected
  strapi.emitToAllUsers = view => io.emit('wallet_view', view);
  cb();
};
