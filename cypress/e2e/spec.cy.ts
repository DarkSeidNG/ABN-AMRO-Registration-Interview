describe('ABN Interview E2E Tests', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Register Account');
  });
});

let errorsData: {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  form_error: string;
};
describe('Registration Flow', () => {
  beforeEach(() => {
    cy.fixture('errors').then((data) => {
      errorsData = data;
    });
    cy.visit('/');
  });

  it('should navigate to the registration page and register successfully', () => {
    cy.contains('a', 'Register Account').should('exist');

    cy.contains('a', 'Register Account').click();

    cy.url().should('include', '/register');

    cy.get('input[id="input_fullname"]').should('exist');
    cy.get('input[id="input_username"]').should('exist');
    cy.get('input[id="input_email"]').should('exist');
    cy.get('input[id="input_password"]').should('exist');
    cy.get('input[id="input_confirm_password"]').should('exist');

    cy.get('input[id="input_fullname"]').type('John Doe');
    cy.get('input[id="input_username"]').type('johndoe');
    cy.get('input[id="input_email"]').type('john.doe@example.com');
    cy.get('input[id="input_password"]').type('Password123!');
    cy.get('input[id="input_confirm_password"]').type('Password123!');

    cy.intercept('POST', '**/register', {
      statusCode: 200,
      body: { success: true, message: 'Registration successful' },
    }).as('registerRequest');

    cy.get('button[type="submit"]').click();

    cy.wait('@registerRequest');

    cy.url().should('include', '/register/success');
  });

  it('should display validation errors for invalid inputs', () => {
    cy.contains('a', 'Register Account').click();
    cy.url().should('include', '/register');

    cy.get('button[type="submit"]').click();

    cy.contains(errorsData?.username).should('exist');
    cy.contains(errorsData?.email).should('exist');
    cy.contains(errorsData?.password).should('exist');
    cy.contains(errorsData?.confirm_password).should('exist');

    cy.get('input[id="input_email"]').type('invalid-email');
    cy.get('input[id="input_password"]').type('pass');
    cy.get('input[id="input_confirm_password"]').type('differentpass');

    cy.get('button[type="submit"]').click();

    cy.contains(errorsData?.email).should('exist');
    cy.contains(errorsData?.password).should('exist');
    cy.contains(errorsData?.confirm_password).should('exist');
  });

  it('should handle backend API errors gracefully', () => {
    cy.contains('a', 'Register Account').click();
    cy.url().should('include', '/register');

    cy.get('input[id="input_fullname"]').type('John Doe');
    cy.get('input[id="input_username"]').type('johndoe');
    cy.get('input[id="input_email"]').type('john.doe@example.com');
    cy.get('input[id="input_password"]').type('Password123!');
    cy.get('input[id="input_confirm_password"]').type('Password123!');

    cy.intercept('POST', '**/register', {
      statusCode: 400,
      body: { error: 'Registration failed' },
    }).as('registerRequest');

    cy.get('button[type="submit"]').click();

    cy.wait('@registerRequest');

    cy.contains(errorsData.form_error).should('exist');

    cy.url().should('include', '/register');
  });
});
