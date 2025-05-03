# Testing Summary

To verify the functionality of the **Smart Academic Assistant** extension, we conducted manual testing on multiple research articles hosted on [IEEE Xplore](https://ieeexplore.ieee.org).

### ✅ Test Procedure
- Navigated to various IEEE Xplore paper pages.
- Activated the extension on each page.
- Confirmed that the following fields were correctly extracted and displayed:
  - **Title**
  - **Authors** (with clickable links to profile pages)
  - **Abstract** (with duplicate or redundant "Abstract:" text removed)

### 🔍 Validation Goals
- Ensure data was parsed from the correct DOM elements.
- Verify that links and text formatting were preserved.
- Confirm usability of the popup layout and responsive behavior.

This manual process helped us validate the extension’s performance across different page structures and ensured accurate real-time extraction.
