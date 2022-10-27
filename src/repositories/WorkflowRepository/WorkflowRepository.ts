import type { IResource } from "./../interfaces/IResource";
import type WorkFlow from "@/entities/WorkFlow";
import HttpRepository from "@/repositories/baseRepository/httpResository";
import WorkflowResource from "./WorkflowResource";

class WorkflowRepository extends HttpRepository<WorkFlow> {
  constructor(resource: IResource) {
    super(resource);
  }
}

export default new WorkflowRepository(WorkflowResource);
