Feature: Mirror Pro Layout Tools
	As a user of Mirror Pro
	I want to use the Layout Tools       

    Scenario: Using the Layout Tools
        Given I'm using the "Layout Tools"
        Then I see some buttons disabled
        When I press the "add desks" button or I press the "remove desks" button      
        Then I should see the layout change