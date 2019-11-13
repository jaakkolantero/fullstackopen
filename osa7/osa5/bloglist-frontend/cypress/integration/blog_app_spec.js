describe("Blog", function() {
  const login = () => {
    cy.get("#username").type("logintester");
    cy.get("#password").type("sekret");
    cy.contains("Login").click();
  };

  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Tero",
      username: "logintester",
      password: "sekret"
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("opens login page", function() {
    cy.contains("Blog");
  });
  it("logins", () => {
    login();
    cy.contains("Tero logged in!");
  });
  it("adds blog", () => {
    login();
    cy.contains("Create blog").click();
    cy.get("#title").type("My first blog post");
    cy.get("#author").type("Peter Pan");
    cy.get("#url").type("http://www.google.com");
    cy.get("button")
      .contains("Create")
      .click();
    cy.contains("Blog added!");
  });
});
