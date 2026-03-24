require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PROMPTS_DIR = path.join(__dirname, 'prompts');
const EXPERIMENTS_DIR = path.join(__dirname, '../../07-Experiments');

const readPrompt = (name) => fs.readFileSync(path.join(PROMPTS_DIR, name), 'utf8');

async function callAgent(agentName, promptTemplate, input) {
    console.log(`[${agentName}] Generating documentation...`);
    const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
            { role: "system", content: promptTemplate },
            { role: "user", content: input }
        ]
    });
    return response.choices[0].message.content;
}

async function startDesign(projectName, rawIdea) {
    console.log(`=== Design Factory is starting for project: ${projectName} ===`);
    
    const projectDir = path.join(EXPERIMENTS_DIR, projectName, 'docs');
    fs.mkdirSync(projectDir, { recursive: true });

    // 1. PRD Agent
    const prdPrompt = readPrompt('prd_agent.txt');
    const prdContent = await callAgent('PRD Agent', prdPrompt, rawIdea);
    fs.writeFileSync(path.join(projectDir, 'PRD.md'), prdContent);

    // 2. Architect Agent (uses PRD as input)
    const architectPrompt = readPrompt('architect_agent.txt');
    const contractContent = await callAgent('Architect Agent', architectPrompt, prdContent);
    fs.writeFileSync(path.join(projectDir, 'Contract.md'), contractContent);

    console.log(`\n[Design Factory] SUCCESS: Documentation for ${projectName} generated at /docs/`);
}

// Example usage: node designer.js "Smart-Home-AI" "A system to control lights and temp via voice"
const args = process.argv.slice(2);
if (args.length >= 2) {
    startDesign(args[0], args[1]).catch(console.error);
} else {
    console.log("Usage: node designer.js <ProjectName> <RawIdea>");
}
