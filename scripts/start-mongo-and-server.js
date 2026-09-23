const { spawn, execSync } = require('child_process');
const fs = require('fs');
const net = require('net');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const dbPath = path.join(projectRoot, 'mongodb-data');
const logPath = path.join(dbPath, 'mongod.log');

fs.mkdirSync(dbPath, { recursive: true });

function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(900);
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.once('error', () => {
      resolve(false);
    });
    socket.connect(port, '127.0.0.1');
  });
}

async function waitForPort(port, timeoutMs = 20000) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    if (await isPortOpen(port)) {
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  return false;
}

function findMongoBin() {
  try {
    const output = execSync('where mongod', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    const candidate = output
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find(Boolean);

    if (candidate) {
      return candidate;
    }
  } catch {
    // ignore and try common default install locations
  }

  const candidates = [
    'C:/Program Files/MongoDB/Server/8.3/bin/mongod.exe',
    'C:/Program Files/MongoDB/Server/7.0/bin/mongod.exe',
    'C:/Program Files/MongoDB/Server/6.0/bin/mongod.exe',
  ];

  const found = candidates.find((item) => fs.existsSync(item));
  if (!found) {
    throw new Error('MongoDB binary not found. Install MongoDB or add it to PATH.');
  }

  return found;
}

async function startMongoIfNeeded() {
  if (await isPortOpen(27017)) {
    console.log('MongoDB is already running on localhost:27017');
    return;
  }

  const mongoBin = findMongoBin();
  console.log('Starting local MongoDB...');

  const child = spawn(mongoBin, [
    '--dbpath', dbPath,
    '--logpath', logPath,
    '--bind_ip', '127.0.0.1',
    '--port', '27017',
  ], {
    detached: true,
    stdio: 'ignore',
  });

  child.unref();

  const ready = await waitForPort(27017, 20000);
  if (!ready) {
    throw new Error(`MongoDB did not start correctly. Check log: ${logPath}`);
  }

  console.log('MongoDB started successfully.');
}

async function main() {
  await startMongoIfNeeded();

  console.log('Starting backend...');
  const child = spawn(process.execPath, ['server/server.js'], {
    cwd: projectRoot,
    stdio: 'inherit',
  });

  child.on('exit', (code) => {
    process.exit(code ?? 0);
  });

  child.on('error', (error) => {
    console.error('Failed to start backend:', error);
    process.exit(1);
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
