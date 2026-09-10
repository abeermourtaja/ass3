/*
Part1: Node Internals (3 Grades):
1. What is the Node.js Event Loop? (0.5 Grade)
    The Node.js Event Loop is a mechanism that allows Node.js to handle asynchronous operations without blocking the main thread.
2. What is Libuv and What Role Does It Play in Node.js? (0.5 Grade)
    Its role is to provide the Event Loop and manage tasks such as I/O operations and the Thread Pool, allowing Node.js to perform asynchronous work without blocking the main thread.
3. How Does Node.js Handle Asynchronous Operations Under the Hood? (0.5 Grade)
    it handle the asynchronous operations using the event loop and libuv the libuv execute them in the pool thread and event loop manages callbacks and schedules them for execution on the Main Thread
4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js? (0.5 Grade)
the call stack keeps track of the function calls that are currently being executed,the event queue where the callbacks are stored and the event loop manages the callbacks and schedules for the execution for tasks in Event Queue on the main thread if the call stack is empty 
5. What is the Node.js Thread Pool and How to Set the Thread Pool Size? (0.5 Grade)
is the thread pool in libuv that allows Node.js to perform asynchronous operations in the background, and you can set the thread pool size by setting the UV_THREADPOOL_SIZE environment variable before starting your Node.js application.
6. How Does Node.js Handle Blocking and Non-Blocking Code Execution? (0.5 Grade)
Blocking code stops the Main Thread until the operation is completed, while non-blocking code allows the Main Thread to continue executing other tasks. Node.js uses asynchronous APIs, the Event Loop, and Libuv to handle non-blocking operations efficiently.
*/