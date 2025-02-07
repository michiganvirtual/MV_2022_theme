class HelpWidget extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const container = document.createElement("div");
    container.classList.add("help-container");

    container.innerHTML = `
        <style>
          .help-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-family: 'Roboto', Arial, sans-serif;
            overflow: hidden;
          }
          .help-header {
            height: 50px;
            display: flex;
            height: 50px;
            padding: 7px 10px 7px 8px;
            justify-content: center;
            align-items: center;
            gap: 6px;
            flex-shrink: 0;
            border-radius: 113px;
            background: #AC6610;
            box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.30);
            z-index: 99;
          }
          .help-header span {
            color: #FFF;
            font-family: 'Roboto';
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
          }
          .help-body {
            background: white;
            padding: 10px;
            display: none;
            width: 396px;
            border-top: 1px solid #ccc;
          }
          .help-footer {
            display: none;
            padding: 10px;
            border-top: 1px solid #ccc;
            background: #f9f9f9;
          }
          .help-options {
            display: flex;

          }
          .help-options, .help-form {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }
          .help-options li {
            margin: 5px 0;
            cursor: pointer;
            color: #ac6610;
          }
          .hidden {
            display: none;
          }
        </style>
        <div class="help-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
            <g clip-path="url(#clip0_62_2203)">
              <path d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05888 27.9411 0 18 0C8.05888 0 0 8.05888 0 18C0 27.9411 8.05888 36 18 36Z" fill="white"/>
              <path d="M29.628 11.3112C24.0336 17.5896 14.0688 4.1688 8.4744 10.4472C9.4536 14.8608 10.4328 19.2744 11.412 23.6952C16.0272 13.0032 25.0128 22.0104 29.628 11.3184V11.3112Z" stroke="#115E6E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.7688 7.28639L12.9672 30.7368" stroke="#115E6E" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"/>
            </g>
            <defs>
              <clipPath id="clip0_62_2203">
                <rect width="36" height="36" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span>Report a problem</span>
        </div>
        <div class="help-body">
          <ul class="help-options">
            <li data-option="technology"><img src="">Technology Issue</li>
            <li data-option="course-content"><img src="">Course Content Issue</li>
            <li data-option="accessibility"><img src="">Accessibility Issue</li>
          </ul>
          <form class="help-form hidden">
            <div class="form-content"></div>
            <button type="button" class="back-button">Back</button>
            <button type="submit" class="submit-button">Submit</button>
          </form>
        </div>
      `;

    shadow.appendChild(container);

    const header = container.querySelector(".help-header");
    const body = container.querySelector(".help-body");
    const optionsList = container.querySelector(".help-options");
    const form = container.querySelector(".help-form");
    const formContent = container.querySelector(".form-content");
    const backButton = container.querySelector(".back-button");

    // Initialize the body display to none
    body.style.display = "none";

    // Toggle widget visibility
    header.addEventListener("click", () => {
      body.style.display = body.style.display === "none" ? "block" : "none";
      header.classList.toggle("open");
    });

    // Load form for the selected option
    optionsList.addEventListener("click", (e) => {
      const option = e.target.getAttribute("data-option");
      if (!option) return;

      // Generate form based on option
      formContent.innerHTML = this.getFormContent(option);
      optionsList.classList.add("hidden");
      form.classList.remove("hidden");
    });

    // Back to options
    backButton.addEventListener("click", () => {
      form.classList.add("hidden");
      optionsList.classList.remove("hidden");
    });

    // Handle form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Form submitted! Thank you for your feedback.");
      form.reset();
      form.classList.add("hidden");
      optionsList.classList.remove("hidden");
    });
  }

  // Generate form content based on option
  getFormContent(option) {
    switch (option) {
      case "technology":
        return `
            <label for="url">Broken Link URL:</label>
            <input type="url" id="url" name="url" required placeholder="Enter URL"><br>
            <label for="details">Details:</label>
            <textarea id="details" name="details" required placeholder="Describe the issue"></textarea>
          `;
      case "course-content":
        return `
            <label for="issue">Describe the issue:</label>
            <textarea id="issue" name="issue" required></textarea>
          `;
      case "accessibility":
        return `
            <label for="feedback">Your feedback:</label>
            <textarea id="feedback" name="feedback" required></textarea>
          `;
      default:
        return `<p>Unknown option selected.</p>`;
    }
  }
}

customElements.define("help-widget", HelpWidget);
