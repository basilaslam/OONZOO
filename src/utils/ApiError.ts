class ApiError extends Error {
    public statusCode: number;
	public data: any;
	public message: any;
	public success: any;
    public errors: any[]
    constructor(
      statusCode: number,
      message = "Something went wrong",
      errors:any = [],
      stack = ""
    ) {
      super(message);
      this.statusCode = statusCode;
      this.data = null;
      this.message = message;
      this.success = false;
      this.errors = errors;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  


  export interface ApiErrorInterface {
     stack ?: string | undefined;
     statusCode: number;
	 data: any;
	 message: any;
	 success: any;
     errors: any[]
  }
  export { ApiError };