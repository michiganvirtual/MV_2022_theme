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
            width: 300px;
            font-family: 'Roboto', Arial, sans-serif;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            overflow: hidden;
          }
          .help-header {
            background-color: #ac6610;
            color: white;
            padding: 10px;
            text-align: center;
            cursor: pointer;
          }
          .help-body {
            background: white;
            padding: 10px;
            display: none;
            border-top: 1px solid #ccc;
          }
          .help-footer {
            display: none;
            padding: 10px;
            border-top: 1px solid #ccc;
            background: #f9f9f9;
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
        <div class="help-header">Need Help?</div>
        <div class="help-body">
          <ul class="help-options">
            <li data-option="broken-link">Submit a Broken Link</li>
            <li data-option="technical-issue">Report a Technical Issue</li>
            <li data-option="other">Other</li>
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

    // Toggle widget visibility
    header.addEventListener("click", () => {
      body.style.display = body.style.display === "none" ? "block" : "none";
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
      case "broken-link":
        return `
            <label for="url">Broken Link URL:</label>
            <input type="url" id="url" name="url" required placeholder="Enter URL"><br>
            <label for="details">Details:</label>
            <textarea id="details" name="details" required placeholder="Describe the issue"></textarea>
          `;
      case "technical-issue":
        return `
            <label for="issue">Describe the issue:</label>
            <textarea id="issue" name="issue" required></textarea>
          `;
      case "other":
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
