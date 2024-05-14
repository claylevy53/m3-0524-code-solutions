export class ClientError extends Error {
  constructor(status, message) {
    super(message);
  }
}
