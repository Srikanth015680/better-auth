// ============================================================
// IMPORT REQUIRED MODULES
// ============================================================

// @actions/core provides GitHub Actions functions.
// Examples: getInput(), setOutput(), info(), setFailed().
const core = require("@actions/core");

// fs reads files from the filesystem.
const fs = require("fs");

// path safely constructs file paths.
const path = require("path");


// ============================================================
// MAIN ACTION FUNCTION
// ============================================================

async function run() {

  try {

    // --------------------------------------------------------
    // STEP 1: READ INPUT
    // --------------------------------------------------------

    // Get the package.json path from action.yml input.
    // If the caller does not provide it, use package.json.
    const packageJsonPath = core.getInput("package-json");

    // GITHUB_WORKSPACE is the root directory of the checked-out
    // repository on the GitHub Actions runner.
    const workspace = process.env.GITHUB_WORKSPACE || process.cwd();

    // Convert the supplied path into an absolute path.
    const fullPath = path.resolve(workspace, packageJsonPath);


    // --------------------------------------------------------
    // STEP 2: CHECK WHETHER package.json EXISTS
    // --------------------------------------------------------

    if (!fs.existsSync(fullPath)) {

      // Stop the action with a clear error message.
      throw new Error(`package.json not found: ${fullPath}`);

    }


    // --------------------------------------------------------
    // STEP 3: READ package.json
    // --------------------------------------------------------

    // Read the file as UTF-8 text.
    const fileContent = fs.readFileSync(fullPath, "utf8");

    // Convert JSON text into a JavaScript object.
    const packageData = JSON.parse(fileContent);


    // --------------------------------------------------------
    // STEP 4: EXTRACT PROJECT INFORMATION
    // --------------------------------------------------------

    // Read the project name.
    const projectName = packageData.name || "unknown-project";

    // Read the project version.
    const projectVersion = packageData.version || "not-defined";

    // Find the Next.js version in dependencies or devDependencies.
    const nextVersion =
      packageData.dependencies?.next ||
      packageData.devDependencies?.next;


    // --------------------------------------------------------
    // STEP 5: VALIDATE NEXT.JS
    // --------------------------------------------------------

    if (!nextVersion) {

      // Fail if the package does not declare Next.js.
      throw new Error("Next.js dependency was not found in package.json");

    }


    // --------------------------------------------------------
    // STEP 6: DISPLAY INFORMATION IN ACTION LOGS
    // --------------------------------------------------------

    core.info("====================================");
    core.info("       NEXT.JS PROJECT INFO         ");
    core.info("====================================");

    core.info(`Project Name: ${projectName}`);
    core.info(`Project Version: ${projectVersion}`);
    core.info(`Next.js Version: ${nextVersion}`);

    core.info("Next.js project validation successful!");


    // --------------------------------------------------------
    // STEP 7: RETURN OUTPUTS TO THE WORKFLOW
    // --------------------------------------------------------

    // These outputs can be accessed by later workflow steps.
    core.setOutput("project-name", projectName);
    core.setOutput("project-version", projectVersion);
    core.setOutput("next-version", nextVersion);

  }

  catch (error) {

    // Mark the GitHub Actions step as failed.
    core.setFailed(error.message);

  }

}


// ============================================================
// EXECUTE THE ACTION
// ============================================================

run();