class HelpWidget extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const container = document.createElement("div");
    container.classList.add("help-container");
    container.tabIndex = 0;

    container.innerHTML = `
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
                
        @font-face {
          font-family: "FontAwesome";
          src: url(https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0)
            format("woff");
        }
          .help-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-family: "Roboto", Arial, sans-serif;
            overflow: hidden;
            border-radius: 113px;
            background: #ac6610;
            box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.3);
            transition: max-width 0.3s ease-in-out, max-height 0.3s ease-in-out;
            max-height: 40px;
            max-width: 200px;
          }
          .help-container:hover {
            cursor: pointer;
          }
          .help-container.open {
            border-radius: 16px;
            box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.3);
            transition: max-width 0.3s ease-in-out, max-height 0.3s ease-in-out;
            width: 337px;
            max-width: 337px;
            max-height: 445px;
            cursor: unset;
          }
          .help-header {
            display: flex;
            padding: 5px 9px 5px 6px;
            justify-content: space-between;
            align-items: center;
            gap: 5px;
          }
          .help-header #icon-container {
            width: 30px;
            height: 30px;
            margin-right: 5px;
            transition: width 0.3s ease-in-out, height 0.3s ease-in-out, marin-right 0.3s ease-in-out;
          }
          .help-header span {
            color: #fff;
            font-family: "Roboto";
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            transition: font-size 0.3s ease-in-out, font-weight 0.3s ease-in-out;
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
            justify-content: center;
            align-items: center;
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
            font-size: 22px;
            font-style: normal;
            font-weight: 700;
            line-height: 24px;
          }
          .help-container.open .help-header-inner #icon-container {
            height: 36px;
            width: 36px;
            margin-right: 16px;
          }
          .help-container.open .help-header .close-btn {
            display: flex;
            justify-content: center;
            align-items: center;
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
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 16px; /* 133.333% */
            margin-bottom: 5px;
          }
            .help-sub-message {
            color: #414042;
            font-family: "Inter";
            font-size: 12px;
            font-style: normal;
            font-weight: normal;
            line-height: 12px; /* 133.333% */
            margin-top: 0;
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
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 14px; /* 100% */
          }
          .help-options li:hover {
            color: #fff;
            cursor: pointer;
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
            width: calc(100% - 20px);
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
            font-size: 16px;
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
            font-size: 14px;
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
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
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
            border-radius: 0px 0px 4px 4px;
            background-color: #fff;
            z-index: 10;
            max-height: 190px;
            overflow-y: scroll;
            border: 1px solid #6d6e71;
            border-top: 0px;
            box-sizing: border-box;
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
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 24px; /* 171.429% */
            margin-bottom: 7px;
          }
          .help-form button[type="submit"]:hover,
          .return-btn:hover {
            background-color: #89531B;
            cursor: pointer;
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
            font-size: 22px;
            font-style: normal;
            font-weight: 700;
            line-height: 24px; /* 120% */
            margin-bottom: 50px;
          }
          .help-footer {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: #414042;
            text-align: left;
            font-family: "Inter";
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 12px; /* 120% */
          }
          .help-footer a {
            color: #ac6610;
            /* display: inline-flex; */
            align-items: center;
            gap: 2px;
          }
          .help-footer a svg {
            width: 10px;
            height: 10px;
          }
          .help-footer a svg path {
            fill: #ac6610;
          }
          .help-footer a[target="_blank"]:after {
            font-family: "FontAwesome";
            content: " \f08e ";
          }
          .hidden {
            visibility: hidden;
            max-height: 0;
            margin: 0;
            transition: visibility 0s ease-in-out, max-height 0.3s, margin 0.3s;
          }
        </style>
        <div class="help-header">
        <a href="#" class="back-btn" aria-label="Back Button">
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
          <div id="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">
              <g clip-path="url(#clip0_18_1604)">
                <path d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05888 27.9411 0 18 0C8.05888 0 0 8.05888 0 18C0 27.9411 8.05888 36 18 36Z" fill="white"/>
                <path d="M29.628 11.3111C24.0336 17.5895 14.0688 4.16872 8.47437 10.4471C9.45357 14.8607 10.4328 19.2743 11.412 23.6951C16.0272 13.0031 25.0128 22.0103 29.628 11.3183V11.3111Z" stroke="#115E6E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.7688 7.28638L12.9672 30.7368" stroke="#115E6E" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"/>
              </g>
              <defs>
                <clipPath id="clip0_18_1604">
                  <rect width="36" height="36" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <span>Report an issue</span>
        </div>
        <a href="#" class="close-btn" aria-label="Close Button">
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
        <p class="help-sub-message"></p>
        <ul class="help-options">
          <li tabindex='0' data-option="technology" class="technology">
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
          <li tabindex='0' data-option="course-content" class="course-content">
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
          <li tabindex='0' data-option="accessibility" class="accessibility">
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
              <div class="dropdown-header" tabindex=0>
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
          <img src="https://mv-2022-theme.netlify.app/assets/images/help-widget/MV-LOGO.svg" alt="" srcset="" />
          <span
            >Does this issue stop you from completing the course? You may need to <a href="https://help.michiganvirtual.org/support/tickets/new" target="_blank">submit a ticket</a> instead. You can also find helpful tips in our <a href="https://help.michiganvirtual.org/support/solutions" target="_blank">Knowledge Base</a>.</span
          >
        </div>
      </div>
      `;

    shadow.appendChild(container);

    const header = container.querySelector(".help-header");
    const heading = container.querySelector(".help-header-inner span");
    const icon = container.querySelector("#icon-container");
    const body = container.querySelector(".help-body");
    const message = container.querySelector(".help-message");
    const subMessage = container.querySelector(".help-sub-message");
    const optionsList = container.querySelector(".help-options");
    const form = container.querySelector(".help-form");
    const formContent = container.querySelector(".form-content");
    const backButton = container.querySelector(".back-btn");
    const closeButton = container.querySelector(".close-btn");
    const thankYou = container.querySelector(".thank-you");
    const returnButton = container.querySelector(".return-btn");
    const footer = container.querySelector(".help-footer");

    //Declare SVG Icon Variables
    const flagIcon =
      '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 36 36" fill="none"><g clip-path="url(#clip0_18_1604)"><path d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05888 27.9411 0 18 0C8.05888 0 0 8.05888 0 18C0 27.9411 8.05888 36 18 36Z" fill="white"/><path d="M29.628 11.3111C24.0336 17.5895 14.0688 4.16872 8.47437 10.4471C9.45357 14.8607 10.4328 19.2743 11.412 23.6951C16.0272 13.0031 25.0128 22.0103 29.628 11.3183V11.3111Z" stroke="#115E6E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.7688 7.28638L12.9672 30.7368" stroke="#115E6E" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"/></g><defs><clipPath id="clip0_18_1604"><rect width="36" height="36" fill="white"/></clipPath></defs></svg>';
    const techIconWhite =
      '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 36 36" fill="none"><path d="M15.9878 18.7236L16.4119 18.276C16.5289 18.1525 16.5289 17.9518 16.4119 17.8283L14.6483 15.9667L16.4119 14.1051C16.5289 13.9816 16.5289 13.7809 16.4119 13.6574L15.9878 13.2097C15.8708 13.0862 15.6806 13.0862 15.5636 13.2097L13.1636 15.743C13.0466 15.8665 13.0466 16.0672 13.1636 16.1907L15.5636 18.724C15.681 18.8475 15.8708 18.8475 15.9878 18.7236ZM19.5878 18.276L20.0119 18.7236C20.1289 18.8471 20.319 18.8471 20.436 18.7236L22.836 16.1903C22.953 16.0668 22.953 15.8661 22.836 15.7426L20.436 13.2093C20.319 13.0858 20.1289 13.0858 20.0119 13.2093L19.5878 13.657C19.4708 13.7805 19.4708 13.9812 19.5878 14.1047L21.3518 15.9667L19.5881 17.8283C19.5602 17.8576 19.5381 17.8925 19.523 17.9309C19.5079 17.9693 19.5001 18.0105 19.5 18.052C19.5 18.0936 19.5077 18.1348 19.5228 18.1732C19.5378 18.2116 19.5599 18.2465 19.5878 18.276ZM29.4 22.3H27.6V11.5333C27.6 10.136 26.523 9 25.2 9H10.8C9.477 9 8.4 10.136 8.4 11.5333V22.3H6.6C6.2685 22.3 6 22.5834 6 22.9333V24.8333C6 26.5794 7.3455 28 9 28H27C28.6545 28 30 26.5794 30 24.8333V22.9333C30 22.5834 29.7315 22.3 29.4 22.3ZM9.6 11.5333C9.6 10.8339 10.1374 10.2667 10.8 10.2667H25.2C25.8626 10.2667 26.4 10.8339 26.4 11.5333V22.3H20.6674C20.5151 22.3 20.4041 22.4239 20.3704 22.5806C20.2493 23.1451 19.7711 23.5667 19.2 23.5667H16.8C16.2289 23.5667 15.7508 23.1451 15.6296 22.5806C15.5959 22.4239 15.4849 22.3 15.3326 22.3H9.6V11.5333ZM28.8 24.8333C28.8 25.8811 27.9926 26.7333 27 26.7333H9C8.00738 26.7333 7.2 25.8811 7.2 24.8333V23.5667H14.5031C14.7502 24.3037 15.4174 24.8333 16.2 24.8333H19.8C20.583 24.8333 21.2498 24.3037 21.4969 23.5667H28.8V24.8333Z" fill="white"/></svg>';
    const contentIconWhite =
      '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 36 36" fill="none"><path d="M26.3391 10.5929L22.4062 6.66081C21.9844 6.23902 21.4125 6 20.8172 6H11.25C10.0078 6.00469 9 7.0123 9 8.25425V27.7504C9 28.9924 10.0078 30 11.25 30H24.75C25.9922 30 27 28.9924 27 27.7504V12.1863C27 11.5911 26.7609 11.0146 26.3391 10.5929ZM25.2797 11.6567C25.3781 11.7551 25.4438 11.8723 25.4766 12.0035H21V7.52783C21.1313 7.56063 21.2484 7.62624 21.3469 7.72466L25.2797 11.6567ZM24.75 28.5003H11.25C10.8375 28.5003 10.5 28.1629 10.5 27.7504V8.25425C10.5 7.84183 10.8375 7.50439 11.25 7.50439H19.5V12.3784C19.5 13.0018 20.0016 13.5032 20.625 13.5032H25.5V27.7504C25.5 28.1629 25.1625 28.5003 24.75 28.5003ZM21.3141 22.5062C21.5344 22.7264 21.5344 23.0826 21.3141 23.3029L21.0469 23.57C20.8266 23.7903 20.4703 23.7903 20.25 23.57L18 21.3111L15.7453 23.5653C15.525 23.7856 15.1688 23.7856 14.9484 23.5653L14.6812 23.2982C14.4609 23.0779 14.4609 22.7217 14.6812 22.5015L16.9359 20.2472L14.6812 17.993C14.4609 17.7727 14.4609 17.4165 14.6812 17.1963L14.9484 16.9291C15.1688 16.7088 15.525 16.7088 15.7453 16.9291L18 19.1834L20.2547 16.9291C20.475 16.7088 20.8313 16.7088 21.0516 16.9291L21.3187 17.1963C21.5391 17.4165 21.5391 17.7727 21.3187 17.993L19.0594 20.2519L21.3141 22.5062Z" fill="white"/></svg>';
    const adaIconWhite =
      '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 36 36" fill="none"><path d="M18 6C11.3726 6 6 11.3726 6 18C6 24.6274 11.3726 30 18 30C24.6274 30 30 24.6274 30 18C30 11.3726 24.6274 6 18 6ZM18 28.4516C12.2582 28.4516 7.54839 23.8038 7.54839 18C7.54839 12.2582 12.1962 7.54839 18 7.54839C23.7418 7.54839 28.4516 12.1962 28.4516 18C28.4516 23.7418 23.8038 28.4516 18 28.4516ZM24.7597 13.9511C24.858 14.3673 24.6002 14.7842 24.1841 14.8825C22.6838 15.2368 21.283 15.549 19.8927 15.7106C19.9186 21.268 20.5298 22.4842 21.2115 24.2285C21.406 24.7263 21.1601 25.2876 20.6622 25.482C20.164 25.6766 19.603 25.4303 19.4087 24.9327C18.9578 23.7791 18.5111 22.7763 18.2343 20.7096H17.7657C17.4885 22.7793 17.0405 23.7829 16.5913 24.9327C16.3966 25.431 15.8349 25.6763 15.3378 25.482C14.8399 25.2875 14.594 24.7263 14.7885 24.2285C15.4709 22.4825 16.0814 21.2655 16.1072 15.7106C14.7169 15.549 13.3161 15.2368 11.8158 14.8825C11.3997 14.7842 11.142 14.3673 11.2403 13.9511C11.3385 13.535 11.7555 13.2773 12.1717 13.3755C17.2631 14.5777 18.7272 14.58 23.8283 13.3755C24.2444 13.2777 24.6615 13.535 24.7597 13.9511ZM16.1519 11.8938C16.1519 10.8732 16.9793 10.0458 18 10.0458C19.0207 10.0458 19.8481 10.8732 19.8481 11.8938C19.8481 12.9145 19.0207 13.7419 18 13.7419C16.9793 13.7419 16.1519 12.9145 16.1519 11.8938Z" fill="white"/></svg>';

    // Function to handle the Enter key event
    const handleEnterKey = (event, callback) => {
      if (event.key === "Enter" || event.keyCode === 13) {
        callback(event);
      }
    };

    // Toggle widget visibility
    container.addEventListener("click", () => {
      container.classList.add("open");
    });

    container.addEventListener("keydown", (event) => {
      handleEnterKey(event, () => {
        container.classList.add("open");
      });
    });

    // Load form for the selected option
    const handleOptionClick = (e) => {
      // Check if the clicked element is an <svg> or any other child element
      let targetElement = e.target;

      // Traverse up the DOM to find the parent <li> element
      while (targetElement && targetElement.tagName !== "LI") {
        targetElement = targetElement.parentElement;
      }

      // If the parent <li> is found, proceed with the logic
      if (targetElement && targetElement.tagName === "LI") {
        const option = targetElement.getAttribute("data-option");
        if (!option) return;

        // Generate form based on option
        formContent.innerHTML = getFormContent(option);
        message.textContent = "Please select the type of issue you found. ";
        subMessage.textContent =
          "Reporting an issue is anonymous and helps our team make improvements to our courses.";
        optionsList.classList.add("hidden");
        backButton.style.display = "flex";
        icon.style.marginRight = "0px";
        form.classList.remove("hidden");
        footer.querySelector("span").innerHTML =
          "Need help now?<br><a href='https://help.michiganvirtual.org/support/tickets/new?_gl=1*qedl0u*_gcl_au*NjEzMTY3MTc4LjE3MzgyNzQyMjI.*_ga*MTQ3ODQ2NzcxOC4xNzM4Mjc0MjIy*_ga_VG58GV15BV*MTczODI3NDIyMS4xLjAuMTczODI3NDIyMS42MC4wLjA.' target='_blank'>Submit a ticket to our team <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d='M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z'/></svg></a> or <a href='https://help.michiganvirtual.org/support/tickets/new?_gl=1*qedl0u*_gcl_au*NjEzMTY3MTc4LjE3MzgyNzQyMjI.*_ga*MTQ3ODQ2NzcxOC4xNzM4Mjc0MjIy*_ga_VG58GV15BV*MTczODI3NDIyMS4xLjAuMTczODI3NDIyMS42MC4wLjA.' target='_blank'>Get Helpful tech tips <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d='M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z'/></svg></a>.";
        // Reattach dropdown event listeners for dynamic content
        attachDropdownListeners();
      }
    };

    optionsList.addEventListener("click", handleOptionClick);

    optionsList.addEventListener("keydown", (event) => {
      handleEnterKey(event, handleOptionClick);
    });

    // Close button
    const handleCloseClick = (e) => {
      e.stopPropagation(); // Stop event propagation

      container.style.backgroundColor = "#AC6610";
      heading.textContent = "Report an issue";
      container.classList.remove("open");
      setTimeout(function () {
        backButton.style.display = "none";
        form.classList.add("hidden");
        optionsList.classList.remove("hidden");
        heading.classList.remove("hidden");
        message.textContent = "What kind of issue are you experiencing?";
        message.classList.remove("hidden");
        subMessage.textContent = "";
        footer.querySelector("span").innerHTML =
          'Need help from a real person? <a href="https://help.michiganvirtual.org/support/tickets/new?_gl=1*qedl0u*_gcl_au*NjEzMTY3MTc4LjE3MzgyNzQyMjI.*_ga*MTQ3ODQ2NzcxOC4xNzM4Mjc0MjIy*_ga_VG58GV15BV*MTczODI3NDIyMS4xLjAuMTczODI3NDIyMS42MC4wLjA." target="_blank">Submit a ticket to our team<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/></svg></a>.';
        icon.innerHTML = flagIcon;
        icon.style.marginRight = "";
        thankYou.classList.add("hidden");
        closeButton.classList.remove("thank-you");
      }, 250);
    };

    closeButton.addEventListener("click", handleCloseClick);

    closeButton.addEventListener("keydown", (event) => {
      handleEnterKey(event, handleCloseClick);
    });

    // Back to options
    const handleBackClick = (e) => {
      e.stopPropagation(); // Stop event propagation
      container.style.backgroundColor = "#AC6610";
      backButton.style.display = "none";
      form.classList.add("hidden");
      optionsList.classList.remove("hidden");
      heading.textContent = "Report an issue";
      message.textContent = "What kind of issue are you experiencing?";
      subMessage.textContent = "";
      footer.querySelector("span").innerHTML =
        'Need help from a real person? <a href="https://help.michiganvirtual.org/support/tickets/new?_gl=1*qedl0u*_gcl_au*NjEzMTY3MTc4LjE3MzgyNzQyMjI.*_ga*MTQ3ODQ2NzcxOC4xNzM4Mjc0MjIy*_ga_VG58GV15BV*MTczODI3NDIyMS4xLjAuMTczODI3NDIyMS42MC4wLjA." target="_blank">Submit a ticket to our team<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/></svg></a>.';
      icon.innerHTML = flagIcon;
      icon.style.marginRight = "16px";
    };

    backButton.addEventListener("click", handleBackClick);

    backButton.addEventListener("keydown", (event) => {
      handleEnterKey(event, handleBackClick);
    });

    // Return button
    const handleReturnClick = (e) => {
      e.stopPropagation();
      container.style.backgroundColor = "#AC6610";
      backButton.style.display = "none";
      optionsList.classList.remove("hidden");
      heading.textContent = "Report an issue";
      message.textContent = "What kind of issue are you experiencing?";
      subMessage.textContent = "";
      message.classList.remove("hidden");
      icon.innerHTML = flagIcon;
      icon.style.marginRight = "16px";
      heading.classList.remove("hidden");
      optionsList.classList.remove("hidden");
      thankYou.classList.add("hidden");
      closeButton.classList.remove("thank-you");
    };

    returnButton.addEventListener("click", handleReturnClick);

    returnButton.addEventListener("keydown", (event) => {
      handleEnterKey(event, handleReturnClick);
    });

    // Handle form submission
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      let detail = form.querySelector("#details").value;
      let issueType = form.querySelector("#dropdown-option").textContent;

      const formSubmissionData = {
        "issue-type": issueType,
        detail: detail,
        url: window.location.href,
        "page-title": document.querySelector("h1").innerText,
      };

      // Send data to Zapier webhook
      try {
        await fetch("https://dry-river-4e6b.rrop.workers.dev/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formSubmissionData),
        });
      } catch (error) {
        console.error("Error sending data to Zapier:", error);
      }

      // Reset form and update UI
      form.reset();
      form.classList.add("hidden");
      thankYou.classList.remove("hidden");

      container.style.backgroundColor = "#FFFFFF";
      heading.classList.add("hidden");
      message.classList.add("hidden");
      subMessage.textContent = "";
      backButton.style.display = "none";
      body.style.borderTop = "0px";
      closeButton.classList.add("thank-you");
      footer.querySelector("span").innerHTML =
        'Need help from a real person? <a href="https://help.michiganvirtual.org/support/tickets/new?_gl=1*qedl0u*_gcl_au*NjEzMTY3MTc4LjE3MzgyNzQyMjI.*_ga*MTQ3ODQ2NzcxOC4xNzM4Mjc0MjIy*_ga_VG58GV15BV*MTczODI3NDIyMS4xLjAuMTczODI3NDIyMS42MC4wLjA." target="_blank">Submit a ticket to our team<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/></svg></a>.';
    });

    // Attach dropdown event listeners
    function attachDropdownListeners() {
      setTimeout(() => {
        // Ensure it runs after DOM update
        const dropdown = container.querySelector(".issues-dropdown");
        if (!dropdown) return;

        const dropdownHeader = dropdown.querySelector(".dropdown-header");
        const dropdownOptions = dropdown.querySelector(".dropdown-options");

        if (!dropdownHeader || !dropdownOptions) return;

        // Toggle dropdown visibility
        dropdownHeader.addEventListener("click", (e) => {
          e.stopPropagation();
          dropdown.classList.toggle("active");
        });

        // Handle option selection
        dropdownOptions.addEventListener("click", (e) => {
          if (e.target.tagName === "LI") {
            dropdownHeader.querySelector("#dropdown-option").textContent =
              e.target.textContent;
            dropdown.classList.remove("active");
          }
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
          if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("active");
          }
        });
      }, 0); // Small delay to ensure DOM updates first
    }

    // Attach initial dropdown event listeners
    attachDropdownListeners();

    // Generate form content based on option
    function getFormContent(option) {
      switch (option) {
        case "technology":
          heading.textContent = "Technology Issue";
          icon.innerHTML = techIconWhite;
          return `
            <div class="issues-dropdown">
                <div class="dropdown-header" tabindex=0>
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
            <div>
              <textarea id="details" name="details" required placeholder="Describe the issue"></textarea>
            </div>
          `;
        case "course-content":
          container.style.backgroundColor = "#6A7F17";
          heading.textContent = "Content Issue";
          icon.innerHTML = contentIconWhite;
          return `
            <div class="issues-dropdown">
                <div class="dropdown-header" tabindex=0>
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
                    <li data-value="option1">Grammar / Typos</li>
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
          icon.innerHTML = adaIconWhite;
          return `
            <div class="issues-dropdown">
                <div class="dropdown-header" tabindex=0>
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
