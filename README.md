![alt text](https://github.com/Blyndone/BudgetBites/blob/main/assets/BB-logo.png)

Installation instructions:

```
Requirements:

Node.js
Android Development Kit
emulated device created in Android Development Kit


MySQL Server with login set to
username: budgetbites
password: budgetbites
default schema set to budgetbites
port set to 3306

Project cloned to local directory
.env file created in the project root with the following fields set:
HOST= 'localhost'
USER= 'root'
PASSWORD= 'budgetbites'
DATABASE= 'budgetbites'
PORT=5000
REACT_APP_ADDRESS='http://10.0.2.2:5000'
```

Run from console in project directory

```
npm install
npm start

press a for android

In a separate terminal
node ./server.js
```

Possible Issues:

```
Need to set ANDROID_HOME variable with path to SDK
run "npx react-native-doctor" to check for problems
If emulator does not run standalone, run emulator in ADK
```

# BudgetBites

A mobile aplication to list and search for food that is about to expire.

# Project Members

Anvar Suleyman

Zoe Crayton

Christopher Baez

Joe Yonathan

Mitchell Bailey

Richard Duel
