describe("Blog", function() {
  it("opens login page", function() {
    cy.visit("http://localhost:3000");
    cy.contains("Blog");
  });
  it("logins", () => {
    cy.visit("http://localhost:3000");
    cy.get("#username").type("logintester");
    cy.get("#password").type("sekret");
    cy.contains("Login").click();
    cy.contains("Tero logged in!");
  });
});
