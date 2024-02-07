// import { METHOD, STATUS_CODE } from "../../../support/api/api-const";
// import API from "../../../support/ApiUrls";
//
// context("Trustchains",  { tags: '@trustchains' }, () => {
//
//     before(() => {
//         let username = 'Auditor'
//         cy.request({
//           method: 'POST',
//           url: API.ApiServer + API.AccountsLogin,
//           body: {
//             username: username,
//             password: 'test'
//           }
//         }).as('requestToken')
//           .then((response) => {
//             const accessToken = 'bearer ' + response.body.accessToken
//             //Checking if StandardRegisty already has hedera credentials
//             cy.request({
//               method: 'GET',
//               url: API.ApiServer + 'profiles/' + username,
//               headers: {
//                 authorization: accessToken
//               }
//             })
//               .then((response) => {
//                   response.body.accessToken = accessToken
//                   cy.writeFile("cypress/fixtures/Auditor.json", JSON.stringify(response.body))
//
//               })
//           })
//       })
//
//
//       it('should builds and returns a trustchain, from the VP to the root VC document', () => {
//         cy.get('@requestToken').then((response) => {
//           const accessToken = 'bearer ' + response.body.accessToken
//           cy.request({
//             method: 'GET',
//             url: API.ApiServer + API.Trustchains,
//             headers: {
//               authorization: accessToken
//             }
//           })
//             .then((response) => {
//               expect(response.status).to.eq(200);
//
//               // let hash = response.body[0].hash;
//
//               // cy.request({
//               //   method: 'GET',
//               //   url: API.ApiServer + API.Trustchains + hash,
//               //   headers: {
//               //     authorization: accessToken
//               //   }
//               // })
//               //   .then((response) => {
//               //     expect(response.status).to.eq(200);
//               //   })
//
//
//             })
//         })
//       })
// });
