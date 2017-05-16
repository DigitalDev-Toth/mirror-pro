Feature: Mirror Pro GUI
	As a user of Mirror Pro
	I want to have a nice interface
	So that I will be happy to use Mirro Pro

  Scenario: Visit Mirror Pro
    Given the Mirror Pro page is opened
    When the GUI is loaded
    Then It should have a "mirror-pro" container
    Then the container should have a "Component" sizes greater than zero
    Then the menu should have a "Component" sizes greater than zero
    Then the menu should have sizes greater than zero in the "primary" panel
    Then the menu should have sizes greater than zero in the "secondary" panel
    Then the menu should have unless one block
    Then the "layout" should have unless one desk
