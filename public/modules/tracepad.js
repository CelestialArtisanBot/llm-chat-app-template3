let phase = "default";
const tracepadLog = document.getElementById('tracepad-log');

function logEvent(entry) {
  const line = document.createElement('div');
  line.textContent = entry;
  tracepadLog.appendChild(line);
  tracepadLog.scrollTop = tracepadLog.scrollHeight;
}

function logIncantation(spell) {
  logEvent(`🧙 ${spell}`);
}

function setPhase(newPhase) {
  phase = newPhase;
}

function getPhase() {
  return phase;
}

export default { logEvent, logIncantation, setPhase, getPhase };
