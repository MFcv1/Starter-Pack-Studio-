# Skill: Update Desktop App

This skill builds the Starter Pack Studio desktop application and updates the shortcut on your macOS Desktop.

## Instructions

To update the desktop application:
1. Run the compilation, packaging, and linking command sequence in the workspace root:
   ```bash
   npm run dist && npm run desktop:link
   ```
2. Verify that the build completes successfully and confirm to the user that the Desktop app is updated.
