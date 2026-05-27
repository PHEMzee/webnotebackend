export const normalizeKeyPoints = (keyPoints) => {
  if (Array.isArray(keyPoints)) {
    return keyPoints.map((item) => item?.toString().trim()).filter(Boolean);
  }

  if (typeof keyPoints === "string") {
    return keyPoints
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

export const createNotePayload = (body = {}) => {
  const { title = "", keyPoints = [], content = "", summary = "" } = body;

  return {
    title,
    keyPoints: normalizeKeyPoints(keyPoints),
    content,
    summary,
  };
};
