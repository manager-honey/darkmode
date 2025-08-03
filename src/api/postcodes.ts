import { BASE_URL, POSTCODE_AUTOCOMPLETE_LIMIT } from "../constants";
import { API_ENDPOINTS } from "./APIEndpoints";

export async function getPostCodeAutocomplete(postcode: string) {
  try {
    const params = new URLSearchParams({ limit: POSTCODE_AUTOCOMPLETE_LIMIT });

    const url = `${BASE_URL}${API_ENDPOINTS.GET_POST_CODE_AUTOCOMPLETE}/${postcode}/autocomplete?${params}`;

    const options = {
      method: "GET",
    };

    const postcodeResponse = await fetch(url, options);

    if (!postcodeResponse.ok) {
      throw new Error(
        `Failed to get postcodes ${postcodeResponse.status} ${postcodeResponse.statusText}`
      );
    }

    const responseBody = await postcodeResponse.json();
    return responseBody;
  } catch (error) {
    console.error("Failed to get postcodes", error);
  }
}
