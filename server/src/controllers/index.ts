import { findProductByCode } from "../services";
import ValidateController from "./ValidateController";

const validateController = new ValidateController(findProductByCode);

export { validateController };