Feature: Mirror Pro API
	As a developer of Mirror Pro
	I want to use the API
	So that I can check some cool informations

    Scenario: Get Information From The API
        Given I am developing for Mirror Pro
        When I use the API
        Then I should know if the "workspace" container exist
        Then I should know if the browser has support for WebGL context or just for Canvas2D
        Then I should know the browser name I'm using
        Then I should be able to fire the "numberofblockschange" event