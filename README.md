# Streply JavaScript SDK

## Load Streply SDK
The first step is loading the script with SDK.
```html
<script src="https://app.streply.com/js/%token%.min.js"></script>
```
You can find the TOKEN of the project in the Projects tab of your Streply account.

## Configuration
### Turn on debug mode if you want to see logs in the browser console.
```javascript
Streply.Config.Debug(true); 
```
### Set app environment.
```javascript
Streply.Config.Environment('local');
```
### Set app release.
```javascript
Streply.Config.Release('Local-1.0.0');
```

## Capture event

### Log
The Logs method allows all information that is neither an error nor an activity to be logged.

`Streply.Log((string) message, (object) params = {}, (string) level = Streply.Level.Normal)`

```javascript
Streply.Log('request from JS');
```
Capture log with parameters:
```javascript
Streply.Log('request from JS', {'technology': 'JS'}); 
```
### Error
The most important function of Streply is to catch errors and exceptions from the application. The integration is very simple, just calling one method in the catch instruction.

`Streply.Error((string) message, (object) params = {}, (string) level = Streply.Level.Normal)`

```javascript
Streply.Error('request from JS');
```
Capture error with error level:
```javascript
Streply.Error('request from JS', {}, Streply.Level.Critical);
```

### Exception
Catch exceptions.

`Streply.Exception((string) exception, (object) params = {}, (string) level = Streply.Level.Normal)`
```javascript
try {
    nonExistsFunc("Welcome!");
} catch(err) {
    Streply.Exception(err);
}
```

### Activity
With the Activities method, you can measure any activity in the system that is critical to the functioning of the application or business.

`Streply.Activity((string) message, (object) params = {})`
```html
<a href="#" onclick="Streply.Activity('user click on link');">Link</a>
```

## Errors levels
Available error levels
- Streply.Level.Low 
- Streply.Level.Normal 
- Streply.Level.High 
- Streply.Level.Critical
  
Based on the error level, we can set notifications and search criteria (e.g. show errors with a critical level).

## User information
You can associate all events that you send to Streply with the users of your application.
`Streply.User((string) userId, (string) userName = null, (object) params = {})`

Example:
```javascript
Streply.User('16273');
```
You can also set a user name and add some optional parameters.
```javascript
Streply.User('16273', 'Joe Doe', {'createdAt':'2023-01-02 15:12:57'});
```