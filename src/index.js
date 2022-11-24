const { event } = require("jquery");
const $ = require("jquery");
require("jquery-ui");
//import "jquery-ui/themes/base/all.css";
require("jquery-ui/ui/widgets/draggable");
require("jquery-ui/ui/widgets/droppable");
require("jquery-ui/ui/widgets/slider");
require("jquery-ui/ui/widgets/selectable");
require("./touch-punch");
import scenario from "./military-scenario.json";

$(document).ready(function () {
  var bsContainer = false;
  var bsStyles = {
    "max-width": "1230px",
    margin: "0 auto",
    padding: "0 30px",
  };
  var bsMobileStyles = {
    padding: "0 54px",
  };

  if (bsContainer) {
    $("body").css(bsStyles);
    if (screen.width < 930) {
      console.log("little screen");
      $("body").css(bsMobileStyles);
    }
  }

  $(".flip-card").attr("tabindex", "0");
  $(".flip-card").keypress(function (e) {
    e.preventDefault();
    $(this).children(".flip-card-inner").toggleClass("flipped");
  });

  var accordionButtons = $(".accordion-controls li > a.block");
  accordionButtons.attr("tabindex", "0");

  $(".accordion-controls li > a.block").on("click", function (e) {
    //e.preventDefault();
    var $control = $(this);
    var accordionContent = $control.attr("aria-controls");
    checkOthers($control[0]);

    var isAriaExp = $control.attr("aria-expanded");
    var newAriaExp = isAriaExp == "false" ? "true" : "false";
    $control.attr("aria-expanded", newAriaExp);

    var isAriaHid = $("#" + accordionContent).attr("aria-hidden");
    if (isAriaHid == "true") {
      $("#" + accordionContent).attr("aria-hidden", "false");
      $("#" + accordionContent).toggleClass("max-h-full");
      $control.find("img.accordion__toggle").toggleClass("rotate-180");
      $("#" + accordionContent).css(
        "max-height",
        $("#" + accordionContent)[0].scrollHeight
      );
    } else {
      $("#" + accordionContent).attr("aria-hidden", "true");
      $("#" + accordionContent).toggleClass("max-h-full");
      $control.find("img.accordion__toggle").toggleClass("rotate-180");
      $("#" + accordionContent).css("max-height", 0);
    }
  });

  $(".accordion-controls li > a.block").keypress(function (e) {
    e.preventDefault();
    if (e.which == 13) {
      var $control = $(this);
      var accordionContent = $control.attr("aria-controls");
      checkOthers($control[0]);

      var isAriaExp = $control.attr("aria-expanded");
      var newAriaExp = isAriaExp == "false" ? "true" : "false";
      $control.attr("aria-expanded", newAriaExp);

      var isAriaHid = $("#" + accordionContent).attr("aria-hidden");
      if (isAriaHid == "true") {
        $("#" + accordionContent).attr("aria-hidden", "false");
        $("#" + accordionContent).toggleClass("max-h-full");
        $control.find("img.accordion__toggle").toggleClass("rotate-180");
        $("#" + accordionContent).css(
          "max-height",
          $("#" + accordionContent)[0].scrollHeight
        );
      } else {
        $("#" + accordionContent).attr("aria-hidden", "true");
        $("#" + accordionContent).toggleClass("max-h-full");
        $control.find("img.accordion__toggle").toggleClass("rotate-180");
        $("#" + accordionContent).css("max-height", 0);
      }
    }
  });

  function checkOthers(elem) {
    for (var i = 0; i < accordionButtons.length; i++) {
      if (accordionButtons[i] != elem) {
        if ($(accordionButtons[i]).attr("aria-expanded") == "true") {
          $(accordionButtons[i]).attr("aria-expanded", "false");
          var content = $(accordionButtons[i]).attr("aria-controls");
          $("#" + content).attr("aria-hidden", "true");
          $("#" + content).toggleClass("h-auto");
          $(accordionButtons[i])
            .find("img.accordion__toggle")
            .toggleClass("rotate-180");
          $("#" + content).css("max-height", 0);
        }
      }
    }
  }

  $(".tabs li a:not(:first)").addClass("inactive");
  $(".tabs li a:first").addClass("bg-deep-teal text-white");

  $(".tabs__content>div:not(:first)").addClass("hidden");

  $(".tabs li a").on("click", function () {
    var t = $(this).attr("id");
    if ($(this).hasClass("inactive")) {
      //this is the start of our condition
      $(".tabs li a")
        .removeClass("bg-deep-teal text-white")
        .addClass("inactive");
      $(this).removeClass("inactive").addClass("bg-deep-teal text-white");

      $(".tabs__content>div").addClass("hidden");
      $(".tabs__content>#" + t).removeClass("hidden");
    }
  });

  /* Drag & Drop Activity */
  var wrongCount = 0;
  var rightCount = 0;

  $(".draggable span").draggable({
    revert: function (droppableContainer) {
      if (!droppableContainer) {
        if (wrongCount < 3) {
          wrongCount++;
        }
      }
      if (wrongCount === 3) {
        $(".feedback").removeClass("invisible");
      }
      return !droppableContainer; //returns the draggable to its original position
    },
  });

  $(".droppable").droppable({
    drop: function (event, ui) {
      ui.draggable.detach().appendTo($(this));
      ui.draggable
        .css("position", "initial")
        .css("display", "inline-block")
        .removeClass("bg-deep-teal")
        .addClass("bg-light-teal");
      rightCount++;
      /* Logic for 3-13  */
      if (rightCount == 4) {
        $(".terms").addClass("invisible");
        $(".feedback")
          .removeClass("invisible text-xl text-red-500")
          .addClass("text-deep-teal text-2xl")
          .text(
            "Nice job! You have correctly matched the surface hygiene terms to their definitions!"
          );
      }
      if (rightCount == 14) {
        $(".examples").addClass("hidden");
        $(".feedback")
          .removeClass("invisible text-xl text-red-500")
          .addClass("text-deep-teal text-2xl")
          .text(
            "Nice job! You have correctly identified the medication with the route of administration!"
          );
      }
    },
  });
  $("#oral").droppable({ accept: "span.oral" });
  $("#topical").droppable({ accept: "span.topical" });
  $("#inhalant").droppable({ accept: "span.inhalant" });
  $("#injectable").droppable({
    accept: "span.injectable",
  });

  $("#bodily-fluids").droppable({ accept: "span.bodily-fluids" });
  $("#clean").droppable({ accept: "span.clean" });
  $("#sanitize").droppable({ accept: "span.sanitize" });
  $("#disinfect").droppable({
    accept: "span.disinfect",
  });

  /*    Food Allergens Participation Exercise     */
  $(".food-allergens__form").on("submit", function (e) {
    e.preventDefault();
    var answer = $(".food-allergens__form textarea").val();
    $(".food-allergens__form textarea, .food-allergens__form button ").addClass(
      "hidden"
    );
    $(".food-allergens__validation").removeClass("hidden");
    $(".food-allergens__answer").text(answer);
  });

  /* Matching Dropdown Activity */
  $("#matching_dropdown").on("submit", function (e) {
    e.preventDefault();
    var questions = $(".question_wrapper");
    var answer = "";
    var submittedAnswer = "";
    var numCorrect = 0;
    var validationMessage = "";
    for (var i = 0; i < questions.length; i++) {
      $(questions[i]).removeClass("text-red-500 font-bold");
      var answer = $(questions[i]).children("label").attr("data-answer");
      var submittedAnswer = $(questions[i]).children("select").val();
      if (answer == submittedAnswer) {
        numCorrect++;
        $(questions[i])
          .children("label")
          .removeClass("text-red-500 font-bold")
          .addClass("text-ada-green line-through");
      } else {
        $(questions[i])
          .children("label")
          .removeClass("text-ada-green line-through");
        $(questions[i]).children("label").addClass("text-red-500 font-bold");
      }
    }
    if (numCorrect == questions.length) {
      validationMessage = "Great Job! You answered each question correctly.";
    } else {
      validationMessage =
        "It looks like you didn't get the answer to all of the questions correct. We have highlighted the missed questions in red. \n\nIf you're stuck, click the 'Display Answers' button below to review information.";
    }
    alert(validationMessage);
  });
  $("#display-answers").on("click", function (e) {
    e.preventDefault();
    $("#answers-table").removeClass("hidden");
  });
  $("#answers-table .close-btn").on("click", function (e) {
    e.preventDefault();
    $("#answers-table").addClass("hidden");
  });

  /*    Food Allergens Participation Exercise     */
  $("#pros-cons").on("submit", function (e) {
    e.preventDefault();
    var selects = $("select");
    var unselected = 0;
    for (let i = 0; i < selects.length; i++) {
      if (selects[i].value == "") {
        unselected++;
      }
    }
    if (unselected > 0) {
      alert("Please complete the form.");
      unselected = 0;
      return;
    }
    $("select").attr("disabled", true);
    $(":submit").addClass("invisible");
    $(".validation").removeClass("invisible");
  });

  /****   Scenarios Logic  *****/
  let eventCount = 0;

  $(".response-container").selectable({
    create: function (event, ui) {
      let events = scenario.events;
      $("#scenario-body").html(scenario.setup);
    },
    selected: function (event, ui) {
      $(ui.selected).toggleClass("bg-deep-teal text-white text-deep-teal");
      $(ui.selected)
        .addClass("ui-selected")
        .siblings()
        .removeClass("ui-selected");
      $("#next-btn").attr("disabled", false);
    },
    unselected: function (event, ui) {
      $(ui.unselected).toggleClass("bg-deep-teal text-white text-deep-teal");
    },
    stop: function () {},
  });

  //Button Logic
  $("#next-btn").on("click", function () {
    updateEvent(eventCount);
    $("#respond-btn").removeClass("hidden");
    $(".response-container").selectable("enable");
  });

  $("#respond-btn").on("click", function () {
    let optionIndex = $(".ui-selected").index();
    $("#scenario-body").html(
      scenario.events[eventCount].options[optionIndex].ending
    );
    if ($(".ui-selected").attr("data-answer") == "true") {
      eventCount++;
      $("#next-btn").text("Next Scene").removeClass("hidden");
    } else {
      $("#next-btn").text("Try Again").removeClass("hidden");
    }
    $("#respond-btn").addClass("hidden");
    $(".response-container").selectable("disable");
  });
});

//Function to Update Event Body and Responses
function updateEvent(count) {
  $("#scenario-body").html(scenario.events[count].body);
  $(".response-container").html("");
  let options = scenario.events[count].options;

  $("#next-btn").addClass("hidden");

  for (let i = 0; i < options.length; i++) {
    console.log(options[i].correct);
    let optionBody =
      "<li class='w-full text-center border-2 border-deep-teal text-deep-teal p-4 mb-4' data-answer='" +
      options[i].correct +
      "'>" +
      options[i].text +
      "</li>";
    $(".response-container").append(optionBody);
  }
  return;
}

function checkResponse(count) {}

function submitEvent(count) {
  $("#scenario-body").html(scenario.events[count].ending);
  $(".response-container").selectable({});
}
