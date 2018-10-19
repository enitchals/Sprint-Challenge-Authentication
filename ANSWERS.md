<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
Sessions maintain user data that should only be accessible to a logged-in user. It makes the authentication persist for future requests.

2. What does bcrypt do to help us store passwords in a secure manner.
Adds salt to the hash to increase password strength.

3. What does bcrypt do to slow down attackers?
bcrypt adds a cost to the encryption to decrease the number of attacks a potential hacker can run in a given period of time.

4. What are the three parts of the JSON Web Token?
HEADER - includes the type of token (which is JWT) and the hashing algorithm being used
PAYLOAD - includes claims -- information about the user as well as metadata
SIGNATURE - calculated encoded string that includes the header and payload, used to verify that the info has not been changed
