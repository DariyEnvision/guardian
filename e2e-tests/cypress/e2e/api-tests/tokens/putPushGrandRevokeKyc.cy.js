// import { METHOD, STATUS_CODE } from "../../../support/api/api-const";
// import API from "../../../support/ApiUrls";
//
// context("Tokens", { tags: "@tokens" }, () => {
//     const authorization = Cypress.env("authorization");
//     const user = Cypress.env("root_user");
//
//     it("push sets the KYC flag for the user", () => {
//         cy.request({
//             method: METHOD.GET,
//             url: API.ApiServer + API.ListOfTokens,
//             headers: {
//                 authorization,
//             },
//         }).then((resp) => {
//             expect(resp.status).eql(STATUS_CODE.OK);
//
//             const tokenId = resp.body[0].tokenId;
//
//             cy.request({
//                 method: METHOD.PUT,
//                 url:
//                     API.ApiServer +
//                     API.ListOfTokens +
//                     "push/" +
//                     tokenId +
//                     "/" +
//                     user +
//                     "/grantKyc",
//                 headers: {
//                     authorization,
//                 },
//             }).then((resp) => {
//                 expect(resp.status).eql(STATUS_CODE.OK);
//             });
//         });
//     });
//
//     it("push unsets the KYC flag for the user", () => {
//         cy.request({
//             method: METHOD.GET,
//             url: API.ApiServer + API.ListOfTokens,
//             headers: {
//                 authorization,
//             },
//         }).then((resp) => {
//             expect(resp.status).eql(STATUS_CODE.OK);
//
//             const tokenId = resp.body[0].tokenId;
//
//             cy.request({
//                 method: METHOD.PUT,
//                 url:
//                     API.ApiServer +
//                     API.ListOfTokens +
//                     "push/" +
//                     tokenId +
//                     "/" +
//                     user +
//                     "/revokeKyc",
//                 headers: {
//                     authorization,
//                 },
//             }).then((resp) => {
//                 expect(resp.status).eql(STATUS_CODE.OK);
//             });
//         });
//     });
// });
