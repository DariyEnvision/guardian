import { METHOD, STATUS_CODE } from "../../../support/api/api-const";
import API from "../../../support/ApiUrls";

context("Tokens", { tags: "@tokens" }, () => {
    const authorization = Cypress.env("authorization");
    const user = Cypress.env("root_user");

    it("Freezes/Unfreezes transfers of the specified token for the user", () => {
        cy.request({
            method: METHOD.GET,
            url: API.ApiServer + API.ListOfTokens,
            headers: {
                authorization,
            },
        }).then((resp) => {
            expect(resp.status).eql(STATUS_CODE.OK);

            const tokenId = resp.body.at(0).tokenId;

            cy.request({
                method: METHOD.PUT,
                url:
                    API.ApiServer +
                    API.ListOfTokens +
                    tokenId +
                    "/" +
                    user +
                    "/freeze",
                headers: {
                    authorization,
                },
            }).then((resp) => {
                expect(resp.status).eql(STATUS_CODE.OK);

                let token = resp.body.tokenId;
                let frozen = resp.body.frozen;

                expect(token).to.deep.equal(tokenId);
                expect(frozen).to.be.true;

                cy.request({
                    method: METHOD.PUT,
                    url:
                        API.ApiServer +
                        API.ListOfTokens +
                        tokenId +
                        "/" +
                        user +
                        "/unfreeze",
                    headers: {
                        authorization,
                    },
                }).then((resp) => {
                    expect(resp.status).eql(STATUS_CODE.OK);

                    let token = resp.body.tokenId;
                    let frozen = resp.body.frozen;

                    expect(token).to.deep.equal(tokenId);
                    expect(frozen).to.be.false;
                });
            });
        });
    });
});
