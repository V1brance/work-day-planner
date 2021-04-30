$(".saveBtn").on("click", function (event) {
  var whichTime = $(event.target).attr("id");
  var inputSelector = whichTime + "event-area";
  var inputEvent = $("#" + inputSelector).val();
  var savedEvent = localStorage.setItem(inputSelector, inputEvent);
  refreshElements();
});

function refreshElements() {
  $("input").each(function () {
    var inputArea = $(this).attr("id");
    console.log(inputArea);
    var savedText = localStorage.getItem(inputArea);
    $(this).attr("placeholder", savedText);
    updateTime(inputArea);
  });
}

function updateTime(timeSlot) {
  var time = moment();
  slotTime = parseInt(timeSlot.split("-")[0]);
  if (slotTime > 6 && slotTime !== 12) {
    slotTime += " am";
  } else {
    slotTime += " pm";
  }
  var slotMoment = moment(slotTime, "h a");
  var timeDiff = time.diff(slotMoment, "minutes");
  console.log(slotTime + " " + timeDiff);
  var otherClasses = " form-control h-100";
  if (timeDiff > 60) {
    $("#" + timeSlot).attr("class", "past" + otherClasses);
    $("#" + timeSlot).prop("disabled", true);
  } else if (timeDiff < 0) {
    $("#" + timeSlot).attr("class", "future" + otherClasses);
  } else {
    $("#" + timeSlot).attr("class", "present" + otherClasses);
  }
}

refreshElements();
