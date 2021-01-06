import { RequestMethod } from './../../server/routing/methodSwitch';
import { createMultiMethodController } from '../../server/routing/methodSwitch';
import authenticateController from '../../server/controller/authenticateController';

const controller = createMultiMethodController({
    [RequestMethod.GET]: authenticateController,
});

export default controller;
