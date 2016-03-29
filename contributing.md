# Contribute To SlackNC

Community made patches, bug reports and contributions are always welcome.

When contributing please ensure you follow the guidelines below so that I can keep on top of things.

## Getting Started

* Submit a ticket for your issue, assuming one does not already exist.
  * Raise it on our [Issue Tracker](https://github.com/Section214/SlackNC/issues)
  * Clearly describe the issue including steps to reproduce the bug.
  * Make sure you fill in the earliest version that you know has the issue as well as the version of Node you're using.

## Making Changes

* Fork the repository on GitHub
* Make the changes to your forked repository
  * As SlackNC is written in ES6 JavaScript, try to avoid ES5 specific syntax as much as possible
  * No using `var`, instead use `let` and `const`
  * All variables are `snaked_case`
  * All functions are `camelCased`
  * Everything must pass lint
  * Avoid adding new modules if there is already one that does something similar
* When committing, reference your issue (if present) and include a note about the fix
* Push the changes to your fork and submit a pull request to the 'master' branch of the SlackNC repository

## Code Documentation

* I ensure that every SlackNC function is documented well and follows the standards set by JSDoc
* Please make sure that every function is documented so that when I update the API Documentation things don't go awry!
   * If you're adding/editing a function in a class, make sure to add `@access {private|public|protected}`
* Finally, please use spaces and not tabs.

At this point you're waiting on me to merge your pull request. I'll review all pull requests, and make suggestions and changes if necessary.

# Additional Resources
* [General GitHub Documentation](https://help.github.com/)
* [GitHub Pull Request documentation](https://help.github.com/send-pull-requests/)
