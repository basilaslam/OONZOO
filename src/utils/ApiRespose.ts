class ApiResponse {
	public statusCode: number;
	public data: any;
	public message: string;
	public success: any;

  constructor(statusCode: number, data: any, message: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };