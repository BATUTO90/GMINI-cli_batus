document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.querySelector('.terminal-output');

    // Sample commands and responses
    const commands = {
        'help': 'Available commands: help, clear, dev [prompt], debug [code], solve [problem], about, date',
        'clear': () => {
            terminalOutput.innerHTML = '';
            return '';
        },
        'dev': (prompt) => `DEV AGENT: Analyzing "${prompt}"...\n> Generating optimized code solution...\n> Code generation complete!`,
        'debug': (code) => `DEBUG AGENT: Scanning code for errors...\n> Found 3 potential issues\n> Suggested fixes generated`,
        'solve': (problem) => `SOLUTION AGENT: Finding solution for "${problem}"...\n> Analyzing problem space...\n> Optimal solution identified!`,
        'about': 'Gemini AI Terminal v1.0 - Interactive AI-powered command interface',
        'date': () => `Current date: ${new Date().toLocaleString()}`,
        'echo': (text) => text,
        'status': 'System Status: All agents online\nNetwork: Stable\nAPI: Connected'
    };

    // Command history
    let commandHistory = [];
    let historyIndex = -1;

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const inputText = terminalInput.value.trim();
            terminalInput.value = '';
            historyIndex = -1;

            if (inputText) {
                // Add to command history
                commandHistory.push(inputText);
                if (commandHistory.length > 50) commandHistory.shift();

                // Add user input to terminal
                addTerminalLine(inputText, 'user');

                // Process command
                const response = processCommand(inputText);

                if (response) {
                    addTerminalLine(response, 'system');
                }

                // Scroll to bottom
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                }
                terminalInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
            } else {
                historyIndex = -1;
                terminalInput.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const inputText = terminalInput.value.trim();
            const matches = Object.keys(commands).filter(cmd => 
                cmd.startsWith(inputText.split(' ')[0])
            );
            if (matches.length === 1) {
                terminalInput.value = matches[0] + ' ';
            }
        }
    });

    function processCommand(input) {
        const [command, ...args] = input.split(' ');
        const argsText = args.join(' ');
        
        if (commands[command.toLowerCase()]) {
            if (typeof commands[command.toLowerCase()] === 'function') {
                return commands[command.toLowerCase()](argsText);
            }
            return commands[command.toLowerCase()];
        }
        
        return `Command not found: ${command}. Type 'help' for available commands.`;
    }

    function addTerminalLine(text, type = 'system') {
        const lineElement = document.createElement('div');
        lineElement.className = `command-line ${type === 'user' ? 'text-gray-300' : 'text-white'}`;
        
        if (type === 'system') {
            // Preserve line breaks in system responses
            lineElement.innerHTML = text.split('\n').map(line => 
                line ? `> ${line}` : '<br>'
            ).join('\n');
        } else {
            lineElement.textContent = text;
        }
        
        terminalOutput.appendChild(lineElement);
    }

    // Focus on terminal input
    terminalInput.focus();

    // Add click handlers for agent cards
    document.querySelectorAll('.agent-card').forEach(card => {
        card.addEventListener('click', () => {
            const agentName = card.querySelector('h3').textContent;
            let command = '';
            
            switch(agentName) {
                case 'Dev Agent':
                    command = 'dev [your code request]';
                    break;
                case 'Debug Agent':
                    command = 'debug [your code]';
                    break;
                case 'Solution Agent':
                    command = 'solve [your problem]';
                    break;
            }
            
            terminalInput.value = command;
            terminalInput.focus();
            terminalInput.setSelectionRange(5, command.length - 1);
        });
    });
});
