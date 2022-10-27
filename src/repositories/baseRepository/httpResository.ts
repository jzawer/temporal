import type { IResource } from "./../interfaces/IResource";
import type { IRead } from "../interfaces/IRead";
import type { IWrite } from "../interfaces/IWrite";
import httpClient from "@/lib/httpClient";

export default abstract class HttpRepository<T> implements IWrite<T>, IRead<T> {
  private readonly _resource!: IResource;

  constructor(resource: IResource) {
    if (!resource || resource.name.length == 0) {
      console.error("Resource need to create a intance of HttpRepository");
      throw new Error("Resource need to create a intance of HttpRepository");
    }
    this._resource = resource;
  }

  private get resourceUrl() {
    return `V${this._resource.version}/${this._resource.name}/`;
  }

  private get entityUrl(): (id: string) => string {
    return (id: string) => (this._resource ? `${this.resourceUrl}/${id}` : id);
  }

  create(item: T): Promise<boolean> {
    return httpClient.post(this.resourceUrl, item);
  }

  update(id: string, item: T): Promise<boolean> {
    return httpClient.put(this.entityUrl(id), item);
  }

  delete(id: string): Promise<boolean> {
    return httpClient.delete(this.entityUrl(id));
  }

  getAll(): Promise<T[]> {
    return httpClient.get(this.resourceUrl);
  }

  getOne(id: string): Promise<T> {
    return httpClient.get(this.entityUrl(id));
  }
}
