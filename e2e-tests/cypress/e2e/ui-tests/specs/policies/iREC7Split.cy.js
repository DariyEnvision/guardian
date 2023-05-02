import { AuthenticationPage } from "../../pages/authentication";
import { PoliciesPage } from "../../pages/policies";
import { InstallerPage } from "../../pages/intaller-page";
import { RegistrantPage } from "../../pages/registrant-page";
import { TokensPage } from "../../pages/tokens";
import API from "../../../../support/ApiUrls";

const home = new AuthenticationPage();
const policies = new PoliciesPage();
const registrant = new RegistrantPage();
const installer = new InstallerPage();
const tokens = new TokensPage();

describe("Workflow iREC 7 Policy", () => {
    const authorization = Cypress.env("authorization");

    it("checks iREC 7 policy workflow",{ tags: '@ui' },  () => {
        cy.viewport(1230, 800);

        home.visit();
        home.login("StandardRegistry");
        policies.openPoliciesTab();
        policies.importPolicyButton();
        policies.importPolicyMessage("1675254173.283077003");  //iRec7
        policies.publishPolicy();
        home.logOut("StandardRegistry");

        //Registrant
        home.login("Registrant");
        home.checkSetup("Registrant");
        registrant.createGroup("Registrant");
        home.logOut("Registrant");

        home.login("StandardRegistry");
        policies.openPoliciesTab();
        policies.approveUser();
        home.logOut("StandardRegistry");

        // Registrant
        home.login("Registrant");
        registrant.createDevice();
        home.logOut("Registrant");

        home.login("StandardRegistry");
        policies.openPoliciesTab();
        policies.approveDevice();
        home.logOut("StandardRegistry");

        home.login("Registrant");
        registrant.createIssueRequest();
        home.logOut("Registrant");

        home.login("StandardRegistry");
        policies.openPoliciesTab();
        policies.approveRequest();
        home.logOut("StandardRegistry");


    });
});

export {};
