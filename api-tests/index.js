const dotenv = require('dotenv');
dotenv.config();

const { spawn } = require('child_process');
const kill = require('tree-kill');
const path = require('path');

const { sleep, GenerateTokens } = require("./helpers");

const { Accounts } = require("./test-suits/accounts");
const { Profiles } = require("./test-suits/profiles");
const { TrustChains } = require("./test-suits/trust-chains");


const processes = [];

describe('Tests', async function () {
    before(async function () {
        this.timeout(10000000000);
        const pathArray = [
            [path.resolve(path.join('..', 'logger-service')), {GUARDIAN_ENV: 'develop'}],
            [path.resolve(path.join('..', 'notification-service')), {GUARDIAN_ENV: 'develop'}],
            [path.resolve(path.join('..', 'worker-service')), {IPFS_STORAGE_API_KEY: process.env.IPFS_STORAGE_API_KEY, GUARDIAN_ENV: 'develop'}],
            [path.resolve(path.join('..', 'auth-service')), {
                HASHICORP_ADDRESS: `http://${process.env.HASHICORP_HOST}:${process.env.HASHICORP_PORT}`,
                GUARDIAN_ENV: 'develop',
                ACCESS_TOKEN_UPDATE_INTERVAL: '30000000'
            }],
            [path.resolve(path.join('..', 'policy-service')), {OPERATOR_ID: process.env.OPERATOR_ID, OPERATOR_KEY: process.env.OPERATOR_KEY, GUARDIAN_ENV: 'develop'}],
            [path.resolve(path.join('..', 'guardian-service')), {OPERATOR_ID: process.env.OPERATOR_ID, OPERATOR_KEY: process.env.OPERATOR_KEY, GUARDIAN_ENV: 'develop'}],
            [path.resolve(path.join('..', 'api-gateway')), {GUARDIAN_ENV: 'develop'}]
        ];
        for (let p of pathArray) {
            const prc = spawn('npm start', {
                cwd: p[0],
                shell: true,
                env: Object.assign(process.env, p[1])
            });
            prc.on('error', console.error);
            prc.stdout.on('data', m => console.log(`[${path.parse(p[0]).name}]: ${m}`));
            prc.on('message', m => console.log(`[${p}]: ${m}`));
            processes.push(prc);
            console.info(`"${path.parse(p[0]).name}"`, 'was started');
            await sleep(25000);
        }
        await sleep(25000);
    })

    beforeEach(GenerateTokens);

    Accounts();
    Profiles();
    // Schemas();
    TrustChains();
    // Policies();

    after(async function () {
        for (let proc of processes) {
            kill(proc.pid);
        }
    })
});
