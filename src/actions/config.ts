const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if(!apiUrl){
  throw new Error("NEXT_PUBLIC_API_URL not defined")
}

const parsedApiUrl = new URL(apiUrl);

export const envConfig = {
  apiUrl,
  login: process.env.NEXT_PUBLIC_LOGIN,
  node:process.env.NODE_ENV,
  protocol: parsedApiUrl.protocol.replace(":", ""),
  hostname: parsedApiUrl.hostname,
  port: parsedApiUrl.port,
};
//IO