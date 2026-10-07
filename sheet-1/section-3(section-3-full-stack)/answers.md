# Full-Stack Technical Interview

## 1. JavaScript — Async Flow

# 1.1.Microtask vs Macrotask
Microtasks, such as Promise callbacks, are executed after the current synchronous code finishes and before the next macrotask.

Macrotasks, such as setTimeout callbacks, are processed afterward. 

Call Stack
   ↓
Synchronous JS
   ↓
Microtask Queue
   ↓
Macrotask Queue

# 1.2. Where do promises callback fit?
fatch() it self asynchronous opration when api response is available, promise get settle and .then() callback schedule in microtask queue.

fetch()
   ↓
Web/API environment
   ↓
response received
   ↓
Promise settled
   ↓
.then() → Microtask Queue

# 1.3. Blocking synchronous JavaScript make UI feel frozen?
Blocking synchronous JavaScript keeps the main thread busy, preventing the event loop from processing UI updates, user events, and other callbacks, which makes the UI feel frozen

example :-
 while (true) {
    // infinite work
}

JS running
   ↓
JS running
   ↓
JS running
   ↓
❌ Event Loop blocked
   ↓
UI update nahi
click response nahi
scroll properly nahi
animation stuck

## 2. React — Unnecessary Re-render
First, I would investigate the issue using React DevTools Profiler to identify which components are re-rendering frequently and what is triggering those renders. Then I would check whether the parent is passing changing object or function references to child components, or whether there is an expensive calculation happening during render

# 2.1. When would React.memo help?
React.memo() used to avoid unnessary re-rending to the clild-component.

I would use React.memo when a child component receives the same props but is unnecessarily re-rendering because its parent renders.

# 2.2. What are useMemo() and useCallback() actully solving?
useMemo is useful for caching expensive calculated values, while useCallback is useful for keeping a stable function reference, specially when passing callbacks to memoized children.

# 2.3. Why should you avoid adding memoizaton evenyWhere?
I would avoid memoization everywhere because it adds complexity and has its own memory and comparison overhead. I would only use it when profiling shows that it actually improves performance.

## 3. REST API + Express — Request Flow
React Frontend
      ↓
GET /api/profile
      ↓
Axios / Fetch
      ↓
Authorization header / Cookie
      ↓
Express Router
      ↓
Authentication Middleware
      ↓
Token verify
      ↓
req.user set
      ↓
Controller
      ↓
Database
      ↓
Response

First, I would trace the request from the frontend to the Express controller. The frontend sends a GET request with the access token, usually in the Authorization header.

# 3.1. where should authentication middleware run?
Express matches the route and the authentication middleware runs before the controller.
The middleware extracts and verifies the token and attaches the authenticated user to req.user. If authentication succeeds, the controller executes and returns the profile.

# 3.2 how would you distinguish an authentication failure from an authorzation failure?
To debug a 401, I would first check the browser Network tab to verify that the Authorization header or required cookie is actually being sent.
Then I would check the authentication middleware to verify token extraction, Bearer format, JWT verification, expiry, and secret configuration.
I would also verify that req.user is correctly populated.

# 3.3 which http status codes would you user for 401 and 403?
Authentication failure means the server cannot establish the user's identity, so I use 401.
Authorization failure means the user is authenticated but does not have permission to access the resource, so I use 403.


Request
   ↓
Route matching
   ↓
Authentication Middleware
   ↓
Is token valid?
   │
   ├── NO → 401
   │
   └── YES
        ↓
      req.user
        ↓
   Authorization check
        │
        ├── NO → 403
        │
        └── YES
             ↓
          Controller
             ↓
          Database
             ↓
          Response

## 4. MongoDB + Mongoose — Duplicate Data
# 4.1. Would application-level checking alse be sufficent?
I would not rely only on an application-level check such as findOne before creating the user, because two concurrent requests can both pass that check and then create duplicate records.
I would create a unique index on the email field at the database level.

# 4.2 How can a unique index help?
The application-level check can still be used for an early and user-friendly response, but the unique index is the final guarantee against duplicates.

# 4.3 How should the api respond when a duplicate -key error occurs?
If MongoDB returns a duplicate-key error, I would catch error code 11000 and return HTTP 409 Conflict with a clear message such as 'Email is already registered'.

## 5. Authentication + Authorization + ImageKit
For ImageKit, authorization should happen before the upload. After authentication and authorization succeed, the backend accepts the file and uploads it to ImageKit. ImageKit returns the file URL, and the backend stores that URL with the resource in the database.

Client
  ↓
Request + Access Token
  ↓
Authentication Middleware
  ↓
Token verify
  ↓
req.user = authenticated user
  ↓
Authorization / Ownership Check
  ↓
Does resource belong to req.user?
  ↓
   YES → Controller → Database
   NO  → 403 Forbidden

# 5.1. What is the differeance between authentication and authorization ?
 # Authentication :- "Who are you?" 
 # Authorization :- "What can you do?"
Frist , I would authenticate the request by verifying the access token and identifying the user. Then I would authorize the request by checking whether that authenticated user has permission to access the requested resource.

# 5.2 What information should the server trust from the client?

 I would never trust a user ID, role, or ownership information sent by the client for authorization decisions. Instead, I would derive the user's identity from the verified token and compare it with the resource owner stored in the database.

# 5.3 How would you prevent a user from changing an id in the url and accessing someone else's data?
if a user changes /students/123 to /students/456, the server should fetch resource 456 and compare its owner ID with req.user.id. If they don't match, the server returns 403 Forbidden.