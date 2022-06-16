import * as express from 'express';
import { HandleValidation, HandleIncome } from './controller/handler';

export default class AdminSettings {
  public path = '/whatsapp_notification_webhook';
  public router = express.Router();

  constructor() {
    this.initializeRoute();
  }

  public initializeRoute(): void {
    this.router.get(this.path, HandleValidation);
    this.router.post(this.path, HandleIncome);
  }
}