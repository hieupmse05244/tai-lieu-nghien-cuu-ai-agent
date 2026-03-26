# Control Loop Runtime

## 1. Sequence
```mermaid
sequenceDiagram
    Control->>Planner: request(goal, state)
    Planner->>Control: action(params)
    Control->>Runner: execute(action)
    Runner->>EventLog: log(result)
    EventLog->>Evaluator: evaluate(log)
    Evaluator->>Control: result(score, delta)
```

## 2. Pseudocode
```javascript
while (status !== 'GOAL_REACHED') {
  const action = await getPlan(state);
  if (await isSafe(action)) {
    const res = await run(action);
    const eval = await assessment(res);
    state = updateState(eval);
  }
}
```
