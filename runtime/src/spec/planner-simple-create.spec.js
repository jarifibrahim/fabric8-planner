"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const support = require("./support");
describe('Planner Tab', () => {
    let spaceDashboard;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield support.desktopTestSetup();
        let login = new support.LoginInteraction();
        let mainDashboard = yield login.run();
        let spaceName = support.newSpaceName();
        spaceDashboard = yield mainDashboard.createNewSpace(spaceName);
        // HACK: use this to reuse an existing space
        // spaceDashboard = new SpaceDashboardPage('foobar');
        // await spaceDashboard.open(PageOpenMode.RefreshBrowser);
    }));
    it('can create a work item', () => __awaiter(this, void 0, void 0, function* () {
        let planner = yield spaceDashboard.gotoPlanTab();
        yield planner.createWorkItem({
            title: 'Workitem Title',
            description: 'Describes the work item'
        });
        yield planner.createWorkItem({
            title: 'Workitem Title',
            description: 'Describes the work item'
        });
    }));
});
//# sourceMappingURL=planner-simple-create.spec.js.map