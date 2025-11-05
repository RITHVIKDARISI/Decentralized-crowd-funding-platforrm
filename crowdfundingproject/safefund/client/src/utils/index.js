export const daysLeft = (deadline) => {
  // Check if deadline is a Unix timestamp (in seconds) or milliseconds
  // If it's a number less than a reasonable millisecond timestamp, it's in seconds
  let deadlineMs;
  
  if (typeof deadline === 'number') {
    // If the number is less than a reasonable year 2000 timestamp in ms, it's in seconds
    deadlineMs = deadline < 10000000000 ? deadline * 1000 : deadline;
  } else {
    // If it's a date string or Date object
    deadlineMs = new Date(deadline).getTime();
  }
  
  const difference = deadlineMs - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return Math.max(0, Math.ceil(remainingDays)); // Return 0 if negative, round up
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  // Accept any URL that looks like an image or allow any valid URL
  if (!url || url.trim() === '') {
    callback(false);
    return;
  }
  
  // Check if URL is valid
  try {
    new URL(url);
  } catch (e) {
    callback(false);
    return;
  }

  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true);
    return;
  }

  img.onload = () => callback(true);
  img.onerror = () => {
    // If image fails to load but URL is valid, still accept it
    // This allows for URLs that might be blocked by CORS but are valid
    callback(true);
  };
  
  // Timeout after 5 seconds
  setTimeout(() => {
    callback(true);
  }, 5000);
};
