
import { Entity, IEntity } from './entity.model';
import { Customer } from './customer.model';
import { User } from './user.model';
import { State } from './state.model';
import { Organization } from './organization.model';
import { Employee } from './emp.model';

export class Project extends Entity {

  public projectCustomer?: Customer | null;
  public projectManager?: Employee | null;
  public projectCurator?: Employee | null;
  // public projectPlan?: Document;
  public projectName: string;
  public projectDescription?: string | null;
  public officialProjectName?: string | null;
  public planStartDate?: string | null;
  public planEndDate?: string | null;
  public planBudget?: number | null;
  public factStartDate?: string | null;
  public factEndDate?: string | null;
  public factBudget?: number | null;
  public teamMembersCount: number;
  constructor(data: {
    id: number;
    projectCustomer?: Customer | null;
    projectManager?: Employee | null;
    projectCurator?: Employee | null;
    // projectPlan?: Document;
    planStartDate?: string | null;
    planEndDate?: string | null;
    planBudget?: number | null;
    projectName: string;
    projectDescription?: string | null;
    officialProjectName?: string | null;
    factStartDate?: string | null;
    factEndDate?: string | null;
    factBudget?: number | null;
    teamMembersCount: number;
    state: State;
    isDeleted: boolean;
    createdBy: User;
    createdAt: string;
    updatedBy?: User | null;
    updatedAt?: string | null;
    deletedBy?: User | null;
    deletedAt?: string | null;
    modifiedBy: User;
    modifiedAt: string;
  }

  ) {
    super(data);
    this.projectCustomer = data.projectCustomer ? new Customer(data.projectCustomer) : null;
    this.projectCurator = data.projectCurator ? new Employee(data.projectCurator) : null;
    this.projectManager = data.projectManager ? new Employee(data.projectManager) : null;
    // this.projectPlan = new Document(data.projectPlan);
    this.projectName = String(data.projectName);
    this.projectDescription = data.projectDescription ? String(data.projectDescription) : null;
    this.officialProjectName = data.officialProjectName ? String(data.officialProjectName) : null;
    this.planStartDate = data.planStartDate ? data.planStartDate : null;
    this.planEndDate = data.planEndDate ? data.planEndDate : null;
    this.planBudget = data.planBudget ? Number(data.planBudget) : null;
    this.factStartDate = data.factStartDate ? data.factStartDate : null;
    this.factEndDate = data.factEndDate ? data.factEndDate : null;
    this.factBudget = data.factBudget ? Number(data.factBudget) : null;
    this.teamMembersCount = Number(data.teamMembersCount);
  }
}

export interface IProject extends IEntity {
  customerID?: number;
  projectManagerID?: number;
  projectCuratorID?: number;
  projectPlanID?: number;
  projectName: string;
  projectDescription?: string;
  officialProjectName?: string;
  planStartDate?: string;
  planEndDate?: string;
  planBudget?: number;
  factStartDate?: string;
  factEndDate?: string;
  factBudget?: number;
}

