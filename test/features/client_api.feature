Feature: Mirror Pro API
	As a developer of Mirror Pro
	I want to use the API
	So that I can check some cool informations

    Scenario: Get Information From The API
        Given I am on the Mirror Pro page
        When I use the API
        Then I should see if the "workspace" container exist
        Then I should see if the browser has support for WebGL context
        Then I should see the browser name I'm using
        Then I should fire the "numberofblockschange" event