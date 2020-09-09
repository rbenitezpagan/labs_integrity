# Integrity Lab - Lab02: Scheduling jobs

## Table of contents

- [Introduction](https://github.com/rbenitezpagan/labs_integrity/tree/master/labs/lab_02#introduction)
- [Definition of Integrity](https://github.com/rbenitezpagan/labs_integrity/tree/master/labs/lab_02#definition-of-integrity)
- [What is Windows' Task Scheduler](https://github.com/rbenitezpagan/labs_integrity/tree/master/labs/lab_02#what-is-windows-task-scheduler)
- [Preparation](https://github.com/rbenitezpagan/labs_integrity/tree/master/labs/lab_02#preparation)
- [Activity 1: Open the Task Scheduler](https://github.com/rbenitezpagan/labs_integrity/tree/master/labs/lab_02#activity-1-open-the-task-scheduler)
- [Activity 2: Create Task](https://github.com/rbenitezpagan/labs_integrity/tree/master/labs/lab_02#activity-2-create-task)
- [Activity 3: Design your task's trigger](https://github.com/rbenitezpagan/labs_integrity/tree/master/labs/lab_02#activity-3-design-your-tasks-trigger)
- [Activity 4: Design your task's action](https://github.com/rbenitezpagan/labs_integrity/tree/master/labs/lab_02#activity-4-design-your-tasks-action)
- [Activity 5: Design your task's conditions](https://github.com/rbenitezpagan/labs_integrity/tree/master/labs/lab_02#activity-5-design-your-tasks-conditions)
- [Activity 6: Design your task's settings](https://github.com/rbenitezpagan/labs_integrity/tree/master/labs/lab_02#activity-6-design-your-tasks-settings)
- [Activity 7: Reload Task Scheduler](https://github.com/rbenitezpagan/labs_integrity/tree/master/labs/lab_02#activity-7-reload-task-scheduler)
- [Activity 8: Getting results](https://github.com/rbenitezpagan/labs_integrity/tree/master/labs/lab_02#activity-8-getting-results)
- [Activity 9: Cleaning](https://github.com/rbenitezpagan/labs_integrity/tree/master/labs/lab_02#activity-9-cleaning)
- [Footnotes](https://github.com/rbenitezpagan/labs_integrity/tree/master/labs/lab_02#footnotes)

## Introduction

This Lab Activity will show users how to identify changes in files based on their hash value and will compare a production Site towards a golden Image to find out if changes were made.

This is a lab assignment I created for my [CS3670 Secure Management of Systems](https://nps.smartcatalogiq.com/en/Current/Academic-Catalog/Courses/CS/3000/CS3670) class at the [Naval Post Graduate School](https://www.nps.edu/) for my [Graduate Cyber Security Fundamentals Certificate](https://nps.edu/web/c3o/cybersecurity-fundamentals).

![Command Explanation](/files/images/lab02_thumbnail_small.PNG)

Download the PDF file from [here](/files/lab02.pdf).

### Definition of Integrity

> *Data integrity is what the "I" in CIA Triad stands for. This is an essential component of the CIA Triad and designed to protect data from deletion or modification from any unauthorized party, and it ensures that when an authorized person makes a change that should not have been made the damage can be reversed.*

> *In information security, data integrity means maintaining and assuring the accuracy and completeness of data over its entire lifecycle. This means that data cannot be modified in an unauthorized or undetected manner. This is not the same thing as referential integrity in databases, although it can be viewed as a special case of consistency as understood in the classic ACID model of transaction processing. Information security systems typically provide message integrity alongside confidentiality.*

### What is Windows' Task Scheduler?

> *Task Scheduler is a component of Microsoft Windows that provides the ability to schedule the launch of programs or scripts at pre-defined times or after specified time intervals: job scheduling (task scheduling).*
>
> *It was first introduced in the Microsoft Plus! for Windows 95 as System Agent[1] but was renamed to Task Scheduler in Internet Explorer 4.0 and Windows 98. The Windows Event Log service must be running before the Task Scheduler starts up.*

## Preparation

In order to demonstrate our script's ability to identify changes we are going to be using several zip files containing different changes to our application.

This demo will use the simple HTML app found at [https://github.com/microsoft/project-html-website](https://github.com/microsoft/project-html-website).

In this lab we will create a Task using the Windows Task Scheduler to demo finding changes automatically.

To start, download the first 2 zip files into your **Documents** folder.

- [project-html-website-1.zip](/app_2/project-html-website-1.zip)
- [project-html-website-2.zip](/app_2/project-html-website-2.zip)

## Activity 1: Open the Task Scheduler

You can click ther Start icon and type "scheduler" or "Task Scheduler" and should get:

![TaskScheduler](https://github.com/rbenitezpagan/labs_integrity/raw/master/app_2/project-html-website-1.zip)

![TaskSchedulerHome](https://github.com/rbenitezpagan/labs_integrity/raw/master/app_2/project-html-website-2.zip)

## Activity 2: Create Task

Click "Create Task..." and the following screen should pop up.

![CreateTask](/labs/lab_02/os_windows/images/02_CreateTask.png)

Name your task however you see fit. E.g. "find_changes", "task_findChanges". Also at the bottom "Configure for:" choose **Windows 10** if you are on a Windows 10 computer.

![CreateTaskGeneral](/labs/lab_02/os_windows/images/02A_CreateTaskGeneral.png)

## Activity 3: Design your task's trigger

Go into the "Triggers" tab and the following screen should pop up.

![Trigger](/labs/lab_02/os_windows/images/03_Trigger.png)

There are different settings for your trigger. In a real scenario you could probably choose Weekly or if it is a really important application you could choose Daily, however, for this demo you can use the **One Time** option just mind the hour and minutes you set and give yourself some 5 to 10 minutes from this moment.

![NewTrigger](/labs/lab_02/os_windows/images/03A_NewTrigger.png)

This is how it should look afterwards.

![Triggers](/labs/lab_02/os_windows/images/03B_Triggers.png)

## Activity 4: Design your task's action

Go into the "Actions" tab and the following screen should pop up.

![Action](/labs/lab_02/os_windows/images/04_Action.png)

In this case we are going to call powershell and run our dirChecker.ps1 script.

Please copy and paste the following into the "Program/script:" field.
NOTE: Change the {user}.

```cmd
powershell -ExecutionPolicy Bypass -File "C:\Users\user\Documents\dirChecker.ps1" -knownGood "C:\Users\user\Documents\integrity_lab\www_release" -productionImage "C:\Users\user\Documents\integrity_lab\wwwroot"
```

![NewAction](/labs/lab_02/os_windows/images/04A_CreateAction.png)

You should get a confirmation pop up like this one:

![NewActionConfirm](/labs/lab_02/os_windows/images/04B_CreateActionArgs.png)

This is how it should look afterwards.

![Actions](/labs/lab_02/os_windows/images/04C_ActionCreated.png)

## Activity 5: Design your task's conditions

Go into the "Conditions" tab and the following screen should pop up.

For this demo I didn't really change anything here.

![Conditions](/labs/lab_02/os_windows/images/05_Conditions.png)

## Activity 6: Design your task's settings

Go into the "Conditions" tab and the following screen should pop up.

For this demo I didn't really change anything here.

![Settings](/labs/lab_02/os_windows/images/06_Settings.png)

## Activity 7: Reload Task Scheduler

After clicking save, the new task will be created.

Please close the scheduler and open it back again. You should now see your task indexed.

![Settings](/labs/lab_02/os_windows/images/07_ReloadTaskScheduler.png)

## Activity 8: Getting results

Depending on the kind of trigger you chose, you should get the powershell screen and see the same changes identified in lab_01.

If you are not really sure which trigger you chose and want to test your task, select your task from the list and on the right side of the screen click on "Run" to test it.

NOTE: If you directly downloaded the code from the NSA's repo the screen will open and close automatically. If you use the script from the lab_01 you should see at the end of the dirCkecker.ps1 the following:
```cmd
timeout /t -1
```
Please add it if it is not there.

Now the code will execute, show you the findings, and wait for you to press a key yo continue and close the script. The changes shown here are not neccesarily the ones you should get. You should get the ones from lab_01.

![Findings](/labs/lab_02/os_windows/images/08_Findings.png)

## Activity 9: Cleaning

If you were able to find the changes great. Now, either disable the task or delete it all together.

You should see both options on the same right sidebar were you clicked "Run" previously.

### Footnotes

- [What is the CIA Triad?](https://www.forcepoint.com/cyber-edu/cia-triad)
- [Information Security](https://en.wikipedia.org/wiki/Information_security#Integrity)
- [What is Windows' Task Scheduler?](https://en.wikipedia.org/wiki/Windows_Task_Scheduler)
