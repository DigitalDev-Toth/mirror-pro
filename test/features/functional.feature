Feature: Mirror Pro Functionalities
	As a user of Mirror Pro
	I want to interact with the system
	So that I can use Mirror Pro

    Scenario: Use Mirror Pro
        Given I am on the Mirror Pro page
        When I see the page
        Then I should see "Mirror Pro" as the page title
        Then I should see the "perfect scrollbar" when the mouse pointer it's over the menu        

    Scenario: Use Layout Tools
        Given I'm using the "Layout Tools"
        Then I see some buttons disabled
        When I press the "add desks" button or I press the "remove desks" button      
        Then I should see the layout change 
        Then I should see the "total of desks" number change         