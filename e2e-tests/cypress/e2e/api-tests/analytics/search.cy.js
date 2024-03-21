import { METHOD, STATUS_CODE } from "../../../support/api/api-const";
import API from "../../../support/ApiUrls";

context("Analytics",  { tags: '@analytics' },() => {
    const authorization = Cypress.env("authorization");

    it("Search policy", () => {
        let policyId
        cy.request({
            method: METHOD.GET,
            url: API.ApiServer + API.Policies,
            headers: {
                authorization,
            }
        }).then((response) => {
            policyId = response.body.at(0)._id
            cy.request({
                method: METHOD.POST,
                url: API.ApiServer + API.PolicySearch,
                body: {
                    policyId: policyId,
                },
                headers: {
                    authorization,
                }
            }).then((response) => {
                expect(response.status).to.eq(STATUS_CODE.OK);
                expect(response.body.result.at(0)).exist;
                expect(response.body.target.id).to.eq(policyId);
            })
        })
    });

    it("Search blocks", () => {
        let policyId, config, blockId
        cy.request({
            method: METHOD.GET,
            url: API.ApiServer + API.Policies,
            headers: {
                authorization,
            }
        }).then((response) => {
            policyId = response.body.at(0)._id
            cy.request({
                method: METHOD.GET,
                url: API.ApiServer + API.Policies + policyId,
                headers: {
                    authorization,
                }
            }).then((response) => {
                config = response.body.config
                blockId = response.body.config.children.at(0).id
                cy.request({
                    method: METHOD.POST,
                    url: API.ApiServer + API.BlockSearch,
                    body: {
                        config: config,
                        id: blockId
                    },
                    headers: {
                        authorization,
                    }
                }).then((response) => {
                    expect(response.status).to.eq(STATUS_CODE.OK);
                    expect(response.body.at(0).chains.at(0).target).exist;
                })
            })
        })
    });
});
