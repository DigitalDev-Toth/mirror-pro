Feature: Mirror Pro Layout Tools
	As a user of Mirror Pro
	I want to use the Layout Tools

  Scenario: Using the Layout Tools
    Given I'm using the "Layout Tools"
    Then I see some buttons disabled
    When I press four times the "add desks" button and next one time the "remove desks" button
    Then I should see four "desks" into the layout
    When I press the "selectable" button
    Then I should see the "merge" button is enabled
    Then I can select a "desk" clicking on it
    Then I can unselect a "desk" selected clicking on it once again
    Then I can merge two selected "desks"
    Then I should see the "less" and "more" buttons disabled
    Then I can undone and redone the merge
    Then I can save the custom layout
    When I press once again the "selectable" button
    Then I should see the "merge" button disabled again
    When I press the "resizable" button and the "selectable" tool is on
    Then I should see the "merge" button disabled
    Then I can resize the edges of the "desks"
    Then I can cancel the custom layout
    When I select a predefined layout and the window size is too small
    Then I should see the "dialog" alert telling me it's imposible to draw the layout
    When I select a predefined layout and the window size is fine
    Then I should see the predefined layout selected on the "panel-layout"
    When I try to merge two "desks" non-lineals
    Then I should see the "dialog" alert telling me it's imposible to merge those "desks"
    When I merge two "desks" correctly
    Then I should see the "reset" button enabled
    When I press the "reset" button
    Then I should see the predefined layout back to initial state
