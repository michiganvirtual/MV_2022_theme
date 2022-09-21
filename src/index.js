const { event } = require("jquery");
const $ = require("jquery");
require("jquery-ui/ui/widgets/draggable");
require("jquery-ui/ui/widgets/droppable");

$(document).ready(function () {
  var bsContainer = true;
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

  var accordionButtons = $(".accordion-controls li a");
  accordionButtons.attr("tabindex", "0");

  $(".accordion-controls li a").on("click", function (e) {
    e.preventDefault();
    $control = $(this);
    accordionContent = $control.attr("aria-controls");
    checkOthers($control[0]);

    isAriaExp = $control.attr("aria-expanded");
    newAriaExp = isAriaExp == "false" ? "true" : "false";
    $control.attr("aria-expanded", newAriaExp);

    isAriaHid = $("#" + accordionContent).attr("aria-hidden");
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

  $(".accordion-controls li a").keypress(function (e) {
    e.preventDefault();
    if (e.which == 13) {
      $control = $(this);
      accordionContent = $control.attr("aria-controls");
      checkOthers($control[0]);

      isAriaExp = $control.attr("aria-expanded");
      newAriaExp = isAriaExp == "false" ? "true" : "false";
      $control.attr("aria-expanded", newAriaExp);

      isAriaHid = $("#" + accordionContent).attr("aria-hidden");
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

  function accordionAction(e) {
    console.log(e);
  }

  function checkOthers(elem) {
    for (var i = 0; i < accordionButtons.length; i++) {
      if (accordionButtons[i] != elem) {
        if ($(accordionButtons[i]).attr("aria-expanded") == "true") {
          $(accordionButtons[i]).attr("aria-expanded", "false");
          content = $(accordionButtons[i]).attr("aria-controls");
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

  $("#matching_dropdown").on("submit", function (e) {
    e.preventDefault();

    var questions = $(".question_wrapper");
    var answer = "";
    var submittedAnswer = "";
    var numCorrect = 0;
    for (var i = 0; i < questions.length; i++) {
      $(questions[i]).removeClass("bg-red-500 text-white border-white");
      var answer = $(questions[i]).children("label").attr("data-answer");
      var submittedAnswer = $(questions[i]).children("select").val();
      if (answer == submittedAnswer) {
        numCorrect++;
      } else {
        $(questions[i]).addClass("bg-red-500 text-white border-white");
      }
    }
    console.log("Number Correct: " + numCorrect);
  });
});
