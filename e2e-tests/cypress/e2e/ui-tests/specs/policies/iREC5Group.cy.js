import { AuthenticationPage } from "../../pages/authentication";
import { PoliciesPage } from "../../pages/policies";
import { InstallerPage } from "../../pages/intaller-page";
import { RegistrantPage } from "../../pages/registrant-page";
import { TokensPage } from "../../pages/tokens";

const home = new AuthenticationPage();
const policies = new PoliciesPage();
const registrant = new RegistrantPage();
const installer = new InstallerPage();
const tokens = new TokensPage();

describe("Workflow iREC 5 Policy",  { tags: '@ui' }, () => {
    it("checks iREC 5 policy workflow", () => {
        cy.viewport(1230, 800);

        home.visit();
        home.login("StandardRegistry");
        policies.openPoliciesTab();
        policies.importPolicyButton();
        policies.importPolicyMessage("1675253727.031928415"); //iRec5
        policies.publishPolicy();
        home.logOut("StandardRegistry");

        // Registrant
        home.login("Registrant");
        home.checkSetup("Registrant");
        registrant.createGroup("Registrant");
        home.logOut("Registrant");

        home.login("Installer");
        home.checkSetup("Installer");
        installer.createGroup("Approvers");
        installer.signApplication();
        home.logOut("Installer");

        // Registrant
        home.login("Registrant");
        registrant.createDevice();
        home.logOut("Registrant");


        home.login("Installer");
        policies.openPoliciesTab();
        installer.approveDevice();
        home.logOut("Installer");

        home.login("Registrant");
        registrant.createIssueRequest();
        home.logOut("Registrant");

        home.login("Installer");
        policies.openPoliciesTab();
        policies.approveRequest();
        home.logOut("Installer");


    });
});

export {};
