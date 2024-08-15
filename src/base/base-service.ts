import axios, { type AxiosResponse } from "axios";
import type { ResourceFilter } from "./base-resource-types";
import type { BaseDTO } from "./base-dto";
import { environment } from "@/environment/environment";

export abstract class BaseService {
    protected jsonApi: string = '';

    public bindJsonApi(): string {
        return this.jsonApi ? `${environment.apiUrl}/${this.jsonApi}` : environment.apiUrl;
    }

    public async getToken(): Promise<void> {
        await axios.get(`${environment.apiUrl}/sanctum/csrf-cookie`);
    }

    public async get(filters?: ResourceFilter): Promise<any> {
        const url = this.bindJsonApi();

        const options: any = {};

        if (filters) {
            options.params = this.buildQueryParams(filters);
        }

        return axios.get(url, options).then((response) => response.data?.map((item: any) => this.bindData(item)));
    }

    public async find(id: number | string): Promise<any> {
        const url = this.bindJsonApi();

        return axios.get(`${url}/${id}`).then((response) => this.bindData(response.data?.data));
    }

    public async post(data: any, endpoint?: string): Promise<AxiosResponse> {
        let url = this.bindJsonApi();

        if (endpoint) {
            url = `${url}/${endpoint}`;
        }

        return axios.post(url, data);
    }

    public async put(data: any, id?: number | string, endpoint?: string): Promise<AxiosResponse> {
        let url = this.bindJsonApi();

        url = endpoint ? `${url}/${endpoint}` : url;

        if (id) {
            url = `${url}/${id}`;
        }

        if (endpoint) {
            url = `${url}/${endpoint}`;
        }

        return axios.put(url, data);
    }

    public async delete(id: number | string): Promise<AxiosResponse> {
        const url = this.bindJsonApi();

        return axios.delete(`${url}/${id}`)
    }

    public deleteWithConfirmation(id: number | string): void {
        const response = confirm('Deseja realmente excluir este registro?');

        if (response) {
            this.delete(id);
        }
    }

    public save(data: any): Promise<AxiosResponse> {
        return data?.id ? this.put(data, data.id) : this.post(data);
    }

    private buildQueryParams(filters: ResourceFilter | null) {
        // let params = new HttpParams();
        //
        // if (!filters) {
        //     return params;
        // }
        //
        // Object.keys(filters)?.forEach((key) => {
        //     if (filters[key]) {
        //         params = params.append(key, filters[key])
        //     }
        // });
        //
        // return params;
        return filters;
    }

	public abstract bindData(data: any): BaseDTO
}
