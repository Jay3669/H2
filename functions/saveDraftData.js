async function saveDraftData(draftData) {
    // Implement your logic to save draft data
    // Example: Save to a database
    await DraftDataModel.update({ emp_id: draftData.emp_id }, draftData, { upsert: true });
}

// Function to get draft data from the database or storage
async function getDraftData(emp_id) {
    // Implement your logic to retrieve draft data
    // Example: Retrieve from a database
    const draftData = await DraftDataModel.findOne({ emp_id });
    return draftData || {};
}