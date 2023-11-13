var states = [
    { name: "Alabama", value: "AL"},
    { name: "Alaska", value: "AK"},
    { name: "Arizona", value: "AZ"},
    { name: "Arkansas", value: "AR"},
    { name: "California", value: "CA"},
    { name: "Colorado", value: "CO"},
    { name: "Connecticut", value: "CT"},
    { name: "Delaware", value: "DE"},
    { name: "Florida", value: "FL"},
    { name: "Georgia", value: "GA"},
    { name: "Hawaii", value: "HI"},
    { name: "Idaho", value: "ID"},
    { name: "Illinois", value: "IL"},
    { name: "Indiana", value: "IN"},
    { name: "Iowa", value: "IO"},
    { name: "Kansas", value: "KS"},
    { name: "Kentucky", value: "KY"},
    { name: "Louisiana", value: "LA"},
    { name: "Maine", value: "ME"},
    { name: "Maryland", value: "MD"},
    { name: "Massachusetts", value: "MA"},
    { name: "Michigan", value: "MI"},
    { name: "Minnesota", value: "MN"},
    { name: "Mississippi", value: "MS"},
    { name: "Missouri", value: "MO"},
    { name: "Montana", value: "MN"},
    { name: "Nebraska", value: "NE"},
    { name: "Nevada", value: "NV"},
    { name: "New Hampshire", value: "NH"},
    { name: "New Jersey", value: "NJ"},
    { name: "New Mexico", value: "NM"},
    { name: "New York", value: "NY"},
    { name: "North Carolina", value: "NC"},
    { name: "North Dakota", value: "ND"},
    { name: "Ohio", value: "OH"},
    { name: "Oklahoma", value: "OK"},
    { name: "Oregon", value: "OR"},
    { name: "Pennsylvania", value: "PA"},
    { name: "Rhode Island", value: "RI"},
    { name: "South Carolina", value: "SC"},
    { name: "South Dakota", value: "SD"},
    { name: "Tennessee", value: "TN"},
    { name: "Texas", value: "TX"},
    { name: "Utah", value: "UT"},
    { name: "Vermont", value: "VT"},
    { name: "Virginia", value: "VA"},
    { name: "Washington", value: "WA"},
    { name: "West Virginia", value: "WV"},
    { name: "Wisconsin", value: "WI"},
    { name: "Wyoming", value: "WY"},    
]

function populateStates() {
    var stateSelector = $("#state");
    $("#state").append($('<option>', {
        value: "",
        text: ""
    }));
    $.each(states, function (i, item) {
        $("#state").append($('<option>', {
            value: item.value,
            text: item.name
        }));
    });
}

function validateInput() {
    console.log("Validating...");
    $("form#employeeInfoForm :input").each(function() {
        var input = $(this);
        /*if (input.checkValidity()) {
            input.hide();
        }*/
    });
}

function formatPhoneNumber() {
    // TODO - backspaces for -
    // TODO - Parens for area code? or nah
    var phoneNumberInput = $("#phoneNumber");
    var phoneText = phoneNumberInput[0].value;
    phoneText = phoneText.replaceAll('-', '');
    if (phoneText === '') {
        return;
    }
    if (phoneText.length >= 6) {
        phoneNumberInput[0].value = phoneText.slice(0,3) + '-' + phoneText.slice(3,6) + '-' + phoneText.slice(6);
    } else if (phoneText.length >= 3) {
        phoneNumberInput[0].value = phoneText.slice(0,3) + '-' + phoneText.slice(3);
    }
    
    console.log(phoneNumberInput[0].value);
}

function jsonify() {
    var json = $("#employeeInfoForm").serializeArray();

    var result_json = {};
    $.each(json, function() {
        result_json[this.name] = this.value;
    });

    return JSON.stringify(result_json);
}

function submitRequest(json) {
    console.log(json);
    //var headers = new Headers();
    //headers.append()
    $.post({
        url: "./mock-url", 
        data: json,
        success: function (result_data) {
            $("input").val('');
            $("select").trigger('reset');
            $('#submitStatusText').text("Error! There were problems with your submission.");
        },
        error: function (result, status, error) {
            $("#employeeInfoForm").find('input:text, [type="tel"], select').val('');
            $("#employeeInfoForm").find('input:checkbox').removeAttr('checked').removeAttr('selected');
            $('#submitStatusText').text("Success! Employee data submitted.");
        }
    });
}