const { event } = require("jquery");
const $ = require("jquery");
require("jquery-ui");
//import "jquery-ui/themes/base/all.css";
require("jquery-ui/ui/widgets/draggable");
require("jquery-ui/ui/widgets/droppable");
require("jquery-ui/ui/widgets/slider");
require("jquery-ui/ui/widgets/selectable");
require("./js/touch-punch");
require("./js/slick");
import Sortable from "sortablejs";

$(document).ready(function () {
  var bsContainer = false;
  var bsStyles = {
    "max-width": "1230px",
    margin: "0 auto",
    padding: "0 30px",
    "overflow-x": "hidden",
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

  //Add aria-hidden=true to all H1 tags
  if ($("h1").length) {
    $("h1")[0].setAttribute("aria-hidden", true);
  }

  //Add pause function to Gifs
  if ($(".pausable-gif").length) {
    for (var i = 0; i < $(".pausable-gif").length; i++) {
      $(".pausable-gif img").attr(
        "src",
        $(".pausable-gif img").attr("data-gif-src")
      );
    }
  }
  $(".pausable-gif details").on("click", function () {
    var img = $(this).siblings("img");
    var gif = img.attr("data-gif-src");
    var still = img.attr("data-still-src");
    img.attr("src", function (index, attr) {
      return attr == gif ? still : gif;
    });
  });

  $(".flip-card").attr("tabindex", "0");
  $(".flip-card").keypress(function (e) {
    e.preventDefault();
    $(this).children(".flip-card-inner").toggleClass("flipped");
  });

  if ($("ul.accordion-controls").length) {
    for (var i = 0; i < $("ul.accordion-controls").length; i++) {
      $("ul.accordion-controls")[i].setAttribute("role", "menu");
    }
  }
  if ($("ul.accordion-controls>li").length) {
    $("ul.accordion-controls>li")
      .attr("role", "menuitem")
      .attr("aria-hidden", "false")
      .find("a.block")
      .removeAttr("aria-expanded");
  }

  var accordionButtons = $("ul.accordion-controls li");
  accordionButtons.attr("tabindex", "0");

  $(".accordion-controls > li > a").on("click", function (e) {
    e.preventDefault();
    var $control = $(this);
    var $content = $("#" + $control.attr("aria-controls"));
    var $toggleIcon = $control.find("img.accordion__toggle");
    var isExpanded = $control.attr("aria-expanded") === "true";

    // Close currently open accordions
    //closeOpenAccordions($control);

    // Toggle aria-expanded attribute
    $control.attr("aria-expanded", !isExpanded);

    // Toggle aria-hidden attribute and max-height for content
    $content.attr("aria-hidden", isExpanded);
    $content.toggleClass("max-h-full");

    if (!isExpanded) {
      $content.css("max-height", $content[0].scrollHeight);
      $toggleIcon.addClass("rotate-180");
    } else {
      $content.css("max-height", 0);
      $toggleIcon.removeClass("rotate-180");
    }
  });

  $(".accordion-controls > li > a").keypress(function (e) {
    if (e.which === 13) {
      $(this).click();
    }
  });

  function closeOpenAccordions(excludedControl) {
    var allControls = $(".accordion-controls > li > a");
    allControls.each(function () {
      var $this = $(this);
      if (
        $this.attr("aria-expanded") === "true" &&
        !$this.is(excludedControl)
      ) {
        $this.click();
      }
    });
  }

  /* Slideshow */
  $("#slideshow").slick({
    accessibility: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow:
      '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
  });

  /* Begin Sortable Activity Rules */

  /* End Sortable Activity Rules */

  /* Tabs  */
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
      $(".video-container iframe").each(function () {
        var el_src = $(this).attr("src");
        $(this).attr("src", el_src);
      });
    }
  });

  /* Tabs but White */
  $(".tabs-white li a:not(:first)").addClass("inactive");
  $(".tabs-white li:first").addClass("tab-active");
  $(".tabs-white li a:first")
    .addClass("bg-white text-dark-grey")
    .removeClass("text-white");
  $(".tabs-white__content>div:not(:first)").addClass("hidden");
  $(".tabs-white li a").on("click", function () {
    console.log("clicked");
    var t = $(this).attr("id");
    if ($(this).hasClass("inactive")) {
      // Remove tab-active from all tabs first
      $(".tabs-white li").removeClass("tab-active");
      //this is the start of our condition
      $(".tabs-white li a")
        .removeClass("bg-white text-dark-gray")
        .addClass("inactive");
      $(this).removeClass("inactive").addClass("bg-white text-dark-gray");
      $(this).parent().addClass("tab-active");

      $(".tabs-white__content>div").addClass("hidden");
      $(".tabs-white__content>#" + t).removeClass("hidden");
      $(".video-container iframe").each(function () {
        var el_src = $(this).attr("src");
        $(this).attr("src", el_src);
      });
    }
  });

  /* Tabs but Dark Teal */
  $(".tabs-dark-teal li a:not(:first)").addClass("inactive");
  $(".tabs-dark-teal li a:first").addClass("bg-dark-teal text-white");
  $(".tabs-dark-teal__content>div:not(:first)").addClass("hidden");
  $(".tabs-dark-teal li a").on("click", function () {
    var t = $(this).attr("id");
    if ($(this).hasClass("inactive")) {
      //this is the start of our condition
      $(".tabs-dark-teal li a")
        .removeClass("bg-dark-teal text-white")
        .addClass("inactive");
      $(this).removeClass("inactive").addClass("bg-dark-teal text-white");

      $(".tabs-dark-teal__content>div").addClass("hidden");
      $(".tabs-dark-teal__content>#" + t).removeClass("hidden");
      $(".video-container iframe").each(function () {
        var el_src = $(this).attr("src");
        $(this).attr("src", el_src);
      });
    }
  });

  // Drag-and-drop logic
  const draggableElements = document.querySelectorAll("span.draggable");
  const droppableContainers = document.querySelectorAll(".droppable");

  /*  Drag & Drop Activity  */
  var wrongCount = 0;
  var rightCount = 0;
  var answerCount = $("#answer-count")[0];
  if ($("#total-answers").length) {
    var totalExamplesInit = $("#total-answers")[0].innerHTML;
  }
  var totalExamples = $(".draggable > span").length;
  var examplesRemaining = totalExamples;

  if ($("#answer-count").length) {
    $("#answer-count")[0].innerHTML = totalExamples;
  }

  $(".draggable>span").draggable({
    revert: function (droppableContainer) {
      if (!droppableContainer) {
        if (wrongCount < 3) {
          wrongCount++;
        }
      }
      if (wrongCount === 3) {
        $(".feedback.review").removeClass("invisible");
      }
      //return !droppableContainer; //returns the draggable to its original position
    },
  });
  var stop = true;
  $(".draggable>span").on("drag", function (e) {
    stop = true;

    if (e.originalEvent.clientY < 150) {
      stop = false;
      scroll(-1);
    }

    if (e.originalEvent.clientY > $(window).height() - 150) {
      stop = false;
      scroll(1);
    }
  });
  $(".draggable>span").on("touchstart", function (e) {
    stop = true;

    if (e.originalEvent.clientY < 150) {
      stop = false;
      scroll(-1);
    }

    if (e.originalEvent.clientY > $(window).height() - 150) {
      stop = false;
      scroll(1);
    }
  });

  $(".draggable>span").on("dragend", function (e) {
    stop = true;
  });
  $(".draggable>span").on("touchend", function (e) {
    stop = true;
  });

  var scroll = function (step) {
    var scrollY = $(window).scrollTop();
    $(window).scrollTop(scrollY + step);
    if (!stop) {
      setTimeout(function () {
        scroll(step);
      }, 20);
    }
  };

  $(".droppable.validate").droppable({
    drop: function (event, ui) {
      ui.draggable.detach().appendTo($(this).children("div"));
      ui.draggable
        .css("position", "initial")
        .css("display", "inline-block")
        .removeClass("bg-dark-teal")
        .addClass("bg-deep-teal");
      ui.draggable.draggable({ disabled: true });

      if ($(this)[0].id == ui.draggable[0].getAttribute("data-answer")) {
        rightCount++;
        ui.draggable.addClass("right-answer");
      } else {
        ui.draggable.addClass("wrong-answer");
      }
      $(".examples span:first-child").removeClass("hidden");
      examplesRemaining--;
      answerCount.innerHTML = examplesRemaining;

      if (examplesRemaining === 0) {
        $("#check-answers").removeClass("hidden invisible");
      }
    },
  });

  $(".droppable.revert").droppable({
    drop: function (event, ui) {
      //console.log(ui.draggable[0].getAttribute("data-answer"));
      if ($(this)[0].id == ui.draggable[0].getAttribute("data-answer")) {
        ui.draggable.detach().appendTo($(this).children("div"));
        ui.draggable
          .css("position", "initial")
          .css("display", "inline-block")
          .removeClass("bg-deep-teal")
          .addClass("bg-light-teal");
        ui.draggable.draggable({ disabled: true });

        rightCount++;
        examplesRemaining--;
      }
      if (examplesRemaining === 0) {
        $(".feedback.complete").removeClass("invisible");
        $(".feedback.review").addClass("hidden");
        $(".terms").addClass("hidden");
      }
    },
  });

  //Retry Function
  $("#retry").on("click", function (e) {
    e.preventDefault();
    $(".droppable")
      .find("span.ui-draggable")
      .detach()
      .appendTo($(".draggable.examples")[0]);
    $("#total-answers")[0].innerHTML = totalExamplesInit;
    answerCount = $("#answer-count")[0];
    totalExamples = $(".draggable>span").length;
    examplesRemaining = totalExamples;
    rightCount = 0;
    $("#answer-count")[0].innerHTML = totalExamples;
    $(".examples>span")
      .css({
        display: "",
        position: "relative",
        left: "",
        top: "",
      })
      .removeClass(
        "wrong-answer right-answer bg-red-500 bg-ada-green bg-deep-teal "
      )
      .addClass("hidden bg-dark-teal");
    $(".examples>span>span").removeClass("line-through");
    $(".examples>span>i")
      .removeClass("fa-times fa-check mr-8")
      .addClass("hidden");
    $(".examples span:first-child").removeClass("hidden");
    $(this).addClass("invisible");
    $(".draggable>span").draggable({ disabled: false });
  });

  //Check Answer function
  $("#check-answers").on("click", function (e) {
    e.preventDefault();

    $(this).addClass("hidden");
    $("#retry").removeClass("invisible hidden");
    if (rightCount < totalExamples) {
    }
    $("#total-answers")[0].innerHTML =
      "Correct Answers: " + rightCount + "/" + totalExamples;
    $("span.wrong-answer").addClass("bg-red-500").css("display", "");
    $("span.wrong-answer>span").addClass("line-through");
    $("span.wrong-answer i").addClass("fa-times mr-8").removeClass("hidden");
    $("span.right-answer").addClass("bg-ada-green").css("display", "");
    $("span.right-answer i").addClass("fa-check mr-8").removeClass("hidden");
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
    var feedbackIcon;

    for (var i = 0; i < questions.length; i++) {
      var answer = $(questions[i]).children("label").attr("data-answer");
      var submittedAnswer = $(questions[i]).find("select").val();

      //Add feedback icon container to each question row
      feedbackIcon = document.createElement("div");

      //Add classes to the
      $(feedbackIcon).addClass(
        "feedback-icon flex shrink-0 justify-center items-center w-16 h-16 rounded-full mx-auto mb-4 md:mb-0 md:mr-8 hidden"
      );
      $("<img class='w-1/2 h-auto'> ").appendTo(feedbackIcon);

      if (!$(questions)[i].children[0].classList.contains("feedback-icon")) {
        $(questions[i]).prepend(feedbackIcon);
      }

      if (answer == submittedAnswer) {
        numCorrect++;

        $(questions[i])
          .find(".feedback-icon>img")
          .attr(
            "src",
            "https://mv-2022-theme.netlify.app/assets/images/icons/checkmark-icon.png"
          );
        $(questions[i])
          .children(".feedback-icon")
          .removeClass("bg-ada-orange")
          .addClass("bg-ada-green")
          .removeClass("hidden");
      } else {
        $(questions[i])
          .find(".feedback-icon>img")
          .attr(
            "src",
            "https://mv-2022-theme.netlify.app/assets/images/icons/x-icon.png"
          );
        $(questions[i])
          .children(".feedback-icon")
          .removeClass("bg-ada-green")
          .addClass("bg-ada-orange")
          .removeClass("hidden");
      }
    }
    if (numCorrect == questions.length) {
      validationMessage = "Great Job! You answered each question correctly.";
    } else {
      validationMessage =
        "It looks like you didn't get the answer to all of the questions correct. We have highlighted the missed questions in red. \n\nIf you're stuck, click the 'Display Answers' button below to review information.";
    }
    //alert(validationMessage);
  });
  $("#display-answers").on("click", function (e) {
    e.preventDefault();
    $("#answers-table").removeClass("hidden");
    //$("body").addClass("fixed");
  });
  $("#answers-table").on("click", function (e) {
    $("#answers-table").addClass("hidden");
  });
  $("#answers-table table").on("click", function (e) {
    e.stopPropagation();
  });

  /* End Matching Dropdown Activity */

  /*  Begin Food Allergens Participation Exercise     */
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
      $(ui.selected)
        .addClass("ui-selected bg-deep-teal text-white")
        .removeClass("text-deep-teal");
      $("#next-btn").attr("disabled", false);
    },
    unselected: function (event, ui) {
      $(ui.unselected).removeClass("bg-deep-teal text-white");
    },
    stop: function () {},
  });

  //Button Logic
  $("#next-btn").on("click", function () {
    updateEvent(eventCount);
    if (eventCount + 1 < scenario.events.length) {
      $("#respond-btn").removeClass("hidden");
      $(".response-container").selectable("enable");
    }
    if (eventCount == scenario.events.length - 1) {
      eventCount = 0;
      $("#scenario-body").html(scenario.setup);
      $(".response-container").html("");
      $("#next-btn").html("Begin");
    }
  });

  $("#respond-btn").on("click", function () {
    let optionIndex = $(".ui-selected").index();
    let nextBtnText = "Next Event";
    $("#scenario-body").html(
      `${scenario.events[eventCount].options[optionIndex].response}<br><br><span class='font-bold'>${scenario.events[eventCount].options[optionIndex].ending}</span>`
    );

    if ($(".ui-selected").attr("data-answer") == "true") {
      eventCount++;
      if (eventCount == scenario.events.length - 1) {
        nextBtnText = "Retry Scenario from Beginning";
      }
      $("#next-btn").text(nextBtnText).removeClass("hidden");
      $(".ui-selected").addClass("bg-light-teal border-light-teal");
    } else {
      $(".ui-selected").addClass(
        "bg-ada-orange border-ada-orange line-through"
      );
      $("#next-btn").text("Try Again").removeClass("hidden");
    }
    $("#respond-btn").addClass("hidden");
    $(".response-container").selectable("disable");
  });

  /*  Begin Hotspot Click Actions  */
  $(".hotspot button").click(function () {
    var info = $(this).attr("data-info");
    var tooltip = $("#tooltip");
    var tooltipInner = $("#tooltip_inner");
    var containerWidth = $(".hotspot").width();
    var containerHeight = $(".hotspot").height();
    var closeBtn = $("#tooltip .close");
    // Set the content of the tooltip
    tooltipInner.html(info);

    // Calculate position; adjust these values as needed

    var tooltipX = 10;
    var tooltipY = 10;
    if ($(window).width() >= 768) {
      tooltipX =
        $(this).position().left -
        tooltip.outerWidth() / 2 +
        $(this).outerWidth() / 2;
      tooltipY = $(this).position().top + $(this).outerHeight();
    }
    console.log(containerWidth);
    if (tooltipX < 0) {
      tooltipX = 0;
    }
    if (tooltipY < 0) {
      tooltipY = 0;
    }

    if (tooltipX + tooltip.outerWidth() > containerWidth) {
      tooltipX = containerWidth - tooltip.outerWidth();
    }
    if (tooltipY + tooltip.outerHeight() > containerHeight) {
      tooltipY = containerHeight - tooltip.outerHeight();
    }

    // Position the tooltip and show it
    tooltip
      .css({ top: tooltipY + "px", left: tooltipX + "px" })
      .removeClass("hidden")
      .addClass("block");
    closeBtn.focus();
    // Hide the tooltip when clicking anywhere else on the page
    $(document).on("click", function (e) {
      if (!$(e.target).closest("#tooltip, .hotspot button").length) {
        tooltip.addClass("hidden");
      }
    });
    $("span.close").on("click", function (e) {
      $(this).parent("#tooltip").addClass("hidden");
    });
    $("span.close").keypress(function (event) {
      if (event.which == 13) {
        $(this).parent("#tooltip").addClass("hidden");
      }
    });
  });
  /*  End Hotspot Click Actions  */

  /*  new Sortable(document.getElementById("sortable-list"), {
    animation: 150, // Animation speed during sorting (in ms)
    ghostClass: "sortable-ghost", // Class name for the drop placeholder
  });
  $("#sortable-list+button.submit").on("click", checkOrder); */
});

