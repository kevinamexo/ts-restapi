import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //objectids are used for unique identifiers i.e id of a collection document
    // so user has the type of an ObjectId that is in the User collection
    valid: { type: Boolean, default: true }, //always defined, with a default value of true
    userAgent: { type: String }, //allows us to store the log the browser the user started the session in
  },
  {
    timestamps: true, // automatic createdAt and updatedAt timestamps
  }
);

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);
export default SessionModel;
