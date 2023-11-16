Note 1:
This section of code addresses a bug in the auto-formatting of the phone number.
In short, hyphens are added to the phone number dynamically whenever a change is made.
As such, when attempting to backspace a hyphen, no numbers are deleted, and the hyphen will be automatically re-added.
e.g. "518-" when backspaced becomes "518" which gets auto-formatted back to "518-", leaving the user in an endless loop.

This code is a quick hack to delete an additional character when trying to backspace a hyphen, so...
e.g. "518-" when backspaced becomes "51". This is more in line with the user's expectations in this scenario anyway.


Note 1.1 - known bug: 
This quick hack is just that...quick and hacky. If the phone number ends in a hyphen, and the cursor isn't at the end of the 
string when trying to backspace, weird things happen.
e.g. "518-123-", if you try to backspace the 8, will produce "518-12". It will always delete the last number in this scenario.


Note 2:
The State selector is implemented as a standard dropdown instead of a combo box, as follows:
```
<div class="field">
    <select id="state" name="state" required> </select> 
</div>
```
A true combo box (as requested in the requirements), would be implemented as follows. 
```
<div class="field">
    <input type="text" name="state" id="state" list="states" required>
</div>
<datalist id="states">
```
In testing, I felt the actual user experience of a combo box was a bit clumsy, and the 
standard dropdown provided a much more familiar experience as a user filling out a form
with person data in it.


Note 3:
It is assumed that all fields are required (which is handled in the HTML automatically), but 
any additional front-end validation on the fields could be handled here. 

Granted, it is assumed that necessary validation will also occur in the backend.


Note 4:
This $.each loop rearranges the way the data is presented by default. It initially is:
`[{"name":"employeeName","value":"John Doe"},{"name":"employeeNumber","value":"123456"},...]`
Then after our loop, it will be:
`{"employeeName": "John Doe", "employeeNumber": "123456", ...}`
Much better!

Note 5:
Some notes here. Since we're just submitting the request to a mock endpoint, the request will fail.
I've switched the success and error case logic, so we can see the logic of a success case,
i.e. clearing the fields, and displaying a success message, even though it can't find the endpoint.

The actual failure scenario code is currently very basic, but if we were to have a real backend to submit requests to,
we would likely capture some failure information from the response, and display a user-appropriate message, perhaps like:
"Error: Employee Number {x} already exists.", depending on the validating logic in the backend. 