require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const STATE_FILE = path.join(__dirname, 'state.json');
const DOCS_DIR = path.join(__dirname, '../../docs');
const PROMPTS_DIR = path.join(__dirname, 'prompts');
const LOGS_DIR = path.join(__dirname, 'logs');

// V3 Naming Convention (Updated path calculation for v1.8.5)
const INSTRUCTIONS_FILE = path.join(DOCS_DIR, 'Planner.log.md');
const CONTRACT_FILE = path.join(DOCS_DIR, 'Contract.spec.md');
const PRD_FILE = path.join(DOCS_DIR, 'PRD.spec.md');
const STANDARDS_DIR = path.join(__dirname, '../../../../05-Standards-Guidelines');

// Helper đọc tài liệu
const readDoc = (filePath) => fs.readFileSync(filePath, 'utf8');
const readPrompt = (name) => fs.readFileSync(path.join(PROMPTS_DIR, name), 'utf8');

function saveAuditLog(taskName, agentName, response) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const logPath = path.join(LOGS_DIR, `${timestamp}-${agentName}.json`);
    if (!fs.existsSync(LOGS_DIR)) fs.mkdirSync(LOGS_DIR, { recursive: true });
    fs.writeFileSync(logPath, JSON.stringify({ taskName, agentName, timestamp, response }, null, 2));
    return logPath;
}

async function getNextTask(context) {
    console.log("[Planner] Consulting LLM for the next step...");
    const systemPrompt = `Bạn là một Senior Project Manager điều phối dự án DRS. 
Nhiệm vụ của bạn là chọn ra nhiệm vụ tiếp theo DUY NHẤT từ danh sách Instructions.
BẮT BUỘC: Bạn phải chọn nhiệm vụ đầu tiên chưa hoàn thành (chưa có trong state.completed_tasks) theo đúng thứ tự từ trên xuống dưới của tệp instructions.
Return ONLY a valid JSON object with:
{
  "id": "task_id_slug",
  "name": "Human-friendly task name",
  "reasoning": "Giải thích vì sao chọn task này dựa trên thứ tự Roadmap",
  "command": "Mô tả lệnh thực hiện"
}`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Instructions: ${context.instructions}\nState: ${JSON.stringify(context.state)}` }
        ],
        response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
}

async function callCoder(task, context) {
    console.log(`[Coder] Generating code for: ${task.name} using GPT-4o...`);
    const prompt = readPrompt('coder.txt');
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: prompt },
            { role: "user", content: `Task: ${JSON.stringify(task)}\nContext: ${JSON.stringify(context)}` }
        ],
        response_format: { type: "json_object" }
    });
    const result = JSON.parse(response.choices[0].message.content);
    saveAuditLog(task.id, "Coder", result);
    return result;
}

async function callEvaluator(codeResult, context) {
    console.log(`[Evaluator/TechLead] Reviewing code logic...`);
    const prompt = readPrompt('evaluator.txt');
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: prompt },
            { role: "user", content: `Code: ${JSON.stringify(codeResult)}\nContext: ${JSON.stringify(context)}` }
        ],
        response_format: { type: "json_object" }
    });
    const result = JSON.parse(response.choices[0].message.content);
    saveAuditLog("Review", "TechLead", result);
    return result;
}

async function callSecurityAgent(codeResult, context) {
    console.log(`[Security Agent] Scanning for vulnerabilities...`);
    const prompt = readPrompt('security_agent.txt');
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: prompt },
            { role: "user", content: `Code: ${JSON.stringify(codeResult)}\nContext: ${JSON.stringify(context)}` }
        ],
        response_format: { type: "json_object" }
    });
    const result = JSON.parse(response.choices[0].message.content);
    saveAuditLog("Review", "Security", result);
    return result;
}

async function callEscalationAgent(failLogs, context) {
    console.log(`\n[Escalation] Coder is stuck. Calling Senior Architect (GPT-4o) for Diagnosis...`);
    const prompt = `You are the Lead Architect. The Coder is stuck and can't pass the QC check.
Analyze the fail logs and decide if we need to update the Contract.spec.md or PRD.spec.md.
Return ONLY JSON:
{
  "diagnosis": "Detailed explanation",
  "update_required": true,
  "target_file": "Contract.spec.md",
  "new_content": "Full revised content..."
}`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: prompt },
            { role: "user", content: `Fail Logs: ${JSON.stringify(failLogs)}\nCurrent Contract: ${context.contract}` }
        ],
        response_format: { type: "json_object" }
    });
    return JSON.parse(response.choices[0].message.content);
}

async function main() {
    try {
        console.log("=== DRS AI Factory v1.8.5 (Path-Fixed) ===");

        const instructions = fs.readFileSync(INSTRUCTIONS_FILE, 'utf8');
        const contract = readDoc(CONTRACT_FILE);
        const prd = readDoc(PRD_FILE);
        const codingStandardPath = path.join(STANDARDS_DIR, 'Coding.standard.md');
        const codingStandard = readDoc(codingStandardPath);
        const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));

        let context = { instructions, contract, prd, codingStandard, state };
        const task = await getNextTask(context);
        console.log(`\n[Decision] Next Task: ${task.name} (ID: ${task.id})`);

        let passed = false;
        let attempts = 0;
        let lastFeedback = "";
        let failLogs = [];

        while (!passed && attempts < 2) {
            attempts++;
            console.log(`\n--- Attempt ${attempts} ---`);
            const coderOutput = await callCoder(task, { ...context, lastFeedback });
            
            const [evalResult, secResult] = await Promise.all([
                callEvaluator(coderOutput, context),
                callSecurityAgent(coderOutput, context)
            ]);

            console.log(`[Evaluator] Score: ${evalResult.score}/10, Passed: ${evalResult.passed}`);
            console.log(`[Security] Safety Score: ${secResult.safety_score}/10, Passed: ${secResult.passed}`);
            
            if (evalResult.passed && secResult.safety_score >= 8) {
                passed = true;
                coderOutput.files.forEach(file => {
                    const fullPath = path.join(__dirname, '../../', file.path);
                    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
                    fs.writeFileSync(fullPath, file.content);
                    console.log(`[File] Created/Updated: ${file.path}`);
                });

                if (!state.completed_tasks.includes(task.id)) {
                    state.completed_tasks.push(task.id);
                    state.last_run = new Date().toISOString();
                    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
                    console.log(`\n[Runner] SUCCESS: Task '${task.id}' completed.`);
                }
            } else {
                failLogs.push({ eval: evalResult, sec: secResult });
                lastFeedback = `[TechLead] ${evalResult.feedback}\n[Security] Score: ${secResult.safety_score}`;
                console.log(`\n[QC REJECTED]`);

                if (attempts === 2) {
                    const escalation = await callEscalationAgent(failLogs, context);
                    console.log(`[Diagnosis] ${escalation.diagnosis}`);
                    if (escalation.update_required) {
                        const targetPath = path.join(DOCS_DIR, escalation.target_file);
                        fs.writeFileSync(targetPath, escalation.new_content);
                        console.log(`\n[Backtracking] Updated ${escalation.target_file}. Restarting...`);
                        attempts = 0;
                        context.contract = escalation.new_content;
                    }
                }
            }
        }
    } catch (error) {
        console.error(`[Runner Critical Error] ${error.message}`);
    }
}

main();
