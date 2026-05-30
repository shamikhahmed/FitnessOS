/* Rest timer shim — delegates to startRestTimer/skipRestTimer in workouts.js */
function startRest(s) {
  if (typeof startRestTimer === 'function') startRestTimer(s);
}
function skipRest() {
  if (typeof skipRestTimer === 'function') skipRestTimer();
}
function updRest() {
  /* no-op: workouts.js manages its own display update */
}
