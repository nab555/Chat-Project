import { JoiRequestValidationError } from "@global/helpers/error-handler";
import { Request } from "express";
import { ObjectSchema } from "joi";

type IJoiDecorator = (target: any, key: string, descriptor:PropertyDescriptor) => void;

export function joiValidation(schema: ObjectSchema): IJoiDecorator {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {

  }
}
