import { AuthGuardService } from './guard/auth-guard.service';
export { AuthGuardService } from './guard/auth-guard.service';

import { ApiService } from './services/api.service';
export { ApiService } from './services/api.service';

import { SmiteGuruService } from './services/smiteguru.service';
export { SmiteGuruService } from './services/smiteguru.service';

import { SmiteService } from './services/smite.service';
export { SmiteService } from './services/smite.service'

export const SERVICES = [
  AuthGuardService,
  ApiService,
  SmiteGuruService,
  SmiteService
];
