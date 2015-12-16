Feature: Mirror Pro Layout Tools
	As a user of Mirror Pro
	I want to use the Layout Tools       

    Scenario: Using the Layout Tools
        Given I'm using the "Layout Tools"
        Then I see some buttons disabled
        When I press the "add desks" button and next the "remove desks" button      
        Then I should see the same layout of the beginning
        When I press the "selectable" button
        Then I see the "merge" button is enable
        