import { Schema, model } from "mongoose";
import { validateEmail } from "../utils/validators";

const OwnerSchema = new Schema({
  profile: {
    public_id: String,
    url: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
});

const Owner = model("Owner", OwnerSchema);

export {Owner};
