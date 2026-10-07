# Git & GitHub

## 1. Wrong Branch, Correct Work

First I would identify the four commits and create a backup branch so that the work is safe. Then I would move those commits to the correct feature branch, and restore main to its previous state. If the commits were already pushed to remote, I would avoid rewriting shared main history and would use cherry-pick or revert depending on the situation.

# Scenario A: Local commits made on main (NOT pushed to remote yet)

# Create a new feature branch from main without switching to it
git branch my-new-feature

# Restore local main to its previous clean state (matching the remote server)
git reset --hard origin/main

# Switch to your new feature branch to continue working
git checkout my-new-feature

# Scenario B: Commits are ALREADY pushed to the remote main branch

Copy the changes to the feature branch and safely undo them on main without breaking the history for teammates.

# Fetch all the latest changes from the remote repository
git fetch origin 

# View the commit history to find and copy the specific Commit Hash ID
git log --oneline main 

# Switch to your feature branch (create it with -c if it doesn't exist)
git switch -c feature-branch 

# Pull the specific commit from main into your feature branch
git cherry-pick <commit-hash-id>  

# Push the newly added commit from the feature branch to the remote repository
git push origin feature-branch 

# Switch back to the main branch
git checkout main 

# Safely undo the mistake by creating a new "inverse" commit that rolls back changes
git revert <commit-hash-id>

# Push the revert commit to remote main so everyone's repository stays in sync
git push origin main

# 1.1 Would your approch if the commit were already pushed to the remote?
Yes. If the commits are already pushed to the remote repository, rewriting the shared main history (using reset --hard and force pushing) is dangerous. Instead, I would use cherry-pick to copy the work to the feature branch and revert to safely undo the changes on main.

# 1.2 When would you use cherry-pick here?
I would use cherry-pick when I want to copy specific commits from another branch (like main) into my current feature branch without merging the entire branch.

# 1.3 What Would you do if the teammates already using main?
If teammates are already pulling from and working on main, using git revert is the absolute correct approach.
• Why? git revert does not delete history; it adds a new commit that subtracts the accidental changes.


## 2. Merge Conflict During PR

# 2.1 How do you verify that the conflict resolution did not break existing functionality?
I would first update my local repository from main, then bring the latest main changes into my feature branch. I would resolve the conflict carefully, run tests and verify the affected functionality, commit the resolution, and push the feature branch. The PR will then update automatically.

# 2.2 would you mearge main into the feature branch or rebase ? explain the trade -off.
Merge preserves the branch history and is generally safer for shared branches.

Rebase creates a cleaner , linear history but rewrites commit history, so it should be used carefully, especially on shared branches.

# 2.3What should you do before pushing the resolved branch?
Before pushing, I would compile the project, run all automated test suites to ensure no features are broken, and run a quick `git diff` to make sure no residual conflict markers (`<<<<<<<`, `>>>>>>>`) were left behind in the code.

## 3. Secret Accidentally Committed
I would immediately revoke or rotate the exposed secret. Then I would remove it from the repository and, if it was pushed, remove it from Git history as well. I would verify that the secret is no longer exposed and check whether it was used. 
Finally, I would prevent it from happening again using environment variables, .gitignore, and secret scanning.

### 3.1 Why is deleting the commit/file not enough?
Because Git tracks the complete history of the project. Simply deleting the file or creating a new commit to remove it leaves the secret completely visible in older commits. Anyone accessing the repository's history can easily retrieve it.

### 3.2 What should happen to the exposed key itself?
The exposed key must be immediately revoked and rotated. Once a secret is pushed to a remote repository, it must be treated as compromised. Invalidating the key at the provider level ensures that even if someone copied it, the key is no longer functional.

### 3.3 How would you prevent similar secrets from being committed again?
* **Use Environment Variables:** Move credentials completely out of the code and access them via environment variables.
* **Configure `.gitignore`:** Ensure `.env` and configuration files containing sensitive data are added to the `.gitignore` file before starting development.
* **Implement Pre-commit Hooks:** Use tools like `gitleaks` or `talisman` locally to block commits that contain sensitive strings or key patterns.
* **Enable Secret Scanning:** Leverage automated platform features (like GitHub Secret Scanning) to continuously monitor the repository for leaked keys.


## 4. PR Review With New Changes
I would make the requested changes on the same feature branch, preferably as focused commits, run tests, and push those commits. The existing PR updates automatically. I would avoid rewriting history unless there is a clear reason, and if I need a force push I would communicate it with the reviewer.

# 4.1 Why would you create a new commit or amend/squash?
* **New Commit:** Best during active review. it is safer or review-friendly.
* **Amend/Squash:** Best before the final merge. it will be usful when you want to clear history,but it rewrites history

# 4.2 When can a force-push become risky?
Force-pushing becomes highly risky if the feature branch is shared with other teammates. It overwrites the remote history, which can accidentally erase a teammate's pushed work and break their local repository sync.

# 4.3 How would you communicate a significant change to the reviewer?
I would post a clear comment on the PR detailing the reason for the architectural or major code shift, tag the reviewer, and briefly outline which areas need a re-review. If urgent, I would follow up via team chat.


## 5. Recovering Lost Local Work
Before changing the main branch again, I would create a recovery branch from the reflog commit so that the recovered work is preserved.

# 5.1 What is git reflog and why can it help?
`git reflog` is a local log that records every action performed in the repository (commits, switches, resets, rebases). It helps because it keeps track of "dangling" or orphaned commits that no longer belong to any active branch, allowing you to find the exact Hash ID of lost work and restore it.

# 5.2 How would you verify the recovered commit before changing the branch?
I would use `git show <commit-hash>` to view the specific code differences. Alternatively, I would temporarily check out the specific commit hash directly (`git checkout <commit-hash>`) to run tests and verify the code's functionality in a detached HEAD state before creating a recovery branch.

# 5.3 What habit would reduce the chance of permanent loss?
The best habit is to commit work frequently, even as partial or "WIP" (Work In Progress) commits. Once code is committed locally, Git tracks it in the reflog, meaning it can always be recovered. Additionally, taking quick backup branches before running destructive commands like `git reset --hard` eliminates risk.
