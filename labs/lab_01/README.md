# Integrity Lab - Lab01 (Windows)

## Table of contents

- [Introduction](https://github.com/rbenitezpagan/labs_integrity/tree/master/labs/lab_01#introduction-lab01-intro)
- [Definition of Integrity](#lab01-def)
- [What is PowerShell](#lab01-ps1)
- [Preparation](#lab01-prep)
- [Activity 1: Listing items in a directory](#lab01-act01)
- [Activity 2: Listing items in a directory recursively](#lab01-act02)
- [Activity 3: Listing all items in a directory recursively](#lab01-act03)
- [Activity 4: Getting the hash value of all items](#lab01-act04)
- [Activity 5: Identify changes in a target directory](#lab01-act05)
- [Script: dirChecker.ps1](#lab01-script)
- [Activity 6: Identify possible malicious changes in a target directory](#lab01-act06)
- [Footnotes](#lab01-footnotes)

## Introduction

This Lab Activity will show users how to identify changes in files based on their hash value and will compare a production Site towards a golden Image to find out if changes were made.

This is a lab assignment I created for my [CS36000 Introduction to Cybersecurity](https://nps.smartcatalogiq.com/en/Current/Academic-Catalog/Courses/CS/3000/CS3600) class at the [Naval Post Graduate School](https://www.nps.edu/) for my [Graduate Cyber Security Fundamentals Certificate](https://nps.edu/web/c3o/cybersecurity-fundamentals).

![Command Explanation](/files/images/lab01_thumbnail_small.PNG)

Download the PDF file from [here](/files/lab01.pdf).

### Definition of Integrity

> *Data integrity is what the "I" in CIA Triad stands for. This is an essential component of the CIA Triad and designed to protect data from deletion or modification from any unauthorized party, and it ensures that when an authorized person makes a change that should not have been made the damage can be reversed.* [^1]

> *In information security, data integrity means maintaining and assuring the accuracy and completeness of data over its entire lifecycle. This means that data cannot be modified in an unauthorized or undetected manner. This is not the same thing as referential integrity in databases, although it can be viewed as a special case of consistency as understood in the classic ACID model of transaction processing. Information security systems typically provide message integrity alongside confidentiality.* [^2]

### What is Power Shell

> *PowerShell is a task-based command-line shell and scripting language built on .NET. PowerShell helps system administrators and power-users rapidly automate tasks that manage operating systems (Linux, macOS, and Windows) and processes.*
>
> *PowerShell commands let you manage computers from the command line. PowerShell providers let you access data stores, such as the registry and certificate store, as easily as you access the file system. PowerShell includes a rich expression parser and a fully developed scripting language.* [^3]

## Preparation {#lab01-prep}

Download and unzip the [integrity_lab.zip](https://github.com/rbenitezpagan/labs_integrity/raw/master/files/zip/integrity_lab.zip) archive into your **Documents** folder.

If you don’t have the zip file you can directly download each individual required file here:

- HTML - [index.html](https://raw.githubusercontent.com/rbenitezpagan/labs_integrity/master/app/www_release/index.html)
- CSS - [style.css](https://raw.githubusercontent.com/rbenitezpagan/labs_integrity/master/app/www_release/css/style.css)
- JS - [script.js](https://raw.githubusercontent.com/rbenitezpagan/labs_integrity/master/app/www_release/js/script.js)

The **www_release** folder will be used as your golden image; this concept will be explained later.

Both **www_release** and **wwwroot** should contain:

```txt
|__ www_release/        # Golden Image folder
|   |
|   |__ css/
|   |   |__ style.css
|   |
|   |__ js/
|   |   |__ script.js
|   |
|   |__ index.html
|
|__ wwwroot/            # Production Image
|   |
|   |__ css/
|   |   |__ style.css
|   |
|   |__ js/
|   |   |__ script.js
|   |
|   |__ index.html
```

## Activity 1: Listing items in a directory {#lab01-act01}

1. Open the command prompt. Use the Start button and type cmd.
2. Type “powershell” and hit Enter.

Now that PowerShell is running

```txt
1.  Type “Set-Location $HOME\Documents\integrity_lab”.

2.  Type “Get-ChildItem”, you should see both folders, wwwroot and www_release.

3.  List files in www_release, type “Get-ChildItem .\www_release\”, what folders and/or files you get?
    a.  What is the name? _______________________,
        Is a directory? _______

    b.  What is the name? _______________________,
        Is a directory? _______

    c.  What is the name? _______________________,
        Is a directory? _______

4.  List files in wwwroot, type “Get-ChildItem .\wwwroot\”, what folders and/or files you get?
    a.  What is the name? _______________________,
        Is a directory? _______

    b.  What is the name? _______________________,
        Is a directory? _______

    c.  What is the name? _______________________,
        Is a directory? _______

5. Are the listed files all the files inside these folders? _______
```

## Activity 2: Listing items in a directory *recursively* {#lab01-act02}

If your answer to the last question of Activity 1 was **No**, you are correct.

Not all files were included when the command Get-ChildItem was used.

Let’s fix that:

```txt
1.  Type “Get-ChildItem .\www_release\ -Recurse”, what folders and/or files you get?
    a.  What is the name? _______________________,
        Is a directory? _______,
        Where is it from? ________________________

    b.  What is the name? _______________________,
        Is a directory? _______,
        Where is it from? ________________________

2.  Type “Get-ChildItem .\wwwroot\ -Recurse”, what folders and/or files you get?
    a.  What is the name? _______________________,
        Is a directory? _______,
        Where is it from? ________________________

    b.  What is the name? _______________________,
        Is a directory? _______,
        Where is it from? ________________________

3.  Now, are the listed files all the files inside these folders? _______
```

## Activity 3: Listing *all* items in a directory recursively {#lab01-act03}

If your answer to the last question of Activity 2 was **Yes**, *under normal circumstances, you would be correct*, however this is not the case.

Let's find out why!

```txt
1.  Let’s do a test, using the file explorer go to folder wwwroot.

2.  Right-click, select New, select Text Document, type newFile.txt.
    You don’t have to add content to the newly created file for the test.

3.  Right-click newFile.txt, select Properties, in Attributes mark Hidden, click Apply and Ok.

4.  Go back to the PowerShell prompt, type “Set-Location .\wwwroot\”

5.  Let’s check our directory, type “Get-ChildItem -Recurse”.
    Do you see the newly created and hidden file listed? ______

6.  Let’s try it again, this time with a new option included. Type “Get-ChildItem -Recurse -Force”.
    Was the command able to list the newly added AND hidden file this time around? _________

7.  Now, finally, are the listed files all the files inside these folders? _______
```

## Activity 4: Getting the hash value of all items {#lab01-act04}

If your answer to the last question of Activity 3 was Yes, now, you are correct.

Let’s make sure we are in the right place.

```txt
1.  Type “Set-Location $HOME\Documents\integrity_lab”.
```

It is possible to use the Get-ChildItem command using a specified path.

```txt
2.  Type “Get-ChildItem -Force -Recurse -Path .\www_release\”.
    Did you get the files? _______

3.  Type “Get-ChildItem -Force -Recurse -Path .\wwwroot\”.
    Did you get the files? _______
```

Get the hash value of all files per directory, the following command ForEach-Object will apply the functions enclosed in {} to all the objects returned by the pipe “|” command. In this case, all files recursively retrieved from the specified path are going to get their hash value calculated.

```txt
4.  Type “Get-ChildItem -Force -Recurse -Path .\www_release\ | ForEach-Object { Get-FileHash -Path $_.FullName }”

    Did you get the filenames and file hashes? _________

5.  Which was the default hashing algorithm used? ____________
```

## Activity 5: Identify changes in a target directory {#lab01-act05}

We know hash values help us identify when changes have occurred, this is possible because a change will result in a completely different hash value regardless of changes being minimum.

We previously saw the term golden Image, this term is used to identify a known-good state of a directory. It is used to compare it towards a production directory that could have been modified.

Let’s make sure we are in the right place.

```txt
1.  Type “Set-Location $HOME\Documents\integrity_lab”.
```

In order to compare two directories, we will employ the Compare-Object function.

![Command Explanation](/files/images/lab01_act05_cmd_explanation.PNG)

The next activity is the completed script that can be used to identify changes in a directory based in a golden Image comparison.

## Script: dirChecker.ps1 {#lab01-script}

The following code is a directory checker powershell script retrieved from the [National Security Agency (NSA)'s](https://www.nsa.gov/) - Cyber Security Directorate (CSD)'s Cyber Security Information (CSI) [publication](https://www.nsa.gov/News-Features/News-Stories/Article-View/Article/2159419/detect-prevent-cyber-attackers-from-exploiting-web-servers-via-web-shell-malware/) related to ["Detect and Prevent Web Shell Malware"](https://media.defense.gov/2020/Jun/09/2002313081/-1/-1/0/CSI-DETECT-AND-PREVENT-WEB-SHELL-MALWARE-20200422.PDF).

The **dirChecker.ps1** script can be retrieved from the github repository [here](https://raw.githubusercontent.com/nsacyber/Mitigating-Web-Shells/master/dirChecker.ps1).

```powershell
<#
.SYNOPSIS
Find new or changed files in a directory compared to a known-good image.

.DESCRIPTION
The script looks for file changes/additions between a production directory (target) with a known-good directory.

.PARAMETER knownGood
Path of the known-good directory.

.PARAMETER productionImage
Path of the production directory (target).

.INPUTS
System.String

.OUTPUTS
System.String

.EXAMPLE
.\dirChecker.ps1 -knownGood <PATH> -productionImage <PATH>
.\dirChecker.ps1 -knownGood .\knownGoodDir\ -productionImage .\targetDir\
.\dirChecker.ps1 -knownGood "D:\release3.0" -productionImage "C:\inetpub\wwwroot"

-- Input --
.\dirChecker.ps1 -knownGood "D:\Users\<user>\Documents\knownGoodDir" -productionImage "C:\Users\<user>\Documents\targetDir"

-- Output --
File analysis started.
Any file listed below is a new or changed file.

C:\Users\<user>\Documents\targetDir\index.html
C:\Users\<user>\Documents\targetDir\research.docx
C:\Users\<user>\Documents\targetDir\inventory.csv
C:\Users\<user>\Documents\targetDir\contactus.js

File analysis completed.

.LINK
https://github.com/nsacyber/MitigatingWebShells
#>

<#
#
# Execution begins.
#
#>
param (
    [Parameter(Mandatory=$TRUE)][ValidateScript({Test-Path $_ -PathType 'Container'})][String] $knownGood,
    [Parameter(Mandatory=$TRUE)][ValidateScript({Test-Path $_ -PathType 'Container'})][String] $productionImage
)

# Recursively get all files in both directories, for each file calculate hash.
$good = Get-ChildItem -Force -Recurse -Path $knownGood | ForEach-Object { Get-FileHash -Path $_.FullName }
$prod = Get-ChildItem -Force -Recurse -Path $productionImage | ForEach-Object { Get-FileHash -Path $_.FullName }

Write-Host "File analysis started."
Write-Host "Any file listed below is a new or changed file.`n"

# Compare files hashes, select new or changed files, and print the path+filename.
(Compare-Object $good $prod -Property hash -PassThru | Where-Object{$_.SideIndicator -eq '=>'}).Path

Write-Host "`nFile analysis completed."
```


## Activity 6: Identify possible malicious changes in a target directory {#lab01-act06}

Copy and Paste the script above into a new file and call the file “dirComparison.ps1” that is the extension of PowerShell scripts.

To execute the script and find changed or new files in our target directory do the following.

```txt
1.  Type “.\dirComparison.ps1 -knownGood .\www_release\ -productionImage .\wwwroot\”.

    a.  Did you get the files that are changed or new based on our golden Image? __________

    b.  What files were identified?
```

## Solutions

Download the Solutions from [here](/files/lab01_solution.pdf).

### Footnotes {#lab01-footnotes}

[^1]: [What is the CIA Triad?](https://www.forcepoint.com/cyber-edu/cia-triad)
[^2]: [Information Security](https://en.wikipedia.org/wiki/Information_security#Integrity)
[^3]: [What is PowerShell?](https://docs.microsoft.com/en-us/powershell/scripting/overview?view=powershell-7)
