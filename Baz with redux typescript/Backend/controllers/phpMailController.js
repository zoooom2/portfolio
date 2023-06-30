const { spawn } = require('child_process');

exports.sendContact = (req, res) => {
  const process = spawn('php', [
    process.env.PHP_PATH,
    req.query.name,
    req.query.message,
    req.query.email,
  ]);

  process.stdout.on('data', (data) => {
    // console.log(`data received from php script :: ${data.toString()}`);
    res.json({ data: data.toString() });
  });
};
