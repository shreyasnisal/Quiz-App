# QuizApp

This respository is outdated. Please refer to [VoiceQuiz-v2](https://github.com/shreyasnisal/VoiceQuiz-v2) for the quiz-app with a cleaner UI.

This repository contains the Quiz app for android and iOS devices, developed in react-native. The application uses the QuizApp-WebService.
To check out the app: https://drive.google.com/open?id=1KCBmwZMww-QtRMsE00LOe1PzUYOXzu_W

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

nodejs

react-native

[QuizApp-WebService](https://github.com/shreyasnisal/QuizApp-WebService)

### Installing

Use the following command to initialise the project:
`npm init`

Run `npm install` to install the required node modules. This should create a node_modules directory and a package-lock.json in your project root directory.

Navigate to the /android directory and run `gradlew clean` to build the project.

## Deployment

### Android
In the project root directory, run `react-native run-android` to build and run the project on an emulator or a connected device.

Note: To build the project on an android device, you must have android SDK installed and 'adb' added to your PATH system variable.

### iOS
In the project root directory, run `react-native run-ios` to build and run the project on an emulator or a connected device.

Note: To build the project on an iOS device, you require the machine running the macOS, and XCode installed.

## Contributing

Issues are welcome. Please add a screenshot of bug and code snippet. Quickest way to solve issue is to reproduce it on one of the examples.

Pull requests are welcome. If you want to make major changes, it is better to first create an issue and discuss it first.

