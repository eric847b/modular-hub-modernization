#!/usr/bin/env python3
"""Minimal FailureSolver entrypoint."""
import os, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
try:
    from failure_solver import get_failure_solver
except ImportError:
    print("failure_solver not present yet")
    raise SystemExit(0)

def main():
    repo = os.getenv("GITHUB_REPOSITORY", "eric847b/modular-hub-modernization")
    profile = {}
    def record(e, c=""): print(f"[ERROR:{c}] {e}")
    solver = get_failure_solver(repo, profile=profile, record_error=record)
    print(solver.run_proactive_pass(max_issues=3))
    try:
        from failure_solver_draft_ext import create_draft_pr_for_safe_class
        for a in solver.scan_and_prioritize(max_runs=5)[:2]:
            r = create_draft_pr_for_safe_class(solver, a)
            if r and r.get("number"):
                print("draft_pr", r)
    except Exception as e:
        print("draft_ext optional", e)

if __name__ == "__main__":
    main()
