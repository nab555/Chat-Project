//import { ObjectId } from "mongodb"; // issue to be fixed
import { Request, Response } from "express"; // issue to be fixed
import { joiValidation } from "@global/decorators/joi-validation.decorators";
import { signupSchema } from "@auth/schemes/signup";
import { IAuthDocument } from "@auth/interfaces/auth.interface";
import { authService } from "@services/db/auth.service";
import { BadRequestError } from "@global/helpers/error-handler";

export class SignUp {
  @joiValidation(signupSchema)
  public async create(req: Request, res: Response ): Promise<void> {
    const {username,email,password,avatarColor,avatarImage} = req.body;
    const checkIfUserExist: IAuthDocument = await authService.getUserByUsernameOrEmail(username, email);
    if(checkIfUserExist){
      throw new BadRequestError('Invalid credentials');
    }
  }
}
