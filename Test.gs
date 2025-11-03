// --- TEST FUNCTION ---
// Use this function to validate the getSharedDriveName function.
function testDriveName() {
  
  // --- Define the URL you want to test ---
  var url = "https://drive.google.com/drive/folders/[Your Folder]";
  
  // Call the main function
  var name = getSharedDriveName(url);
  
  // Log the result to the Apps Script execution log
  Logger.log(name); 
}
