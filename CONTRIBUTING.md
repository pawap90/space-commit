Thanks for your interest in this space exploration program! In this document, you'll find information about how to get involved and contribute.

# Contribute
Any contribution through a Pull Request will allow you to become a part of the game. 
If you wish to submit a PR, please make sure there's an Issue for it first and that said Issue isn't already assigned to someone else. 
Ask for the Issue in the comments so we can assign it to you!

If you wish to contribute with something that doesn't currently exist in the Issues section, create a new Issue specifying the details of the feature/improvement/fix you want to make, and we will review it.
Once it's approved, you can start working on the PR!

## Submitting a PR
After you are assigned an Issue, you can develop and submit your PR. 
For the PR to be approved, all the Checks must pass.

Make sure to run `npm run build` locally so you can fix any lint or build errors before submitting the PR.

# Run the project
Here's everything you need to know to run the project locally.

## Dependencies
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## Quickstart

1. Clone the repo:

```sh
git clone https://github.com/pawap90/space-commit
```

2. Install dependencies: Run the following command from the project's root folder:

```sh
npm install
```

3. Start the local development server: 

```sh
npm start
```

Go to your browser and navigate to http://localhost:8000. You should see the game running.

## Live Updates
Once you get the project running, you can start coding and enjoy live updates in your browser, thanks to Snowpack!

## NPM Scripts
A brief description of the scripts you'll find in the `package.json`:
- **start**: Starts the local development server. Use it to test your project during development.
- **prebuild**: Compiles the project and runs the linter. This script will be executed before `build`, and its goal is to find any errors before the production build is created.
- **build**: Generates the production build in a `_build` folder located in the project's root.
- **lint**: Runs the linter and prints any issues found
- **lint:fix**: Runs the linter and executes automatic fixes. It'll also print any issues that couldn't be solved.

## Happy coding! 
