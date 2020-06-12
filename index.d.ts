declare namespace Utils {
  interface ILog {
    message: (message: string) => void;
    error: (e: Error, opts?: Array<any>) => void;
  }
  interface IoC {
    Log: ILog,
    Connection: () => PromiseLike<Data.IConnection>
  }
}

declare namespace Data {
  interface IClient {
    sessions: (sessionsParameters: Parameters.ISessionsParameters) => ISessions;
  }

  interface ISession {
    query: (sql: string, options: { params: object }, callback: (data:any) => void) => IQueryResult
  }

  interface ISessions {
    acquire: () => ISession;
  }
  interface IQueryResult {
    on: (event: "data" | "error" | "end", callback: (data: any) => void) => void;
  }
  namespace Parameters {
    interface IPoolConnectionParameters {
      address: string;
      port: number;
      user: string;
      pass: string;
      db: string;
    }
  
    interface IConnectionParameters {
      address: string;
      port: number;
    }
    interface ISessionsParameters {
      db: string,
      user: string;
      pass: string;
    }
  
  }
  interface IConnection {    
    query: (cmd: string, parameters: object, callback: () => void) => PromiseLike<Array<object>>
  }
  interface IBase {

  }
}
