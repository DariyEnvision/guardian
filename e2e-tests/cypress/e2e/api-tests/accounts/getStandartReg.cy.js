import { METHOD, STATUS_CODE } from "../../../support/api/api-const";
import API from "../../../support/ApiUrls";

context("Accounts",  { tags: '@accounts' }, () => {
    const authorization = Cypress.env("authorization");

    it("Returns all Standard Registries", () => {
        cy.request({
            method: METHOD.GET,
            url: API.ApiServer + API.StandartRegistries,
            headers: {
                authorization,
            },
        }).then((resp) => {
            expect(resp.status).eql(STATUS_CODE.OK);
            expect(resp.body[0]).to.have.property("username");
        });
    });
});
