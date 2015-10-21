Feature: Mirror Pro GUI
	As a user of Mirror Pro
	I want to have a nice interface
	So that I will be happy to use Mirro Pro

    Scenario: Visit Mirror Pro
        Given I am on the Mirror Pro page
        When I see the page
        Then It should have "workspace" container
        Then the container should have a "LookAndFeel" sizes greater than zero
        Then the menu should have a "LookAndFeel" sizes greater than zero
        Then the menu should have sizes greater than zero in the "body" panel
        Then the menu should have sizes greater than zero in the "main" panel
        Then the menu should have mutiple blocks
         
