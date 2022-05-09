import { competencyCards, competencyCard } from '../../../mocks/competencies';
import {
  getCompetencyCardsRoute,
  getCompetencyCardNewRoute,
  getCompetencyCardEditRoute,
} from '../../../src/shared/lib/routeBuilder';

describe('testing competency cards', () => {
  const competencyEditCardId = 1;
  const competenciesContainer = 'competencies-container';
  const competencySearch = 'competency-search';
  const menuOnButtonButton = 'menuonbutton-button';
  const menuOnButtonMenu = 'menuonbutton-menu';
  const confirmationModal = 'confirmation-modal';
  const confirmationModalTitle = 'confirmation-title';
  const confirmationModalText = 'confirmation-description';
  const confirmationModalYesButton = 'confirmation-button-yes';
  const confirmationModalNoButton = 'confirmation-button-no';
  const competencyCardFormTitle = 'competency-card-form-title';

  const editText = 'Редактировать';
  const removeText = 'Удалить';
  const requiredFieldText = 'Это обязательное поле';

  beforeEach(() => {
    cy.intercept('GET', 'v1/competencies/', {
      statusCode: 200,
      body: competencyCards,
    }).as('getCompetencies');

    cy.intercept('GET', 'v1/competencies/*', {
      statusCode: 200,
      body: competencyCard(competencyEditCardId),
    }).as('getCompetency');

    cy.intercept('PUT', 'v1/competencies/*', {
      statusCode: 200,
      body: competencyCard(competencyEditCardId),
    }).as('putCompetency');

    cy.intercept('DELETE', 'v1/competencies/*', {
      statusCode: 200,
      body: { success: true },
    }).as('removeCompetency');
  });

  const typeHTML5OnSearchFilter = () => {
    cy.findByTestId(competencySearch).find('input').type('HTML5');
  };

  it('should all competency cards be rendered', () => {
    cy.visit(getCompetencyCardsRoute());
    cy.findByTestId(competenciesContainer).should('exist');
    cy.wait('@getCompetencies').then(({ response }) => {
      const { body: competencies } = response;
      expect(response.body).to.deep.eq(competencyCards);
      competencies.forEach(({ title }) => {
        cy.findByText(title).should('exist');
      });
    });
  });

  it('should redirect to new card work', () => {
    cy.visit(getCompetencyCardsRoute());
    const addTextButton = 'Добавить';
    cy.findByText(addTextButton).should('exist');
    cy.findByText(addTextButton).click();
    cy.url().should('include', getCompetencyCardNewRoute());
  });

  it('should redirect to edit card', () => {
    cy.visit(getCompetencyCardsRoute());
    typeHTML5OnSearchFilter();
    cy.findByTestId(menuOnButtonButton).click();
    cy.findByText(editText).click();
    cy.url().should(
      'include',
      getCompetencyCardEditRoute(competencyEditCardId)
    );
  });

  it('testing edit form', () => {
    cy.visit(getCompetencyCardEditRoute(competencyEditCardId));

    cy.wait('@getCompetency').then(({ response }) => {
      expect(response.body).to.deep.eq(competencyCard(competencyEditCardId));
    });

    cy.wait(1000);
    cy.findByTestId(competencyCardFormTitle).find('input').as('titleInput');
    cy.get('@titleInput').clear();
    cy.findByText(editText).click();
    cy.findByText(requiredFieldText).should('exist');
    cy.get('@titleInput')
      .type('Javascript Test')
      .should('have.value', 'Javascript Test');
    cy.findByText(requiredFieldText).should('not.exist');
    cy.findByText(editText).click();

    cy.wait('@putCompetency').then(({ request, response }) => {
      expect(request.body.title).to.equal('Javascript Test');
      expect(response.body).to.deep.eq(competencyCard(competencyEditCardId));
    });
  });

  it('testing competency card settings', () => {
    cy.visit(getCompetencyCardsRoute());
    typeHTML5OnSearchFilter();
    cy.findByTestId(menuOnButtonButton).should('exist');
    cy.findByTestId(menuOnButtonMenu).should('not.exist');
    cy.findByTestId(menuOnButtonButton).click();
    cy.findByTestId(menuOnButtonMenu).should('exist');
    cy.findByText(editText).should('exist');
    cy.findByText(removeText).should('exist');
    cy.get('body').click();
    cy.findByTestId(menuOnButtonMenu).should('not.exist');
  });

  it('testing remove modal', () => {
    cy.visit(getCompetencyCardsRoute());
    typeHTML5OnSearchFilter();
    cy.findByTestId(menuOnButtonButton).click();
    cy.findByTestId(confirmationModal).should('not.exist');
    cy.findByText(removeText).click();
    cy.findByTestId(confirmationModal).should('exist');
    cy.findByTestId(confirmationModalTitle).should('exist');
    cy.findByTestId(confirmationModalText).should('exist');
    cy.findByTestId(confirmationModalYesButton).should('exist');
    cy.findByTestId(confirmationModalNoButton).should('exist');
    cy.findByTestId(confirmationModalNoButton).click();
    cy.findByTestId(confirmationModal).should('not.exist');
    cy.findByTestId(menuOnButtonButton).click();
    cy.findByText(removeText).click();
    cy.findByTestId(confirmationModalYesButton).click();

    cy.wait('@removeCompetency').then(({ response }) => {
      expect(response.body).to.deep.eq({ success: true });
    });
  });
});

