describe("Authentication", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });
  it("should navagate to authentication page", () => {
    cy.get("h1").contains("EveShop");
  });
});
