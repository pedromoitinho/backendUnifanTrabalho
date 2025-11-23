import { AppDataSource } from "../config/database";
import { Opportunity, OpportunityStatus } from "../entities/Opportunity";
import { User } from "../entities/User";
import {
  calculateDistance,
  calculateSkillMatch,
  calculateScheduleMatch,
} from "../utils/matchmaking.utils";

export interface CreateOpportunityDTO {
  title: string;
  description: string;
  requiredSkills: string[];
  location: string;
  latitude: number;
  longitude: number;
  schedule: string[];
  startDate?: Date;
  endDate?: Date;
  vacancies?: number;
  status?: OpportunityStatus;
  causes?: string[];
  organizationId: string;
}

export interface UpdateOpportunityDTO
  extends Partial<Omit<CreateOpportunityDTO, "organizationId">> {}

export interface MatchResult {
  opportunity: Opportunity;
  matchScore: number;
  skillMatch: number;
  scheduleMatch: number;
  distance: number;
}

export class OpportunityService {
  private opportunityRepository = AppDataSource.getRepository(Opportunity);

  async create(data: CreateOpportunityDTO): Promise<Opportunity> {
    const opportunity = this.opportunityRepository.create({
      ...data,
      organization: { id: data.organizationId } as any,
    });

    return await this.opportunityRepository.save(opportunity);
  }

  async findAll(filters?: {
    keyword?: string;
    cause?: string;
    status?: OpportunityStatus;
  }): Promise<Opportunity[]> {
    const queryBuilder =
      this.opportunityRepository.createQueryBuilder("opportunity");

    queryBuilder.leftJoinAndSelect("opportunity.organization", "organization");

    if (filters?.keyword) {
      queryBuilder.andWhere(
        "(opportunity.title ILIKE :keyword OR opportunity.description ILIKE :keyword)",
        { keyword: `%${filters.keyword}%` }
      );
    }

    if (filters?.cause) {
      queryBuilder.andWhere(":cause = ANY(opportunity.causes)", {
        cause: filters.cause,
      });
    }

    if (filters?.status) {
      queryBuilder.andWhere("opportunity.status = :status", {
        status: filters.status,
      });
    }

    return await queryBuilder.getMany();
  }

  async findById(id: string): Promise<Opportunity> {
    const opportunity = await this.opportunityRepository.findOne({
      where: { id },
      relations: ["organization", "applications"],
    });

    if (!opportunity) {
      throw new Error("Oportunidade não encontrada");
    }

    return opportunity;
  }

  async update(id: string, data: UpdateOpportunityDTO): Promise<Opportunity> {
    const opportunity = await this.findById(id);
    Object.assign(opportunity, data);
    return await this.opportunityRepository.save(opportunity);
  }

  async delete(id: string): Promise<void> {
    const opportunity = await this.findById(id);
    await this.opportunityRepository.remove(opportunity);
  }

  /**
   * ALGORITMO DE MATCHMAKING
   */
  async findMatches(
    user: User,
    maxDistance: number = 50
  ): Promise<MatchResult[]> {
    const opportunities = await this.opportunityRepository.find({
      where: { status: OpportunityStatus.ACTIVE },
      relations: ["organization"],
    });

    const matches: MatchResult[] = [];

    for (const opportunity of opportunities) {
      let distance = 0;
      if (user.latitude && user.longitude) {
        distance = calculateDistance(
          user.latitude,
          user.longitude,
          opportunity.latitude,
          opportunity.longitude
        );
      }

      if (distance > maxDistance && user.latitude && user.longitude) {
        continue;
      }

      const skillMatch = calculateSkillMatch(
        user.skills || [],
        opportunity.requiredSkills
      );

      const scheduleMatch = calculateScheduleMatch(
        user.availability || [],
        opportunity.schedule
      );

      const distanceScore = Math.max(0, 100 - (distance / maxDistance) * 100);
      const matchScore =
        skillMatch * 0.5 + scheduleMatch * 0.3 + distanceScore * 0.2;

      matches.push({
        opportunity,
        matchScore: Math.round(matchScore),
        skillMatch: Math.round(skillMatch),
        scheduleMatch: Math.round(scheduleMatch),
        distance: Math.round(distance * 10) / 10,
      });
    }

    return matches.sort((a, b) => b.matchScore - a.matchScore);
  }
}
