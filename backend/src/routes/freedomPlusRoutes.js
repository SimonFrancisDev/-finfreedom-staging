import { Router } from 'express';
import {
  getFreedomPlusEvents,
  getFreedomPlusOrbit,
  getFreedomPlusParticipant,
  getFreedomPlusPayments,
  getFreedomPlusReconciliation,
  getFreedomPlusStatus,
  getFreedomPlusRewardPeriods,
  getFreedomPlusRewardProof,
} from '../controllers/freedomPlusController.js';

const router = Router();
router.get('/status', getFreedomPlusStatus);
router.get('/reconciliation', getFreedomPlusReconciliation);
router.get('/participant/:address', getFreedomPlusParticipant);
router.get('/orbit/:address/level/:level', getFreedomPlusOrbit);
router.get('/payments/:address', getFreedomPlusPayments);
router.get('/events/:address', getFreedomPlusEvents);
router.get('/rewards/periods', getFreedomPlusRewardPeriods);
router.get('/rewards/:periodId/:address', getFreedomPlusRewardProof);

export default router;
