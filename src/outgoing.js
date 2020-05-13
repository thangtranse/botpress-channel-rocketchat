const handlePromise = (event, next, promise) => {
  return promise
    .then(res => {
      //console.log('WE ARE GOING NEXT PROMISE')
      next();
      event._resolve && event._resolve();
      return res;
    })
    .catch(err => {
      console.log("THERE WAS AN ERROR");
      next(err);
      event._reject && event._reject(err);
      throw err;
    });
};

const handleText = (event, next, rocketchat) => {
  if (event.platform !== "rocketchat" || event.type !== "text") {
    return next();
  }
  //console.log("HANDLE TEXT")
  const text = event.text;
  console.log("HANDLE TEXT", text)

  const options = {};

  return handlePromise(event, next, rocketchat.sendMessage(text, options, event));
};

const handleAttachments = (event, next, rocketchat) => {
  if (event.platform !== "rocketchat" || event.type !== "attachments") {
    return next();
  }

  //console.log("HANDLE TEXT")
  const msg = {
    attachments: event.raw.attachments || []
  }
  const options = {};

  return handlePromise(event, next, rocketchat.sendMessage(msg, options, event));
};

module.exports = {
  text: handleText,
  attachments: handleAttachments
};
