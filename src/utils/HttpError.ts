class HttpError extends Error {
  message: string;
  status: number;

  constructor({ message, status }: { message: string; status: number }) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

export default HttpError;
