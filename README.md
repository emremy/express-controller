# Automatically importing the controller to the router

# Run a project

### Install Package

> npm install

### Start Project

> npm run dev

### Start Project (prod)

> npm run start

# Create files and folders

Controller files should be created as "example.controller.ts". To find out if the router system has a controller file, the file name contains ".controller." needs it.

The data that the controller file will export should be as follows.

```yaml
export default {
	handler: [
		{
			path:  "/read", // "/read/:id"
			method:  "get", // "put"  |  "get"  |  "post"  |  "delete"
			controller:  BooksController.getBooksHandler, // Controller function
			middlewares: checkBookId, // or [checkBookId,checkBookDate] middlewares are sorted by spelling order
		}
	]
};
```

You can only make adjustments via the controller file without having to import the file to the router in any way.

#

**This is just a prototype. Improvements will be added over time.**
