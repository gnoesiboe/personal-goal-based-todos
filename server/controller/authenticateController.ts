import { Controller } from '../routing/methodSwitch';
import { sendCreationSuccessfulResponse } from '../response/handler/successResponseHandler';

const authenticateController: Controller = async (_request, response) => {
    sendCreationSuccessfulResponse(response);
};

export default authenticateController;
