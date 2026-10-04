// scripts/dev.js - Dev server runner handling Next.js arguments safely
const { spawn } = require('child_process');

// Parse command line arguments and ensure compatibility with Next.js 15
const rawArgs = process.argv.slice(2);
let port = '3000';
let host = '0.0.0.0';

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '--port' || arg === '-p') {
    if (rawArgs[i + 1]) {
      port = rawArgs[++i];
    }
  } else if (arg === '--host' || arg === '--hostname' || arg === '-H') {
    if (rawArgs[i + 1]) {
      host = rawArgs[++i];
    }
  }
}

console.log(`Starting Next.js Dev Server on ${host}:${port}...`);

const nextBin = require.resolve('next/dist/bin/next');
const child = spawn(
  process.execPath,
  [nextBin, 'dev', '-p', port, '-H', host],
  {
    stdio: 'inherit',
    env: { ...process.env, PORT: port }
  }
);

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code || 0);
  }
});
