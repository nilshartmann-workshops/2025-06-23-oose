import { Task } from "./types.ts";

export const tasks: Task[] = [
  {
    id: "1",
    title: "Fix Header Bug",
    description:
      "The website header is not rendering correctly on mobile devices, causing significant usability issues for users accessing the site on smaller screens. This bug seems to be related to the responsive design implementation and CSS rules. Investigating and resolving this issue will ensure the header adapts properly to all screen sizes. Additionally, testing on different browsers is required to confirm the fix works universally.",
    effort: 5,
    state: "in_progress",
    votes: 12,
    dueDate: "2024-12-01",
  },
  {
    id: "2",
    title: "Write API Docs",
    description:
      "The API documentation is incomplete, making it difficult for developers to integrate and utilize our services effectively. This task involves documenting all the available endpoints, including their request/response formats, authentication methods, and potential error codes. Clear examples should be provided for common use cases, such as creating, updating, or deleting records. Including diagrams and workflows for complex API interactions will enhance the overall usability of the documentation.",
    effort: 3,
    state: "new",
    votes: 8,
    dueDate: "2024-12-05",
  },
  {
    id: "3",
    title: "Refactor Backend",
    description:
      "The backend codebase has grown significantly and now contains redundant, poorly structured logic that needs to be refactored. This task involves modularizing the code to improve maintainability and reduce technical debt. Key areas to focus on include replacing nested callback chains with promises or async/await and centralizing configuration values. Comprehensive testing will be necessary after refactoring to ensure no regressions or unexpected behavior occur.",
    effort: 7,
    state: "done",
    votes: 5,
    dueDate: "2024-11-29",
  },
  {
    id: "4",
    title: "Improve UI Design",
    description:
      "The current UI design lacks polish and fails to provide a cohesive user experience. This task involves refining the visual elements of the application, such as typography, spacing, and color schemes, to make the interface more intuitive and visually appealing. Accessibility improvements, such as better contrast ratios and keyboard navigation support, should also be included. Conducting user testing will provide valuable feedback to iterate on the design changes effectively.",
    effort: 4,
    state: "in_progress",
    votes: 15,
    dueDate: "2024-12-03",
  },
  {
    id: "5",
    title: "Optimize Database",
    description:
      "Database queries are taking too long to execute, especially under heavy load, leading to performance bottlenecks. This task involves optimizing existing SQL queries, adding indexes to frequently queried columns, and ensuring proper normalization of tables. Profiling tools should be used to identify slow queries and areas of improvement. Once optimizations are applied, stress testing should be conducted to confirm the system can handle a high volume of transactions efficiently.",
    effort: 6,
    state: "new",
    votes: 10,
    dueDate: "2024-12-07",
  },
  {
    id: "6",
    title: "Test Payment Flow",
    description:
      "The payment flow has been updated to support additional payment methods, and extensive testing is required to ensure all methods work seamlessly. This task involves verifying credit card payments, digital wallets, and PayPal integration. Edge cases, such as failed payments and retries, should also be tested thoroughly. Documentation of the test cases and results will ensure that future updates to the payment flow can be validated efficiently.",
    effort: 8,
    state: "done",
    votes: 3,
    dueDate: "2024-11-30",
  },
];

export const allInsights = [
  // Insights for Task 1: Fix Header Bug
  {
    id: "101",
    taskId: "1",
    author: "Alice",
    text: "This issue might be related to how CSS rules are being applied to the header component.",
    confidence: 8,
  },
  {
    id: "102",
    taskId: "1",
    author: "Bob",
    text: "Check for browser-specific behavior, especially with Safari and older versions of Edge.",
    confidence: 7,
  },
  {
    id: "103",
    taskId: "1",
    author: "Charlie",
    text: "The issue seems to be intermittent, possibly due to cached stylesheets.",
    confidence: 9,
  },

  // Insights for Task 2: Write API Documentation
  {
    id: "201",
    taskId: "2",
    author: "Dana",
    text: "We need to include examples for the POST and PUT endpoints to help new developers.",
    confidence: 8,
  },
  {
    id: "202",
    taskId: "2",
    author: "Eve",
    text: "Consider adding a section about error codes and how to handle them gracefully.",
    confidence: 9,
  },
  {
    id: "203",
    taskId: "2",
    author: "Frank",
    text: "We should also document rate limits for API requests to avoid unexpected throttling.",
    confidence: 7,
  },

  // Insights for Task 3: Refactor Backend
  {
    id: "301",
    taskId: "3",
    author: "Grace",
    text: "Using async/await instead of nested promises can make the codebase much cleaner.",
    confidence: 10,
  },
  {
    id: "302",
    taskId: "3",
    author: "Hank",
    text: "We could modularize the services to reduce dependencies between components.",
    confidence: 8,
  },
  {
    id: "303",
    taskId: "3",
    author: "Ivy",
    text: "Some of the database queries are redundant and could be optimized during the refactor.",
    confidence: 9,
  },

  // Insights for Task 4: Improve UI Design
  {
    id: "401",
    taskId: "4",
    author: "Jake",
    text: "The font sizes on smaller screens are inconsistent and need standardization.",
    confidence: 7,
  },
  {
    id: "402",
    taskId: "4",
    author: "Liam",
    text: "Adding more whitespace between sections will improve readability.",
    confidence: 8,
  },
  {
    id: "403",
    taskId: "4",
    author: "Mia",
    text: "The color contrast in the buttons does not meet accessibility standards.",
    confidence: 9,
  },

  // Insights for Task 5: Optimize Database
  {
    id: "501",
    taskId: "5",
    author: "Noah",
    text: "Adding an index on the `users` table will significantly speed up lookups.",
    confidence: 10,
  },
  {
    id: "502",
    taskId: "5",
    author: "Olivia",
    text: "Check for unused columns in the `orders` table that can be removed or archived.",
    confidence: 8,
  },
  {
    id: "503",
    taskId: "5",
    author: "Paul",
    text: "Partitioning the `logs` table by date could reduce query times for older records.",
    confidence: 9,
  },

  // Insights for Task 6: Test Payment Flow
  {
    id: "601",
    taskId: "6",
    author: "Quinn",
    text: "PayPal integration needs more robust error handling for failed transactions.",
    confidence: 7,
  },
  {
    id: "602",
    taskId: "6",
    author: "Riley",
    text: "Credit card processing seems stable, but edge cases like expired cards need more testing.",
    confidence: 8,
  },
  {
    id: "603",
    taskId: "6",
    author: "Sophia",
    text: "The retry logic for failed payments works well but lacks feedback for users.",
    confidence: 9,
  },
];
