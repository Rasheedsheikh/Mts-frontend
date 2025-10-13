// src/api/advertisementApi.js
import axios from 'axios';
import { Base_url } from '../constants/constant'
const API_BASE_URL = `${Base_url}/advertisements`

export const getAdvertisements = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data;
};

export const deleteAdvertisement = async (advertisement_id) => {
  await axios.delete(`${API_BASE_URL}/${advertisement_id}`);
};





/**
 * Submits a new advertisement (including the image file) to the backend.
 * @param {FormData} formData - The FormData object containing text fields and the file.
 * @returns {Promise<Object>} - The created advertisement object from the API.
 */
export const createAdvertisement = async (formData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}`, 
            formData,
            {
                headers: { 
                    // This is handled by FormData, but explicitly set for clarity
                    'Content-Type': 'multipart/form-data' 
                    // Add your authentication token here if your API requires one
                    // 'Authorization': `Bearer ${yourAuthToken}` 
                },
            }
        );
        return response.data;
    } catch (error) {
        // Throw the error so it can be caught and handled in the component
        throw error;
    }
};

// You would place other ad-related API calls here, like:
// export const getAdvertisements = async () => { /* ... */ }; 
// export const deleteAdvertisement = async (id) => { /* ... */ };