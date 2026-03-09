# Simple Task System Implementation Plan (MVP)

This document explains exactly how to implement a **simple task system** in your current project with these core fields:

- `task` (title/name)
- `assignee`
- `status`
- `priority`

It is aligned to your current stack:

- Backend: `Express + Mongoose + JWT + tenant middleware + RBAC`
- Frontend: `React + Vite + Axios + role-based routes`

---

## 1) Scope for this MVP

Implement only this for now:

1. Create a task
2. List tasks
3. Update task (task text, assignee, status, priority)
4. Delete task (soft delete)
5. Filter task list by status, priority, assignee

Do not add advanced features yet (comments, due dates, subtasks, attachments, notifications).

---

## 2) Data Model (MongoDB / Mongoose)

Create `backend/src/models/task.model.js`.

### Required business fields

- `title` (String, required, trimmed) -> this is your `task`
- `assigneeId` (ObjectId ref `User`, required)
- `status` (String enum)
- `priority` (String enum)

### System fields (needed for your architecture)

- `tenantId` (ObjectId ref `Tenant`, required, indexed)
- `createdBy` (ObjectId ref `User`, required)
- `deletedAt` (Date, default `null`) for soft delete
- `timestamps: true`

### Suggested enums

- `status`: `["todo", "in-progress", "done"]`
- `priority`: `["low", "medium", "high"]`

### Suggested schema

```js
const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    assigneeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo"
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
)

taskSchema.index({ tenantId: 1, deletedAt: 1, createdAt: -1 })
taskSchema.index({ tenantId: 1, assigneeId: 1, status: 1, priority: 1 })

module.exports = mongoose.model("Task", taskSchema)
```

---

## 3) Backend API Design

Create these files:

- `backend/src/services/task.service.js`
- `backend/src/controllers/task.controller.js`
- `backend/src/routes/task.route.js`

Update:

- `backend/src/app.js` (mount route)

### Endpoints

1. `POST /api/tasks` -> create task
2. `GET /api/tasks` -> list tasks (with optional filters)
3. `PATCH /api/tasks/:taskId` -> update task fields
4. `DELETE /api/tasks/:taskId` -> soft delete task

### Query params for `GET /api/tasks`

- `status=todo|in-progress|done`
- `priority=low|medium|high`
- `assigneeId=<userId>`
- `mine=true` (shortcut: only my assigned tasks)

---

## 4) Backend Implementation Details

## 4.1 Service layer (`task.service.js`)

Implement these methods:

1. `createTask({ title, assigneeId, status, priority, tenantId, createdBy })`
2. `getTasks({ tenantId, user, filters })`
3. `updateTask({ taskId, tenantId, user, updates })`
4. `deleteTask({ taskId, tenantId })`

### Validation rules

- `title`, `assigneeId`, `tenantId`, `createdBy` required on create.
- Validate all IDs with `mongoose.Types.ObjectId.isValid`.
- `assigneeId` must exist in same `tenantId`.
- For assignee role, allow only `member` (or `admin/member` if you want).
- Reject invalid `status` and `priority`.

### Access logic (important)

- `owner/admin`: full CRUD inside tenant.
- `member`: can view own tasks; can update only own task status (or limited edit).
- `client`: no task access (for this MVP).

### Soft delete

Use:

- filter: `{ _id: taskId, tenantId, deletedAt: null }`
- update: `{ deletedAt: new Date() }`

---

## 4.2 Controller layer (`task.controller.js`)

Create handlers:

1. `createTaskHandler`
2. `getTasksHandler`
3. `updateTaskHandler`
4. `deleteTaskHandler`

Pattern should match your current controllers:

- `try/catch`
- `res.status(200/201).json(...)`
- `res.status(400).json({ message: error.message })`

---

## 4.3 Route layer (`task.route.js`)

Use your existing middlewares:

- `requireRole`
- `auditLogger` (optional but recommended)

Example route policy:

- `POST /` -> roles `owner, admin`
- `GET /` -> roles `owner, admin, member`
- `PATCH /:taskId` -> roles `owner, admin, member`
- `DELETE /:taskId` -> roles `owner, admin`

Recommended audit actions:

