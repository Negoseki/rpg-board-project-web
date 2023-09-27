declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    REACT_APP_API_URL: string;
    REACT_APP_API_KEY: string;
  }
}
