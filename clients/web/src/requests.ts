import type { components, paths } from "./types/api";

// Helper to get the API base URL (adjust as needed)
const API_BASE = "";

/**
 * GET /WeatherForecast
 * Optional header: planet
 */
export async function getWeatherForecast(params?: { planet?: string }): Promise<components["schemas"]["WeatherForecast"][]> {
  const headers: Record<string, string> = {};
  if (params?.planet) {
    headers["planet"] = params.planet;
  }
  const res = await fetch(`${API_BASE}/WeatherForecast`, {
    method: "GET",
    headers,
  });

  if (res.ok) {
    // Try to parse as JSON, fallback to text if needed
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json") || contentType.includes("text/json")) {
      return await res.json();
    } else if (contentType.includes("text/plain")) {
      return await res.json();
    }
    throw new Error("Unexpected content type: " + contentType);
  } else {
    // Try to parse error response
    let error: any;
    try {
      error = await res.json();
    } catch {
      error = await res.text();
    }
    throw { status: res.status, error };
  }
}

/**
 * POST /WeatherForecast
 * Body: WeatherForecast (JSON)
 */
export async function postWeatherForecast(body: components["schemas"]["WeatherForecast"]): Promise<components["schemas"]["WeatherForecast"]> {
  const res = await fetch(`${API_BASE}/WeatherForecast`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json") || contentType.includes("text/json")) {
      return await res.json();
    } else if (contentType.includes("text/plain")) {
      return await res.json();
    }
    throw new Error("Unexpected content type: " + contentType);
  } else {
    let error: any;
    try {
      error = await res.json();
    } catch {
      error = await res.text();
    }
    throw { status: res.status, error };
  }
}

/**
 * POST /WeatherForecast/upload-planet-weather-map
 * Body: multipart/form-data with planetWeatherMap (file)
 */
export async function uploadPlanetWeatherMap(planetWeatherMap: File): Promise<string> {
  const formData = new FormData();
  formData.append("planetWeatherMap", planetWeatherMap);

  const res = await fetch(`${API_BASE}/WeatherForecast/upload-planet-weather-map`, {
    method: "POST",
    body: formData,
  });

  if (res.status === 201) {
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json") || contentType.includes("text/json")) {
      return await res.json();
    } else if (contentType.includes("text/plain")) {
      return await res.text();
    }
    throw new Error("Unexpected content type: " + contentType);
  } else {
    let error: any;
    try {
      error = await res.json();
    } catch {
      error = await res.text();
    }
    throw { status: res.status, error };
  }
}
/**
 * POST /human-bases
 * Body: multipart/form-data with humanBase (file)
 */
export async function uploadHumanBase(humanBase: File): Promise<string> {
  const formData = new FormData();
  formData.append("humanBase", humanBase);

  const res = await fetch(`${API_BASE}/human-bases`, {
    method: "POST",
    body: formData,
  });

  if (res.status === 201) {
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json") || contentType.includes("text/json")) {
      return await res.json();
    } else if (contentType.includes("text/plain")) {
      return await res.text();
    }
    throw new Error("Unexpected content type: " + contentType);
  } else {
    let error: any;
    try {
      error = await res.json();
    } catch {
      error = await res.text();
    }
    throw { status: res.status, error };
  }
}

/**
 * POST /human-bases
 * Body: multipart/form-data with humanBase (file)
 * Returns: string (201), or throws with FileMissingErrorResponse (400)
 */
export async function postHumanBases(humanBase: File): Promise<string> {
  const formData = new FormData();
  formData.append("humanBase", humanBase);

  const res = await fetch(`${API_BASE}/human-bases`, {
    method: "POST",
    body: formData,
  });

  if (res.status === 201) {
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json") || contentType.includes("text/json")) {
      return await res.json();
    } else if (contentType.includes("text/plain")) {
      return await res.text();
    }
    throw new Error("Unexpected content type: " + contentType);
  } else if (res.status === 400) {
    // FileMissingErrorResponse
    let error: any;
    try {
      error = await res.json();
    } catch {
      error = await res.text();
    }
    throw { status: res.status, error };
  } else {
    let error: any;
    try {
      error = await res.json();
    } catch {
      error = await res.text();
    }
    throw { status: res.status, error };
  }
}

