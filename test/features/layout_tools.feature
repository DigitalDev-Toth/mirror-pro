Feature: Mirror Pro Layout Tools
	As a user of Mirror Pro
	I want to use the Layout Tools

    Scenario: Using the Layout Tools
        Given I'm using the "Layout Tools"
        Then I see some buttons disabled
        When I press three times the "add desks" button and next two times the "remove desks" button
        Then I should see two desks into the layout
        When I press the "selectable" button
        Then I see the "merge" button is enabled        