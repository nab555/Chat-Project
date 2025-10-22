import { ObjectId } from "mongodb"; // issue to be fixed
import { Request, Response } from "express"; // issue to be fixed
import { joiValidation } from "@global/decorators/joi-validation.decorators";
import { signupSchema } from "@auth/schemes/signup";
import { IAuthDocument, ISignUpData } from "@auth/interfaces/auth.interface";
import { authService } from "@services/db/auth.service";
import { BadRequestError } from "@global/helpers/error-handler";
import { Helpers } from "@global/helpers/helpers";
import { uploads , UploadApiResponse } from "@global/helpers/cloudinary-upload";

export class SignUp {
  @joiValidation(signupSchema)
  public async create(req: Request, res: Response ): Promise<void> {
    const {username,email,password,avatarColor,avatarImage} = req.body;
    const checkIfUserExist: IAuthDocument = await authService.getUserByUsernameOrEmail(username, email);
    if(checkIfUserExist){
      throw new BadRequestError('Invalid credentials');
    }
    const authObjectId: ObjectId = new ObjectId();
    const userObjectId: ObjectId = new ObjectId();
    const uId = `${Helpers.generateRandomIntegers(12)}`;
    const authData: IAuthDocument = SignUp.prototype.signupData({
      _id: authObjectId,
      uId,
      username,
      email,
      password,
      avatarColor
    });

    const result: UploadApiResponse = await uploads(avatarImage, `${userObjectId}`, true, true) as UploadApiResponse;
    if(!result?.public_id){
      throw new BadRequestError('File Upload: Error occurred. Try again');
    }
  }

  private signupData(data: ISignUpData): IAuthDocument {
    const {_id,username,email,uId,password,avatarColor} = data;
    return {
      _id,
      uId,
      username: Helpers.firstLetterUppercase(username),
      email: Helpers.firstLetterUppercase(email),
      password,
      avatarColor,
      createdAt: new Date()
    } as IAuthDocument;
  }
}
