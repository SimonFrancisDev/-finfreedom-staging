import {
  freedomPlusEvents,
  freedomPlusOrbit,
  freedomPlusParticipant,
  freedomPlusPayments,
  freedomPlusReconciliation,
  freedomPlusStatus,
} from '../services/read/freedomPlusQueryService.js';

function handler(fn) {
  return async (req, res) => {
    try { res.json({ ok: true, data: await fn(req) }); }
    catch (error) { res.status(400).json({ ok: false, error: String(error?.message || error) }); }
  };
}

export const getFreedomPlusStatus = handler(() => freedomPlusStatus());
export const getFreedomPlusReconciliation = handler(() => freedomPlusReconciliation());
export const getFreedomPlusParticipant = handler((req) => freedomPlusParticipant(req.params.address));
export const getFreedomPlusOrbit = handler((req) => freedomPlusOrbit(req.params.address, req.params.level, req.query));
export const getFreedomPlusPayments = handler((req) => freedomPlusPayments(req.params.address, req.query));
export const getFreedomPlusEvents = handler((req) => freedomPlusEvents(req.params.address, req.query));
