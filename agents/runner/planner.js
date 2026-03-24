require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PROMPTS_DIR = path.join(__dirname, 'prompts');
const DOCS_DIR = path.join(__dirname, '../../07-Experiments/Daily-Reminder-System/docs');

const readDoc = (name) => fs.readFileSync(path.join(DOCS_DIR, name), 'utf8');
const readPrompt = (name) => fs.readFileSync(path.join(PROMPTS_DIR, name), 'utf8');

async function generatePlan() {
    console.log("=== Strategic Planner Agent is planning the project... ===");
    
    const prd = readDoc('PRD.md');
    const contract = readDoc('Contract.md');
    const userFlow = readDoc('User-Flow.md');
    const prompt = readPrompt('planner.txt');

    const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
            { role: "system", content: prompt },
            { role: "user", content: `PRD: ${prd}\nContract: ${contract}\nUserFlow: ${userFlow}` }
        ],
        response_format: { type: "json_object" }
    });

    const plan = JSON.parse(response.choices[0].message.content);
    console.log(`\n[Planner] Generated ${plan.phases.length} phases.`);

    // Update Agent-Instructions.md (Simulated for this demo)
    let instructionContent = `# [AGENT-READY] Automated Plan: ${plan.project}\n\n`;
    plan.phases.forEach(phase => {
        instructionContent += `## Phase: ${phase.name}\n`;
        phase.tasks.forEach(task => {
            instructionContent += `- [ ] ${task.name}: ${task.description} (ID: ${task.id})\n`;
        });
        instructionContent += `\n`;
    });

    const outputPath = path.join(DOCS_DIR, 'Agent-Instructions-v2.md');
    fs.writeFileSync(outputPath, instructionContent);
    console.log(`\n[Planner] New instructions saved to: ${outputPath}`);
}

generatePlan().catch(console.error);
