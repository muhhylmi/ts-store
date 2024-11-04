export class HttpException extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message); // Call the parent constructor with the message
    this.status = status;

    // Set the prototype explicitly for proper instanceof checks
    Object.setPrototypeOf(this, HttpException.prototype);
  }
}