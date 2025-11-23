import { Request, Response } from "express";
import { ApplicationService } from "../services/application.service";

export class ApplicationController {
  private applicationService = new ApplicationService();

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Usuário não autenticado" });
        return;
      }

      const application = await this.applicationService.create(req.user.id, {
        opportunityId: req.params.id,
        message: req.body.message,
      });

      res.status(201).json(application);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  findMyApplications = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Usuário não autenticado" });
        return;
      }

      const applications = await this.applicationService.findByUser(req.user.id);
      res.status(200).json(applications);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  updateStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const application = await this.applicationService.updateStatus(
        req.params.id,
        req.body
      );
      res.status(200).json(application);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Usuário não autenticado" });
        return;
      }

      await this.applicationService.delete(req.params.id, req.user.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };
}
