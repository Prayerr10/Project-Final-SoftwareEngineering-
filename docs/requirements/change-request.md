# Requirement Change Request

| Review Status | Human Reviewed & Approved |
| --- | --- |
| Skill AI | Skill 05 - Validation dan Change (`requirements-validation-change-management`) |
| Human decision | Disetujui |

## Change Description

`CR-05-01`: Proposed change to add a non-status field or flag that marks a `RESOLVED` report as waiting for Pelapor confirmation before Administrator closure.

This proposed change must not add a seventh main status. The strict status list remains `SUBMITTED`, `UNDER_REVIEW`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, and `CLOSED` unless a separate approved change request explicitly changes BR-02.

## Reason and Source

- Source: OPEN-11 in `docs/requirements/inception.md`, `docs/requirements/elicitation.md`, `docs/requirements/requirements.md`, `docs/requirements/user-stories.md`, and `docs/requirements/prioritization.md`.
- Reason: BR-11 requires Pelapor confirmation before `CLOSED`, except for Administrator manual override. Current requirements do not define how the system distinguishes a normal `RESOLVED` report from a `RESOLVED` report waiting for confirmation without adding a new main status.
- Evidence label: OPEN QUESTION.

## Classification

- Change type: Proposed requirement clarification.
- Scope type: In-scope workflow clarification.
- Evidence labels: OPEN QUESTION, FACT, CONSTRAINT.
- Requirement decision status: NEEDS CLARIFICATION.
- Implementation status: Not approved for implementation.

## Affected Artifacts

| Artifact | Affected items | Impact |
| --- | --- | --- |
| `docs/requirements/requirements.md` | FR-19, FR-20, BR-02, BR-11 | May need a clarification field/rule after approval. |
| `docs/requirements/user-stories.md` | US-13, US-14, AC-13.1, AC-13.2, AC-14.1, AC-14.2 | May need acceptance criteria for the waiting-confirmation marker. |
| `docs/requirements/prioritization.md` | FR-19, FR-20, OPEN-11 | Priority remains Must; clarification may reduce validation risk. |
| `docs/requirements/traceability.md` | FR-19, FR-20, US-13, US-14 | Trace links may need update after a human-approved requirement revision. |
| Future design/API/database/test artifacts | Confirmation marker storage and UI display | Impact should be assessed in Skill 06 and later only after Human Review approval. |

## Impact Analysis

- Scope: The change stays within required scope because reporter confirmation and closure are already required by BR-11, FR-19, and FR-20. It must not introduce a new main status or out-of-scope notification/authentication feature.
- Consistency: The change can be consistent with BR-02 only if it is represented as a non-status marker, field, timestamp, or note. It would conflict with BR-02 if implemented as a seventh status such as `WAITING_CONFIRMATION`.
- Feasibility: A simple marker is feasible with Cloudflare D1 and React. Feasibility of exact representation is uncertain until design/database decisions are made.
- Testability: The change would improve testability if accepted because tests could verify that a report is `RESOLVED`, awaits confirmation, records Pelapor confirmation, and then allows Administrator closure.
- Traceability: The change is traceable to OPEN-11, FR-19, FR-20, BR-02, BR-11, US-13, and US-14. Traceability should be updated only after a human-approved revision.
- Stakeholder interests: Pelapor benefits from a visible confirmation step; Administrator benefits from clearer close conditions; Teknisi benefits from distinguishing completed work from final closure; Manajer Fasilitas benefits from clearer lifecycle reporting.
- Dependencies and priorities: FR-19 and FR-20 are Must. The clarification depends on preserving BR-02 strict statuses and on resolving manual override detail in OPEN-03.

## Risks and Uncertainties

1. Risk: Implementing this as a new status would violate BR-02 and the approved strict 6 status decision.
2. Risk: Without OPEN-03 resolution, manual override behavior may still be incomplete even if the waiting-confirmation marker is approved.
3. Uncertainty: The exact data representation is not decided in the requirements artifacts.
4. Uncertainty: UI behavior for Pelapor confirmation is not yet designed and must wait for Skill 06 or later.

## Decision

- Recommendation: NEEDS CLARIFICATION.
- Rationale: The need is well supported by existing BR-11, FR-19, FR-20, and OPEN-11, but the exact representation requires a human decision before requirement text is changed.
- Conditions:
  1. Human reviewer confirms whether a non-status marker is acceptable.
  2. Human reviewer confirms that no seventh main status may be added under this change.
  3. Manual override conditions in OPEN-03 remain separately unresolved unless explicitly decided.
  4. Any accepted change must update requirements, user stories, acceptance criteria, and traceability before design or implementation relies on it.

## Required Follow-up Updates

If accepted by Human Review:

1. Update BR-11 or add a supporting business rule that defines the non-status confirmation marker.
2. Update US-13 and US-14 acceptance criteria to verify the marker, confirmation, and closure behavior.
3. Update `docs/requirements/traceability.md` with the accepted change and affected requirements.
4. Carry the approved representation into design, database/API design, issue planning, and tests in later skills.

If rejected or deferred:

1. Keep OPEN-11 unresolved.
2. Do not add the marker to requirements, design, database, code, or tests.

## Human Approval Status

- Status: Human Reviewed & Approved.
- Human decision: Disetujui melalui `evidence/human-review-validation.md` dan Pull Request Skill 05.
- This change request is analysis only and does not modify the approved requirement baseline.
