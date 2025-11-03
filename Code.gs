/**
 * Retrieves the Shared Drive Name from a Google Drive folder URL
 * using the Advanced Drive API.
 *
 * @param {string} url The URL of the folder.
 * e.g. "https://drive.google.com/drive/folders/[Your Folder]"
 * @return {string} The name of the Shared Drive or a status/error message.
 */
function getSharedDriveName(url) {
  var id;
  
  // Attempt to parse the file/folder ID from the URL.
  // This method gets the string after the last '/' and before any '?' query params.
  try {
    id = url.substring(url.lastIndexOf('/') + 1).split('?')[0];
    if (!id) { // Check if the extracted ID is empty
      throw new Error("Parsed ID was empty.");
    }
  } catch (e) {
    // This catches errors from string manipulation (e.g., if 'url' is not a string)
    // or if the URL format is completely unexpected.
    Logger.log("URL Parsing Error: " + e.message + " (URL: " + url + ")");
    return "Error: Invalid URL format.";
  }

  // Attempt to query the Drive API using the extracted ID
  try {
    // 1. Get the file/folder's metadata.
    // { "supportsAllDrives": true } is required to find items in Shared Drives.
    var file = Drive.Files.get(id, { "supportsAllDrives": true });

    // 2. Check if the 'driveId' property exists.
    // This property is only present for items stored within a Shared Drive.
    // Items in a user's "My Drive" will not have this property.
    if (file.driveId) {
      
      // 3. If it does, use the driveId to get the metadata for that Shared Drive
      var drive = Drive.Drives.get(file.driveId);
      return drive.name;
      
    } else {
      // The item is located in a user's "My Drive"
      return "Not a Shared Drive (My Drive)";
    }
    
  } catch (e) {
    // This error usually means the file ID is wrong, the file was deleted,
    // or the script user does not have permission to view it.
    
    // Log the full error for debugging purposes
    Logger.log(e); 
    return "Error: Folder not found or no permission. (ID: " + id + ")";
  }
}
