/**
 *
 * @param fieldName The technical field name to format
 * @param customMappings Optional custom mappings for specific fields
 * @returns A human-readable display name
 */
export function formatFieldName(
  fieldName: string,
  customMappings: Record<string, string> = {}
): string {
  // Check for custom mapping first
  if (customMappings[fieldName]) {
    return customMappings[fieldName];
  }

  if (fieldName.includes("_")) {
    const parts = fieldName.split("_");
    const lastPart = parts[parts.length - 1];

    if (fieldName.startsWith("ActiveApplication_")) {
      if (fieldName === "ActiveApplication_aiFit") return "AI Fit Score";
      if (fieldName === "ActiveApplication_stage_name") return "Stage";
      if (fieldName === "ActiveApplication_jobListing_name") return "Job";
    }

    return formatSimpleFieldName(lastPart);
  }

  return formatSimpleFieldName(fieldName);
}

function formatSimpleFieldName(fieldName: string): string {
  const specialCases: Record<string, string> = {
    ProfilePhotoUrl: "Profile Photo",
    FirstName: "First Name",
    LastName: "Last Name",
    SourceType: "Source",
    CreatedAt: "Date Added",
    Resume: "Resume",
    Rating: "Rating",
  };

  if (specialCases[fieldName]) {
    return specialCases[fieldName];
  }

  const spaced = fieldName.replace(/([A-Z])/g, " $1").trim();

  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
