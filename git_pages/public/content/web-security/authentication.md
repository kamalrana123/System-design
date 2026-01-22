
# Authentication and Authorization

Authentication and authorization are two fundamental concepts in web security that are often used interchangeably but have distinct meanings.

## Authentication

Authentication is the process of verifying the identity of a user. This is typically done by requiring the user to provide a username and password, but other methods such as biometrics or security tokens can also be used.

## Authorization

Authorization is the process of granting or denying a user access to a specific resource or functionality based on their identity. Once a user is authenticated, the system needs to determine what they are allowed to do.

## Common Authentication and Authorization Mechanisms

-   **Session-Based Authentication:** After a user logs in, a session is created on the server, and a session ID is stored in a cookie on the user's browser.
-   **Token-Based Authentication:** A token, such as a JSON Web Token (JWT), is issued to the user after they log in. The token is then sent with each subsequent request to the server to authenticate the user.
-   **OAuth:** An open standard for access delegation, commonly used as a way for users to grant websites or applications access to their information on other websites but without giving them the passwords.
