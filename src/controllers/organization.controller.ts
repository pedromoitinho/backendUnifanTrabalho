import { Request, Response } from "express";
import { OrganizationService } from "../services/organization.service";

export class OrganizationController {
  private organizationService = new OrganizationService();

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const organization = await this.organizationService.create(req.body);
      res.status(201).json(organization);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const organizations = await this.organizationService.findAll();
      res.status(200).json(organizations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const organization = await this.organizationService.findById(req.params.id);
      res.status(200).json(organization);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const organization = await this.organizationService.update(
        req.params.id,
        req.body
      );
      res.status(200).json(organization);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.organizationService.delete(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };
}