//Add keyboard navigation functionality
window.addEventListener(
  "focus",
  function (e) {
    if ($(e.target).parent().hasClass("response-container"))
      $(e.target).on("keypress", function (e) {
        if (e.which == 13) {
          $(e.target)
            .addClass("ui-selected bg-deep-teal text-white")
            .removeClass("text-deep-teal");
          $(e.target)
            .siblings()
            .removeClass("ui-selected bg-deep-teal text-white");
        }
      });
  },
  true
);

//Function to Update Event Body and Responses
function updateEvent(count) {
  $("#scenario-body").html(scenario.events[count].body);
  $(".response-container").html("");
  let options = scenario.events[count].options;
  $("#next-btn").addClass("hidden");
  if (count + 1 == scenario.events.length) {
    $("#next-btn").removeClass("hidden");
    $("#next-btn").html("Restart Event");
  }
  for (let i = 0; i < options.length; i++) {
    let optionBody =
      "<li tabindex='0' class='w-full text-center border-2 border-deep-teal text-deep-teal p-4 mb-4' data-answer='" +
      options[i].correct +
      "'>" +
      options[i].text +
      "</li>";

    $(".response-container").append(optionBody);
  }
  return;
}

/* Sortable Checking Function */
function checkOrder() {
  console.log("submitted the sortable");
  const listItems = document.querySelectorAll("#sortable-list li");
  let correctOrder = true;

  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];
    const correctPosition = parseInt(item.getAttribute("data-order"), 10);

    // Compare the item's current index in the parent container (+1 for 1-based indexing) with its correct position
    if (i + 1 !== correctPosition) {
      correctOrder = false;
      break; // Exit the loop as soon as one item is found out of order
    }
  }

  if (correctOrder) {
    alert("Correct Order!");
  } else {
    alert("Incorrect Order, please try again.");
  }
}
