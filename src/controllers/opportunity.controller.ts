import { Request, Response } from "express";
import { OpportunityService } from "../services/opportunity.service";
import { OpportunityStatus } from "../entities/Opportunity";

export class OpportunityController {
  private opportunityService = new OpportunityService();

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const opportunity = await this.opportunityService.create(req.body);
      res.status(201).json(opportunity);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const { keyword, cause, status } = req.query;

      const opportunities = await this.opportunityService.findAll({
        keyword: keyword as string,
        cause: cause as string,
        status: status as OpportunityStatus,
      });

      res.status(200).json(opportunities);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const opportunity = await this.opportunityService.findById(req.params.id);
      res.status(200).json(opportunity);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const opportunity = await this.opportunityService.update(
        req.params.id,
        req.body
      );
      res.status(200).json(opportunity);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.opportunityService.delete(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  findMatches = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Usuário não autenticado" });
        return;
      }

      const maxDistance = req.query.maxDistance
        ? parseInt(req.query.maxDistance as string)
        : 50;

      const matches = await this.opportunityService.findMatches(
        req.user,
        maxDistance
      );

      res.status(200).json(matches);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
