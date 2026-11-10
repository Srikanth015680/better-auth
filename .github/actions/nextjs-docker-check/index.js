// ============================================================
// IMPORT NODE.JS MODULES
// ============================================================

const fs = require("fs");
const path = require("path");


// ============================================================
// MAIN FUNCTION
// ============================================================

async function run() {

  try {

    // --------------------------------------------------------
    // STEP 1: READ INPUT
    // --------------------------------------------------------

    // GitHub automatically converts action inputs into
    // environment variables inside Docker Actions.
    //
    // package-json becomes INPUT_PACKAGE_JSON.

    const packageJsonPath =
      process.env.INPUT_PACKAGE_JSON || "package.json";


    // --------------------------------------------------------
    // STEP 2: FIND PROJECT DIRECTORY
    // --------------------------------------------------------

    // GitHub mounts the checked-out repository into
    // /github/workspace inside the Docker container.

    const workspace =
      process.env.GITHUB_WORKSPACE || "/github/workspace";

    // Resolve the package.json path.
    const fullPath = path.resolve(workspace, packageJsonPath);


    // --------------------------------------------------------
    // STEP 3: CHECK FILE
    // --------------------------------------------------------

    // Check whether package.json exists.

    if (!fs.existsSync(fullPath)) {

      throw new Error(`package.json not found: ${fullPath}`);

    }


    // --------------------------------------------------------
    // STEP 4: READ PACKAGE.JSON
    // --------------------------------------------------------

    // Read package.json as text.

    const fileContent = fs.readFileSync(fullPath, "utf8");

    // Convert JSON text into a JavaScript object.

    const packageData = JSON.parse(fileContent);


    // --------------------------------------------------------
    // STEP 5: EXTRACT PROJECT INFORMATION
    // --------------------------------------------------------

    const projectName =
      packageData.name || "unknown-project";

    const projectVersion =
      packageData.version || "not-defined";

    const nextVersion =
      packageData.dependencies?.next ||
      packageData.devDependencies?.next;


    // --------------------------------------------------------
    // STEP 6: VALIDATE NEXT.JS
    // --------------------------------------------------------

    if (!nextVersion) {

      throw new Error(
        "Next.js dependency not found in package.json"
      );

    }


    // --------------------------------------------------------
    // STEP 7: DISPLAY INFORMATION
    // --------------------------------------------------------

    console.log("====================================");

    console.log("       NEXT.JS DOCKER ACTION        ");

    console.log("====================================");

    console.log(`Project Name: ${projectName}`);

    console.log(`Project Version: ${projectVersion}`);

    console.log(`Next.js Version: ${nextVersion}`);

    console.log("Project validation successful!");


    // --------------------------------------------------------
    // STEP 8: WRITE OUTPUTS
    // --------------------------------------------------------

    // GitHub provides GITHUB_OUTPUT as a file path.
    // Writing key=value lines to this file exposes step outputs.

    const outputFile = process.env.GITHUB_OUTPUT;

    if (!outputFile) {
      throw new Error("GITHUB_OUTPUT is not available");
    }

    fs.appendFileSync(
      outputFile,
      `project-name=${projectName}\n` +
      `project-version=${projectVersion}\n` +
      `next-version=${nextVersion}\n`
    );

  }

  catch (error) {

    // Print the error and exit with a failure code.
    console.error(error.message);

    process.exitCode = 1;

  }

}


// ============================================================
// EXECUTE THE ACTION
// ============================================================

run();