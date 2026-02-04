import apiClient from "../http/apiClient";

export const ritualsApi = {
  async getRituals(): Promise<any> {
    const response = await apiClient.get("/ritual");
    console.log(response);
    return response;
  },

  // async getRitualBySlug(slug: string): Promise<Ritual> {
  //   const response = await apiClient.get(`/rituals/${slug}`);
  //   return response.data;
  // },
};

export default ritualsApi;