- `TASK_CREATED`
- `TASK_UPDATED`
- `TASK_DELETED`

---

## 4.4 Register route in app

In `backend/src/app.js`:

1. `const taskRoutes = require("./routes/task.route")`
2. mount after auth+tenant middleware:
   - `app.use("/api/tasks", taskRoutes)`

---

## 5) Frontend Implementation Plan

Create:

- `frontend/src/api/tasks.js`
- `frontend/src/pages/Tasks.jsx`

Update:

- `frontend/src/App.jsx` (add `/tasks` route)
- `frontend/src/layouts/AppLayout.jsx` (add nav item for Tasks)

### API file (`frontend/src/api/tasks.js`)

Implement:

1. `fetchTasks(params)`
2. `createTask(data)`
3. `updateTask(taskId, data)`
4. `deleteTask(taskId)`

Use existing axios instance: `import api from "./axios"`

---

## 6) UI Behavior (simple and direct)

In `Tasks.jsx` page:

1. Top form:
   - Task input (`title`)
   - Assignee dropdown (`member list`)
   - Priority dropdown
   - Status default `todo`
   - Create button
2. Filters row:
   - Status filter
   - Priority filter
   - Assignee filter
3. Task list card/table:
   - Task title
   - Assignee email
   - Status dropdown (inline update)
   - Priority dropdown (inline update)
   - Delete button (owner/admin only)

Use your existing style approach from `Projects.jsx`.

---

## 7) Suggested Request/Response Contracts

## Create Task

`POST /api/tasks`

```json
{
  "title": "Prepare campaign brief",
  "assigneeId": "65f0a1c8b3...",
  "status": "todo",
  "priority": "high"
}
```

Response:

```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "65f1...",
    "title": "Prepare campaign brief",
    "assigneeId": "65f0...",
    "status": "todo",
    "priority": "high"
  }
}
```

## List Tasks

`GET /api/tasks?status=todo&priority=high&mine=true`

```json
{
  "tasks": []
}
```

## Update Task

`PATCH /api/tasks/:taskId`

```json
{
  "status": "in-progress",
  "priority": "medium"
}
```

## Delete Task

`DELETE /api/tasks/:taskId`

```json
{
  "message": "Task deleted successfully"
}
```

---

## 8) Step-by-step Execution Order (recommended)

1. Add `Task` model.
2. Add `task.service.js` with validation and access checks.
3. Add `task.controller.js`.
4. Add `task.route.js`.
5. Mount routes in `app.js`.
6. Test APIs via Postman/Thunder Client.
7. Add frontend API wrappers in `frontend/src/api/tasks.js`.
8. Build `Tasks.jsx` page.
9. Add `/tasks` route in `App.jsx`.
10. Add `Tasks` nav item in `AppLayout.jsx`.
11. Verify role-based behavior with owner/admin/member accounts.

---

## 9) Testing Checklist

### Backend tests (manual is fine initially)

1. Create task with valid payload -> 201
2. Create task with invalid assignee -> 400
3. Member cannot create task -> 403
4. Member sees only own tasks (if `mine=true` or role filter applied)
5. Status update works for allowed role
6. Delete sets `deletedAt`, task no longer appears in list
7. Cross-tenant access blocked

### Frontend checks

1. Tasks page loads list correctly
2. Filters trigger correct query params
3. Create task refreshes list
4. Inline status/priority update persists after reload
5. Delete removes task from list
6. Role-based buttons hidden where not allowed

---

## 10) Definition of Done

Feature is complete when:

1. `owner/admin` can create, view, update, delete tasks.
2. `member` can at least view assigned tasks and update allowed fields.
3. Each task has required fields: `title`, `assignee`, `status`, `priority`.
4. Data is tenant-safe.
5. Task actions are available in UI and backend APIs.
6. No existing routes/pages are broken.

---

## 11) Next upgrades after MVP (optional)

1. Add `dueDate`
2. Add `description`
3. Add `projectId` relation (if tasks should belong to project)
4. Add task comments/activity timeline
5. Add dashboard counters (`todo`, `in-progress`, `done`)
6. Add pagination (`page`, `limit`) for large task lists

