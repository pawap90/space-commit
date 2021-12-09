
Space Commit is a simple, side-scroller, open-source game where contributors become the heroes and can experience their contributions right inside the game!

![demo1](https://user-images.githubusercontent.com/2507959/145306887-d7187363-b844-4f1f-a792-b0a65130f097.gif)

>[Check the game out here!](https://pawap90.github.io/space-commit).

## How it works

When a PR with a contribution is merged, it triggers a GitHub Actions Workflow. This workflow extracts the following information from the PR:

- The author's username
- The author's avatar
- The PR title
- The commit hash!
 
![Image showing how the info is used in the game's main menu](https://user-images.githubusercontent.com/2507959/145310841-d667b5ba-520b-41f5-baf8-abe04c07b079.png)

The workflow then overrides the file `Contributor.ts` with this information and builds and deploys the whole project to GitHub Pages. Then, the game uses the data from `Contributor.ts` to put the player's avatar inside our astronaut hero's helmet. Finally, the other info is used in the main menu to detail the latest contribution as if it was part of a space exploration program.

The latest contribution from each user is stored in the `archive` folder, so you can still access it from the site after a new PR is merged.

## I want to contribute

If you wish to get involved with our space exploration program, please read our [contributing docs](https://github.com/pawap90/space-commit/blob/main/CONTRIBUTING.md).
