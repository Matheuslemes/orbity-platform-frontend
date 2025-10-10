export class DomainError extends Error {

  public readonly code: string;
  public readonly status?: number;

  constructor(message: string, code = "DOMAIN_ERROR", status?: number) {

    super(message);
    this.name = "DomainError";
    this.code = code;
    
    if (status !== undefined) {
      this.status = status;
    }

  }

}

export class HttpError extends Error {

  public readonly status: number;
  public readonly url: string;
  public readonly body?: unknown;

  constructor(message: string, status: number, url: string, body?: unknown) {
    
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
    this.body = body;

  }

}

export class NetworkError extends Error {

  constructor(message = "Network error") {

    super(message);
    this.name = "NetworkError";

  }

}

export class TimeoutError extends Error {

    constructor(message = "Request timed out") {
        
    super(message);
    this.name = "TimeoutError";

  }

}

export class ParseError extends Error {

  constructor(message = "Invalid response payload") {

    super(message);
    this.name = "ParseError";

  }

}