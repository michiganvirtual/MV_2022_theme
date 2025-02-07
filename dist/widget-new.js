class HelpWidget extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const container = document.createElement("div");
    container.classList.add("help-container");

    container.innerHTML = `
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
          .help-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-family: "Roboto", Arial, sans-serif;
            overflow: hidden;
            border-radius: 113px;
            background: #ac6610;
            box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.3);
          }
          .help-container.open {
            border-radius: 16px;
            box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.3);
            max-width: 337px;
          }
          .help-header {
            display: flex;
            padding: 5px 9px 5px 6px;
            justify-content: space-between;
            align-items: center;
            gap: 5px;
          }
          .help-header .icon {
            width: 30px;
            height: 30px;
            margin-right: 5px;
          }
          .help-header span {
            color: #fff;
            font-family: "Roboto";
            font-size: 12px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
          }
          .help-header .close-btn {
            display: none;
            padding: 4px;
          }
          .help-header .close-btn.thank-you svg path {
            stroke: #ac6610;
          }
          .help-header .back-btn {
            display: none;
          }
          .help-container.open .help-header {
            height: 51px;
            padding: 0px 21px 0px 10px;
          }
          .help-header-inner {
            display: flex;
            align-items: center;
          }
          .help-container.open .help-header-inner span {
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 24px;
          }
          .help-container.open .help-header-inner .icon {
            height: 36px;
            width: 36px;
            margin-right: 16px;
          }
          .help-container.open .help-header .close-btn {
            display: block;
          }
          .help-body {
            background: white;
            padding: 8px;
            display: none;
            border-top: 1px solid #ccc;
          }
          .help-container.open .help-body {
            display: block;
          }
          .help-message {
            color: #414042;
            font-family: "Inter";
            font-size: 12px;
            font-style: normal;
            font-weight: 700;
            line-height: 16px; /* 133.333% */
            margin-bottom: 18px;
          }
          .help-options {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            margin-bottom: 20px;
            width: 100%;
            padding: 0;
          }
          .help-options li {
            display: flex;
            height: 112px;
            padding: 8px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 8px;
            flex: 1 0 0;
            border-radius: 8px;
            background: var(--Light-surface-secondary, #f4f4f5);
            color: var(--Light-text-primary, #27272a);
            text-align: center;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 12px; /* 100% */
          }
          .help-options li:hover {
            color: #fff;
          }
          .help-options li:hover path {
            fill: #fff;
          }
          .help-options li.technology:hover {
            background-color: #ac6610;
          }
          .help-options li.course-content:hover {
            background-color: #6a7f17;
          }
          .help-options li.accessibility:hover {
            background-color: #115e6e;
          }
          .help-form {
            display: flex;
            flex-direction: column;
            margin-bottom: 0px;
          }
          .help-form textarea {
            display: block;
            width: 100%;
            height: 112px;
            resize: none;
            overflow-y: scroll;
            border-radius: 4px;
            border: 1px solid #6d6e71;
            padding: 8px 6px 8px 12px;
            margin-bottom: 8px;
            color: #414042;
            /* Input text */
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 140%; /* 19.6px */
          }

          .help-form textarea::placeholder {
            color: var(--Light-text-primary, #27272a);
          }

          .issues-dropdown {
            position: relative;
            width: 100%;
            color: #313144;
            font-family: "Roboto";
            font-size: 12px;
            font-style: normal;
            font-weight: 700;
            line-height: 18px; /* 150% */
            letter-spacing: 0.36px;
          }
          .issues-dropdown.active .dropdown-header {
            border-radius: 4px 4px 0px 0px;
            border: 1px solid #ac6610;
          }

          .dropdown-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 11px 18px;
            border: 1px solid #6d6e71;
            border-radius: 4px;
            padding: 11px 18px;
            margin-bottom: 6px;
          }

          .dropdown-header:hover {
            background-color: #e9e9e9;
          }
          .dropdown-header .arrow {
            font-size: 12px;
          }
          .issues-dropdown.active .dropdown-header .arrow {
            transform: rotate(180deg);
          }

          .dropdown-options {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            list-style: none;
            border-radius: 4px;
            background-color: #fff;
            z-index: 10;
          }

          .dropdown-options li {
            padding: 10px 10px 10px 25px;
            cursor: pointer;
          }

          .dropdown-options li:hover {
            background-color: #f1f1f1;
          }

          /* Show dropdown options when active */
          .issues-dropdown.active .dropdown-options {
            display: block;
          }

          .help-form button[type="submit"],
          .return-btn {
            background-color: #ac6610;
            border: 0px;
            border-radius: 4px;
            padding: 8px 24px;
            color: #ffffff;
            text-align: center;
            width: 100%;

            /* Button label - sm */
            font-family: "Inter";
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 24px; /* 171.429% */

            margin-bottom: 7px;
          }
          .thank-you {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .help-body .thank-you svg {
            margin-bottom: 12px;
          }
          .thank-you span {
            color: #414042;
            text-align: center;
            font-family: "Roboto";
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 24px; /* 120% */
            margin-bottom: 50px;
          }
          .help-footer {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #414042;
            text-align: center;
            font-family: "Inter";
            font-size: 10px;
            font-style: normal;
            font-weight: 500;
            line-height: 12px; /* 120% */
          }
          .help-footer a {
            color: #ac6610;
          }
          .hidden {
            display: none;
          }
        </style>
        <div class="help-header">
        <a href="#" class="back-btn">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Phosphor / arrow-left-bold-16px">
              <path
                id="Vector"
                d="M13.5 8H2.5"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_2"
                d="M7 3.5L2.5 8L7 12.5"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </a>
        <div class="help-header-inner">
          <img class="icon" src="dist/assets/images/help-widget/Flag-Frame.svg" alt="" srcset="" />
          <span>Report a problem</span>
        </div>
        <a href="#" class="close-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M12.5 3.5L3.5 12.5"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.5 12.5L3.5 3.5"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
      <div class="help-body">
        <p class="help-message">What kind of issue are you experiencing?</p>
        <ul class="help-options">
          <li data-option="technology" class="technology">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M16.6462 19.8649L17.3531 19.1345C17.5481 18.933 17.5481 18.6055 17.3531 18.404L14.4137 15.3667L17.3531 12.3293C17.5481 12.1278 17.5481 11.8004 17.3531 11.5989L16.6462 10.8684C16.4513 10.6669 16.1344 10.6669 15.9394 10.8684L11.9394 15.0018C11.7444 15.2033 11.7444 15.5307 11.9394 15.7322L15.9394 19.8655C16.135 20.067 16.4513 20.067 16.6462 19.8649ZM22.6462 19.1345L23.3531 19.8649C23.5481 20.0664 23.865 20.0664 24.06 19.8649L28.06 15.7316C28.255 15.5301 28.255 15.2026 28.06 15.0011L24.06 10.8678C23.865 10.6663 23.5481 10.6663 23.3531 10.8678L22.6462 11.5982C22.4513 11.7997 22.4513 12.1272 22.6462 12.3287L25.5863 15.3667L22.6469 18.404C22.6004 18.4519 22.5635 18.5088 22.5383 18.5715C22.5131 18.6341 22.5001 18.7013 22.5001 18.7691C22.5 18.8369 22.5129 18.9041 22.538 18.9668C22.5631 19.0295 22.5999 19.0865 22.6462 19.1345ZM39 25.7H36V8.13333C36 5.85354 34.205 4 32 4H8C5.795 4 4 5.85354 4 8.13333V25.7H1C0.4475 25.7 0 26.1624 0 26.7333V29.8333C0 32.6821 2.2425 35 5 35H35C37.7575 35 40 32.6821 40 29.8333V26.7333C40 26.1624 39.5525 25.7 39 25.7ZM6 8.13333C6 6.99215 6.89563 6.06667 8 6.06667H32C33.1044 6.06667 34 6.99215 34 8.13333V25.7H24.4456C24.1919 25.7 24.0069 25.9021 23.9506 26.1579C23.7487 27.0789 22.9519 27.7667 22 27.7667H18C17.0481 27.7667 16.2513 27.0789 16.0494 26.1579C15.9931 25.9021 15.8081 25.7 15.5544 25.7H6V8.13333ZM38 29.8333C38 31.5429 36.6544 32.9333 35 32.9333H5C3.34562 32.9333 2 31.5429 2 29.8333V27.7667H14.1719C14.5837 28.9692 15.6956 29.8333 17 29.8333H23C24.305 29.8333 25.4163 28.9692 25.8281 27.7667H38V29.8333Z"
                fill="#AC6610"
              />
            </svg>
            Technology Issue
          </li>
          <li data-option="course-content" class="course-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M33.8984 7.65476L27.3438 1.10135C26.6406 0.39836 25.6875 0 24.6953 0H8.75C6.67969 0.00781097 5 1.68717 5 3.75708V36.2507C5 38.3206 6.67969 40 8.75 40H31.25C33.3203 40 35 38.3206 35 36.2507V10.3105C35 9.31849 34.6016 8.35774 33.8984 7.65476ZM32.1328 9.42785C32.2969 9.59188 32.4062 9.78715 32.4609 10.0059H25V2.54638C25.2188 2.60105 25.4141 2.71041 25.5781 2.87444L32.1328 9.42785ZM31.25 37.5005H8.75C8.0625 37.5005 7.5 36.9381 7.5 36.2507V3.75708C7.5 3.06971 8.0625 2.50732 8.75 2.50732H22.5V10.6307C22.5 11.6696 23.3359 12.5054 24.375 12.5054H32.5V36.2507C32.5 36.9381 31.9375 37.5005 31.25 37.5005ZM25.5234 27.5103C25.8906 27.8774 25.8906 28.471 25.5234 28.8381L25.0781 29.2833C24.7109 29.6505 24.1172 29.6505 23.75 29.2833L20 25.5185L16.2422 29.2755C15.875 29.6427 15.2812 29.6427 14.9141 29.2755L14.4688 28.8303C14.1016 28.4632 14.1016 27.8696 14.4688 27.5024L18.2266 23.7454L14.4688 19.9883C14.1016 19.6212 14.1016 19.0275 14.4688 18.6604L14.9141 18.2152C15.2812 17.8481 15.875 17.8481 16.2422 18.2152L20 21.9723L23.7578 18.2152C24.125 17.8481 24.7188 17.8481 25.0859 18.2152L25.5312 18.6604C25.8984 19.0275 25.8984 19.6212 25.5312 19.9883L21.7656 23.7532L25.5234 27.5103Z"
                fill="#6A7F17"
              />
            </svg>
            Course Content Issue
          </li>
          <li data-option="accessibility" class="accessibility">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M20 0C8.95427 0 0 8.95427 0 20C0 31.0457 8.95427 40 20 40C31.0457 40 40 31.0457 40 20C40 8.95427 31.0457 0 20 0ZM20 37.4194C10.4304 37.4194 2.58065 29.673 2.58065 20C2.58065 10.4304 10.327 2.58065 20 2.58065C29.5696 2.58065 37.4194 10.327 37.4194 20C37.4194 29.5696 29.673 37.4194 20 37.4194ZM31.2662 13.2519C31.4299 13.9455 31.0004 14.6404 30.3069 14.8042C27.8064 15.3946 25.4717 15.9151 23.1545 16.1844C23.1977 25.4466 24.2164 27.4737 25.3525 30.3808C25.6767 31.2106 25.2668 32.146 24.437 32.47C23.6067 32.7944 22.6717 32.3838 22.3478 31.5545C21.5963 29.6319 20.8518 27.9606 20.3905 24.516H19.6094C19.1475 27.9655 18.4009 29.6382 17.6522 31.5544C17.3277 32.385 16.3915 32.7939 15.563 32.47C14.7332 32.1459 14.3234 31.2106 14.6474 30.3808C15.7848 27.4709 16.8023 25.4425 16.8454 16.1844C14.5281 15.9151 12.1935 15.3946 9.69306 14.8042C8.99952 14.6404 8.57 13.9455 8.73379 13.2519C8.8975 12.5583 9.59242 12.1288 10.2861 12.2925C18.7718 14.2961 21.2119 14.3 29.7139 12.2925C30.4073 12.1294 31.1024 12.5584 31.2662 13.2519ZM16.9198 9.82306C16.9198 8.12193 18.2989 6.74298 20 6.74298C21.7011 6.74298 23.0802 8.12202 23.0802 9.82306C23.0802 11.5241 21.7011 12.9032 20 12.9032C18.2989 12.9032 16.9198 11.5242 16.9198 9.82306Z"
                fill="#115E6E"
              />
            </svg>
            Accessibility Issue
          </li>
        </ul>
        <form class="help-form hidden">
          <div class="form-content">
            <div class="issues-dropdown">
              <div class="dropdown-header">
                <span id="dropdown-option">Select an option</span>
                <span class="arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.58921 7.74408C5.26378 7.41864 4.73614 7.41864 4.4107 7.74408C4.08527 8.06951 4.08527 8.59715 4.4107 8.92259L9.4107 13.9226C9.73614 14.248 10.2638 14.248 10.5892 13.9226L15.5892 8.92259C15.9147 8.59715 15.9147 8.06951 15.5892 7.74408C15.2638 7.41864 14.7361 7.41864 14.4107 7.74408L9.99996 12.1548L5.58921 7.74408Z"
                      fill="#313144"
                    />
                  </svg>
                </span>
              </div>
              <ul class="dropdown-options">
                <li data-value="option1">Option 1</li>
                <li data-value="option2">Option 2</li>
                <li data-value="option3">Option 3</li>
                <li data-value="option4">Option 4</li>
              </ul>
            </div>
            <textarea
              id="details"
              name="details"
              required
              placeholder="Describe the issue"
            ></textarea>
          </div>
          <button type="submit" class="submit-btn">Submit Feedback</button>
        </form>
        <div class="thank-you hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
          >
            <path
              d="M42 37.3333C42 39.9105 39.9105 42 37.3333 42H4.66667C2.0895 42 0 39.9105 0 37.3333V4.66667C0 2.0895 2.0895 0 4.66667 0H37.3333C39.9105 0 42 2.0895 42 4.66667V37.3333Z"
              fill="#77B255"
            />
            <path
              d="M34.16 7.42234C32.8114 6.54617 31.0054 6.93 30.1257 8.281L17.4254 27.8565L11.5582 22.4315C10.3752 21.3372 8.52953 21.4107 7.43636 22.5925C6.3432 23.7755 6.41553 25.6212 7.59853 26.7143L16.009 34.4913C16.569 35.0105 17.2807 35.2672 17.9877 35.2672C18.7729 35.2672 19.7774 34.9382 20.4365 33.9383C20.8239 33.348 35.0199 11.4567 35.0199 11.4567C35.896 10.1045 35.511 8.2985 34.16 7.42234Z"
              fill="white"
            />
          </svg>
          <span>Thank you for your feedback!</span>
          <button class="return-btn">Submit more feedback</button>
        </div>
        <div class="help-footer">
          <img src="dist/assets/images/help-widget/MV-LOGO.svg" alt="" srcset="" />
          <span
            >Need help from a real person?
            <a
              href="https://help.michiganvirtual.org/support/tickets/new?_gl=1*qedl0u*_gcl_au*NjEzMTY3MTc4LjE3MzgyNzQyMjI.*_ga*MTQ3ODQ2NzcxOC4xNzM4Mjc0MjIy*_ga_VG58GV15BV*MTczODI3NDIyMS4xLjAuMTczODI3NDIyMS42MC4wLjA."
              target="_blank"
              >Submit a ticket to our team</a
            ></span
          >
        </div>
      </div>
      `;

    shadow.appendChild(container);

    const header = container.querySelector(".help-header");
    const heading = container.querySelector(".help-header-inner span");
    const icon = container.querySelector(".help-header-inner .icon");
    const body = container.querySelector(".help-body");
    const message = container.querySelector(".help-message");
    const optionsList = container.querySelector(".help-options");
    const form = container.querySelector(".help-form");
    const formContent = container.querySelector(".form-content");
    const backButton = container.querySelector(".back-btn");
    const closeButton = container.querySelector(".close-btn");
    const thankYou = container.querySelector(".thank-you");
    const returnButton = container.querySelector(".return-btn");

    // Toggle widget visibility
    header.addEventListener("click", () => {
      container.classList.add("open");
    });

    // Load form for the selected option
    optionsList.addEventListener("click", (e) => {
      const option = e.target.getAttribute("data-option");
      if (!option) return;

      // Generate form based on option
      formContent.innerHTML = getFormContent(option);
      message.textContent = "Please select the type of issue you found.";
      optionsList.classList.add("hidden");
      backButton.style.display = "block";
      icon.style.marginRight = "0px";
      form.classList.remove("hidden");

      // Reattach dropdown event listeners for dynamic content
      attachDropdownListeners();
    });

    // Close button
    closeButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Stop event propagation
      container.style.backgroundColor = "#AC6610";
      backButton.style.display = "none";
      form.classList.add("hidden");
      optionsList.classList.remove("hidden");
      heading.textContent = "Report a problem";
      heading.classList.remove("hidden");
      message.textContent = "What kind of issue are you experiencing?";
      message.classList.remove("hidden");
      icon.src = "dist/assets/images/help-widget/Flag-Frame.svg";
      icon.style.marginRight = "";
      container.classList.remove("open");
      thankYou.classList.add("hidden");
      closeButton.classList.remove("thank-you");
    });

    // Back to options
    backButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Stop event propagation
      container.style.backgroundColor = "#AC6610";
      backButton.style.display = "none";
      form.classList.add("hidden");
      optionsList.classList.remove("hidden");
      heading.textContent = "Report a problem";
      message.textContent = "What kind of issue are you experiencing?";
      icon.src = "dist/assets/images/help-widget/Flag-Frame.svg";
      icon.style.marginRight = "16px";
    });

    returnButton.addEventListener("click", (e) => {
      e.stopPropagation();
      container.style.backgroundColor = "#AC6610";
      backButton.style.display = "none";
      optionsList.classList.remove("hidden");
      heading.textContent = "Report a problem";
      message.textContent = "What kind of issue are you experiencing?";
      message.classList.remove("hidden");
      icon.src = "dist/assets/images/help-widget/Flag-Frame.svg";
      icon.style.marginRight = "16px";
      heading.classList.remove("hidden");
      optionsList.classList.remove("hidden");
      thankYou.classList.add("hidden");
      closeButton.classList.remove("thank-you");
    });

    // Handle form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let detail = document.getElementById("details").value;
      let issueType = document.getElementById("dropdown-option").textContent;
      const formSubmissionData = {
        "issue-type": issueType,
        detail: detail,
      };
      form.reset();
      form.classList.add("hidden");
      thankYou.classList.remove("hidden");

      container.style.backgroundColor = "#FFFFFF";
      heading.classList.add("hidden");
      message.classList.add("hidden");
      backButton.style.display = "none";
      body.style.borderTop = "0px";
      closeButton.classList.add("thank-you");
    });

    // Attach dropdown event listeners
    function attachDropdownListeners() {
      const dropdown = document.querySelector(".issues-dropdown");
      if (!dropdown) return;

      const dropdownHeader = dropdown.querySelector(".dropdown-header");
      const dropdownOptions = dropdown.querySelector(".dropdown-options");

      // Toggle dropdown visibility
      dropdownHeader.addEventListener("click", (e) => {
        e.stopPropagation(); // Stop event propagation
        dropdown.classList.toggle("active");
      });

      // Handle option selection
      dropdownOptions.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
          const selectedValue = e.target.getAttribute("data-value");
          const selectedText = e.target.textContent;

          // Update the dropdown header with the selected option
          dropdownHeader.querySelector("span#dropdown-option").textContent =
            selectedText;

          // Close the dropdown
          dropdown.classList.remove("active");

          // You can also handle the selected value (e.g., log it or use it in your app)
          console.log("Selected value:", selectedValue);
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove("active");
        }
      });
    }

    // Attach initial dropdown event listeners
    attachDropdownListeners();

    // Generate form content based on option
    function getFormContent(option) {
      switch (option) {
        case "technology":
          heading.textContent = "Technology Issue";
          icon.src = "dist/assets/images/help-widget/technology-icon-white.svg";
          return `
            <div class="issues-dropdown">
                <div class="dropdown-header">
                    <span id="dropdown-option">Select an option</span>
                    <span class="arrow">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.58921 7.74408C5.26378 7.41864 4.73614 7.41864 4.4107 7.74408C4.08527 8.06951 4.08527 8.59715 4.4107 8.92259L9.4107 13.9226C9.73614 14.248 10.2638 14.248 10.5892 13.9226L15.5892 8.92259C15.9147 8.59715 15.9147 8.06951 15.5892 7.74408C15.2638 7.41864 14.7361 7.41864 14.4107 7.74408L9.99996 12.1548L5.58921 7.74408Z"
                            fill="#313144"
                            />
                        </svg>
                    </span>
                </div>
                <ul class="dropdown-options">
                    <li data-value="option1">Broken Link</li>
                    <li data-value="option2">Gradebook Error</li>
                    <li data-value="option3">Images</li>
                    <li data-value="option4">Video</li>
                    <li data-value="option5">Other</li>
                </ul>
            </div>
            <textarea id="details" name="details" required placeholder="Describe the issue"></textarea>
          `;
        case "course-content":
          container.style.backgroundColor = "#6A7F17";
          heading.textContent = "Content Issue";
          icon.src = "assets/content-icon-white.svg";
          return `
            <div class="issues-dropdown">
                <div class="dropdown-header">
                    <span id="dropdown-option">Select a content issue type</span>
                    <span class="arrow">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.58921 7.74408C5.26378 7.41864 4.73614 7.41864 4.4107 7.74408C4.08527 8.06951 4.08527 8.59715 4.4107 8.92259L9.4107 13.9226C9.73614 14.248 10.2638 14.248 10.5892 13.9226L15.5892 8.92259C15.9147 8.59715 15.9147 8.06951 15.5892 7.74408C15.2638 7.41864 14.7361 7.41864 14.4107 7.74408L9.99996 12.1548L5.58921 7.74408Z"
                            fill="#313144"
                            />
                        </svg>
                    </span>
                </div>
                <ul class="dropdown-options">
                    <li data-value="option1">Grammer / Typos</li>
                    <li data-value="option2">Incorrect / Outdated Content</li>
                    <li data-value="option3">New Content or Course Suggestion</li>
                    <li data-value="option4">Web / Downloadable Resource</li>
                    <li data-value="option5">Other</li>
                </ul>
            </div>
            <textarea id="details" name="details" required placeholder="Describe the issue"></textarea>
          `;
        case "accessibility":
          container.style.backgroundColor = "#115E6E";
          heading.textContent = "Accessibility Issue";
          icon.src = "assets/accessibility-icon-white.svg";
          return `
            <div class="issues-dropdown">
                <div class="dropdown-header">
                    <span id="dropdown-option">Select an option</span>
                    <span class="arrow">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.58921 7.74408C5.26378 7.41864 4.73614 7.41864 4.4107 7.74408C4.08527 8.06951 4.08527 8.59715 4.4107 8.92259L9.4107 13.9226C9.73614 14.248 10.2638 14.248 10.5892 13.9226L15.5892 8.92259C15.9147 8.59715 15.9147 8.06951 15.5892 7.74408C15.2638 7.41864 14.7361 7.41864 14.4107 7.74408L9.99996 12.1548L5.58921 7.74408Z"
                            fill="#313144"
                            />
                        </svg>
                    </span>
                </div>
                <ul class="dropdown-options">
                    <li data-value="option1">Alt Text</li>
                    <li data-value="option2">Captions</li>
                    <li data-value="option3">Color Contrast</li>
                    <li data-value="option4">Headings Hierarchy</li>
                    <li data-value="option5">Other</li>
                </ul>
            </div>
            <textarea id="details" name="details" required placeholder="Describe the issue"></textarea>
          `;
        default:
          return `<p>Unknown option selected.</p>`;
      }
    }
  }
}
customElements.define("help-widget-new", HelpWidget);
