# Google Apps Script: Get Shared Drive Name

## Description
This Google Apps Script function, `getSharedDriveName`, retrieves the name of the Shared Drive (formerly Team Drive) that a specific folder or file belongs to, given its Google Drive URL.

It works by extracting the folder/file ID from the URL and using the Advanced Drive API to query its metadata. It can distinguish between files in a Shared Drive and files in a user's "My Drive".

## Prerequisites
* A Google Apps Script project.
* The **Google Drive API** (Advanced Service) must be enabled in your Apps Script project.

## Features
* Accepts a standard Google Drive folder/file URL as input.
* Identifies if an item belongs to a Shared Drive or "My Drive".
* Returns the name of the Shared Drive if one is found.
* Returns a status message (`Not a Shared Drive (My Drive)`) if the item is not in a Shared Drive.
* Provides error handling for:
    * Invalid URL formats (`Error: Invalid URL format.`).
    * Files/folders that are not found or where the user lacks permission (`Error: Folder not found or no permission.`).

## Deployment Guide
1.  Create a new Google Apps Script project or open an existing one.
2.  Copy the `getSharedDriveName` function into a script file (e.g., `Code.gs`).
3.  **Enable the Advanced Drive API:**
    * In the Apps Script editor, click on **Services** (the `+` icon in the left-hand sidebar).
    * Find **Drive API** in the list.
    * Click **Add**. (This enables the `Drive` object used in the script).
4.  Save the project.

## Use Case
To test the function, you can use the provided `testDriveName` sample.

1.  Use the following function to your script file:
    ```javascript
    // --- TEST FUNCTION ---
    function testDriveName() {
      // Use the URL you are testing
      var url = "https://drive.google.com/drive/folders/[Your Folder]"; // <-- REPLACE WITH YOUR TEST URL
      var name = getSharedDriveName(url);
      Logger.log(name); 
    }
    ```
2.  Replace the `url` variable with a real Google Drive URL you want to test.
3.  From the script editor's toolbar, select `testDriveName` from the function dropdown.
4.  Click **Run**.
5.  You will be prompted to authorize the script (it will request permission to view your Google Drive files).
6.  After it runs, check the **Execution log** (View > Logs) to see the result. The log will show the Shared Drive name, "Not a Shared Drive (My Drive)", or an error message.
