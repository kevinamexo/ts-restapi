import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");
export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  }); /// sign with private key
}

export function verifyJwt(token: string) {
  console.log(publicKey);
  console.log("veryfing");
  console.log(token);
  try {
    const decoded = jwt.verify(token, publicKey);
    console.log("result decoded");
    console.log(decoded);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
