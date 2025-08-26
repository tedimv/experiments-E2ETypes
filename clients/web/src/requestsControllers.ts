import type { components } from "./types/api";

/**
 * Controller for /weather-forecast endpoints
 */
export class WeatherForecastController {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  /**
   * GET /weather-forecast
   * @param params Optional header: planet
   */
  async getWeatherForecast(params?: { planet?: string }): Promise<components["schemas"]["WeatherForecast"][]> {
    const headers: Record<string, string> = {};
    if (params?.planet) {
      headers["planet"] = params.planet;
    }
    const res = await fetch(`${this.baseUrl}/WeatherForecast`, {
      method: "GET",
      headers,
    });

    if (res.ok) {
      const contentType = res.headers.get("content-type") || "";
      if (
        contentType.includes("application/json") ||
        contentType.includes("text/json") ||
        contentType.includes("text/plain")
      ) {
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
   * POST /weather-forecast
   * @param body WeatherForecast object
   */
  async postWeatherForecast(
    body: components["schemas"]["WeatherForecast"]
  ): Promise<components["schemas"]["WeatherForecast"]> {
    const res = await fetch(`${this.baseUrl}/WeatherForecast`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const contentType = res.headers.get("content-type") || "";
      if (
        contentType.includes("application/json") ||
        contentType.includes("text/json") ||
        contentType.includes("text/plain")
      ) {
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
   * POST /weather-forecast/upload-planet-weather-map
   * @param planetWeatherMap File to upload
   */
  async uploadPlanetWeatherMap(planetWeatherMap: File): Promise<string> {
    const formData = new FormData();
    formData.append("planetWeatherMap", planetWeatherMap);

    const res = await fetch(`${this.baseUrl}/WeatherForecast/upload-planet-weather-map`, {
      method: "POST",
      body: formData,
    });

    if (res.status === 201) {
      const contentType = res.headers.get("content-type") || "";
      if (
        contentType.includes("application/json") ||
        contentType.includes("text/json")
      ) {
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
}

/**
 * Controller for /human-bases endpoints
 */
export class HumanBasesController {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  /**
   * POST /human-bases
   * @param humanBase File to upload
   */
  async uploadHumanBase(humanBase: File): Promise<string> {
    const formData = new FormData();
    formData.append("humanBase", humanBase);

    const res = await fetch(`${this.baseUrl}/human-bases`, {
      method: "POST",
      body: formData,
    });

    if (res.status === 201) {
      const contentType = res.headers.get("content-type") || "";
      if (
        contentType.includes("application/json") ||
        contentType.includes("text/json")
      ) {
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
}
