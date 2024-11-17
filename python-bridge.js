const { spawn } = require('child_process');

const callPythonAI = (context, question) => {
    return new Promise((resolve, reject) => {
        const python = spawn('python3', ['ai/scripts/solve_question.py']);
        const input = JSON.stringify({ context, question });

        let result = '';
        python.stdin.write(input);
        python.stdin.end();

        python.stdout.on('data', (data) => {
            result += data.toString();
        });

        python.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
            reject(data.toString());
        });

        python.on('close', () => {
            try {
                resolve(JSON.parse(result));
            } catch (err) {
                reject(`Failed to parse Python output: ${result}`);
            }
        });
    });
};

module.exports = { callPythonAI };