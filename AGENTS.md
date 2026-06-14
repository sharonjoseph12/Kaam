<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->

# Global Project Rules: Quality & Dead Code

You must enforce the following rules during implementation phases:

1. **Dead Code Elimination (The Fallow Tools)**: 
   - After writing or modifying code in a phase, you MUST run the appropriate dead code analyzer.
   - For React Web Dashboard: Run `npx knip` to detect unused files, exports, and dependencies.
   - For FastAPI Backend: Run `vulture .` to catch unused Python code.
   - For Flutter Mobile App: Run `flutter analyze` to catch unused imports and variables.
   
2. **Strict Quality Gates**:
   - Web: Use `eslint` and `prettier`. No warnings allowed.
   - Backend: Use `ruff check .` and `mypy .`. 
   - Mobile: Use `flutter format .` and `flutter analyze`.

3. **Execution Protocol**:
   - You must execute these tools proactively. Do not wait for the user to ask you to run them after a spec or implementation phase is completed.
   - If dead code or lint errors are found, fix them immediately.
