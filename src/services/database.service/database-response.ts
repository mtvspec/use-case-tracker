export class DatabaseResponse {
  status: number;
  data: any;

  constructor(status: number, data: any) {
    return {
      status: status,
      data: data
    }
  }
}
